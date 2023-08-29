// Variables
const carrito = document.querySelector("#carrito");
const listaProductos = document.querySelector("#lista-productos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
  // Dispara cuando se presiona "Agregar Carrito"
  listaProductos.addEventListener("click", agregarProducto);

  // Cuando se elimina un curso del carrito
  carrito.addEventListener("click", eliminarProducto);

  // Al Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

// Funciones
// Función que añade el curso al carrito
function agregarProducto(e) {
  e.preventDefault();
  // Delegation para agregar-carrito
  if (e.target.classList.contains("btn-agregar")) {
    const producto = e.target.parentElement.parentElement;
    // Enviamos el curso seleccionado para tomar sus datos
    leerDatosProductos(producto);
  }
}

// Lee los datos del curso
function leerDatosProducto(producto) {
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    titulo: producto.querySelector("h4").textContent,
    precio: producto.querySelector(".precio span").textContent,
    id: producto.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  if (articulosCarrito.some((producto) => producto.id === infoProducto.id)) {
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto;
      } else {
        return producto;
      }
    });
    articulosCarrito = [...productos];
  } else {
    articulosCarrito = [...articulosCarrito, infoProducto];
  }

  // console.log(articulosCarrito)

  // console.log(articulosCarrito)
  carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarProducto(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-producto")) {
    // e.target.parentElement.parentElement.remove();
    const productoId = e.target.getAttribute("data-id");

    // Eliminar del arreglo del carrito
    articulosCarrito = articulosCarrito.filter(
      (producto) => producto.id !== producto
    );

    carritoHTML();
  }
}

// Muestra el curso seleccionado en el Carrito
function carritoHTML() {
  vaciarCarrito();

  articulosCarrito.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
    contenedorCarrito.appendChild(row);
  });
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
  // forma lenta
  // contenedorCarrito.innerHTML = '';

  // forma rapida (recomendada)
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
