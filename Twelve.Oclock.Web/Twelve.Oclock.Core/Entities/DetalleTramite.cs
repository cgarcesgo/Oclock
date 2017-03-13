//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class DetalleTramite
    {
        public int Id { get; set; }
        public int TramiteId { get; set; }
        public int CategoriaId { get; set; }
        public string Salida { get; set; }
        public string Llegada { get; set; }
        public string Descripcion { get; set; }
        public Nullable<double> LatitudSalida { get; set; }
        public Nullable<double> LongitudSalida { get; set; }
        public Nullable<double> LatitudLlegada { get; set; }
        public Nullable<double> LongitudLlegada { get; set; }
    
        public virtual Categoria Categoria { get; set; }
        public virtual Tramite Tramite { get; set; }
    }
}
