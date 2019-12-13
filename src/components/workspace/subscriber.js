/**
 * This module contains the code that subscribes to the Server-Side Events sent by the Studio Services for long-running
 * requests made by this client.
 */
import { useEffect } from 'react';

export default function useServerSideEvents(url) {
  useEffect(() => {
    const source = new EventSource(url);

    source.addEventListener('deploy:progress', data => {
      console.log(data);
    });

    source.addEventListener('deploy:done', data => {
      console.log(data);
    });

    console.log('Listening for events from ' + url);

    return () => {
      source.close();
    };
  }, []);
}
