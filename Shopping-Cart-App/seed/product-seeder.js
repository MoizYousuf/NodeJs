var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping', { useNewUrlParser: true });

var games = [
    new Product({
        imagepath: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png',
        title: 'Gta 5 video game',
        description: 'This is most popular videogame',
        price: 75
    }), new Product({
        imagepath: 'https://upload.wikimedia.org/wikipedia/en/b/b0/Watch_Dogs_2.jpg',
        title: 'Watch Dogs 2 video game',
        description: 'This is most popular videogame',
        price: 45
    }), new Product({
        imagepath: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Spider-Man_PS4_cover.jpg',
        title: 'Marvel Spiderman video game',
        description: 'This is most popular videogame',
        price: 65
    }), new Product({
        imagepath: 'https://upload.wikimedia.org/wikipedia/en/6/64/Need_for_Speed_Payback_standard_edition_cover_art.jpg',
        title: 'Need For Speed PayBack video game',
        description: 'This is most popular videogame',
        price: 20
    }), new Product({
        imagepath: 'https://upload.wikimedia.org/wikipedia/en/1/18/Far_Cry_Primal_cover_art.jpg',
        title: 'Far Cry Primal video game',
        description: 'This is most popular videogame',
        price: 31
    }), new Product({
        imagepath: 'https://upload.wikimedia.org/wikipedia/en/6/65/Mirror%27s_Edge_Catalyst.jpg',
        title: 'Mirrors Edge Catalyst video game',
        description: 'This is most popular videogame',
        price: 59
    })]

var count = 0;
console.log(games.length, "run")
for (var i = 0; i < games.length; i++) {
    games[i].save((err, result) => {
        count++
        if (count === games.length) {
            exit();
        }
    });
}
function exit() {
    mongoose.disconnect();
}