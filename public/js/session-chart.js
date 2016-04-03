var concentrationMetrics = _.filter(metrics, function(metric) {
  return metric.type === 'concentration';
});
var metricsByUser = _.groupBy(concentrationMetrics, function(metric) {
  return metric.user.fullname;
});
var data = _.map(metricsByUser, function(usermetrics, fullname) {
  var coords = _.unzip(_.map(usermetrics, function(metric) {
    return [metric.timestamp, metric.value];
  }));
  return {
    x: coords[0],
    y: coords[1],
    type: 'scatter',
    name: fullname
  }
})

var layout = {
  xaxis: {
    range: [0, _.max(_.pluck(concentrationMetrics,'timestamp'))]
  },
  yaxis: {
    range: [0, 1]
  },
  title: 'Concentration By Student Over Time'
};

Plotly.newPlot('chart', data, layout);
