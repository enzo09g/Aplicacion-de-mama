function descargarLocalStorageComoArchivo() {
    // Obtén los datos de localStorage
    const data = localStorage.getItem('lista');
  
    if (data) {
      // Crea un objeto Blob con los datos
      const blob = new Blob([data], { type: 'application/json' });
  
      // Crea un elemento <a> para el enlace de descarga
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'localStorageData.json'; // Nombre del archivo que se descargará
  
      // Simula un clic en el enlace para iniciar la descarga
      a.click();
    } else {
      console.error('No hay datos en localStorage para descargar.');
    }
  }
  
  // Llama a la función para descargar localStorage como archivo
  // descargarLocalStorageComoArchivo();
  
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  
  // Función para importar datos desde un archivo y almacenarlos en localStorage
  function importarLocalStorageDesdeArchivo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json'; // Acepta solo archivos JSON
  
    // Manejar el evento cuando se selecciona un archivo
    input.addEventListener('change', function () {
      const file = input.files[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onload = function (e) {
          try {
            const data = JSON.parse(e.target.result);
  
            // Almacenar los datos en localStorage
            localStorage.setItem('lista', JSON.stringify(data));
  
            console.log('Datos importados con éxito en localStorage.');
          } catch (error) {
            console.error('Error al importar datos:', error);
          }
        };
  
        reader.readAsText(file);
      }
    });
  
    // Hacer clic en el input para permitir al usuario seleccionar un archivo
    input.click();
  }
  
  // Llama a la función para importar datos desde un archivo
  // importarLocalStorageDesdeArchivo();
  