const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const SalesController = require('../controllers/sales.controller');

//TRAE TODAS LAS VENTAS
router.get('/', SalesController.getAllSales);

//Crea una nueva venta
router.post('/', [
    sanitize('saleNumber').trim(),
    check('saleNumber').not().isEmpty().withMessage('El campo numero es requerido'),
    check('saleNumber').isLength({ min: 3, max: 50 }).withMessage('El campo numero de venta debe tener de 3 a 50 caracteres')
], SalesController.createSale);

//Actualiza venta
router.put('/:id', [
    param('id').isMongoId().withMessage('No es un ID de una Venta válida'),
    sanitize('name').trim(),
    check('name').isLength({ min: 3, max: 50 }).withMessage('El campo Nombre debe tener de 3 a 50 caracteres')
 ], SalesController.editSale);

 //Elimina una venta
router.delete('/:id', [
    param('id').isMongoId().withMessage('No es un ID de una venta válida')
], SalesController.deleteSale);


module.exports = router;