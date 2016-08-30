import React, { Component, PropTypes } from 'react';
import {ButtonTab, ButtonTabs} from './modules/button-tabs';
import {Pie} from 'react-chartjs';

const chartData = [
  {
      value: 5,
      color:"#F7464A",
      highlight: "#FF5A5E",
      label: "Игнор"
  },
  {
      value: 2,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: "Хорошо"
  },
  {
      value: 3,
      color: "#FDB45C",
      highlight: "#FFC870",
      label: "Плохо"
  }
]

class Test extends Component {

  render() {
    return (
      <div>
        <ButtonTabs>
          <ButtonTab payload={0} value={'Месяц'} selected={true}></ButtonTab>
          <ButtonTab payload={1} value={'Квартал'}></ButtonTab>
          <ButtonTab payload={2} value={'Год'}></ButtonTab>
        </ButtonTabs>
        <Pie data={chartData} width='150' height='150'/>
        <div>
          <div>Всего: 10</div>
          <div>Игнор: 5</div>
          <div>Хорошо: 2</div>
          <div>Плохо: 3</div>
        </div>
      </div>
    )
  }
}

export default Test;
