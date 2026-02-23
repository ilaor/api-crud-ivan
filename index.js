'use strict'

const config = require('./config')
const express = require('express')
const logger = require('morgan')
const mongojs = require('mongojs')
const cors = require('cors')

const app = express()
const port = config.PORT

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
app.use(cors())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    res.header("Access-Control-Allow-Headers", "Content-Type, token")
    next()
})

// =====================
// AUTH MIDDLEWARE
// =====================
const auth = (req, res, next) => {
    if (!req.headers.token) {
        return res.status(401).json({
            result: 'KO',
            msg: "Envía un código válido en la cabecera 'token'"
        })
    }

    if (req.headers.token === config.TOKEN) {
        return next()
    } else {
        return res.status(401).json({
            result: 'KO',
            msg: "No autorizado"
        })
    }
}

// =====================
// MIDDLEWARE DINÁMICO
// =====================
app.param("coleccion", (req, res, next, coleccion) => {
    req.collection = db.collection(coleccion)
    return next()
})

// =====================
// RUTAS
// =====================

// GET /api → listar colecciones
app.get('/api', (req, res, next) => {
    db.getCollectionNames((err, colecciones) => {
        if (err) return next(err)
        res.json(colecciones)
    })
})

// GET /api/:coleccion → listar documentos
app.get('/api/:coleccion', (req, res, next) => {
    req.collection.find((err, documentos) => {
        if (err) return next(err)
        res.json(documentos)
    })
})

// GET por ID (con validación)
app.get('/api/:coleccion/:id', (req, res, next) => {
    const elementoId = req.params.id

    // Validación simple: longitud 24
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

// POST (PROTEGIDO)
app.post('/api/:coleccion', auth, (req, res, next) => {
    const documento = req.body

    req.collection.save(documento, (err, guardado) => {
        if (err) return next(err)
        res.status(201).json(guardado)
    })
})

// PUT (PROTEGIDO)
app.put('/api/:coleccion/:id', auth, (req, res, next) => {
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

// DELETE (PROTEGIDO)
app.delete('/api/:coleccion/:id', auth, (req, res, next) => {
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
// INICIAR SERVIDOR
// =====================
app.listen(port, () => {
    console.log(`API REST ejecutándose en http://localhost:${port}/api`)
})