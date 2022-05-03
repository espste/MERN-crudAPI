import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
//Models
import SuperHeroModel from './models/Superheroes.js';

const app = express();
const URI = process.env.MONGO_URI
const PORT = process.env.PORT

app.use(express.json());
app.use(cors());
app.use(helmet());

mongoose.connect(URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

//post route
app.post('/insert', async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const universe = req.body.universe;
    const attack = req.body.attack;
    const defence = req.body.defence;
    const level = req.body.level;

    const hero = new SuperHeroModel({id: id, name: name, universe: universe, attack: attack, defence: defence, level: level})

    try {
        await hero.save();
        res.send("Data Inserted Successfully")
    } catch(error) {
        console.log(error);
    }
});

//get route
app.get('/read', async (req, res) => {
    SuperHeroModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } 
        res.send(result);
    });    
});

//update route
app.put('/update', async (req, res) => {
    const newHeroName = req.body.newHeroName;
    const id = req.body.id;
   
    try {
        await SuperHeroModel.findById(id, (err, renameHero) => {
            renameHero.name = newHeroName;
            renameHero.save();
            res.send("update");
        }).clone()
    } catch(error) {
        console.log(error);
    }
});

//delete route
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    
    await SuperHeroModel.findByIdAndRemove(id).exec();
    res.send('deleted');
});

//server running on port 3001
app.listen(PORT, () => {
    console.log(`Server is runnning on PORT: ${PORT}`)
});