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
    public class DetalleTramitesController : ApiController
    {
        private OClockEntities db = new OClockEntities();

        // GET: api/DetalleTramites
        public IQueryable<DetalleTramite> GetDetalleTramites()
        {
            return db.DetalleTramites;
        }

        // GET: api/DetalleTramites/5
        [ResponseType(typeof(DetalleTramite))]
        public IHttpActionResult GetDetalleTramite(int id)
        {
            DetalleTramite detalleTramite = db.DetalleTramites.Find(id);
            if (detalleTramite == null)
            {
                return NotFound();
            }

            return Ok(detalleTramite);
        }

        // PUT: api/DetalleTramites/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDetalleTramite(int id, DetalleTramite detalleTramite)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != detalleTramite.Id)
            {
                return BadRequest();
            }

            db.Entry(detalleTramite).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetalleTramiteExists(id))
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

        // POST: api/DetalleTramites
        [ResponseType(typeof(DetalleTramite))]
        public IHttpActionResult PostDetalleTramite(DetalleTramite detalleTramite)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DetalleTramites.Add(detalleTramite);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = detalleTramite.Id }, detalleTramite);
        }

        // DELETE: api/DetalleTramites/5
        [ResponseType(typeof(DetalleTramite))]
        public IHttpActionResult DeleteDetalleTramite(int id)
        {
            DetalleTramite detalleTramite = db.DetalleTramites.Find(id);
            if (detalleTramite == null)
            {
                return NotFound();
            }

            db.DetalleTramites.Remove(detalleTramite);
            db.SaveChanges();

            return Ok(detalleTramite);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DetalleTramiteExists(int id)
        {
            return db.DetalleTramites.Count(e => e.Id == id) > 0;
        }
    }
}