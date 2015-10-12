# zero-bus #

This module  use `roof-bus` to create a global system event bus. Modules relying on this module can simply declare a `event-listener` map to handler logic events.

## Usage ##

### 1. Add dependency to your module package.json file like:

```
{
	"name" : "YOUR_MODULE_NAME",
	"zero" : {
		"dependencies" : {
			"bus" : "~0.2.0"
		}
	}
}
```

### 2. Declare the event you want to listen in module.exports like:

```
module.exports = {
	listen : {
       'someEvent' : function eventHandler(/*arguments of fired event*/){

       }
    }
}
```
Generator Function can also be use as listener.


## Advanced Usage ##

### Ordering Listeners ###

Fire order of listeners on the same event can be specified with `order` attribute like:

```
bus.on({
	"event":'someEvent',
	"function":function handlerName(){},
	"module":"otherModule"
})

bus.on({
	"event":'someEvent',
	"function":function handler(){},
	"order":{
		before:"otherModule.handlerName" //make this handler triggered before the one above
	},
	"module":"someModule"
})
```

### sharing data through bus ###

You can use `bus.data.set()` to store and `bus.data.get()` to retrieve data.

```
bus.data.set('user',{id:1,name:'zero'}) //set data
bus.data.get('user') //retrieve data

//advanced usage
bus.data.set('user.id',2) //this will set the id of the object named `user` to 2, instead of creating a new piece of data named 'user.id'.
```

For more usage, please check [http://github.com/sskyy/roof-bus](http://github.com/sskyy/roof-bus)
