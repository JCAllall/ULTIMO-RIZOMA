// Variables
const carrito = document.querySelector("#carrito");
const listaProductos = document.querySelector("#lista-productos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector(".vaciar-carrito");
let articulosCarrito = [];
let totalPagar = [];

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
    leerDatosProducto(producto);
  }
}

// Lee los datos del curso
function leerDatosProducto(producto) {
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    titulo: producto.querySelector("h3").textContent,
    precio: producto.querySelector(".precio span").textContent,
    id: producto.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe
  const existe = articulosCarrito.some(
    (producto) => producto.id === infoProducto.id
  );
  if (existe) {
    // Actualizamos la cantidad
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto; // retorna el objeto actualizado
      } else {
        return producto; // retorna un producto nuevo
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

// Elimina el producto del carrito en el DOM
function eliminarProducto(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-producto")) {
    // e.target.parentElement.parentElement.remove();
    const productoId = e.target.getAttribute("data-id");

    // Eliminar del arreglo del carrito
    articulosCarrito = articulosCarrito.filter(
      (producto) => producto.id !== productoId
    );

    carritoHTML();
  }
}

// Muestra el producto seleccionado en el Carrito
function carritoHTML() {
  vaciarCarrito();

  articulosCarrito.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>  
                 <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad} </td>
            <td>
                 <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
            </td>
       `;
    contenedorCarrito.appendChild(row);
  });
}

// Elimina los productos del carrito en el DOM
function vaciarCarrito() {
  // forma lenta
  // contenedorCarrito.innerHTML = '';

  // forma rapida (recomendada)
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
