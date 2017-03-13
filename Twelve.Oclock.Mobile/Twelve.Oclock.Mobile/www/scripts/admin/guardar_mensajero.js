//Guardar Mensajero
function Guardar() {
    var popupGuardarForm = $(".popupGuardarForm");
    var popupGuardarSatisfactorio = $(".popupGuardarSatisfactorio");
    var popupGuardarCamposVacios = $(".popupGuardarCamposVacios");
    var popupGuardarError = $(".popupGuardarError");

    var uriMensajeroPut = "http://40.85.92.66:1010/api/Usuarios/";

    var nombres = $("#nombresNew");
    var apellidos = $("#apellidosNew");
    var nit = $("#nitNew");
    var email = $("#emailNew");
    var celular = $("#celularNew");

    if (nombres.val() == ""
        || apellidos.val() == ""
        || nit.val() == ""
        || email.val() == ""
        || celular.val() == "") {
        popupGuardarForm.attr("style", "display: none");
        popupGuardarSatisfactorio.attr("style", "display: none");
        popupGuardarCamposVacios.attr("style", "display: inline");
        popupGuardarError.attr("style", "display: none");
    }
    else {
        var Mensajero = {
            Nombre: nombres.val(),
            Apellido: apellidos.val(),
            Nit: nit.val(),
            Email: email.val(),
            Celular: celular.val(),
            User: nit.val(),
            Password: nit.val(),
            RolId: 2
        };

        $.ajax({
            type: "POST",
            data: JSON.stringify(Mensajero),
            url: uriMensajeroPut,
            contentType: "application/json",
            success: function (msg) {
                popupGuardarForm.attr("style", "display: none");
                popupGuardarSatisfactorio.attr("style", "display: inline");
                popupGuardarCamposVacios.attr("style", "display: none");
                popupGuardarError.attr("style", "display: none");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                popupGuardarForm.attr("style", "display: none");
                popupGuardarSatisfactorio.attr("style", "display: none");
                popupGuardarCamposVacios.attr("style", "display: none");
                popupGuardarError.attr("style", "display: inline");
            }
        });
    }
}