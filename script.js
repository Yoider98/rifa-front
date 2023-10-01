const spinner = document.getElementById('spinner');
const text = document.getElementById('text');
const tabla = document.getElementById('tabla');

// Mostrar el spinner mientras se cargan los datos
spinner.style.display = 'block';
text.style.display = 'block';
tabla.style.display = 'none';



fetch('https://rifa-back1.onrender.com/datos')
            .then(response => response.json())
            .then(data => {
              spinner.style.display = 'none';
              text.style.display = 'none'; 
                if (Array.isArray(data.data)) {
                    let filaActual = 0;
                    let columnaActual = 0;
                    tabla.style.display = 'table';
                    data.data.forEach(item => {
                        if (columnaActual >= 10) {
                            filaActual++;
                            columnaActual = 0;
                        }

                        // Crea una nueva fila si es la primera columna de la fila
                        if (columnaActual === 0) {
                            const newRow = tabla.insertRow();
                        }
                        
                        const cell = tabla.rows[filaActual].insertCell(columnaActual);
                        // Crea una nueva celda para cada dato
                        if (typeof item[1] === 'number' && item[1] >= 0 && item[1] <= 9) {
                          // Agregar un "0" delante del número
                          cell.innerHTML = `0${item[1]}<br>${item[2]}`;
                        } else {
                          // De lo contrario, mostrar el número sin cambios
                          cell.innerHTML = `${item[1]}<br> ${item[2]}`;
                        }
                        if(item[3] === "Disponible"){
                          cell.style.backgroundColor = "rgb(227, 223, 143)";
                        }else{
                          cell.style.backgroundColor = "rgb(143, 222, 227)";
                        }

                        columnaActual++;
                        
                    });
                } else {
                    console.error('Los datos recibidos no son un JSON válida:', data.data);
                }
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });