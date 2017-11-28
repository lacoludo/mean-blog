// Configurer l'objet 
let request = require('xhr-request')

// Importer le constructeur
let NewsModel = require('../models/news.model')

// Fonction de traitement des appels XHR
const fetchJSON = (path, callback) => {
    let httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState === 4){
            if(httpRequest.status === 200){
                let data = JSON.parse(httpRequest.responseText);
                if(callback) callback(data);
            };
        };
    };
    httpRequest.open(`GET`, `./api/${path}`);
    httpRequest.send();
}



// Créer 3 objets
let myImage = new NewsModel(1, 'IMG', 'Sport','http://lorempixel.com/400/200/sports')
let myQuote = new NewsModel(2, 'QUOTE', 'Lorem ipsum dolor ismet', '')
let myVideo = new NewsModel(3, 'VID', 'The Gladiators', 'P8BKRCpVoug')

// Création d'une collection de données
let newsFeedCollection = [ myImage, myQuote, myVideo];

/*
Définition du service
Le service est une classe qui contient des méthodes
*/
    class NewsFeed {
        // Afficher la collection de données
        static getAll(callBack){
            // Envoyer les données de la collection dans la vue
            // callBack(newsFeedCollection);

            // Requête sur la BDD
            request('http://localhost:8080/api/posts', { json: true }, (err, data) => {
                if (err) throw err
                // Envoyer les données dans la vue 
                callBack(data);
            })
        }

        // Afficher un article spécifique
        static getUniqPost(id, callBack){
            console.log('news.serv.js', id)
            request(`http://localhost:8080/api/post/${id}`, { json: true }, (err, data) => {
                if (err) throw err
                // Envoyer les données dans la vue 
                if(data.length > 0) {
                    callBack(data)
                } else{
                    callBack([{id: 0, type: '', title: '', content: ''}])
                }
            })
        }
    }
// 

/*
Exporter le service
*/
    module.exports = NewsFeed
//