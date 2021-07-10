document.addEventListener("DOMContentLoaded", function(){


    var connectionData;

    /*********************************
     *     Function Declaration      *
     ********************************/

    // gets connection data from the database
    function getDataUpdate() {
        var xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
            connectionData = JSON.parse(this.responseText);
	    timeSeriesSelect = document.getElementById("chartTimeSeries");
	    if(Chart.getChart('myChart')){
                Chart.getChart('myChart').destroy();
		drawConnChart(connectionData, timeSeriesSelect.value);
		drawVisitorBarChart(connectionData);
	    }else{
	        drawConnChart(connectionData, timeSeriesSelect.value);
		drawVisitorBarChart(connectionData);
	    }
	}
	xhttp.open("GET", "/data", true);
	xhttp.send();
    }

    // draws chart for connections, 
    
    function drawConnChart(connDataInput, timeSeries) {

	var connDataKeys = Object.keys(connDataInput);
	var labels = {};
	var data = {};
	var config = {};
	var dataset = [];

	if(timeSeries === "monthly"){

	    var janCount = 0; var febCount = 0; var marCount = 0;
	    var aprCount = 0; var mayCount = 0; var junCount = 0;
	    var julCount = 0; var augCount = 0; var sepCount = 0;
	    var octCount = 0; var novCount = 0; var decCount = 0;

	    // counts the occurance of connections per month
	    for(key in connDataKeys){
	        if(connDataInput[connDataKeys[key]].dateVisited){

	            visitedMonth = connDataInput[connDataKeys[key]].dateVisited[5] + 
			        connDataInput[connDataKeys[key]].dateVisited[6];

		    switch(visitedMonth){
		        case "01":
			    janCount += 1;
			    break;
		        case "02":
			    febCount += 1;
			    break;
		        case "03":
			    marCount += 1;
			    break;
		        case "04":
			    aprCount += 1;
		 	    break;
		        case "05":
			    mayCount += 1;
			    break;
		        case "06":
			    junCount += 1;
			    break;
		        case "07":
		 	    julCount += 1;
		 	    break;
		        case "08":
			    augCount += 1;
			    break;
		        case "09":
			    sepCount += 1;
			    break;
		        case "10":
			    octCount += 1;
			    break;
		        case "11":
			    novCount += 1;
			    break;
		        case "12":
			    decCount += 1;
			    break;
		        default:
			    break;
		    }
	        }
	    }
	
	    labels = [
	        'January','February','March','April',
		'May','June','July','August',
	        'September','October','November','December',
	    ];
	    
	    dataset = [{
	        label: 'Connections',
		backgroundColor: 'rgb(0,0,0)',
		borderColor: 'rgb(0,0,0)',
		data: [janCount, febCount, marCount, 
		       aprCount, mayCount, junCount,
		       julCount, augCount, sepCount,
		       octCount, novCount, decCount],
	    }]

	}else if(timeSeries === "daily"){

	    // get today's date so we can count for the right month
	    var today = new Date();
	    var todayMonth = String(today.getMonth() + 1).padStart(2, '0');

	    // 31 slots in this array corresponding to 
	    // 31 max days in a month
	
            var dayCount = [0, 0, 0, 0, 0, 0, 0,
			    0, 0, 0, 0, 0, 0, 0,
		            0, 0, 0, 0, 0, 0, 0,
		            0, 0, 0, 0, 0, 0, 0,
		            0, 0, 0];

	    // counts the occurance of connections per month
	    for(key in connDataKeys){
	        if(connDataInput[connDataKeys[key]].dateVisited){
			
		    visitedMonth = connDataInput[connDataKeys[key]].dateVisited[5] +
				  connDataInput[connDataKeys[key]].dateVisited[6];

		    if(visitedMonth === todayMonth){

	                visitedDay = connDataInput[connDataKeys[key]].dateVisited[8] + 
			            connDataInput[connDataKeys[key]].dateVisited[9];

		        switch(visitedDay){
		            case "01": dayCount[0] += 1; break;
		            case "02": dayCount[1] += 1; break;
		            case "03": dayCount[2] += 1; break;
		            case "04": dayCount[3] += 1; break;
		            case "05": dayCount[4] += 1; break;
		            case "06": dayCount[5] += 1; break;
		            case "07": dayCount[6] += 1; break;
		            case "08": dayCount[7] += 1; break;
		            case "09": dayCount[8] += 1; break;
		            case "10": dayCount[9] += 1; break;
		            case "11": dayCount[10] += 1; break;
		            case "12": dayCount[11] += 1; break;
		            case "13": dayCount[12] += 1; break;
			    case "14": dayCount[13] += 1; break;
			    case "15": dayCount[14] += 1; break;
			    case "16": dayCount[15] += 1; break;
			    case "17": dayCount[16] += 1; break;
			    case "18": dayCount[17] += 1; break;
			    case "19": dayCount[18] += 1; break;
			    case "20": dayCount[19] += 1; break;
			    case "21": dayCount[20] += 1; break;
			    case "22": dayCount[21] += 1; break;
			    case "23": dayCount[22] += 1; break;
			    case "24": dayCount[23] += 1; break;
			    case "25": dayCount[24] += 1; break;
			    case "26": dayCount[25] += 1; break;
			    case "27": dayCount[26] += 1; break;
			    case "28": dayCount[27] += 1; break;
			    case "29": dayCount[28] += 1; break;
			    case "30": dayCount[29] += 1; break;
			    case "31": dayCount[30] += 1; break;
		        }
		    }
	        }
	    }
	
	    labels = [
		'01','02','03','04','05','06','07',
		'08','09','10','11','12','13','14',
		'15','16','17','18','19','20','21',
		'22','23','24','25','26','27','28',
		'29','30','31',
	    ];
	    
	    
	    dataset = [{
	        label: 'Connections',
		backgroundColor: 'rgb(0,0,0)',
		borderColor: 'rgb(0,0,0)',
		data: [dayCount[0], dayCount[1], dayCount[2],
		       dayCount[3], dayCount[4], dayCount[5],
		       dayCount[6], dayCount[7], dayCount[8],
		       dayCount[9], dayCount[10], dayCount[11],
		       dayCount[12], dayCount[13], dayCount[14],
		       dayCount[15], dayCount[16], dayCount[17],
		       dayCount[18], dayCount[19], dayCount[20],
		       dayCount[21], dayCount[22], dayCount[23],
		       dayCount[24], dayCount[25], dayCount[26],
		       dayCount[27], dayCount[28], dayCount[29],
		       dayCount[30]]
	    }]
	
	}

	data = {
            labels: labels,
	    datasets: dataset
	};

        config = {
            type: 'line',
	    data, 
	    options: {}
	}

	var myChart = new Chart(document.getElementById('myChart'), config);
    }

    function drawVisitorBarChart(connDataInput) {
        var connDataKeys = Object.keys(connDataInput);

	for(key in connDataKeys){
	    
	    visitorIP = connDataInput[connDataKeys[key]].ipAddress;

	    if(visitorIP) {
		console.log(visitorIP);
	    }

	}
    }

    /*********************************
     *    End Function Declaration   *
     ********************************/

    // get the data once when the page loads
    // and then again if the refresh data button is clicked
    getDataUpdate();

    // Get updated connection data from server
    this.getElementById("refreshButton").addEventListener("click", function(){
	getDataUpdate();
    });

    this.getElementById("chartTimeSeries").addEventListener("change", function(){
	Chart.getChart('myChart').destroy();
	drawConnChart(connectionData, this.value);
    });
});
