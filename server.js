const express = require("express");
const dotenv = require("dotenv") ;
const connectDB = require("./config/db") ;

const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

dotenv.config() ;
// Middleware pour lire les donnees JSON
app.use(express.json());

// Monter les routeurs
app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI) ;

    app.listen(PORT, () => {
      console.log(`serveur MERN en ecoute sur http://localhost:${PORT}`) ;
    }) ;
  } catch (err) {
    console.error("erreur critique de demerrage du serveur : ", err.message) ;
    process.exit(1) ;
  }
}
) () ;
