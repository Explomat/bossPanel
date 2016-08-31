import React, { Component, PropTypes } from 'react';
import {ButtonTab, ButtonTabs} from './modules/button-tabs';
import {Pie} from 'react-chartjs';

class ChartBlock extends Component {

  getTotalFromCharts(chartData){
    return chartData.map(ch => Number(ch.value))
                    .reduce((first, second) => (first + second));
  }

  getMarkupFromCharts(chartData){
    return chartData.map((ch, index) => {
      return <div key={index}>{ch.label}: {ch.value}</div>
    })
  }

  render() {
    const {title, chartData} = this.props;
    const options = {
      customTooltips: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart - Custom Tooltips'
      },
      tooltips: {
        enabled: true,
        titleFontColor: '#000'
      }
    }
    return (
      <div className="chart-block">
        <div className="chart-block__title">{title}</div>
        <ButtonTabs className="chart-block__buttons">
          <ButtonTab onClick={this.props.onSelectPeriod} payload='month' value='Месяц' selected={true}></ButtonTab>
          <ButtonTab onClick={this.props.onSelectPeriod} payload='quarter' value='Квартал'></ButtonTab>
          <ButtonTab onClick={this.props.onSelectPeriod} payload='year' value='Год'></ButtonTab>
        </ButtonTabs>
        <Pie data={chartData} options={options} width='150' height='150'/>
        <div className="chart-block__description">
          <div>Всего: {this.getTotalFromCharts(chartData)}</div>
          {this.getMarkupFromCharts(chartData)}
        </div>
      </div>
    )
  }
}

ChartBlock.propTypes = {
  title: PropTypes.string,
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      color: PropTypes.string.isRequired,
      highlight: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onSelectPeriod: PropTypes.func
}

export default ChartBlock;
