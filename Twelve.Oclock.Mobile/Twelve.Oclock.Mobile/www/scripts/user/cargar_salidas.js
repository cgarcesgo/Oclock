//Carga las salidas
function cargarSalidas() {
    for (var i = 2; i <= nextId; i++) {
        var llegada = $("#llegada" + (i - 1) + "");
        var salida = $("#salida" + i + "");
        salida.prop('disabled', true);
        salida.val(llegada.val());

        if (i == nextId && comprobante) {
            var llegada = $("#llegada" + (i) + "");
            var salida = $("#salida" + 1 + "");

            llegada.val(salida.val());
            llegada.prop('disabled', true);
        }
    }
}