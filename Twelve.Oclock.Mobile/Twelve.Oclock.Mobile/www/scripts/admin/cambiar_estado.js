function CambiarEstado(idColaboradorDestino) {
    var popupCambiarEstadoForm = $(".popupCambiarEstadoForm");
    var popupCambiarEstadoSatisfactorio = $(".popupCambiarEstadoSatisfactorio");
    var popupCambiarEstadoError = $(".popupCambiarEstadoError");

    var estadosTramite = {
        TramiteId: localStorage.getItem("TramiteId"),
        EstadoId: localStorage.getItem("EstadoId"),
        Novedad: $('#novedad').val()
    };

    var uriEstadosTramitePost = "http://40.85.92.66:1010/api/EstadosTramites";

    $.ajax({
        type: "POST",
        data: JSON.stringify(estadosTramite),
        url: uriEstadosTramitePost,
        contentType: "application/json",
        success: function (msg) {
            popupCambiarEstadoForm.attr("style", "display: none");
            popupCambiarEstadoSatisfactorio.attr("style", "display: inline");
            popupCambiarEstadoError.attr("style", "display: none");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            popupCambiarEstadoForm.attr("style", "display: none");
            popupCambiarEstadoSatisfactorio.attr("style", "display: none");
            popupCambiarEstadoError.attr("style", "display: inline");
        }
    });
}