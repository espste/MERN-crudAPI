import mongoose from 'mongoose'; 

const SuperHeroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    universe: {
        type: String,
        required: true
    },

    attack: {
        type: Number,
        required: true
    },

    defence: {
        type: Number,
        required: true
    },

    level: {
        type: Number,
        required: true
    },
});

const SuperHeroes = mongoose.model("heroes", SuperHeroSchema);

export default SuperHeroes;