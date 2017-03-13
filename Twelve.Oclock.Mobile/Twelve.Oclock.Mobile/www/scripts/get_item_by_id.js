//Obtiene el item por Id de una lista
function GetItemById(lista, id) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].Id == id) {
            return lista[i]
        }
    }
}