let state: { [key: string]: any } = {};
type CallBack = () => void;
const listeners: { [key: string]: CallBack[] } = {};
export const pluginsStore = () => {
  const setPlugin = (partial: any, path: string) => {
    state = {
      ...state,
      ...partial,
    };

    let callbacks = listeners[path];
    if (callbacks) {
      for (let callback of callbacks) {
        callback();
      }
    }
  };

  const getAllPlugin = () => {
    return state;
  };

  const getPluginById = (id: string) => {
    const comp = state[id] || false;
    return comp;
  };

  function subscribe(id: string, listener: () => void) {
    if (!listeners[id]) {
      listeners[id] = [];
    }
    listeners[id].push(listener);
  }

  function unsubscribe(id: string, listener: () => void) {
    const index = listeners[id].indexOf(listener);
    listeners[id].splice(index, 1);
  }

  return {
    setPlugin,
    getAllPlugin,
    getPluginById,
    subscribe,
    unsubscribe,
  };
};
