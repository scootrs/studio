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
        logs: prev.logs + data.message,
        isFetchingLogs: false
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
      ref.current = new EventSource(baseUrl + '/logs/' + computeName, { withCredentials: true });
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
