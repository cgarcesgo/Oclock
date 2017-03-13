//Cargar perfil
function CargarPerfil() {
    var perfil = JSON.parse(localStorage.getItem("User"));
    $("#nombres").val(perfil.Nombre);
    $("#apellidos").val(perfil.Apellido);
    $("#nit").val(perfil.Nit);
    $("#email").val(perfil.Email);
    $("#celular").val(perfil.Celular);
    $("#usuario").val(perfil.User);
}