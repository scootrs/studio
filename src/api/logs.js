/**
 * This module contains the code that subscribes to the Server-Side Events sent by the Studio Services for long-running
 * requests made by this client.
 */
import { useEffect } from 'react';

export function useLogEvents(baseUrl, computeName, ref, setState) {
  function onLogEntry(event) {
    const data = JSON.parse(event.data);
    setState(function(prev) {
      return {
        ...prev,
        logs: {
          isFetching: false,
          isError: false,
          value: prev.logs.isError ? '' : prev.logs.value + data.message,
          message: 'Log stream connected. Polling every 1000ms.'
        }
      };
    });
  }

  function addEventListeners(source) {
    source.addEventListener('logs:entry', onLogEntry);
  }

  function removeEventListeners(source) {
    source.removeEventListener('logs:entry', onLogEntry);
  }

  // This effect initializes our event source
  useEffect(() => {
    if (ref.current === null) {
      const source = new EventSource(baseUrl + '/logs/' + computeName, { withCredentials: true });

      source.onerror = function(ev) {
        setState(function(prev) {
          return {
            ...prev,
            logs: {
              isFetching: false,
              isError: true,
              value: prev.logs.value,
              message: 'Failed to fetch logs. Could not connect.'
            }
          };
        });
      };

      ref.current = source;
    }
    addEventListeners(ref.current);
    return () => {
      if (ref.current) {
        removeEventListeners(ref.current);
      }
    };
  }, [ref, addEventListeners, removeEventListeners]);

  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.close();
        ref.current = null;
      }
    };
  }, [ref]);
}
