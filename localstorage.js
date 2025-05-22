function iniciar() {
  const boton = document.getElementById('guardar');
  boton.addEventListener('click', nuevoitem, false);
  mostrar();
}

function nuevoitem() {
  const nombre = document.getElementById('clave').value.trim();
  const comentario = document.getElementById('texto').value.trim();
  const opinion = document.querySelector('input[name="opinion"]:checked');

  if (nombre === '' || comentario === '' || !opinion) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const datos = {
    comentario: comentario,
    opinion: opinion.value
  };

  // Guardar como JSON
  localStorage.setItem(nombre, JSON.stringify(datos));

  // Limpiar formulario
  document.getElementById('clave').value = '';
  document.getElementById('texto').value = '';
  document.querySelector('input[name="opinion"]:checked').checked = false;

  mostrar();
}

function mostrar() {
  const caja = document.getElementById('caja');
  caja.innerHTML = '';

  let hayComentarios = false;

  for (let i = 0; i < localStorage.length; i++) {
    const nombre = localStorage.key(i);
    try {
      const datos = JSON.parse(localStorage.getItem(nombre));
      if (datos && datos.comentario && datos.opinion) {
        caja.innerHTML += `
          <div class="comentario">
            <strong>${nombre}</strong><br>
            Comentario: ${datos.comentario}<br>
            ¿Le pareció adecuada la página?: ${datos.opinion}
            <hr>
          </div>
        `;
        hayComentarios = true;
      }
    } catch (e) {
      // Si no es un JSON válido, se ignora
      continue;
    }
  }

  if (!hayComentarios) {
    caja.innerHTML = 'No hay información disponible';
  }
}

window.addEventListener('load', iniciar, false);