// Constructeur
function NewsModel(id, type, title, content) {
  this.id = id;
  this.type = type;
  this.title = title;
  this.content = content;
}

// Exporter le Constructeur
module.exports = NewsModel;
