﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Twelve.Oclock.Core.Entities
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class OClockEntities : DbContext
    {
        public OClockEntities()
            : base("name=OClockEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Categoria> Categorias { get; set; }
        public virtual DbSet<DetalleFavorito> DetalleFavoritos { get; set; }
        public virtual DbSet<DetalleTramite> DetalleTramites { get; set; }
        public virtual DbSet<Estado> Estados { get; set; }
        public virtual DbSet<EstadosTramite> EstadosTramites { get; set; }
        public virtual DbSet<Favorito> Favoritos { get; set; }
        public virtual DbSet<Localizacione> Localizaciones { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Tramite> Tramites { get; set; }
        public virtual DbSet<Traslado> Traslados { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }
    }
}
