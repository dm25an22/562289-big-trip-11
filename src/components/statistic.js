import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AbstractSmartComponent from "./abstract-smart-component";
import {TRIP_TRANSFERS, MINUTES_IN_HOUR} from "../consts";
import {getDurationTimeInMinutes, getConvertTimeSpent} from "../date-helpers";
import {Symbol, TypeIconList, Title} from "../enum";

const renderChart = (ctx, typeData, valueData, symbol, title) => {
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typeData,
      datasets: [{
        data: valueData,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val} ${symbol}`
        }
      },
      title: {
        display: true,
        text: title,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
            callback: (type) => {
              return `${TypeIconList[type.toLowerCase()]} ${type.toUpperCase()}`;
            },
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderMoneyChart = (ctx, moneyData) => {
  const typeData = moneyData.map((it) => it.type);
  const costData = moneyData.map((it) => it.cost);

  return renderChart(ctx, typeData, costData, Symbol.EURO, Title.MONEY);
};

const renderTransportChart = (ctx, transportData) => {
  const typeTransport = transportData.map((it) => it.type);
  const countTransport = transportData.map((it) => it.count);

  return renderChart(ctx, typeTransport, countTransport, Symbol.COUNT, Title.TRANSPORT);
};

const renderTimeSpentChart = (ctx, timeSpentData) => {
  const typeTransport = timeSpentData.map((it) => it.type);
  const countTransport = timeSpentData.map((it) => getConvertTimeSpent(it.duration));

  return renderChart(ctx, typeTransport, countTransport, Symbol.HOUR, Title.TIME_SPENT);
};

const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`
  );
};

export default class Statistic extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();

    this._pointsModel = pointsModel;
    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpentChart = null;
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  showElement() {
    super.showElement();

    this.rerender(this._pointsModel);
  }

  recoveryListeners() {}

  rerender(pointsModel) {
    this._pointsModel = pointsModel;
    super.rerender();

    this._renderCharts();
  }

  _getMoneyData(typeData, points) {
    const moneyData = typeData.map((currentType) => {
      const similarTypes = points.filter((el) => el.type === currentType);

      if (similarTypes.length > 1) {
        return {
          type: currentType,
          cost: similarTypes.map((it) => it.eventPrice).reduce((prev, curr) => prev + curr)
        };

      } else {
        return {
          type: currentType,
          cost: similarTypes[0].eventPrice,
        };
      }
    });

    return moneyData.sort((a, b) => b.cost - a.cost);
  }

  _getTransportData(typeData, points) {
    const transferTypes = typeData.filter((it) => {
      return TRIP_TRANSFERS.some((type) => type === it);
    });

    const transportData = transferTypes.map((it) => {
      const similarTypes = points.filter((el) => el.type === it);
      return {
        type: it,
        count: similarTypes.length
      };
    });

    return transportData.sort((a, b) => b.count - a.count);
  }

  _getTimeSpentData(typeData, points) {
    const timeSpent = typeData.map((it) => {
      const similarTypes = points.filter((el) => el.type === it)
        .map((obj) => getDurationTimeInMinutes(obj.start, obj.end));

      if (similarTypes.length > 1) {
        return {
          type: it,
          duration: similarTypes.reduce((prev, curr) => prev + curr)
        };
      } else {
        return {
          type: it,
          duration: similarTypes[0]
        };
      }
    });

    const sortData = timeSpent.filter((it) => it.duration > MINUTES_IN_HOUR)
      .sort((a, b) => b.duration - a.duration);

    return sortData;
  }

  _renderCharts() {
    const element = this.getElement();

    const points = this._pointsModel.getPointsAll();
    const typeData = [...new Set(points.map((it) => it.type))];


    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = document.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = document.querySelector(`.statistics__chart--time`);

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 7;
    transportCtx.height = BAR_HEIGHT * 5;
    timeSpendCtx.height = BAR_HEIGHT * 7;

    this._moneyChart = renderMoneyChart(moneyCtx, this._getMoneyData(typeData, points));
    this._transportChart = renderTransportChart(transportCtx, this._getTransportData(typeData, points));
    this._timeSpentChart = renderTimeSpentChart(timeSpendCtx, this._getTimeSpentData(typeData, points));
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeSpentChart) {
      this._timeSpentChart.destroy();
      this._timeSpentChart = null;
    }
  }
}
