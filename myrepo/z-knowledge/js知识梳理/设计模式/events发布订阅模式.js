const EventEmitter = require('events').EventEmitter

const emitter = new EventEmitter()


emitter.addListener('event1', function (msg) {
  console.log(msg);
})

emitter.on('event2', function (msg) {
  console.log(msg);
})

emitter.once('event3', function (msg) {
  console.log(msg);
})


emitter.emit('event1', 'message1')
emitter.emit('event2', 'message2')

console.log(emitter.getMaxListeners());

setInterval(() => { emitter.emit('event1', 'message1') }, 1000)
setInterval(() => { emitter.emit('event3', 'message3') }, 1000)
