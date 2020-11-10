$(document).ready(function () {
    $.getJSON("covid19.json", function (jsonResult) {
        
        $("#chartDiv").empty();
        $("#cumulativeChartDiv").empty();

        var length = jsonResult.records.length;

        var compGeoId = jsonResult.records[0].geoId;

        for (var i = 0; i < length; i++) {
            if (i == 0) {
                $("#countryDropDownList").append('<option value="0">Country Name</option>');
                $("#countryDropDownList").append('<option value="' + jsonResult.records[i].geoId + '">' + jsonResult.records[i].countriesAndTerritories.replace(/_/g, " ") + '</option>');
                continue;
            } else {
                if (compGeoId == jsonResult.records[i].geoId) {
                    continue;
                } else {
                    $("#countryDropDownList").append('<option value="' + jsonResult.records[i].geoId + '">' + jsonResult.records[i].countriesAndTerritories.replace(/_/g, " ") + '</option>');
                    compGeoId = jsonResult.records[i].geoId;
                }
            }
        }

        jsonResult.records.reverse();

        $("#drawChartButton").click(function () {
            $("#chartDiv").empty();
            $("#cumulativeChartDiv").empty();

            var countryName = undefined;

            var multiDimensionalDataArray = new Array();

            var multiDimensionalCumulativeDataArray = new Array();
            var cumulativeCases = 0;
            var cumulativeDeaths = 0;

            for (var i = 0; i < length; i++) {
                if ($("#countryDropDownList").val() == jsonResult.records[i].geoId) {
                    multiDimensionalDataArray.push([jsonResult.records[i].dateRep,
                    parseInt(jsonResult.records[i].cases),
                    parseInt(jsonResult.records[i].deaths)]);

                    //Calculation of cumulative numbers.
                    cumulativeCases += parseInt(jsonResult.records[i].cases);
                    cumulativeDeaths += parseInt(jsonResult.records[i].deaths);

                    multiDimensionalCumulativeDataArray.push([jsonResult.records[i].dateRep,
                        cumulativeCases,
                        cumulativeDeaths]);

                    //Getting country name.
                    if (countryName === undefined) {
                        countryName = jsonResult.records[i].countriesAndTerritories.replace(/_/g, " ");
                    }
                }
            }

            //Processes of non-cumulative array.
            multiDimensionalDataArray.splice(0, 0, ['Date', 'Cases', 'Deaths']);

            //Process of cumulative array.
            multiDimensionalCumulativeDataArray.splice(0, 0, ['Date', 'Cases', 'Deaths']);

            //Drawing the non-cumulative chart.

            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);
            function drawChart() {
                var data = google.visualization.arrayToDataTable(multiDimensionalDataArray);

                var options = {
                    title: countryName + " - Day by Day",
                    legend: { position: 'bottom' },
                    pointSize: 5,
                };

                var chart = new google.visualization.LineChart(document.getElementById("chartDiv"));

                chart.draw(data, options);
            }


            google.charts.setOnLoadCallback(drawCumulativeChart);

            function drawCumulativeChart() {
                var data = google.visualization.arrayToDataTable(multiDimensionalCumulativeDataArray);

                var options = {
                    title: countryName + " - Cumulative",
                    legend: { position: 'bottom' },
                    pointSize: 5,
                };

                var chart = new google.visualization.LineChart(document.getElementById("cumulativeChartDiv"));

                chart.draw(data, options);
            }
        });
    });
});
