import {useEffect} from 'react';

export default ({env, data}) => {
  return (
    <div style={{width: 400, height: 300}}>
      图表组件
      <DemoPie data={data.data}/>
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