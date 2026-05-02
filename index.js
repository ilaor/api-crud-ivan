'use strict'

const config = require('./config')
const express = require('express')
const logger = require('morgan')
const mongojs = require('mongojs')
const cors = require('cors')
const helmet = require('helmet')

const fs = require('fs')
const https = require('https')

const AuthMiddleware = require('./middlewares/auth.middleware')

const app = express()
const port = config.PORT

// =====================
// SEGURIDAD
// =====================
app.use(helmet())
app.use(cors())

// =====================
// CONEXIÓN A MONGODB
// =====================
const db = mongojs(config.DB)
const ObjectId = mongojs.ObjectId

// =====================
// MIDDLEWARES
// =====================
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// =====================
// MIDDLEWARE DINÁMICO
// =====================
app.param("coleccion", (req, res, next, coleccion) => {
    req.collection = db.collection(coleccion)
    return next()
})

// =====================
// RUTAS (TODAS PROTEGIDAS)
// =====================

// GET /api → listar colecciones
app.get('/api', AuthMiddleware.auth, (req, res, next) => {
    db.getCollectionNames((err, colecciones) => {
        if (err) return next(err)
        res.json(colecciones)
    })
})

// GET /api/:coleccion → listar documentos
app.get('/api/:coleccion', AuthMiddleware.auth,(req, res, next) => {
    req.collection.find((err, documentos) => {
        if (err) return next(err)
        res.json(documentos)
    })
})

// GET por ID
app.get('/api/:coleccion/:id', AuthMiddleware.auth, (req, res, next) => {
    const elementoId = req.params.id

    if (elementoId.length !== 24) {
        return res.status(400).json({ error: "ID no válido" })
    }

    req.collection.findOne(
        { _id: ObjectId(elementoId) },
        (err, documento) => {
            if (err) return next(err)
            if (!documento) return res.status(404).json({ error: "No encontrado" })
            res.json(documento)
        }
    )
})

// POST
app.post('/api/:coleccion', AuthMiddleware.auth, (req, res, next) => {
    const documento = req.body

    req.collection.save(documento, (err, guardado) => {
        if (err) return next(err)
        res.status(201).json(guardado)
    })
})

// PUT
app.put('/api/:coleccion/:id', AuthMiddleware.auth, (req, res, next) => {
    const elementoId = req.params.id

    if (elementoId.length !== 24) {
        return res.status(400).json({ error: "ID no válido" })
    }

    req.collection.update(
        { _id: ObjectId(elementoId) },
        { $set: req.body },
        { safe: true, multi: false },
        (err, resultado) => {
            if (err) return next(err)
            res.json(resultado)
        }
    )
})

// DELETE
app.delete('/api/:coleccion/:id', AuthMiddleware.auth, (req, res, next) => {
    const elementoId = req.params.id

    if (elementoId.length !== 24) {
        return res.status(400).json({ error: "ID no válido" })
    }

    req.collection.remove(
        { _id: ObjectId(elementoId) },
        (err, resultado) => {
            if (err) return next(err)
            res.json(resultado)
        }
    )
})

// =====================
// SERVIDOR HTTPS
// =====================

https.createServer({
   cert: fs.readFileSync('./cert/cert.pem'),
    key: fs.readFileSync('./cert/key.pem')
}, app).listen(port, () => {
   console.log(`API CRUD segura en https://localhost:${port}/api`)
})
// app.listen(port, () => {
//   console.log(`API REST en http://localhost:${port}`)
// });