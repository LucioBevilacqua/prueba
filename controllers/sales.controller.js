const { check, validationResult } = require('express-validator/check');

const Sale = require('../models/sale.model');

module.exports = {
  /* ==============
    Get All Sales
  ============== */
  getAllSales: async (req, res, next) => {
    // Todos los datos de la coleccion
    await Sale.find((err, sales) => {
      if (err) {
        return res.status(500).json({ success: false, msg: err });
      }

      res.status(200).json({ success: true, sales: sales });
    });    
  },

  /* ================
    Get a Sale by Id
  ================ */
  getSaleById: async (req, res, next) => {

    // Validar si hay errores en el Id q se pasa por parametro
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.mapped() });
    }

    // Parametros
    const id = await req.params.id;

    // Buscar team
    await Team.findById(id, (err, team) => {
      if (err) {
        return res.status(500).json({ success: false, msg: err });
      }

      if (!team) {
        return res.status(404).json({ success: false, msg: 'No se ha encontrado Equipo con ese ID' });
      }

      res.status(200).json({ success: true, team: team });
    });
  },

  /* =================
    Create a New Sale
  ================= */
  createSale: async (req, res, next) => {

    // Validar si hay errores en los datos del body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.mapped() });
    }

    // Datos del body    
    const { saleNumber, salePrice, name, buyPriceF, buyPriceL, buyPriceT } = await req.body;    

    // Validar que la venta no exista
    const sameNumberSale = await Sale.findOne({ saleNumber: saleNumber });
    if (sameNumberSale) {
      return res.status(403).json({ success: false, msg: 'La venta ya existe' });
    }

    // Crear nueva venta con los datos del body
    const newSale = new Sale({
      saleNumber: saleNumber,
      name : name,
      salePrice: salePrice,
      buyPriceF: buyPriceF,
      buyPriceL: buyPriceL,
      buyPriceT: buyPriceT
    });

    // Persistencia de la nueva venta
    await newSale.save();

    // Success response (si todo va bien)
    res.status(201).json({ success: true, msg: 'Venta creada', sale: newSale });
  },

  /* ==============
    Update a Sale
  ============== */
  editSale: async (req, res, next) => {

    // Validar si hay errores en los datos del body y param
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.mapped() });
    }

    // Parametros
    const id = await req.params.id;

    // Datos del body
    const updatedName = await req.body.name;
    const updatedNumber = await req.body.saleNumber;
    const updatedsalePrice = await req.body.salePrice;
   

    // Validar que el numero de venta no exista si es que se esta intentando actualizar (si se paso en el body)
    if (updatedNumber){
      const sameNumberSale = await Sale.findOne({ saleNumber: updatedNumber });
      if (sameNumberSale) {
        return res.status(403).json({ success: false, msg: 'Ya existe otra venta con ese numero' });
      }
    }

    // Crear nueva venta con los datos del body
    const updatedSale = new Sale({
      name: updatedName,
      saleNumber: updatedNumber,
      salePrice: updatedsalePrice,
      _id: id
    });

    // Encontrar y actualizar
    await Sale.findByIdAndUpdate(id,{
      $set: {
        name: updatedName,
        saleNumber: updatedNumber,
        salePrice: updatedsalePrice
      }
    }, { new: true }, (err, sale) => {
      if (err) {
        return res.status(500).json({ success: false, msg: err });

      }
      if (!sale) {
        return res.status(404).json({ success: false, msg: 'No se ha encontrado una Venta con ese ID' });
      }    

      res.status(200).json({ success: true, msg: 'Venta actualizada', sale: sale });
    });
  },

  /* ==============
    Delete a Sale
  ============== */
  deleteSale: async (req, res, next) => {

    // Validar si hay errores en el Id q se pasa por parametro
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.mapped() });
    }

    // Parametros
    const id = await req.params.id;

    // Encontrar y eliminar
    await Sale.findByIdAndRemove(id, (err, sale) => {
      if (err) {
        return res.status(500).json({ success: false, msg: err });
      }

      if (!sale) {
        return res.status(404).json({ success: false, msg: 'No se ha encontrado una venta con ese ID' });
      }

      res.status(200).json({ success: true, msg: 'Venta eliminada', sale: sale });
    });
  }

}