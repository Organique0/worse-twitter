import mitt from 'mitt';

const emitter = mitt();

export default function useUseEmitter() {
  return {
    $on: emitter.on,
    $emit: emitter.emit,
  }
}
