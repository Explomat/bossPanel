import React, { Component, PropTypes } from 'react';
import {ButtonTab, ButtonTabs} from '../modules/button-tabs';
import Chart from 'chart.js';
import difference from 'lodash/difference';
import cx from 'classnames';

import './chart-block.scss';

var customTooltips = function(tooltip) {

  // Tooltip Element
  var tooltipEl = this.refs.canvasTooltip;
  
  if (!tooltip.opacity){
    tooltipEl.style.opacity = 0;
    return;
  }
  let canvas = this.chart.chart.canvas;
  canvas.style.cursor = 'pointer';

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
      top = tooltip.y - tooltip.caretSize - tooltip.caretPadding;
    } else {
      top = tooltip.y  + tooltip.caretSize + tooltip.caretPadding;
    }
  }

  var position = canvas.getBoundingClientRect();

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.width = tooltip.width ? (tooltip.width + 'px') : 'auto';
  tooltipEl.style.left = tooltip.x + 'px';
  tooltipEl.style.top = top + 'px';
  tooltipEl.style.fontFamily = tooltip._fontFamily;
  tooltipEl.style.fontSize = tooltip.fontSize;
  tooltipEl.style.fontStyle = tooltip._fontStyle;
  tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
}

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
        custom: customTooltips.bind(this)
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
      var canvas = self.refs.canvas;
      var ctx = canvas.getContext("2d");
      const total = self.getTotalFromCharts(_chartData);

      function getTextHeight(text, fontSize){
        var d = document.createElement("span");
        d.style.fontSize = fontSize + 'px';
        d.style.fontFamily = 'serif';
        d.style.display = 'inline-block';
        d.style.lineHeight = '0.7';
        d.textContent = text;
        document.body.appendChild(d);
        var emHeight = d.offsetHeight;
        document.body.removeChild(d);
        return emHeight;
      }

      function drawText(text, fontSize){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = fontSize + "px serif";
        ctx.fillStyle = "#ccc";
        var width = ctx.measureText(text).width;
        var height = getTextHeight(text, fontSize);
        ctx.fillText(text, canvas.width / 2 - width / 2, canvas.height-(canvas.height / 2 - height / 2));
      }

      if (self.chart){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        self.chart.destroy();
      }

      if (total === 0){
        drawText("0", 120);
        return;
      }
      
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
    if (chartData && chartData.length === 0){
      return 0;
    }
    return chartData.map(ch => Number(ch.value))
                    .reduce((first, second) => (first + second));
  }

  getMarkupFromCharts(chartData){
    let self = this;
    return chartData.map((ch, index) => {
      return (<div key={index}>
              <span>{ch.label}: </span> 
              <span style={{color: self.chartColors[index]}}>{ch.value}</span> 
            </div>)
    })
  }

  render() {
    const {title, fetching, selectedPeriod, chartData, onSelectPeriod} = this.props;
    const loadingClasses = cx({
      'chart-block__loading': true,
      'chart-block__loading--display': fetching
    });
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
          <canvas ref="canvas" className="chart-block__canvas" width='164' height='164'/>
          <div ref="canvasTooltip" className="chart-block__canvas-tooltip"></div>
        </div>
        <div className="chart-block__description">
          <div className="chart-block__total">
            <span>Всего: </span>
            <span className="chart-block__total-count">{this.getTotalFromCharts(chartData)}</span>
          </div>
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
