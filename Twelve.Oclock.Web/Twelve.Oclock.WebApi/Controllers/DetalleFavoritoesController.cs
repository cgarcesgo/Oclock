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
    public class DetalleFavoritoesController : ApiController
    {
        private OClockEntities db = new OClockEntities();

        // GET: api/DetalleFavoritoes
        public IQueryable<DetalleFavorito> GetDetalleFavoritos()
        {
            return db.DetalleFavoritos;
        }

        // GET: api/DetalleFavoritoes/5
        [ResponseType(typeof(DetalleFavorito))]
        public IHttpActionResult GetDetalleFavorito(int id)
        {
            DetalleFavorito detalleFavorito = db.DetalleFavoritos.Find(id);
            if (detalleFavorito == null)
            {
                return NotFound();
            }

            return Ok(detalleFavorito);
        }

        // PUT: api/DetalleFavoritoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDetalleFavorito(int id, DetalleFavorito detalleFavorito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != detalleFavorito.Id)
            {
                return BadRequest();
            }

            db.Entry(detalleFavorito).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetalleFavoritoExists(id))
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

        // POST: api/DetalleFavoritoes
        [ResponseType(typeof(DetalleFavorito))]
        public IHttpActionResult PostDetalleFavorito(DetalleFavorito detalleFavorito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DetalleFavoritos.Add(detalleFavorito);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = detalleFavorito.Id }, detalleFavorito);
        }

        // DELETE: api/DetalleFavoritoes/5
        [ResponseType(typeof(DetalleFavorito))]
        public IHttpActionResult DeleteDetalleFavorito(int id)
        {
            DetalleFavorito detalleFavorito = db.DetalleFavoritos.Find(id);
            if (detalleFavorito == null)
            {
                return NotFound();
            }

            db.DetalleFavoritos.Remove(detalleFavorito);
            db.SaveChanges();

            return Ok(detalleFavorito);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DetalleFavoritoExists(int id)
        {
            return db.DetalleFavoritos.Count(e => e.Id == id) > 0;
        }
    }
}