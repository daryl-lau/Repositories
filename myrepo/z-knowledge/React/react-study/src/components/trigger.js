import React from 'react';
import ReactDOM from 'react-dom';
import Trigger from 'rc-trigger';

// const container = document.getElementById('trigger')

// ReactDOM.render((
//     <Trigger
//       action={['click']}
//       popup={<span>popup</span>}
//       popupAlign={{
//         points: ['tl', 'bl'],
//         offset: [0, 3]
//       }}
//     >
//       <a href='#'>hover</a>
//     </Trigger>
//   ), container);
const RcTrigger = ()=>{
    return (
        <Trigger
      action={['click']}
      popup={<span>popup</span>}
      popupAlign={{
        points: ['tl', 'bl'],
        offset: [0, 3]
      }}
    >
      <a href='#'>hover</a>
    </Trigger>
    )
}
export default RcTrigger