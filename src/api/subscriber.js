/**
 * This module contains the code that subscribes to the Server-Side Events sent by the Studio Services for long-running
 * requests made by this client.
 */
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useStatusContext } from '~contexts/status';
import { useWorkspaceContext } from '~contexts/workspace';
import { useApplicationContext } from '~contexts/application';

export default function useServerSentEvents(baseUrl) {
  const {
    actions: { setWaiting }
  } = useStatusContext();

  const {
    actions: { mergeDeploymentResults }
  } = useWorkspaceContext();

  const appContext = useApplicationContext();

  function onDeploymentProgress(event) {
    const data = JSON.parse(event.data);
    setWaiting(true, data.message);
  }

  function onDeploymentSuccess(event) {
    const data = JSON.parse(event.data);
    setWaiting(false, data.message);
    mergeDeploymentResults(data.results);
    appContext.actions.mergeDeploymentResults(data.results);
  }

  function onDeploymentFailure(event) {
    const data = JSON.parse(event.data);
    setWaiting(false, data.message + ': ' + data.details);
  }

  function addEventListeners(source) {
    source.addEventListener('deployment:progress', onDeploymentProgress);
    source.addEventListener('deployment:success', onDeploymentSuccess);
    source.addEventListener('deployment:failure', onDeploymentFailure);
  }

  function removeEventListeners(source) {
    source.removeEventListener('deployment:progress', onDeploymentProgress);
    source.removeEventListener('deployment:success', onDeploymentSuccess);
    source.removeEventListener('deployment:failure', onDeploymentFailure);
  }

  const ref = useRef(null);

  // This effect will continually update our listeners on our source depending on the state of the application
  useEffect(
    function() {
      if (ref.current !== null) {
        addEventListeners(ref.current);
      }
      return function() {
        if (ref.current !== null) {
          removeEventListeners(ref.current);
        }
      };
    },
    [addEventListeners, removeEventListeners]
  );

  // This effect initializes our event source
  useEffect(
    function() {
      async function subscribe() {
        // We subscribe first so that we can get the session information (in case we don't already have it)
        await axios.get(baseUrl + '/subscribe', { withCredentials: true });

        // Once we have the session information we can start listening for events
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
        if (ref.current) {
          removeEventListeners(ref.current);
          ref.current.close();
          ref.current = null;
        }
      };
    },
    [ref]
  );
}

export function ServerSentEventListener({ baseUrl, children }) {
  useServerSentEvents(baseUrl);
  return children;
}
