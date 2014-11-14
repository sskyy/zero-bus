var path= require('path'),
  Bus = require( path.join(process.cwd(),'system/core/bus')),
  _ = require('lodash')

/**
 * 为所有其他模块提供 bus 服务。参见 Bus。
 * @module bus
 */
module.exports = {
  bus : null,
  listeners : {},
  config : {
    longStackTraces: false,
    log : {
      "Console" : {
        level : 'debug'
      }
    }
  },
  init : function(){
    this.bus = new Bus( this.config)
  },
  expand : function( module ){
    var root = this
    if( module.listen ){
      _.forEach(module.listen, function( listener, event){
        root.on( event, listener, module.name)
      })
    }
  },
  on : function( event, listener, moduleName ){
    var root = this
    root.bus.module(moduleName || root.relier)
    root.bus.on( event, listener)

    if( !root.listeners[event] ) root.listeners[event] = []

    root.listeners[event].push( {
      module : moduleName || root.relier,
      listener : listener.name || "anonymous"
    })

  }
}
