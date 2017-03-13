using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Twelve.Oclock.Core.Entities;

namespace Twelve.Oclock.Core.Util
{
    public static class UtilEntities
    {
        public static T Random<T>(this IEnumerable<T> enumerable)
        {
            if (enumerable == null)
            {
                throw new ArgumentNullException(nameof(enumerable));
            }

            // note: creating a Random instance each call may not be correct for you,
            // consider a thread-safe static instance
            var r = new Random();
            var list = enumerable as IList<T> ?? enumerable.ToList();
            return list.Count == 0 ? default(T) : list[r.Next(0, list.Count)];
        }

        public static int GetMensajeroLocation(double latitud, double longitud, List<Localizacione> lstLocalizaciones)
        {
            int minMensajero = 0;
            double minDiferencia = 1000000;

            foreach (var item in lstLocalizaciones)
            {
                double difLat = Restar(item.Latitud, latitud);
                double difLng = Restar(item.Longitud, longitud);
                double diff = Restar(difLat, difLng);

                if (minDiferencia > diff)
                {
                    minDiferencia = diff;
                    minMensajero = item.UsuarioId;
                }
            }

            return minMensajero;
        }

        public static double Restar(double num1, double num2)
        {
            double result = num1 - num2;
            if (result < 0)
                result *= -1;
            return result;
        }
    }
}
