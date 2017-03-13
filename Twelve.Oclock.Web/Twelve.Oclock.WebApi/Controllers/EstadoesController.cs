using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Twelve.Oclock.Core.Entities;

namespace Twelve.Oclock.WebApi.Controllers
{
    public class EstadoesController : ApiController
    {
        private OClockEntities db = new OClockEntities();

        // GET: api/Estadoes
        public IQueryable<Estado> GetEstados()
        {
            return db.Estados;
        }

        // GET: api/Estadoes/5
        [ResponseType(typeof(Estado))]
        public IHttpActionResult GetEstado(int id)
        {
            Estado estado = db.Estados.Find(id);
            if (estado == null)
            {
                return NotFound();
            }

            return Ok(estado);
        }

        // PUT: api/Estadoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEstado(int id, Estado estado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != estado.Id)
            {
                return BadRequest();
            }

            db.Entry(estado).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstadoExists(id))
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

        // POST: api/Estadoes
        [ResponseType(typeof(Estado))]
        public IHttpActionResult PostEstado(Estado estado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Estados.Add(estado);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = estado.Id }, estado);
        }

        // DELETE: api/Estadoes/5
        [ResponseType(typeof(Estado))]
        public IHttpActionResult DeleteEstado(int id)
        {
            Estado estado = db.Estados.Find(id);
            if (estado == null)
            {
                return NotFound();
            }

            db.Estados.Remove(estado);
            db.SaveChanges();

            return Ok(estado);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EstadoExists(int id)
        {
            return db.Estados.Count(e => e.Id == id) > 0;
        }
    }
}