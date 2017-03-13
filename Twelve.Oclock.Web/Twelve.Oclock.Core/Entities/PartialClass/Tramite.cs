using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Twelve.Oclock.Core.Entities
{
    public partial class Tramite
    {
        public string FechaString
        {
            get
            {
                if (this.FechaProgramado == null) return string.Empty;
                return this.FechaProgramado.Value.ToString("g");
            }
        }

        public Estado LastEstado
        {
            get
            {
                try
                {
                    return this.EstadosTramites.OrderByDescending(p => p.Id).FirstOrDefault().Estado;
                }
                catch
                {
                    return new Estado()
                    {
                        Id = 1,
                        Nombre = "En espera"
                    };
                }
            }
        }

        public int EnCola
        {
            set;
            get;
        }

        public string Mensaje
        {
            set;
            get;
        }
    }
}
