//Locations

function SetLocation(tipo, index, lat, lng) {
    var location = GetLocation(tipo, index);

    location.Latitud = lat;
    location.Longitud = lng;

    RemoveLocation(tipo, index);

    var listaLocations = JSON.parse(localStorage.getItem("listaLocations"));
    listaLocations.push(location);
    localStorage.setItem("listaLocations", JSON.stringify(listaLocations));
}

function SetLocationIndex(tipo, index) {
    localStorage.setItem("tipo", tipo);
    localStorage.setItem("index", index);

    var listaLocations = JSON.parse(localStorage.getItem("listaLocations"));

    var location = GetLocation(tipo, index);
    if (location == null) {
        location = {
            Index: index,
            Tipo: tipo,
            Latitud: '',
            Longitud: ''
        }
        listaLocations.push(location);
        localStorage.setItem("listaLocations", JSON.stringify(listaLocations));
    }
    document.getElementById('iframe_map').contentWindow.location.reload(true);
    return true
}

function GetLocation(tipo, index) {
    var listaLocations = JSON.parse(localStorage.getItem("listaLocations"));

    for (var i = 0; i < listaLocations.length; i++) {
        if (listaLocations[i].Tipo == tipo && listaLocations[i].Index == index) {
            return listaLocations[i];
        }
    }
    return null;
}

function RemoveLocation(tipo, index) {
    var listaLocations = JSON.parse(localStorage.getItem("listaLocations"));
    var listaLocationsAux = [];

    for (var i = 0; i < listaLocations.length; i++) {
        if (listaLocations[i].Tipo != tipo || listaLocations[i].Index != index) {
            listaLocationsAux.push(listaLocations[i]);
        }
    }

    localStorage.setItem("listaLocations", JSON.stringify(listaLocationsAux));
}