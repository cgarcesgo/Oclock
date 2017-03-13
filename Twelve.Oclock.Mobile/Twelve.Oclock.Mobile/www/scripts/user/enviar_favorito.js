//Enviar el favorito
$(document).on("pagecreate", function () {
    $("#savestar").click(function () {
        var uriFavoritoPost = "http://40.85.92.66:1010/api/Favoritoes";

        var favorito = {
            UsuarioId: localStorage.getItem("UserId"),
            Nombre: $("#nametramite").val(),
            Comprobante: comprobante,
            DetalleFavoritos: []
        };

        for (var i = 1; i <= nextId; i++) {
            if (i == nextId && comprobante) {
                favorito.DetalleFavoritos.push({
                    CategoriaId: 1,
                    Salida: $("#salida" + i + "").val(),
                    Llegada: $("#llegada" + i + "").val(),
                    Descripcion: "Comprobante"
                });
            }
            else {
                var locationSalida = GetLocation("salida", i);
                var locationLlegada = GetLocation("llegada", i);

                if (locationSalida == null) {
                    locationSalida = {
                        Index: i,
                        Tipo: "salida",
                        Latitud: '',
                        Longitud: ''
                    }
                }
                if (locationLlegada == null) {
                    locationLlegada = {
                        Index: i,
                        Tipo: "llegada",
                        Latitud: '',
                        Longitud: ''
                    }
                }

                favorito.DetalleFavoritos.push({
                    CategoriaId: $("#categoria" + i + "").find(":selected").val(),
                    Salida: $("#salida" + i + "").val(),
                    Llegada: $("#llegada" + i + "").val(),
                    Descripcion: $("#descripcion" + i + "").val(),
                    LatitudSalida: locationSalida.Latitud,
                    LongitudSalida: locationSalida.Longitud,
                    LatitudLlegada: locationLlegada.Latitud,
                    LongitudLlegada: locationLlegada.Longitud
                });
            }
        }

        $.ajax({
            type: "POST",
            data: JSON.stringify(favorito),
            url: uriFavoritoPost,
            contentType: "application/json",
            success: function (msg) {
                $("#popupStar").popup("close");
                //Limpiar();
                CargarFavoritos();
                return false;
            }
        });
    });
});