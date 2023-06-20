const mongoose = require('mongoose');

const Schema = mongoose.Schema

const clientSchema = new Schema({
 
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: { type:Date,require:false, default:new Date()}

}

)

module.exports =mongoose.models.clientModel || mongoose.model('clientModel', clientSchema)