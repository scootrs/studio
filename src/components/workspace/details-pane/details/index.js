import React from 'react';
import DetailsView from './view';

export default function Details({ details }) {
  return <DetailsView details={details} />;
}

// Example of configuration details
//
//
// const details = {
//   // The name/id to be applied to the resource. The title is editable (like in Google Docs)
//   title: {
//     value: '',
//     onChange: null
//   },
//   // The type of object visible in the configuration
//   type: '',
//   // The tabs to display.
//   tabs: [
//     {
//       // The title of the tab (the part the user will click on).
//       title: '',
//       // Rendering information. The developer may specify either `component` or `sections`, but not both. If they
//       // specify both, the `component` will be rendered and a warning will be printed to the console. The `component`
//       // is a React component or component function. `sections` is an array of data used to construct a pane with
//       // several input options
//       component: null,
//       sections: [
//         {
//           title: '',
//           // Same as tabs. We can optional render a predefined component for a specific section.
//           component: null,
//           inputs: [
//             {
//               // Valid input types: `text`, `number`, `select`, `radio`, `checkbox`
//               type: '',
//               label: '',
//               name: '',
//               value: '',
//               onChange: null,
//               // For `select`, `radio`, and `checkbox` inputs
//               options: [
//                 {
//                   name: '',
//                   value: ''
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]
// };
