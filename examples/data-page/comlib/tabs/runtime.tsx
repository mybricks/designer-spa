import {useEffect} from 'react';

export default ({env, data, slots}) => {
  return (
    <div style={{border: '1px solid red', width: 800, height: 330}}>
      容器的Demo
      <div style={{height: 300}}>
        {slots.container.render()}
      </div>
    </div>
  )
}