


//Crear un Map para gestionar el inventario de productos
const inventario = new Map();

//Función para agregar un producto al inventario
const agregarProducto = () => {
    //Obtener valores de los campos de entrada
    const nombre = document.getElementById('nombreProducto').value;
    const cantidad = Number(document.getElementById('cantidadProducto').value);
    const precio = Number(document.getElementById('precioProducto').value);

    //Comprobar si el producto ya está en el inventario
    if (inventario.has(nombre)) {
        //Actualizar la cantidad si el producto ya existe
        const productoExistente = inventario.get(nombre);
        productoExistente.cantidad += cantidad;
        inventario.set(nombre, productoExistente);
    } else {
        //Agregar un nuevo producto al inventario
        inventario.set(nombre, { cantidad, precio });
    }

    //Actualizar la tabla de inventario en la interfaz
    mostrarInventario();
}

//Función para mostrar el inventario en la tabla HTML
const mostrarInventario = () => {
    //Obtener referencia al cuerpo de la tabla
    const tablaInventario = document.getElementById('tablaInventario');
    tablaInventario.innerHTML = ''; //Limpiar la tabla

    //Iterar sobre los productos en el inventario y agregarlos a la tabla
    for (const [nombre, datos] of inventario) {
        const fila = `
            <tr>
                <td>${nombre}</td>
                <td>${datos.cantidad}</td>
                <td>${datos.precio}</td>
            </tr>
        `;
        tablaInventario.innerHTML += fila;
    }
}

//Crear un Set para rastrear productos únicos que han sido vendidos
const productosVendidos = new Set();

//Función para vender un producto
const venderProducto = (nombre) => {
    if (inventario.has(nombre)) {
        //Marcar producto como vendido
        productosVendidos.add(nombre);

        //Reducir la cantidad en el inventario
        const producto = inventario.get(nombre);
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
            inventario.set(nombre, producto);
        } else {
            inventario.delete(nombre); //Eliminar el producto si la cantidad llega a cero
        }

        //Mostrar actualización en la tabla de inventario
        mostrarInventario();
    }
}

//Función para mostrar los productos vendidos
const mostrarProductosVendidos = () => {
    //Mostrar productos vendidos en la consola
    console.log('Productos vendidos:', ...productosVendidos);
}
