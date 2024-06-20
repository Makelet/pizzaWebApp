import mongoose from 'mongoose'

const dishesSchema = new mongoose.Schema({
    id: Number,
    img: String,
    name: String,
    price: Number,
    desc: String,
    category: String,
    rating: Number,
    isLike: Boolean
})


const DishesModel = mongoose.model('all_dishes', dishesSchema);

export default DishesModel;