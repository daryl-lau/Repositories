import { EventEmitter } from 'events'
const Bus = new EventEmitter()

Bus.addListener('changeData', (msg) => {
  console.log(msg);
})

Bus.emit('changeData', 'message')