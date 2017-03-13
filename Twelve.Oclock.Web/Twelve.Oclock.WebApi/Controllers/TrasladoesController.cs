using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Transactions;
using System.Web.Http;
using System.Web.Http.Description;
using Twelve.Oclock.Core.Entities;

namespace Twelve.Oclock.WebApi.Controllers
{
    public class TrasladoesController : ApiController
    {
        private OClockEntities db = new OClockEntities();

        // GET: api/Trasladoes
        public IQueryable<Traslado> GetTraslados()
        {
            var subquery = from p in db.EstadosTramites
                           where p.EstadoId == 3 || p.EstadoId == 4
                           select p.TramiteId;

            var queryActivos = from q in db.Traslados
                               join p in db.Tramites on q.TramiteId equals p.Id
                               where (p.FechaProgramado == null ? DateTime.Now : p.FechaProgramado.Value) <= DateTime.Now
                               && !subquery.Contains(p.Id)
                               select q;

            DateTime FechaAyer = DateTime.Now.AddDays(-1);

            var queryHoy = from q in db.Traslados
                           join p in db.Tramites on q.TramiteId equals p.Id
                           where (p.FechaProgramado == null ? DateTime.Now : p.FechaProgramado.Value) <= DateTime.Now
                           && (p.FechaProgramado == null ? DateTime.Now : p.FechaProgramado.Value) > FechaAyer
                           select q;

            return queryActivos.Union(queryHoy);
        }

        // GET: api/Trasladoes/5
        [ResponseType(typeof(Traslado))]
        public IHttpActionResult GetTraslado(int id)
        {
            Traslado traslado = db.Traslados.Find(id);
            if (traslado == null)
            {
                return NotFound();
            }

            return Ok(traslado);
        }

        // PUT: api/Trasladoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTraslado(int id, Traslado traslado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != traslado.Id)
            {
                return BadRequest();
            }

            db.Entry(traslado).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrasladoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Trasladoes
        [ResponseType(typeof(Traslado))]
        public IHttpActionResult PostTraslado(Traslado traslado)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    traslado.Fecha = DateTime.Now;
                    db.Traslados.Add(traslado);
                    db.SaveChanges();

                    var tramite = db.Tramites.Where(p => p.Id == traslado.TramiteId).FirstOrDefault();
                    tramite.ColaboradorId = traslado.ColaboradorDestinoId;
                    db.SaveChanges();

                    scope.Complete();

                    return CreatedAtRoute("DefaultApi", new { id = traslado.Id }, traslado);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ModelState);
            }
        }

        // DELETE: api/Trasladoes/5
        [ResponseType(typeof(Traslado))]
        public IHttpActionResult DeleteTraslado(int id)
        {
            Traslado traslado = db.Traslados.Find(id);
            if (traslado == null)
            {
                return NotFound();
            }

            db.Traslados.Remove(traslado);
            db.SaveChanges();

            return Ok(traslado);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TrasladoExists(int id)
        {
            return db.Traslados.Count(e => e.Id == id) > 0;
        }
    }
}