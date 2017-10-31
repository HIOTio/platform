var mongoose = require('mongoose')
var Schema = mongoose.Schema

var DeviceSchema = new Schema({
    deviceId: {
      type: String,
      required: true,
      uppercase: true
    },
    devicePath:String,
    deployment: {
      type: Schema.Types.ObjectId,
      ref: 'Deployment'
    },
    description: String,
    name: String,
    compatibility:{
      type:String,
      enum:['HIOT_Node','HIOT_Other','MQTT_Only'],
      default:'MQTT_Only'
    },
    active: Boolean,
    added: Date,
    make: {
      type: Schema.Types.ObjectId,
      ref: 'DeviceMake'
    },
    model: {
      type: Schema.Types.ObjectId,
      ref: 'DeviceModel'
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location'
    },
    brokers:[{
      type: Schema.Types.ObjectId,
      ref: 'Broker'
    }],
    aggregators:[{
      type: Schema.Types.ObjectId,
      ref: 'Aggregator'
    }],
    sensors:[{
      type:Schema.Types.ObjectId,
      ref:'Sensor'
    }],
    controllers:[{
      type:Schema.Types.ObjectId,
      ref:'Controller'
    }],
    coordinator:{
      "m2mMqttServer" : String,
      "m2mMqttport" : Number
    },
    mqttBrokers:[{
      mqttServerIP: String,
      mqttServerPort:String,
      priority:Number
    }],
    moscaEnabled:Boolean,
    moscaPort:Number
  })
DeviceSchema
	.virtual('url')
	.get(function () {
  return '/api/device/' + this._id
})

// Compile model from schema
module.exports = mongoose.model('Device', DeviceSchema)
