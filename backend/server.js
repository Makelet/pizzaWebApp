import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import CartModel from './models/Cart.js'
import DishesModel from './models/Dishes.js';

dotenv.config();
const app = express()
const port = 3000;

app.use(express.json());
app.use(cors());

let URI = process.env.MONGODB_URI;
await mongoose.connect(URI);



app.get('/getallcarts', async (req, res) => {

    await CartModel.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        })

})
app.delete('/delete/:id', async (req, res) => {

    let { id } = req.params;

    // console.log(typeof +id);
    let demo = +id;

    await CartModel.deleteOne({ id: demo })
        .then((result) => {
            res.json(result);
            console.log(result);
        })
        .catch((err) => {
            res.json(err);
        })

})
// app.put('/inc', async (req, res) => {

//     let { id } = req.body;

//     console.log(req.body);

//     await CartModel.findByIdAndUpdate({ _id: id },
//         {
//             $set:{

//             }
//         }
//     )
//         .then((result) => {
//             res.json(result);
//             console.log(result);
//         })
//         .catch((err) => {
//             res.json(err);
//         })

// })

app.post('/updateqty', async (req, res) => {
    try {
        // console.log(req.body);
        const { id, qty } = req.body;
        let cartItem = await CartModel.findOne({ id });

        if (cartItem) {
            cartItem.qty = qty;
            await cartItem.save();
            res.status(200).json(cartItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/addcart', async (req, res) => {

    console.log(req.body);

    let { id, name, price, img, qty } = req.body;

    let exisitingItem = await CartModel.findOne({ id });

    console.log("exisitingItem--------------------");
    console.log(exisitingItem);

    if (exisitingItem) {

        await CartModel.findOneAndUpdate({ id: id }, {
            $set:
            {
                qty: exisitingItem.qty + 1,
                totalPirce: exisitingItem.price * (exisitingItem.qty + 1)
            }
        })
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.json(err);
            })
    }
    else {

        await CartModel.create({
            id,
            name,
            price,
            qty,
            img,
            totalPirce: price * qty,
        })
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.json(err);
            })

    }



})

app.get('/all', async (req, res) => {

    await DishesModel.find({}).sort("id")
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        })


})

app.get('/lunch', async (req, res) => {

    await DishesModel.find({ category: 'Lunch' })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        })


})

app.get('/dinner', async (req, res) => {

    await DishesModel.find({ category: 'Dinner' })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        })


})
app.get('/breakfast', async (req, res) => {

    await DishesModel.find({ category: 'Breakfast' })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        })


})
app.get('/snacks', async (req, res) => {

    await DishesModel.find({ category: 'Snacks' })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        })
})

app.get('/find', async (req, res) => {

    let { name } = req.query;
    console.log(name);

    let queryObj = {};
    if (name) {
        queryObj.name = { $regex: name, $options: "i" }
    }


    await DishesModel.find(queryObj)
        .then((result) => {
            console.log(result);
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        })
})
app.put('/like', async (req, res) => {
    let { dbId } = req.body;
    // console.log(dbId);
    // await DishesModel.findByIdAndUpdate({ _id: dbId }, [{ $set: { isLike: { $not: "$isLike" } } }])
    await DishesModel.findByIdAndUpdate({ _id: dbId }, [{ $set: { isLike: { $eq: [false, "$isLike"] } } }])
        .then((result) => {
            res.json(result)
            console.log(result);
        })
        .catch((err) => {
            res.json(err)
        })

})





app.listen(port, () => console.log(`Example app listening on port ${port}!`))