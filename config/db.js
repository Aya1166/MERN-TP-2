const mongose = require("mongoose");

async function connectDB(uri) {
    if (!uri) {
        throw new Error("L'URI MongoDB est manquant dans les variables d'environnement(.env).");
    } ;
    await mongose.connect(uri, {
        autoIndex: true 
    }) ;
    console.log('connexion a MongoDB Atlas reussie avec succes !') ;
}

module.exports = connectDB ; 