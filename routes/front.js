// Importer et configurer les composants de la route
let express = require('express');
let router = express.Router();

// Importer le service
let newsFeed = require('../services/news.service')

// Configurer la route => localhost:8080/
router.get('/', (req, res) => {

    // lancer le fonction du service
    newsFeed.getAll(data => {
        // Envoyer le tableau data dans la réponse du serveur
        
        res.render('index', { 
            title: 'Hello MEAN from route',
            userName: 'Julien Noyer',
            collection: data
         });
    })    
});

// Créer une route pour afficher un post unique
router.get('/post/:id', (req, res) => {

    const post_id = req.params.id

    console.log('front.js', post_id)

    newsFeed.getUniqPost( post_id, (data) => {
        res.render('post', {
            post: data[0]
        });
    });
});

// Créer une route pour afficher un post unique
router.get('/add', (req, res) => {
    
    res.render('addPost')

});
    

// Exporter le route
module.exports = router;