const mongoose = require('mongoose');
const url = "mongodb+srv://mongodb-stitch-eventcheck-zhudi:testeconteminas@teste-7iadk.mongodb.net/test?retryWrites=true"

mongoose.connect(url,{useNewUrlParser: true})
.then(db => console.log('Mongo conectado'))
.catch(err => console.log("erro BD: ",err));


module.exports = mongoose;