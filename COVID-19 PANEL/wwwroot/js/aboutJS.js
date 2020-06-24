$(document).ready(function () {

    $("#overviewPanel").load("covid19AboutOverview.html");
    $("#preventationPanel").load("covid19AboutPreventation.html");
    $("#symptomsPanel").load("covid19AboutSymptoms.html");

    $("#overviewHeader").click(function () {
        $("#overviewPanel").slideToggle("slow");
    });

    $("#preventationHeader").click(function () {
        $("#preventationPanel").slideToggle("slow");
    });

    $("#symptomsHeader").click(function () {
        $("#symptomsPanel").slideToggle("slow");
    });
});