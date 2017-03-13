function Trasladar(idColaboradorDestino) {
    var popupTrasladarForm = $(".popupTrasladarForm");
    var popupTrasladarSatisfactorio = $(".popupTrasladarSatisfactorio");
    var popupTrasladarError = $(".popupTrasladarError");

    var traslado = {
        TramiteId: localStorage.getItem("TramiteId"),
        ColaboradorOrigenId: localStorage.getItem("UserId"),
        ColaboradorDestinoId: idColaboradorDestino
    };

    var uriTramitePost = "http://40.85.92.66:1010/api/Trasladoes";

    $.ajax({
        type: "POST",
        data: JSON.stringify(traslado),
        url: uriTramitePost,
        contentType: "application/json",
        success: function (msg) {
            popupTrasladarForm.attr("style", "display: none");
            popupTrasladarSatisfactorio.attr("style", "display: inline");
            popupTrasladarError.attr("style", "display: none");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            popupTrasladarForm.attr("style", "display: none");
            popupTrasladarSatisfactorio.attr("style", "display: none");
            popupTrasladarError.attr("style", "display: inline");
        }
    });
}