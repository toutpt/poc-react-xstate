import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import { Machine, assign, send } from 'xstate';
 
const fetchMachine = Machine({
  id: 'fetch',
  initial: 'none',
  context: {
    promise: null,
  },
  states: {
    none: {
      on: {
        FETCH: {
          target: 'loading',
          actions: 'dofetch'
        },
      },
    },
    loading: {
      invoke: {
        id: 'doFetch',
        src: (context, event) => fetch(event.url).then(response => response.json()),
        onDone: {
          target: 'success',
          actions: assign({ data: (context, event) => {
            console.log(event, context);
            return event.data
          }})
        },
        onError: {
          target: 'failure',
          actions: assign({ error: (context, event) => {
            console.log(context, event);
            return event.data;
          }})
        }
      }
    },
    cancelled: {
      on: { FETCH: 'loading' }
    },
    failure: {
      on: { FETCH: 'loading' }
    },
    success: {
      on: { FETCH: 'loading' }
    },
  }
}, {
    actions: {
      dofetch: (context, event) => {
        console.log('#### dofetch', context, event);
        context.promise = fetch(event.url).then((response) => {
          assign({
            response
          });
          return 
        });
      }
    },
});
 
export const Fetch = (props) => {
  const [current, send] = useMachine(fetchMachine, {devTools: true});
  useEffect(() => {
    console.log('Fetch.useEffect, init');
    if (current.value === 'none' && current.context.url !== props.url) {
      console.log('Fetch.useEffect, value === none');
      send('FETCH', { url: props.url });
    }
      // trigger the fetch on didMount effect
      // fetch(props.url).then((response) => {
      //   console.log('Fetch.useEffect, fetch response,', response);
      //   if (response.ok) {
      //     if (response.status < 400) {
      //       console.log('Fetch.useEffect, return response.json');
      //       return response.json();
      //     }
      //   }
      // }).then((response) => {
      //   console.log('Fetch.useEffect, send LOADED');
      //   send('LOADED');
      //   setContent(response);
      // }

      // ).catch((error) => {
      //   console.error('Fetch.useEffect, ERROR', error);
      //   send('ERROR');
      //   setContent(error);
      // });
    // }
  }, [props.url, send, current.value, current.context.url]);
  return (
    <div>
      <p>Current status: {current.value} </p>
  {current.value === 'failure' && <p>Error: {current.context.error.message}</p>}
      
    </div>
  );
};