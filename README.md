# zero-bus #


There is super event emitter class named `Bus` in zero core. This module will create  `bus` instance and attach it to every request instance. You can use it via `req.bus`.


## Usage ##

1. Add dependency to your module package.json file like:

```
{
	"name" : "YOUR_MODULE_NAME",
	"zero" : {
		"dependencies" : {
			"bus" : "^0.0.1"
		}
	}
}
```

2. Declare the event you want to listen in module.exports like:

```
module.exports = {
	listen : {
       'someEvent' : function eventHandler(/*arguments of fired event*/){

       }
    }
}
```

3. Or you can use it in router handler like(need declare dependency on module `request` first) :

```
module.exports = {
	route ： {
		anyRoute : function(req){
			req.bus.fire('someEvent', arg1, arg2)
		}
	}
}
```

## Advanced Usage ##

### specifying trigger order of listeners ###

Beside basic `on` and `fire` usage, bus has can specify the fire order of all listeners on certain event. For example:

```
bus.on({
	"event":'someEvent',
	"function":function handlerName(){},
	"module":"otherModule"
})

bus.on({
	"event":'someEvent',
	"function":function handler(){},
	"order":{before:"otherModule.handlerName"}, //this will make this handler triggered before the one above
	"module":"someModule"
})
```

### share data through bus ###

Use `bus.data()` to store and retrieve data.

```
bus.data('user',{id:1,name:'zero'}) //set data
bus.data('user') //retrieve data

bus.data('user.id',2) //this will set the user object's id to 2, instead of create a new piece of data.
```


### keep trace stack in right order ###

As you may know, bus can trace fire stack in debug mode, if you want to use it you need to know some basic rules:

 - if you fired another event synchronously(like in a promise) in your event handler, you need to return a promise container the fire code as result.
 - you can return `bus.error()` to tell bus stop immediately.
 - can return a promise and make the promise object attribute `block` to `true`, so bus will wait for this promise resolved and then call next listener.

