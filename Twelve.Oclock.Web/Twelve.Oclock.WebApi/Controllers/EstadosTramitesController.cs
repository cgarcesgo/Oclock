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
    public class EstadosTramitesController : ApiController
    {
        private OClockEntities db = new OClockEntities();

        // GET: api/EstadosTramites
        public IQueryable<EstadosTramite> GetEstadosTramites()
        {
            return db.EstadosTramites;
        }

        // GET: api/EstadosTramites/5
        [ResponseType(typeof(EstadosTramite))]
        public IHttpActionResult GetEstadosTramite(int id)
        {
            EstadosTramite estadosTramite = db.EstadosTramites.Find(id);
            if (estadosTramite == null)
            {
                return NotFound();
            }

            return Ok(estadosTramite);
        }

        // PUT: api/EstadosTramites/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEstadosTramite(int id, EstadosTramite estadosTramite)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != estadosTramite.Id)
            {
                return BadRequest();
            }

            db.Entry(estadosTramite).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstadosTramiteExists(id))
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

        // POST: api/EstadosTramites
        [ResponseType(typeof(EstadosTramite))]
        public IHttpActionResult PostEstadosTramite(EstadosTramite estadosTramite)
        {
            try
            {
                db.EstadosTramites.Add(estadosTramite);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = estadosTramite.Id }, estadosTramite);
            }
            catch (Exception ex)
            {
                return BadRequest(ModelState);
            }
        }

        // DELETE: api/EstadosTramites/5
        [ResponseType(typeof(EstadosTramite))]
        public IHttpActionResult DeleteEstadosTramite(int id)
        {
            EstadosTramite estadosTramite = db.EstadosTramites.Find(id);
            if (estadosTramite == null)
            {
                return NotFound();
            }

            db.EstadosTramites.Remove(estadosTramite);
            db.SaveChanges();

            return Ok(estadosTramite);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EstadosTramiteExists(int id)
        {
            return db.EstadosTramites.Count(e => e.Id == id) > 0;
        }
    }
}