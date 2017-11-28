// Configurer le module de route
let express = require('express');
let router = express.Router();

// Importer la class mysql
    // let mysql = require('mysql');
    // Configurer la connexion à la BDD MySql
    // const mysqlConfig = {
    //     host     : 'localhost',
    //     port     : '8889',
    //     user     : 'root',
    //     password : 'root',
    //     database : 'MEANblog'
    // };

// Importer MongoDB
let mongodb = require('mongodb');
let ObjectId = mongodb.ObjectId;
let MongoClient = mongodb.MongoClient;
let mongodbUrl = 'mongodb://localhost:27017/blog';

    // Définir  les routes de l'API
router.get('/posts', (req, res) => {
   
    // Ouvrir la connexion à la base MongoDB
    MongoClient.connect(mongodbUrl, (err, db) => {

        // tester la connexion
        if(err) { res.send(err) }
        else{
            
            // Récupération de la collection
            db.collection('posts').find().toArray( (err, posts) => {
                // Tester la commande
                if(err) { res.send(err) }
                else{
                    // Envoyer la collection dans la vue
                    res.send(posts)
                }
            } )
        }

        // Fermer la connexion
        db.close();
    })
});

// Configurer une route dynamique
router.get('/post/:post_id', (req, res, next) => {
    const post_id = req.params.post_id

    // Ouvrir la connexion à la base MongoDB
    MongoClient.connect(mongodbUrl, (err, db) => {
        
        // tester la connexion
        if(err) { res.send(err) }
        else{
            
            // Récupération de la collection
            db.collection('posts').find( { _id: new ObjectId(post_id) }).toArray((err, uniqPost) => {
                // Tester la commande
                if(err) { res.send(err) }
                else{
                    console.log(uniqPost)

                    // Envoyer la collection dans la vue
                    res.send(uniqPost)
                }
            } )
        }

        // Fermer la connexion
        db.close();
    })
});

router.post('/post/add', (req, res) => {

    console.log(req.body)
    // Ouvrir la connexion à la base MongoDB
    MongoClient.connect(mongodbUrl, (err, db) => {
        
        // tester la connexion
        if(err) { res.send(err) }
        else{
            
            // Récupération de la collection
            db.collection('posts').insert(req.body, (err, newPost) => {
                // Tester la commande
                if(err) { res.send(err) }
                else{
                    console.log(newPost)

                    // Envoyer la collection dans la vue
                    res.send(newPost)
                }
            } )
        }

        // Fermer la connexion
        db.close();
    })

})

// Exporter le module
module.exports = router;