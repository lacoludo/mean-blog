// Importer les composants pour créer un serveur
let express = require("express"); // Express permet de construire le serveur Node.js
let bodyParser = require("body-parser"); // Body-parser permet d'analyser les requêtes sur le serveur

// Importer le module de la route front
let front = require("./routes/front");

// Définir le port de l'application
let port = 8080;

// Initier le serveur
let app = express();

// Configurer le moteur de templating/rendu
app.set("view engine", "ejs");

// Définir le dossier à utiliser pour les vues (ejs)
// app.use(express.static("www"));

// Définir la route front
app.use("/", front);

// Lancer le serveur
app.listen(port, () => {
  console.log(`Le serveur est lancé sur le port ${port}`);
});
