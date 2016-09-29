import React, { Component, PropTypes } from 'react';
import {ButtonTab, ButtonTabs} from './modules/button-tabs';
import Chart from 'chart.js';
import difference from 'lodash/difference';
import cx from 'classnames';

var customTooltips = function(tooltip) {

  // Tooltip Element
  var tooltipEl = document.getElementsByClassName('chart-block__canvas-tooltip')[0];
  
  if (!tooltip.opacity){
    tooltipEl.style.opacity = 0;
    return;
  }
  this._chart.canvas.style.cursor = 'pointer';

  // Set Text
  if (tooltip.body) {
    var body = tooltip.body || [{}];
    var innerHtml = [
      (tooltip.beforeTitle || []).join('\n'), (tooltip.title || []).join('\n'), (tooltip.afterTitle || []).join('\n'), (tooltip.beforeBody || []).join('\n'), ((tooltip.body[0].lines) || []).join('\n'), (tooltip.afterBody || []).join('\n'), (tooltip.beforeFooter || [])
      .join('\n'), (tooltip.footer || []).join('\n'), (tooltip.afterFooter || []).join('\n')
    ];
    tooltipEl.innerHTML = innerHtml.join('\n');
  }

  // Find Y Location on page
  var top = 0;
  if (tooltip.yAlign) {
    if (tooltip.yAlign == 'above') {
      top = tooltip.y - tooltip.caretHeight - tooltip.caretPadding;
    } else {
      top = tooltip.y + tooltip.caretHeight + tooltip.caretPadding;
    }
  }

  var position = this._chart.canvas.getBoundingClientRect();

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.width = tooltip.width ? (tooltip.width + 'px') : 'auto';
  tooltipEl.style.left = position.left + tooltip.x + 'px';
  tooltipEl.style.top = position.top + top + 'px';
  tooltipEl.style.fontFamily = tooltip._fontFamily;
  tooltipEl.style.fontSize = tooltip.fontSize;
  tooltipEl.style.fontStyle = tooltip._fontStyle;
  tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
};

class ChartBlock extends Component {

  constructor(props){
    super(props);

    this.chartType = 'pie';
    this.chartColors = ['#FDB45C', '#46bf8b', '#F7464A'];
    this.chartOptions = {
      title: {
          display: false
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
        custom: customTooltips
      }
    }
  }

  componentDidMount(){
    this._renderChartIfNeeded(this.props.chartData);
  }

  componentWillReceiveProps(nextProps){
    this._renderChartIfNeeded(nextProps.chartData, this.props.chartData);
  }

  componentWillUnmount(){
    this.chart.destroy();
  }

  _renderChartIfNeeded(chartData, prevChartData){
    var self = this;

    function renderChart(_chartData){
      if (self.chart){
        self.chart.destroy();
      }
      
      var ctx = self.refs.canvas.getContext("2d");
      var data = self._prepareChartData(_chartData);
      self.chart = new Chart(ctx, data);
    }

    if (!prevChartData){
      renderChart(chartData);
      return;
    }

    let curValues = chartData.map(ch => ch.value);
    let prevValues = prevChartData.map(ch => ch.value);
    if (difference(curValues, prevValues).length){
      renderChart(chartData);
    }
  }

  _prepareChartData(chartData){
    chartData = chartData || [];
    const colors = this.chartColors;
    let data = [];
    let backgroundColor = [];
    let labels = [];
    for (var i = chartData.length - 1; i >= 0; i--) {
      let ch = chartData[i];
      data.push(ch.value);
      backgroundColor.push(colors[i]);
      labels.push(ch.label);
    };

    return {
      type: this.chartType,
      data: {
        datasets: [{
          data: data,
          backgroundColor: backgroundColor
        }],
        labels: labels
      },
      options: this.chartOptions
    }
  }

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
    const {title, fetching, selectedPeriod, chartData, onSelectPeriod} = this.props;
    const loadingClasses = cx({
      'chart-block__loading': true,
      'chart-block__loading--display': fetching
    })
    return (
      <div className="chart-block">
        <div className="chart-block__title">{title}</div>
        <ButtonTabs className="chart-block__buttons">
          <ButtonTab onClick={onSelectPeriod} payload='month' value='Месяц' selected={selectedPeriod === 'month'}></ButtonTab>
          <ButtonTab onClick={onSelectPeriod} payload='quarter' value='Квартал' selected={selectedPeriod === 'quarter'}></ButtonTab>
          <ButtonTab onClick={onSelectPeriod} payload='year' value='Год' selected={selectedPeriod === 'year'}></ButtonTab>
        </ButtonTabs>
        <div className={loadingClasses}></div>
        <div className="chart-block__canvas-wrapper">
          <canvas ref="canvas" className="chart-block__canvas" width='150' height='150'/>
          <div className="chart-block__canvas-tooltip"></div>
        </div>
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
  fetching: PropTypes.bool,
  selectedPeriod: PropTypes.string,
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onSelectPeriod: PropTypes.func
}

export default ChartBlock;
