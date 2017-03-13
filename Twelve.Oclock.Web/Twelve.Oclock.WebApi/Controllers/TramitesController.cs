using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using Twelve.Oclock.Core.Entities;
using Twelve.Oclock.Core.Util;

namespace Twelve.Oclock.WebApi.Controllers
{
    public class TramitesController : ApiController
    {
        private OClockEntities db = new OClockEntities();

        // GET: api/Tramites
        public IQueryable<Tramite> GetTramites()
        {
            var subquery = from p in db.EstadosTramites
                           where p.EstadoId == 3 || p.EstadoId == 4
                           select p.TramiteId;

            var queryActivos = from p in db.Tramites
                               where (p.FechaProgramado == null ? DateTime.Now : p.FechaProgramado.Value) <= DateTime.Now
                               && !subquery.Contains(p.Id)
                               select p;

            DateTime FechaAyer = DateTime.Now.AddDays(-1);

            var queryHoy = from p in db.Tramites
                           where (p.FechaProgramado == null ? DateTime.Now : p.FechaProgramado.Value) <= DateTime.Now
                           && (p.FechaProgramado == null ? DateTime.Now : p.FechaProgramado.Value) > FechaAyer
                           select p;

            return queryActivos.Union(queryHoy).OrderBy(p => p.ColaboradorId);
        }

        // GET: api/Tramites
        public IQueryable<Tramite> GetTramitesColaborador(int colaboradorId)
        {
            var subquery = from p in db.EstadosTramites
                           where p.EstadoId == 3 || p.EstadoId == 4
                           select p.TramiteId;


            var querypriorizado = from p in db.Tramites
                                  where p.ColaboradorId == colaboradorId
                                  && (p.FechaProgramado == null ? DateTime.Now : p.FechaProgramado) <= DateTime.Now
                                  && p.Priorizado
                                  && !subquery.Contains(p.Id)
                                  orderby p.Fecha ascending
                                  select p;

            var query = from p in db.Tramites
                        where p.ColaboradorId == colaboradorId
                        && (p.FechaProgramado == null ? DateTime.Now : p.FechaProgramado) <= DateTime.Now
                        && !p.Priorizado
                        && !subquery.Contains(p.Id)
                        orderby p.Fecha ascending
                        select p;

            return querypriorizado.Union(query);
        }

        // GET: api/Tramites
        public IQueryable<Tramite> GetTramitesUsuario(int usuarioId)
        {
            var query = from p in db.Tramites
                        where p.UsuarioId == usuarioId
                        //&& (p.FechaProgramado == null ? DateTime.Now : p.FechaProgramado) <= DateTime.Now
                        orderby p.Fecha ascending
                        select p;

            return query;
        }

        // GET: api/Tramites/5
        [ResponseType(typeof(Tramite))]
        public IHttpActionResult GetTramite(int id)
        {
            Tramite tramite = db.Tramites.Find(id);
            if (tramite == null)
            {
                return NotFound();
            }

            return Ok(tramite);
        }

        // PUT: api/Tramites/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTramite(int id, Tramite tramite)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tramite.Id)
            {
                return BadRequest();
            }

            db.Entry(tramite).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TramiteExists(id))
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

        // POST: api/Tramites
        [ResponseType(typeof(Tramite))]
        public IHttpActionResult PostTramite(Tramite tramite)
        {
            try
            {
                if (!ModelState.IsValid && !ModelState.Keys.Contains("tramite.ColaboradorId"))
                {
                    return BadRequest(ModelState);
                }

                tramite.Fecha = DateTime.Now;

                if (tramite.FechaProgramado == null)
                    tramite.FechaProgramado = DateTime.Now;

                var diaSemana = tramite.FechaProgramado.Value.DayOfWeek;
                var hora = tramite.FechaProgramado.Value.Hour;
                //Validar Horario
                if (!(hora >= 7 && hora <= 18) || !(diaSemana == DayOfWeek.Saturday && hora >= 7 && hora <= 13) || diaSemana == DayOfWeek.Sunday)
                {
                    tramite.Mensaje = "Nuestro servicio no se encuentra activo en este horario. Para mayor información visita los términos y condiciones";
                }
                else
                {
                    if (tramite.ColaboradorId == 0)
                    {
                        var detalleTramite = tramite.DetalleTramites.ToArray()[0];
                        // Se debe consultar el mensajero por la ubicación mas cercana al lugar de origen inicial
                        if (detalleTramite.LatitudSalida != null && detalleTramite.LatitudSalida != null)
                        {
                            var colaboradorId = UtilEntities.GetMensajeroLocation(detalleTramite.LatitudSalida.Value, detalleTramite.LongitudSalida.Value, db.Localizaciones.ToList());
                            tramite.ColaboradorId = colaboradorId;
                        }
                        else
                        {
                            var colaborador = UtilEntities.Random(db.Usuarios.Where(p => p.RolId == 2));
                            tramite.ColaboradorId = colaborador.Id;
                        }
                    }

                    tramite.EstadosTramites.Add(new EstadosTramite()
                    {
                        EstadoId = 1
                    });

                    db.Tramites.Add(tramite);
                    db.SaveChanges();


                    var subquery = from p in db.EstadosTramites
                                   where p.EstadoId == 3 || p.EstadoId == 4
                                   select p.TramiteId;

                    var query = from p in db.Tramites
                                where p.ColaboradorId == tramite.ColaboradorId
                                && (p.FechaProgramado == null ? DateTime.Now : p.FechaProgramado) <= DateTime.Now
                                && !subquery.Contains(p.Id)
                                orderby p.Fecha ascending
                                select p;

                    tramite.EnCola = query.Count();
                }
                return CreatedAtRoute("DefaultApi", new { id = tramite.Id }, tramite);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/Tramites/5
        [ResponseType(typeof(Tramite))]
        public IHttpActionResult DeleteTramite(int id)
        {
            Tramite tramite = db.Tramites.Find(id);
            if (tramite == null)
            {
                return NotFound();
            }

            db.Tramites.Remove(tramite);
            db.SaveChanges();

            return Ok(tramite);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TramiteExists(int id)
        {
            return db.Tramites.Count(e => e.Id == id) > 0;
        }
    }
}