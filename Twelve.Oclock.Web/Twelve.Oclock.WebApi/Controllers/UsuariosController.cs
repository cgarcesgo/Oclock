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
    public class UsuariosController : ApiController
    {
        private OClockEntities db = new OClockEntities();

        // GET: api/Usuarios
        public IQueryable<Usuario> GetUsuarios()
        {
            return db.Usuarios;
        }

        // GET: api/Usuarios by rolId
        public IQueryable<Usuario> GetUsuariosByRolId(int rolId)
        {
            return db.Usuarios.Where(p => p.RolId == rolId && p.Activo);
        }

        // GET: api/Usuarios/5
        [ResponseType(typeof(Usuario))]
        public IHttpActionResult GetUsuario(int id)
        {
            Usuario usuario = db.Usuarios.Find(id);
            if (usuario == null)
            {
                return Ok(new Usuario());
            }

            return Ok(usuario);
        }

        // GET: api/GetUsuarioLogin/Sebas
        [ResponseType(typeof(Usuario))]
        public IHttpActionResult GetUsuarioLogin(string user)
        {
            Usuario usuario = db.Usuarios.Where(p => p.User == user && p.Activo).FirstOrDefault();
            if (usuario == null)
            {
                return Ok(new Usuario());
            }

            return Ok(usuario);
        }

        // PUT: api/Usuarios/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUsuario(int id, Usuario usuario)
        {
            if (id != usuario.Id)
            {
                return BadRequest();
            }

            var entity = db.Usuarios.Where(p => p.Id == id).FirstOrDefault();
            if (!string.IsNullOrEmpty(usuario.Password))
            {
                //Cambiar contraseña
                entity.Password = usuario.Password;
            }
            else
            {
                //Actualizar
                entity.Nombre = !string.IsNullOrEmpty(usuario.Nombre) ? usuario.Nombre : entity.Nombre;
                entity.Apellido = !string.IsNullOrEmpty(usuario.Apellido) ? usuario.Apellido : entity.Apellido;
                entity.Nit = usuario.Nit;
                entity.Email = !string.IsNullOrEmpty(usuario.Email) ? usuario.Email : entity.Email;
                entity.Celular = !string.IsNullOrEmpty(usuario.Celular) ? usuario.Celular : entity.Celular;
                if (entity.RolId == 2) entity.User = usuario.Nit;
            }

            db.Entry(entity).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
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



        // POST: api/Usuarios
        [ResponseType(typeof(Usuario))]
        public IHttpActionResult PostUsuario(Usuario usuario)
        {
            var entity = db.Usuarios.Where(p => p.User == usuario.User).FirstOrDefault();

            if (entity != null)
                return NotFound();

            if (usuario.RolId == 2) usuario.User = usuario.Nit;
            usuario.Activo = true;

            db.Usuarios.Add(usuario);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = usuario.Id }, usuario);
        }

        // DELETE: api/Usuarios/5
        [ResponseType(typeof(Usuario))]
        public IHttpActionResult DeleteUsuario(int id)
        {
            try
            {
                Usuario usuario = db.Usuarios.Find(id);
                if (usuario == null)
                {
                    return NotFound();
                }

                db.Usuarios.Remove(usuario);
                db.SaveChanges();

                return Ok(usuario);
            }
            catch
            {
                Usuario usuario = db.Usuarios.Find(id);

                db.Entry(usuario).Reload();

                usuario.Activo = false;
                db.SaveChanges();

                return Ok(usuario);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UsuarioExists(int id)
        {
            return db.Usuarios.Count(e => e.Id == id) > 0;
        }
    }
}