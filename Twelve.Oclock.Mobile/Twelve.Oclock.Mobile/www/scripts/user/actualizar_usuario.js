//Enviar el favorito
$(document).on("pagecreate", function () {
    $("#actualizar").click(function () {
        var popupActualizarForm = $(".popupActualizarForm");
        var popupActualizarSatisfactorio = $(".popupActualizarSatisfactorio");
        var popupCamposVacios = $(".popupCamposVacios");

        var usuariolocal = JSON.parse(localStorage.getItem("User"));
        var uriUsuarioPut = "http://40.85.92.66:1010/api/Usuarios/" + usuariolocal.Id.toString();

        var nombres = $("#nombres");
        var apellidos = $("#apellidos");
        var nit = $("#nit");
        var email = $("#email");
        var celular = $("#celular");

        if (nombres.val() == ""
            || apellidos.val() == ""
            || email.val() == ""
            || celular.val() == "") {
            popupActualizarForm.attr("style", "display: none");
            popupActualizarSatisfactorio.attr("style", "display: none");
            popupCamposVacios.attr("style", "display: inline");
        }
        else {
            var usuario = {
                Id: localStorage.getItem("UserId"),
                Nombre: nombres.val(),
                Apellido: apellidos.val(),
                Nit: nit.val(),
                Email: email.val(),
                Celular: celular.val()
            };

            $.ajax({
                type: "PUT",
                data: JSON.stringify(usuario),
                url: uriUsuarioPut,
                contentType: "application/json",
                success: function (msg) {

                    var ruta = "http://40.85.92.66:1010/api/Usuarios?user=" + usuariolocal.User;
                    $.ajax({
                        type: "GET",
                        url: ruta,
                        data: "{}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            popupActualizarForm.attr("style", "display: none");
                            popupActualizarSatisfactorio.attr("style", "display: inline");
                            popupCamposVacios.attr("style", "display: none");
                            localStorage.setItem("UserId", msg.Id);
                            localStorage.setItem("User", JSON.stringify(msg));
                            CargarPerfil();
                        }
                    });

                    return false;
                }
            });
        }
    });
});

function InicializaActualizar() {
    var popupActualizarForm = $(".popupActualizarForm");
    var popupActualizarSatisfactorio = $(".popupActualizarSatisfactorio");
    var popupCamposVacios = $(".popupCamposVacios");
    popupActualizarForm.attr("style", "display: inline");
    popupActualizarSatisfactorio.attr("style", "display: none");
    popupCamposVacios.attr("style", "display: none");
}