import { Chart } from 'react-google-charts';
import React, { useContext, } from 'react';
import { Context } from "./Store"

function LineChart() {
  const [state] = useContext(Context);

  return (
    <div style={{ marginTop: 100 }}>
      <h3> Below is a breakdown of your posture during this session</h3>
      <Chart
        width={1920}
        height={1080}
        chartType="ColumnChart"
        loader={<p>Loading Chart</p>}
        data={[
          ['', 'Number of Posture Hits'],
          ['Head Tilt', state.HeadTilt],
          ['Resting head on arms', state.HeadOH],
          ['Reclined Back', state.RecliningBack],
          ['Hunching', state.Hunching],
        ]}
        options={{
          title: 'Your personal posture analyzed',
          titleTextStyle: { color: '#FFF' },
          chartArea: { width: '30%' },
          backgroundColor: 'transparent',
          hAxis: {
            color: '#FFF', 
            minValue: 0,
            textStyle: { color: '#FFF' },
          },
          legend: { textStyle: { color: '#FFF' } }
        }}
        legendToggle
      />
    </ div>
  );
}
export default LineChart;