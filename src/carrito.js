import Swal from 'sweetalert2'


const listaProductos = document.querySelector('#lista-carrito tbody')
const listaCompra = document.querySelector('#lista-compra')
const encabezado = document.getElementById('productos-agregados')
let cantidadArticulos = 0
const contadorDeCarrito = document.querySelector('#carrito-contador')
let contadorCarrito = 0

//*  Me permite añadir un producto al carrito
export function comprarProducto(e){
  e.preventDefault()  
  
  if(e.target.classList.contains('agregar-carrito')){
    const producto = e.target.parentElement.parentElement
    leerDatosProducto(producto)
    contadorCarrito ++
    contadorDeCarrito.innerHTML = contadorCarrito
    contadorDeCarrito.style.display = 'inline-block'
  }

}

//*  Leer datos del producto
function leerDatosProducto(producto){
  const infoProducto = {
    imagen: producto.querySelector('img').src,
    titulo: producto.querySelector('.titulo-producto').textContent,
    anio: producto.querySelector('.anio-producto').textContent,
    formato: producto.querySelector('.formato-producto').textContent,
    precio: producto.querySelector('.precio-producto').textContent,
    id: producto.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }
  let productosLS
  productosLS = obtenerProductosLocalStorage()
  
  productosLS.forEach(function(productoLS){
    if(productoLS.id === infoProducto.id){
      productosLS = productoLS.id;
    }
  })
  
  if(productosLS === infoProducto.id){

    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Este producto ya se encuentra en el carrito !',
    })

  } else{
    insertarCarrito(infoProducto)
  }
}




//*  Comprobar que hay elementos en el LS
function obtenerProductosLocalStorage(){
  let productosLS

  //  Comprobar si hay algo en el LS
  if(localStorage.getItem('productos') === null){
    productosLS = []
  } 
  else{
    productosLS = JSON.parse(localStorage.getItem('productos'))
  }
  return productosLS
}


//* Muestra producto seleccionado en el carrito
function insertarCarrito(producto){
  const row = document.createElement('tr')   //  Agrego una fila en el dropdown del carrito
  row.innerHTML = `
    <td>
      <img src="${producto.imagen}" alt="${producto.titulo}" width="100">
    </td>
    <td>${producto.titulo}</td>
    <td>${producto.precio}</td>
    <td>
      <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
    </td>
  `

  listaProductos.appendChild(row)
  guardarProductosLocalStorage(producto)
}



// *    Almacenar en el LS
function guardarProductosLocalStorage(producto){
  let productos
  
  //* Toma valor de un array con datos del LS
  productos = obtenerProductosLocalStorage()
  
  //* Agrego producto al carrito
  productos.push(producto)
  
  //* Agregamos al LS
  localStorage.setItem('productos', JSON.stringify(productos))
}


export function leerLocalStorage() {
  let productosLS
  productosLS = obtenerProductosLocalStorage()
  productosLS.forEach(function (producto){
    const row = document.createElement('tr')
    row.innerHTML = `
    <td>
      <img src="${producto.imagen}" alt="${producto.titulo}" width="100">
    </td>
    <td>${producto.titulo}</td>
    <td>$${producto.precio}</td>
    <td>
      <a href="#" class="borrar-producto fas fa-times-circle text-danger" data-id="${producto.id}"></a>
    </td>
    `
    listaProductos.appendChild(row)
    })    
  }


//*   Eliminar el producto del carrito en el DOM
export function eliminarProducto(e){
  e.preventDefault()
  let producto, productoID
  if(e.target.classList.contains('borrar-producto')){
    producto = e.target.parentElement.parentElement
    productoID = producto.querySelector('a').getAttribute('data-id')
    producto.remove()

    eliminarProductoLocalStorage(productoID)
    contadorDeCarrito.innerHTML = contadorCarrito
    if (contadorCarrito === 0) {
      contadorDeCarrito.style.display = 'none'
    }
  }
}


//* Eliminar producto por ID del LS
function eliminarProductoLocalStorage(productoID){
  let productosLS

  //* Obtenemos el arreglo de productos
  productosLS = obtenerProductosLocalStorage()

  //* Comparamos el id del producto borrado con el LS
  productosLS.forEach(function(productoLS, i){
    if(productoLS.id === productoID){
      productosLS.splice(i, 1)
      contadorCarrito--
    }
  })

  // *   Añadimos el arreglo actual al LS
  localStorage.setItem('productos', JSON.stringify(productosLS))
}

export function vaciarCarrito(e){
  e.preventDefault()
  if(listaProductos.innerHTML === ''){
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'El carrito ya está vacío !',
    })
  }

  while(listaProductos.firstChild){
    listaProductos.removeChild(listaProductos.firstChild)
  }

  contadorDeCarrito.style.display = 'none'
  
  vaciarLocalStorage()
  return false

}

