function CerrarSesion() {
    localStorage.setItem("UserId", null);
    localStorage.setItem("User", JSON.stringify(null));
    window.location.replace("../../index.html");
}