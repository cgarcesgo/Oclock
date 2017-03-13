//Actualizar Mensajero
function Actualizar() {
    var popupEditarForm = $(".popupEditarForm");
    var popupEditarSatisfactorio = $(".popupEditarSatisfactorio");
    var popupEditarCamposVacios = $(".popupEditarCamposVacios");
    var popupEditarError = $(".popupEditarError");

    var uriMensajeroPut = "http://40.85.92.66:1010/api/Usuarios/" + localStorage.getItem("MensajeroId");

    var nombres = $("#nombres");
    var apellidos = $("#apellidos");
    var nit = $("#nit");
    var email = $("#email");
    var celular = $("#celular");

    if (nombres.val() == ""
        || apellidos.val() == ""
        || nit.val() == ""
        || email.val() == ""
        || celular.val() == "") {
        popupEditarForm.attr("style", "display: none");
        popupEditarSatisfactorio.attr("style", "display: none");
        popupEditarCamposVacios.attr("style", "display: inline");
        popupEditarError.attr("style", "display: none");
    }
    else {
        var Mensajero = getMensajeroById(localStorage.getItem("MensajeroId"));
        Mensajero.Nombre = nombres.val();
        Mensajero.Apellido = apellidos.val();
        Mensajero.Nit = nit.val();
        Mensajero.Email = email.val();
        Mensajero.Celular = celular.val();
        Mensajero.User = nit.val();
        Mensajero.Password = "";

        $.ajax({
            type: "PUT",
            data: JSON.stringify(Mensajero),
            url: uriMensajeroPut,
            contentType: "application/json",
            success: function (msg) {
                popupEditarForm.attr("style", "display: none");
                popupEditarSatisfactorio.attr("style", "display: inline");
                popupEditarCamposVacios.attr("style", "display: none");
                popupEditarError.attr("style", "display: none");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                popupEditarForm.attr("style", "display: none");
                popupEditarSatisfactorio.attr("style", "display: none");
                popupEditarCamposVacios.attr("style", "display: none");
                popupEditarError.attr("style", "display: inline");
            }
        });
    }
}