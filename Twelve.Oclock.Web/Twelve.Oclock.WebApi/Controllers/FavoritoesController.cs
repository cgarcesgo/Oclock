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
    public class FavoritoesController : ApiController
    {
        private OClockEntities db = new OClockEntities();

        // GET: api/Favoritoes
        public IQueryable<Favorito> GetFavoritos()
        {
            return db.Favoritos;
        }

        // GET: api/Favoritoes
        public IQueryable<Favorito> GetFavoritos(int usuarioId)
        {
            var query = from p in db.Favoritos
                        where p.UsuarioId == usuarioId
                        select p;
            return query;
        }

        // GET: api/Favoritoes/5
        [ResponseType(typeof(Favorito))]
        public IHttpActionResult GetFavorito(int id)
        {
            Favorito favorito = db.Favoritos.Find(id);
            if (favorito == null)
            {
                return NotFound();
            }

            return Ok(favorito);
        }

        // PUT: api/Favoritoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFavorito(int id, Favorito favorito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != favorito.Id)
            {
                return BadRequest();
            }

            db.Entry(favorito).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavoritoExists(id))
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

        // POST: api/Favoritoes
        [ResponseType(typeof(Favorito))]
        public IHttpActionResult PostFavorito(Favorito favorito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Favoritos.Add(favorito);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = favorito.Id }, favorito);
        }

        // DELETE: api/Favoritoes/5
        [ResponseType(typeof(Favorito))]
        public IHttpActionResult DeleteFavorito(int id)
        {
            Favorito favorito = db.Favoritos.Find(id);
            if (favorito == null)
            {
                return NotFound();
            }

            db.Favoritos.Remove(favorito);
            db.SaveChanges();

            return Ok(favorito);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FavoritoExists(int id)
        {
            return db.Favoritos.Count(e => e.Id == id) > 0;
        }
    }
}