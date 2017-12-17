const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Crear el Schema
const saleSchema = new Schema({
    saleNumber: {
      type: String,
      required: true,
      unique: true
    },name: {
        type : String,
        required: false
    },buyPriceF: {
        type : String,
        required: false,
        default: '0'
    },buyPriceL: {
        type : String,
        required: false,
        default: '0'
    },buyPriceT: {
        type : String,
        required: false,
        default: '0'
    },salePrice: {
      type: String,
      required: false
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });


saleSchema.virtual('profit').get(function () {
    let profit = parseFloat(this.salePrice.replace(",", ".")) - parseFloat(this.buyPriceF.replace(",", "."))- parseFloat(this.buyPriceL.replace(",", ".")) - parseFloat(this.buyPriceT.replace(",", ".")); //calcula el profit restando del precio de venta los precios de compra
    
    return profit.toFixed(2);
});

// Crear el Modelo basado en el Schema
const Sale = mongoose.model('sale', saleSchema);

//Exportar el Modelo
module.exports = Sale;