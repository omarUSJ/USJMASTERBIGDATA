// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
var labels=["In Service", "Out of Service", "Warning","Operation Mode"];
var myPieChart=null;
var myBarChart=null;

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
$(document).ready(function() {
	//var array=[0,0,0,0];
	//var max=100;
	//max=Math.ceil(max/100)*100;	
	//populateBarChart(labels,array,max);
	callAjax("");
});	
	

function showDeviceStatusDataStats(that) {
	var partId = that.options[that.selectedIndex].value;
	callAjax(partId);
}

function callAjax(partId){
	
	var url = contextpath+"devices/deviceStatus/stats/ajax?participantId=" + partId;
	$.getJSON({
	    url: url
	}).done(function (data, status, xhr) {
		
			if(xhr.status==200)
			{		
				if(data.devMax>100){	
					var max=Math.ceil(Number(data.devMax)/100)*100;	//round uo to nearest centaine
				}
				else if(data.devMax>50 && data.devMax<=100)
					max=100;
				else if(data.devMax>10 && data.devMax<=50)
					max=50;
				else
					max=10;
				
				var array=new Array();
				$.each(data.devNumbers, function(key,val) {             
	  				array.push(val);
	        	});
				populateBarChart(labels,array,max);
				populateDonutChart(labels,array,max);
			}
		
	}).fail(function (xhr, status, error) {
		alert('Error: '+error);
	});
}

function populateBarChart(labels,array,max)
{
	// Bar Chart Example
	//var ctx = document.getElementById("myBarChart");
	if(myBarChart!=null)
  		myBarChart.destroy();
  	var grapharea = document.getElementById("myBarChart").getContext("2d");

	myBarChart = new Chart(grapharea, {
	  type: 'bar',
	  data: {
	    labels: labels,
	    datasets: [{
	      label: "Total Devices",
	      //backgroundColor: "#4e73df",
	      //hoverBackgroundColor: "#2e59d9",
	      borderColor: "#4e73df",
	      data: array,
	      backgroundColor : [ "#4e73df","#e74a3b","#f6c23e","#1cc88a" ],
		  hoverBackgroundColor : ["#2653d4", "#d52a1a", "#f4b30d","#169b6b"]
	    }],
	  },
	  options: {
	    maintainAspectRatio: false,
	    layout: {
	      padding: {
	        left: 10,
	        right: 25,
	        top: 25,
	        bottom: 0
	      }
	    },
	    scales: {
	      xAxes: [{
	        
	        gridLines: {
	          display: false,
	          drawBorder: false
	        },
	        ticks: {
	          maxTicksLimit: 4
	        },
	        maxBarThickness: 25,
	      }],
	      yAxes: [{
	        ticks: {
	          min: 0,
	          max: max,
	          maxTicksLimit: 20,
	          padding: 10,
	          
	        },
	        gridLines: {
	          color: "rgb(234, 236, 244)",
	          zeroLineColor: "rgb(234, 236, 244)",
	          drawBorder: false,
	          borderDash: [2],
	          zeroLineBorderDash: [2]
	        }
	      }],
	    },
	    legend: {
	      display: false
	    },
	    tooltips: {
	      titleMarginBottom: 10,
	      titleFontColor: '#6e707e',
	      titleFontSize: 14,
	      backgroundColor: "rgb(255,255,255)",
	      bodyFontColor: "#858796",
	      borderColor: '#dddfeb',
	      borderWidth: 1,
	      xPadding: 15,
	      yPadding: 15,
	      displayColors: false,
	      caretPadding: 10,
	      callbacks: {
	        label: function(tooltipItem, chart) {
	          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
	          //return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
	          return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
	        }
	      }
	    },
	  }
	});
	
}

function populateDonutChart(labels,array,max)
{
  //var ctx = document.getElementById("myPieChart");
  if(myPieChart!=null)
  	myPieChart.destroy();
  var grapharea = document.getElementById("myPieChart").getContext("2d");

	myPieChart = new Chart(grapharea, {
	  type: 'doughnut',
	  data: {
	    labels: labels,
	    datasets: [{
	      data: array,
	      backgroundColor: [ "#4e73df","#e74a3b","#f6c23e","#1cc88a" ],
	      hoverBackgroundColor: ["#2653d4", "#d52a1a", "#f4b30d","#169b6b"],
	      hoverBorderColor: "rgba(234, 236, 244, 1)",
	    }],
	  },
	  options: {
	    maintainAspectRatio: false,
	    tooltips: {
	      backgroundColor: "rgb(255,255,255)",
	      bodyFontColor: "#858796",
	      borderColor: '#dddfeb',
	      borderWidth: 1,
	      xPadding: 15,
	      yPadding: 15,
	      displayColors: false,
	      caretPadding: 10,
	    },
	    legend: {
	      //display: false
	    },
	    cutoutPercentage: 80,
	  },
	});
		
}