function vaciarLocalStorage(){
  window.localStorage.clear()
}


// *   Procesando el pedido
export function procesarPedido(e){
  e.preventDefault()

  let array = obtenerProductosLocalStorage()
  if(array.length === 0){
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'El carrito está vacío !',
    })
  } else{
    location.href="/pages/cart.html"
  }
}


/// Mostrar los productos guardados en el LS en la página de carrito.html
export function leerLocalStorageCompra() {
  let productosLS
  productosLS = obtenerProductosLocalStorage()
  productosLS.forEach(function (producto) {      
      const div = document.createElement('div')
      div.classList.add('row', 'p-3', 'mb-3')
      div.innerHTML = `
        <div class="col-3 mb-1">
          <!-- imagen -->
          <div class="bg-image rounded">
            <img class="w-100" src="${producto.imagen}" alt="${producto.titulo}">
          </div>
        </div>
        <div class="col-6 pt-1">
          <p class="mb-4"><strong>${producto.titulo}</strong></p>
          <p class="mt-4">Año</p>
          <p class="mt-4">Formato</p>
          <p class="mt-4">Precio</p>

          <a data-id=${producto.id} class="btn-sm me-1 mb-2 fs-4 borrar-producto-compra fa-solid fa-trash-can text-danger"></a>
        </div>

        <div class="col-3">
          <input 
            min="1"
            type="number" 
            class="form-control p-1 text-center cantidad" 
            placeholder="Cantidad" 
            value="${producto.cantidad}" >
          <p class="text-center mt-4">
            <strong>${producto.anio}</strong>
          </p>
          <p class="text-center mt-4">
            <strong>${producto.formato}</strong>
          </p>
          <p class="text-center mt-4 precio">
            $ <span class="precio-carrito">${Number(producto.precio) * producto.cantidad}</span>
          </p>
        </div>`
      listaCompra.appendChild(div)
      cantidadArticulos++

      modificarCantidadArticulos()
      
      encabezado.style.display = 'none';
  })
}

//* Elimina el producto del carrito.html
export const eliminarProductoCompra = (e) => {
  e.preventDefault()
  let productoID
  if ( e.target.classList.contains('borrar-producto-compra')  ) {
    e.target.parentElement.parentElement.remove()
    let producto = e.target.parentElement.parentElement
    productoID = producto.querySelector('a').getAttribute('data-id')

    cantidadArticulos--

    modificarCantidadArticulos()    

    if(cantidadArticulos === 0){
      encabezado.style.display = 'block';
    }    
  }
  eliminarProductoLocalStorage(productoID)
}

//* Cambio cantidad de artículos en encabezado y resumen de carrito.html
export function modificarCantidadArticulos () {
  let articulosEnCarrito = document.querySelector('#articulos')
  if(cantidadArticulos === 1){
    articulosEnCarrito.textContent = `Tu carrito - ${cantidadArticulos} artículo`
  } else{
    articulosEnCarrito.textContent = `Tu carrito - ${cantidadArticulos} artículos`
  }
}


// *  Obtener evento para detectar el cambio en el input de cantidad
export const obtenerEvento = (e) => {
  e.preventDefault()
  let id, cantidad, producto, precio, productosLS
  if(e.target.classList.contains('cantidad')){
    producto = e.target.parentElement.parentElement
    id = producto.querySelector('a').getAttribute('data-id')
    cantidad = producto.querySelector('input').value
    precio = producto.querySelector('.precio-carrito')
    productosLS = obtenerProductosLocalStorage()
    
    productosLS.forEach(function (productoLS){
      if(productoLS.id === id){
        productoLS.cantidad = cantidad
        let total = productoLS.cantidad * productoLS.precio
        precio.textContent = total.toFixed(2)
      }
    })
    localStorage.setItem('productos', JSON.stringify(productosLS))
    calcularTotal()
  }

}



// *   Calculo el total del carrito

export function calcularTotal(){
  let productosLS, totalProducto, total = 0, subtotal = 0, envio = 0
  productosLS = obtenerProductosLocalStorage()
  
  productosLS.forEach(productoLS => {
    totalProducto = Number(productoLS.cantidad * productoLS.precio)
    subtotal = subtotal + totalProducto    
  })


  envio = parseInt(subtotal * 0.10)
  total = parseInt(subtotal + envio)
  
  
  document.querySelector('#sub-total').textContent = '$' + subtotal
  document.querySelector('#envio').textContent = '$' + envio
  document.querySelector('#total').textContent = '$' + total
}