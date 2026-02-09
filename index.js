const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 8080;

// =====================
// MIDDLEWARES
// =====================
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// DATOS EN MEMORIA
// =====================
let productos = [
  { id: 1, nombre: 'producto1', precio: 25 },
  { id: 2, nombre: 'producto2', precio: 15 }
];

// =====================
// RUTAS CRUD
// =====================

// GET → obtener todos los productos
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// GET → obtener producto por id
app.get('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(producto);
});

// POST → crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const nuevoProducto = {
    id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
    nombre,
    precio
  };

  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// PUT → actualizar un producto existente
app.put('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio } = req.body;

  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  if (nombre !== undefined) producto.nombre = nombre;
  if (precio !== undefined) producto.precio = precio;

  res.json(producto);
});

// DELETE → eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const productoEliminado = productos.splice(index, 1);
  res.json(productoEliminado[0]);
});

// =====================
// SERVIDOR
// =====================
app.listen(PORT, () => {
  console.log(`API REST ejecutándose en http://localhost:${PORT}`);
});
