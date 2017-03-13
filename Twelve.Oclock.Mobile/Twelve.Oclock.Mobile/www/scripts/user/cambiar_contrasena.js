//Enviar el favorito
$(document).on("pagecreate", function () {
    $("#changepass").click(function () {
        var popupCambiarForm = $(".popupCambiarForm");
        var popupContrasenaCambiada = $(".popupContrasenaCambiada");
        var popupContrasenaIncorrecta = $(".popupContrasenaIncorrecta");
        var popupContrasenaDiferente = $(".popupContrasenaDiferente");
        var popupCamposVacios = $(".popupCamposVacios");

        var usuariolocal = JSON.parse(localStorage.getItem("User"));
        var uriUsuarioPut = "http://40.85.92.66:1010/api/Usuarios/" + usuariolocal.Id.toString();

        var contrasenaactual = $("#actualcontrasenia");
        var contrasenanueva = $("#newcontrasenia");
        var contrasenaconfirme = $("#confirmecontrasenia");

        if (contrasenaactual.val() == "" || contrasenanueva.val() == "" || contrasenaconfirme.val() == "") {
            popupCambiarForm.attr("style", "display: none");
            popupContrasenaCambiada.attr("style", "display: none");
            popupContrasenaIncorrecta.attr("style", "display: none");
            popupContrasenaDiferente.attr("style", "display: none");
            popupCamposVacios.attr("style", "display: inline");
        }
        else {
            if (contrasenaactual.val() == usuariolocal.Password) {
                if (contrasenanueva.val() == contrasenaconfirme.val()) {
                    var usuario = {
                        Id: localStorage.getItem("UserId"),
                        Password: contrasenanueva.val()
                    };

                    $.ajax({
                        type: "PUT",
                        data: JSON.stringify(usuario),
                        url: uriUsuarioPut,
                        contentType: "application/json",
                        success: function (msg) {
                            popupCambiarForm.attr("style", "display: none");
                            popupContrasenaCambiada.attr("style", "display: inline");
                            popupContrasenaIncorrecta.attr("style", "display: none");
                            popupContrasenaDiferente.attr("style", "display: none");
                            popupCamposVacios.attr("style", "display: none");
                            //Limpiar();
                            return false;
                        }
                    });
                }
                else {
                    //Mostrar mensaje de concidencia de contraseñas
                    popupCambiarForm.attr("style", "display: none");
                    popupContrasenaCambiada.attr("style", "display: none");
                    popupContrasenaIncorrecta.attr("style", "display: none");
                    popupContrasenaDiferente.attr("style", "display: inline");
                    popupCamposVacios.attr("style", "display: none");
                }
            }
            else {
                //Mostrar mensaje de contraseña incorrecta
                popupCambiarForm.attr("style", "display: none");
                popupContrasenaCambiada.attr("style", "display: none");
                popupContrasenaIncorrecta.attr("style", "display: inline");
                popupContrasenaDiferente.attr("style", "display: none");
                popupCamposVacios.attr("style", "display: none");
            }
        }

    });
});

function InicializarContrasenas() {
    var popupCambiarForm = $(".popupCambiarForm");
    var popupContrasenaCambiada = $(".popupContrasenaCambiada");
    var popupContrasenaIncorrecta = $(".popupContrasenaIncorrecta");
    var popupContrasenaDiferente = $(".popupContrasenaDiferente");
    var popupCamposVacios = $(".popupCamposVacios");
    popupCambiarForm.attr("style", "display: inline");
    popupContrasenaCambiada.attr("style", "display: none");
    popupContrasenaIncorrecta.attr("style", "display: none");
    popupContrasenaDiferente.attr("style", "display: none");
    popupCamposVacios.attr("style", "display: none");
    //Limpiar();
}