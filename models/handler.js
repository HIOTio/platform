var mongoose = require('mongoose')
var Schema= mongoose.Schema


var HandlerSchema = new Schema({
    name:String,
    aggregator:Boolean,
    controller:Boolean,
    broker:Boolean,
    coordinator:Boolean,
    sensor:Boolean,
    description: String,
    deployment:{
        type: Schema.Types.ObjectId,
        ref:'deployment'
    },
    commands: [{
        type:Schema.Types.ObjectId,
        ref:'Controller_command'
    }]
})
  HandlerSchema
      .virtual('url')
      .get(function () {
    return '/api/handler/' + this._id
  })
  HandlerSchema
  .virtual('path')
  .get(function () {
return this._id
})
  
  // Compile model from schema
  module.exports = mongoose.model('Handler', HandlerSchema)
  