const express = require('express');
const { MongoClient } = require('mongodb')
const router = express.Router();
const mongo = require('mongodb').MongoClient;
require('dotenv').config();
const bases = process.env.MONGO_URI;
const nombreBase = "FarmaciaCampusDB"

router.get('/medicamentos', async (req, res) =>{
    try {
        res.json("Somos CL")
    } catch (e){
        res.json("Estoy mal :(")
    }
})

// Obtener todos los medicamentos con menos de 50 unidades de stck
router.get('/ejercicio1', async (req, res) =>{
    try {
        const client = new MongoClient(bases)
        await client.connect();
        const db = client.db('FarmaciaCampusDB');
        const collection = db.collection('medicamentos');

        const result = await collection.find({"stock":{"$lt":50}}).toArray();
        res.json(result)
        client.close();
    } catch (error) {
        res.status(404).json("No se encontro el dato")
    }
})

// Listar los proveedores con su información de contacto en medicamentos.
router.get('/ejercicio2', async (req, res) =>{
    try {
        const client = new MongoClient(bases)
        await client.connect();
        const db = client.db('FarmaciaCampusDB');
        const collection = db.collection('medicamentos');

        const result = await collection.distinct("proveedor")
        res.json(result)
        client.close();
    } catch (error) {
        res.status(404).json("No se encontro el dato")
    }
})

// Medicamentos comprados al ‘Proveedor A’.
router.get('/ejercicio3', async (req, res) =>{
    try {
        const client = new MongoClient(bases)
        await client.connect();
        const db = client.db('FarmaciaCampusDB');
        const collection = db.collection('medicamentos');

        const result = await collection.find({"proveedor.nombre":"ProveedorA"}).toArray();
        res.json(result)
        client.close();
    } catch (error) {
        res.status(404).json("No se encontro el dato")
    }
})

// Total de ventas del medicamento ‘Paracetamol’.
router.get('/ejercicio5', async (req, res) =>{
    try {
        const client = new MongoClient(bases)
        await client.connect();
        const db = client.db('FarmaciaCampusDB');
        const collection = db.collection('ventas');

        const result = await collection.find({"medicamentosVendidos.nombreMedicamento":"Paracetamol"}).toArray();
        res.json(result)
        client.close();
    } catch (error) {
        res.status(404).json("No se encontro el dato")
    }
})

// Medicamentos que caducan antes del 1 de enero de 2024.
router.get('/ejercicio6', async (req, res) =>{
    try {
        const client = new MongoClient(bases)
        await client.connect();
        const db = client.db('FarmaciaCampusDB');
        const collection = db.collection('medicamentos');

        const result = await collection.find({"fechaExpiracion":{"$lt": ISODate("2024-04-21T00:00:00Z")}}).toArray();
        res.json(result)
        client.close();
    } catch (error) {
        res.status(404).json("No se encontro el dato")
    }
})

// Total de medicamentos vendidos por cada proveedor.
router.get('/ejercicio7', async (req, res) =>{
    try {
        const client = new MongoClient(bases)
        await client.connect();
        const db = client.db('FarmaciaCampusDB');
        const collection = db.collection('ventas');

        const result = await collection.find({"medicamentosVendidos":{}}).toArray();
        res.json(result)
        client.close();
    } catch (error) {
        res.status(404).json("No se encontro el dato")
    }
})

module.exports = router;