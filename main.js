//  1) Importar Librerías
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'animate.css'

//  Archivos de Proyecto

import './css/style.css' 
import { 
  calcularTotal,
  comprarProducto,
  eliminarProducto,
  eliminarProductoCompra,
  leerLocalStorage,
  leerLocalStorageCompra,
  obtenerEvento,
  procesarPedido,
  vaciarCarrito
} from './src/carrito'


// *   Variables globales que necesito
const productos = document.getElementById('lista-productos')
const carrito = document.getElementById('carrito')
const carritoCompras = document.getElementById('lista-compra')
const btnSwitch = document.getElementById('switch')


cargarEventos()

function cargarEventos(){

  const ruta = String(location.href)
  if (ruta.includes('cart.html')){
    esCarrito()
  } else if (ruta.includes('nosotros.html')) {
    esNosotrosOContacto()
  } else if (ruta.includes('contacto.html')) {
    esNosotrosOContacto()    
  } else{
    esIndex()
  }

}

function esIndex(){
  const vaciarCarritoBtn = document.getElementById('vaciar-carrito')
  const procesarPedidoBtn = document.getElementById('procesar-pedido')

  //* Se ejecuta cuando presiono botón 'Agregar al carrito'
  productos.addEventListener('click', e => comprarProducto(e))

  //* Al cargar el documento se muestra lo almacenado en el LS
  document.addEventListener('DOMContentLoaded', leerLocalStorage())
  procesarPedido
  //* Cuando se elimina un producto del carrito
  carrito.addEventListener('click', e => eliminarProducto(e))

  // *  Vaciar carrito
  vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))

  // *  Enviar pedido a otra página
  procesarPedidoBtn.addEventListener('click', e => procesarPedido(e))
}

function esNosotrosOContacto(){
  const vaciarCarritoBtn = document.getElementById('vaciar-carrito')
  const procesarPedidoBtn = document.getElementById('procesar-pedido')

  //* Al cargar el documento se muestra lo almacenado en el LS
  document.addEventListener('DOMContentLoaded', leerLocalStorage())
  procesarPedido
  //* Cuando se elimina un producto del carrito
  carrito.addEventListener('click', e => eliminarProducto(e))

  // *  Vaciar carrito
  vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))

  // *  Enviar pedido a otra página
  procesarPedidoBtn.addEventListener('click', e => procesarPedido(e))
}

function esCarrito(){
  // *  Leo el LS
  document.addEventListener('DOMContentLoaded', leerLocalStorageCompra())

  carritoCompras.addEventListener('click', e => eliminarProductoCompra(e))

  calcularTotal()

  carritoCompras.addEventListener('change', e => obtenerEvento(e))
  carritoCompras.addEventListener('keyup', e => obtenerEvento(e))
}


// *  Activar modo oscuro

btnSwitch.addEventListener('click', () =>{
  document.body.classList.toggle('dark');
  btnSwitch.classList.toggle('active');
});

ScrollReveal().reveal('.card',
  {delay: 300,
  duration: 1000,
  distance: '100px',
  origin: 'top',
  reset: true
});