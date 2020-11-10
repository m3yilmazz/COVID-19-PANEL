$(document).ready(function () {
    $.getJSON("covid19.json", function (jsonResult) {
        var length = jsonResult.records.length;
        var compGeoId = jsonResult.records[0].geoId.replace("UK", "GB");

        var dataArray = new Array();
        var cumulativeCases = 0;
        var cumulativeDeaths = 0;

        for (var i = 0; i < length; i++) {

            if (compGeoId == jsonResult.records[i].geoId.replace("UK", "GB")) {
                cumulativeCases += parseInt(jsonResult.records[i].cases);
                cumulativeDeaths += parseInt(jsonResult.records[i].deaths);

                if (i == length) {
                    dataArray.push([jsonResult.records[i].geoId.replace("UK", "GB"),
                    jsonResult.records[i].countriesAndTerritories.replace(/_/g, " "),
                        cumulativeCases,
                        cumulativeDeaths]);
                    break;
                }


            } else {
                dataArray.push([jsonResult.records[i - 1].geoId.replace("UK", "GB"),
                jsonResult.records[i - 1].countriesAndTerritories.replace(/_/g, " "),
                    cumulativeCases,
                    cumulativeDeaths]);

                cumulativeCases = 0;
                cumulativeDeaths = 0;

                compGeoId = jsonResult.records[i].geoId.replace("UK", "GB");

                cumulativeCases += parseInt(jsonResult.records[i].cases);
                cumulativeDeaths += parseInt(jsonResult.records[i].deaths);
            }
        }
        //Make the array proper to the argument of the Google function.
        dataArray.splice(0, 0, ['Country', 'Country Name', 'Cumulative Cases', 'Cumulative Deaths']);

        //Sort the array by greater culumative cases.
        dataArray.sort(function (a, b) { return b[2] - a[2] });

        google.charts.load('current', {
            'packages': ['geochart'],
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable(dataArray);

            var options = {
                colorAxis: { colors: ['white', 'red', 'darkred'] },
            };

            var chart = new google.visualization.GeoChart(document.getElementById('mapDiv'));

            chart.draw(data, options);
        }

        //List the top 10 countries.
        for (var i = 1; i < 11; i++) {
            $("#tableBodyTop10").append('<tr>' +
                '<th scope="row">' + i + '</th>' +
                '<td>' + dataArray[i][1] + '</td>' +
                '<td style="text-align: center;">' + dataArray[i][2] + '</td>' +
                '<td style="text-align: center;">' + dataArray[i][3] + '</td>' +
                '</tr>');
        }
    });
});
