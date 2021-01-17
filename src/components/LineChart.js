import { Chart } from 'react-google-charts';

import React, { useState, Component, } from 'react';
// data={[
//   ['', 'Number of Posture Hits'],
//   ['Head Tilt', localStorage.getItem('Headtilt') || 0 ],
//   ['Resting head on arms',localStorage.getItem('Armrest') || 0],
//   ['Reclined', localStorage.getItem('Reclining Back') || 0],
//   ['Hunching',localStorage.getItem('Hunching')|| 0],
// ]}

function LineChart(props) {

    console.log(props)
return (
    <div style={{marginTop:200}}>
    <Chart
    width={1920}
    height={1080}
    chartType="ColumnChart"
    loader={<p>Loading Chart</p>}
    data={[
      ['', 'Number of Posture Hits'],
      ['Head Tilt', props.headTilt],
      ['Resting head on arms', props.HeadOH ],
      ['Reclined', props.back],
      ['Hunching',props.hunching],
    ]}
    options={{
      title: 'Your personal posture analyzed',
      titleTextStyle: { color: '#FFF'},
      chartArea: { width: '30%' },
      backgroundColor: 'transparent',
      hAxis: {
        title: '# of Warnings',
        color: '#00FFFF',
        minValue: 0,
        textStyle:{color: '#FFF'},
      },
      vAxis: {
        title: 'Poor Posture State',
        textStyle:{color: '#FFF'},
      },
      legend: {textStyle: {color: '#FFF'}}
    }}
    legendToggle
  />
  </ div>

        );
    }


export default LineChart;