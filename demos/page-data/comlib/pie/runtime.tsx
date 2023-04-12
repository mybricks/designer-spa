import {useEffect, useState} from 'react';

export default ({env, data, inputs}) => {
  const [ds, setDS] = useState(data.data)
  inputs['datasource'](ds => {//当数据到达
    setDS(ds)
  })
////Ajax
  return (
    <div style={{width: 400, height: 300}}>
      {data.title}
      <DemoPie data={ds}/>
    </div>
  )
}


const DemoPie = ({data}) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({percent}) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  const Pie = window.Plots.Pie

  return <Pie {...config} />;
};