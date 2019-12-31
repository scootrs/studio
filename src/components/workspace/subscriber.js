/**
 * This module contains the code that subscribes to the Server-Side Events sent by the Studio Services for long-running
 * requests made by this client.
 */
import { useEffect, useRef } from 'react';

export default function useServerSentEvents(url) {
  const sourceRef = useServerSideEventSource(url);
  const source = sourceRef.current;

  // This effect merely coses our EventSource when the component is destroyed
  useEffect(() => () => {
    return () => {
      source.close();
      sourceRef.current = null;
    };
  });

  // This effect will continually update our listeners on our source depending on the state of the application
  useEffect(() => {
    source.addEventListener('deploy:progress', data => {
      console.log(data);
    });

    source.addEventListener('deploy:done', data => {
      console.log(data);
    });

    console.log('Listening for events from ' + url);

    return () => {
      source.close();
      sourceRef.current = null;
    };
  }, []);
}

function useServerSideEventSource(url) {
  const sourceRef = useRef(null);
  if (sourceRef.current === null) {
    sourceRef.current = new EventSource(url);
  }
  return sourceRef;
}

export const ServerSentEventListener = ({ url, children }) => {
  useServerSentEvents(url);
  return children;
};
