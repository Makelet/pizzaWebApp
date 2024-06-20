import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    id: Number,
    img: String,
    name: String,
    price: Number,
    qty: Number,
    totalPirce:Number
})


const CartModel = mongoose.model('cart', cartSchema);

export default CartModel;