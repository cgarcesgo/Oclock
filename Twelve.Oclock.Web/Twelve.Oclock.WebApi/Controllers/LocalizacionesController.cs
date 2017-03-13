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
    public class LocalizacionesController : ApiController
    {
        private OClockEntities db = new OClockEntities();

        // GET: api/Localizaciones
        public IQueryable<Localizacione> GetLocalizaciones()
        {
            return db.Localizaciones;
        }

        // GET: api/Localizaciones/5
        [ResponseType(typeof(Localizacione))]
        public IHttpActionResult GetLocalizacione(int id)
        {
            Localizacione localizacione = db.Localizaciones.Find(id);
            if (localizacione == null)
            {
                return NotFound();
            }

            return Ok(localizacione);
        }

        // PUT: api/Localizaciones/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLocalizacione(int id, Localizacione localizacione)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != localizacione.Id)
            {
                return BadRequest();
            }

            db.Entry(localizacione).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocalizacioneExists(id))
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

        // POST: api/Localizaciones
        [ResponseType(typeof(Localizacione))]
        public IHttpActionResult PostLocalizacione(Localizacione localizacione)
        {
            using (TransactionScope scope = new TransactionScope())
            {
                var query = db.Localizaciones.Where(p => p.UsuarioId == localizacione.UsuarioId).ToList();

                foreach (var item in query)
                {
                    db.Localizaciones.Remove(item);
                }
                db.SaveChanges();

                localizacione.Fecha = DateTime.Now;
                db.Localizaciones.Add(localizacione);
                db.SaveChanges();

                scope.Complete();
                return CreatedAtRoute("DefaultApi", new { id = localizacione.Id }, localizacione);
            }
        }

        // DELETE: api/Localizaciones/5
        [ResponseType(typeof(Localizacione))]
        public IHttpActionResult DeleteLocalizacione(int id)
        {
            Localizacione localizacione = db.Localizaciones.Find(id);
            if (localizacione == null)
            {
                return NotFound();
            }

            db.Localizaciones.Remove(localizacione);
            db.SaveChanges();

            return Ok(localizacione);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LocalizacioneExists(int id)
        {
            return db.Localizaciones.Count(e => e.Id == id) > 0;
        }
    }
}