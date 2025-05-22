// Función para actualizar los valores mostrados de los sliders
function actualizarValor(input) {
  const valorSpan = document.getElementById(input.id + '-valor');
  valorSpan.textContent = input.value;
}

// Función para calcular la puntuación promedio
function calcularPuntuacion() {
  // Validar formulario
  const form = document.forms["formularioEncuesta"];
  if (!form.checkValidity()) {
    alert("Por favor complete todos los campos requeridos.");
    return;
  }

  // Obtener valores de los sliders
  const sabor = parseInt(document.getElementById("sabor").value);
  const calidad = parseInt(document.getElementById("calidad").value);
  const presentacion = parseInt(document.getElementById("presentacion").value);
  const precio = parseInt(document.getElementById("precio").value);

  // Calcular promedio
  const promedio = (sabor + calidad + presentacion + precio) / 4;
  
  // Mostrar resultados
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = `
    <h3>Resumen de tu evaluación:</h3>
    <p><strong>Sabor:</strong> ${sabor}/5</p>
    <p><strong>Calidad:</strong> ${calidad}/5</p>
    <p><strong>Presentación:</strong> ${presentacion}/5</p>
    <p><strong>Relación calidad-precio:</strong> ${precio}/5</p>
    <p><strong>Puntuación promedio:</strong> ${promedio.toFixed(1)}/5</p>
    ${promedio >= 4 ? 
      '<p style="color:green;">¡Gracias por tu excelente evaluación!</p>' : 
      promedio >= 3 ? 
      '<p style="color:orange;">Apreciamos tus comentarios. Trabajaremos para mejorar.</p>' : 
      '<p style="color:red;">Lamentamos que tu experiencia no haya sido satisfactoria. Nos pondremos en contacto contigo.</p>'}
  `;
}

// Función para generar el PDF
function generarPDF() {
  // Verificar que se haya calculado la puntuación primero
  if (!document.getElementById("resultados").innerHTML) {
    alert("Por favor calcule la puntuación primero.");
    return;
  }

  // Verificar que jsPDF esté cargado
  if (typeof jsPDF === 'undefined') {
    alert("Error: La biblioteca para generar PDF no está cargada correctamente.");
    return;
  }

  try {
    // Crear instancia de jsPDF
    const doc = new jsPDF();
    
    // Configuración básica del PDF
    doc.setFont("helvetica");
    doc.setFontSize(12);
    
    // Título
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text("Comprobante de Encuesta", 105, 20, { align: 'center' });
    doc.text("Jugos Boing", 105, 28, { align: 'center' });
    
    // Línea separadora
    doc.setDrawColor(231, 76, 60); // Color rojo Boing
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    
    // Datos del usuario
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Nombre: ${document.getElementById("nombre").value}`, 20, 45);
    doc.text(`Email: ${document.getElementById("email").value}`, 20, 55);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 65);
    
    // Resultados
    doc.setFontSize(14);
    doc.text("Resultados de la encuesta:", 20, 80);
    doc.setFontSize(12);
    
    const resultados = document.querySelectorAll("#resultados p");
    let yPos = 90;
    resultados.forEach((res, index) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(res.textContent, 20, yPos);
      yPos += 10;
    });
    
    // Firma
    doc.setFontSize(10);
    doc.text("Gracias por participar", 105, 280, { align: 'center' });
    
    // Generar el PDF y mostrarlo en el iframe
    const pdfData = doc.output('datauristring');
    const iframe = document.getElementById('pdf-embed');
    iframe.src = pdfData;
    
  } catch (error) {
    console.error("Error al generar PDF:", error);
    alert("Ocurrió un error al generar el PDF. Por favor intente nuevamente.");
  }
}