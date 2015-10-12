var  _ = require('lodash')
var Bus = require('roof-bus/lib/generator')

var busModule = {
  bus : null,
  init : function(){
    this.bus = new Bus
  },
  extend : function( module ){
    var root = this
    if( module.listen ){
      _.forEach(module.listen, function( listeners, event){
        //make it a array
        listeners = [].concat(listeners)
        listeners.forEach(function(listener){
          root.on( event, listener, module.name)
        })
      })
    }
  },
  on : function( event, listener, moduleName ){
    var root = this
    moduleName = moduleName || root.relier
    root.bus._module.set(moduleName )
    root.bus.on( event, listener)
  },
  /*
   注意，每个 request 都必须单独clone一个 bus，否则会串。
   所以，模块不提供 fire 功能
   */
  clone : function(){
    return this.bus.clone()
  }
}

module.exports = busModule
