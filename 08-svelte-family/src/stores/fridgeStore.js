import { writable } from 'svelte/store';

// custom store
function createFridge() {
  const defaultMessage = {
    name: '',
    message: 'Write your message on the fridge'
  };

  const { set, update, subscribe } = writable([defaultMessage]);  

  return {
    set,
    update,
    subscribe,
    wipe: () => set([ defaultMessage ])
  }
}

export const fridgeMessages = createFridge();

//default store
// export const fridgeMessages = writable([
//   {
//     name: '',
//     message: 'Write your messages on the fridge'
//   }
// ]);
