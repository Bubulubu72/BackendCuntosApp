
async function generateStoryAndImage() {
  const generateButton = document.getElementById('generateButton');

  // Verificar si el botón existe antes de continuar
  if (!generateButton) {
    console.error('No se encontró el botón con el ID "generateButton".');
    return;
  }

  // Desactivar el botón mientras se genera el cuento y la imagen
  generateButton.setAttribute('disabled', 'true');

  const age = document.getElementById('age').value;
  const topics = document.getElementById('topics').value;
  const genre = document.getElementById('genre').value;

  try {
    const response = await fetch('/generate-story-and-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ age, topics, genre }),
    });

    if (!response.ok) {
      console.error('Error al generar el cuento e imagen:', response.statusText);
      return;
    }

    const result = await response.json();
    
    let dataCuento = result.story.split(':')
    let temp = dataCuento[1].split('\n');

    let titulo = temp[0]
    let descripcion = dataCuento[2];

    titulo = eliminarCaracteresEspeciales(titulo);
    descripcion = eliminarCaracteresEspeciales(descripcion);

    // Mostrar el cuento y la imagen después de generarse
    document.getElementById('Ctitulo').innerHTML = `<p>${titulo}</p>`;
    document.getElementById('Cdescripcion').innerHTML = `<p>${descripcion}</p>`;
    document.getElementById('storyImage').src = result.imageUrl;


    // Mostrar el contenedor con el cuento e imagen
    document.getElementById('resultContainer').style.display = 'block';

    saveStory(titulo, descripcion, result.imageUrl, 'F3H0d1mGRIgJhSz6qLYqi')

  } catch (error) {
    console.error('Error en la solicitud:', error.message);
  } finally {
    // Habilitar el botón después de completar la generación
    generateButton.removeAttribute('disabled');
  }
}

function eliminarCaracteresEspeciales(cadena) {
  return cadena.replace(/[^\w\sáéíóúüñ.]/gi, '');
}


async function saveStory(titulo, descripcion, imagen, userId){

  let currentDate = new Date().toDateString();

  let cuento = {
    "title": titulo,
    "description": descripcion,
    "publicationDate": currentDate,
    "imageUrl": imagen,
    "uuidUser": userId
  }

  let response = await fetch('/api/Stories', {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(cuento)

  })
}
