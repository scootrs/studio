/**
 * This module contains the code that subscribes to the Server-Side Events sent by the Studio Services for long-running
 * requests made by this client.
 */
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useStatusContext } from '~contexts/status';

export default function useServerSentEvents(baseUrl) {
  const {
    actions: { setWaiting }
  } = useStatusContext();

  function onDeployProgress(event) {
    const data = JSON.parse(event.data);
    setWaiting(true, data.message);
  }

  function onDeployDone(event) {
    const data = JSON.parse(event.data);
    setWaiting(false, data.message);
    console.log(data);
  }

  function onDeployError(event) {
    const data = JSON.parse(event.data);
    setWaiting(false, data.message);
    console.error(data);
  }

  function addEventListeners(source) {
    source.addEventListener('deploy:progress', onDeployProgress);
    source.addEventListener('deploy:done', onDeployDone);
    source.addEventListener('deploy:error', onDeployError);
  }

  function removeEventListeners(source) {
    source.removeEventListener('deploy:progress', onDeployProgress);
    source.removeEventListener('deploy:done', onDeployDone);
    source.removeEventListener('deploy:error', onDeployError);
  }

  const ref = useRef(null);

  // This effect will continually update our listeners on our source depending on the state of the application
  useEffect(
    function() {
      if (ref.current !== null) {
        addEventListeners(ref.current);
      }
      return function() {
        removeEventListeners(ref.current);
      };
    },
    [addEventListeners, removeEventListeners]
  );

  // This effect initializes our event source
  useEffect(
    function() {
      async function subscribe() {
        await axios.get(baseUrl + '/subscribe', { withCredentials: true });
        ref.current = new EventSource(baseUrl + '/listen', { withCredentials: true });
      }
      if (ref.current === null) {
        subscribe().then(function() {
          // Note that we don't include this function reference in our memoized values for this hook. This is because
          // we only want this hook to run once at the beginning, but having a reference to add the event listeners
          // reduces code duplication and won't result in a usable stale value after the update, since this hook is
          // only called once at the beginning of the application lifecycle.
          addEventListeners(ref.current);
        });
      }
      return function() {
        ref.current.close();
        ref.current = null;
      };
    },
    [ref]
  );
}

export function ServerSentEventListener({ baseUrl, children }) {
  useServerSentEvents(baseUrl);
  return children;
}
