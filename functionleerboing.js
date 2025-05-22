function leerBoing() {
    // Referencia por pseudoclase
    var nom = document.forms["formularioBoing"].elements[0].value;
    // Referencia por ID
    var cant = document.getElementById("cantidad").value;
    // Referencia por TagName
    var prod = document.getElementsByTagName("select")[0].value;
    var pago = document.getElementsByName("pago");
    var metodo = "";
    for (var i = 0; i < pago.length; i++) {
      if (pago[i].checked)
        metodo = pago[i].value;
    }

    var aceptar = document.getElementById("acepto").checked;
    document.getElementById("resultado").innerHTML =
      "<br>Tu nombre: " + nom +
      "<br>Producto seleccionado: " + prod +
      "<br>Cantidad: " + cant +
      "<br>Método de pago: " + metodo +
      "<br>Aceptó términos: " + aceptar;
  }