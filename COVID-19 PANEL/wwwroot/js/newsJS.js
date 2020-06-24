$(document).ready(function () {
    var buttonIds = new Array();
    var buttonValues = new Array();
    $("button").each(function () {
        buttonIds.push(this.id);
        buttonValues.push($(this).val());
    });
    
    $("button").click(function () {
        for (var i = 0; i < buttonIds.length; i++) {
            if (buttonIds[i] == this.id) {
                continue;
            } else {
                $("#div" + buttonValues[i]).slideUp("slow");
            }
        }

        $("#div" + $(this).val()).toggle("slow");
    });

    $.ajax({

        url: 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=92638b5c190a49319ed6e391cff00cfb',

    }).done(function (data) {
        
        for (var i = 0; i < 3; i++) {
            if (i == 0) {
                $('#breakingNewsCarouselInner').append(`
                <div class="carousel-item active">
                    <a href="${data.articles[i].url}" target="_blank">
                        <img src="${data.articles[i].urlToImage}" class="d-block w-100" alt="No Image">
                    </a>

                    <div class="carousel-caption d-none d-md-block">
                        <h5>${data.articles[i].title}</h5>
                        <p>${data.articles[i].description}</p>
                    </div>
                </div>
                `);
            } else {
                $('#breakingNewsCarouselInner').append(`
                <div class="carousel-item">
                    <a href="${data.articles[i].url}" target="_blank">
                        <img src="${data.articles[i].urlToImage}" class="d-block w-100" alt="No Image">
                    </a>

                    <div class="carousel-caption d-none d-md-block">
                        <h5>${data.articles[i].title}</h5>
                        <p>${data.articles[i].description}</p>
                    </div>
                </div>
                `);
            }
        }
        

        for (var i = 0; i < 3; i++) {
            $('#TRNewsFlipCardRow').append(`
                <a href="${data.articles[i].url}" target="_blank">
                    <div class="col-md">
                        <div class="flip-card" style="width:350px;height:200px; overflow: hidden;">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <img src="${data.articles[i].urlToImage}" alt="No Image" style="display:block; width:100%;">
                                </div>
                                <div class="flip-card-back">
                                    <h5 class="m-3">${data.articles[i].title}</h5>
                                    <p class="m-3" style="font-size: 15px;">${data.articles[i].description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
           `);
        }   

        for (var i = 0; i < 3; i++) {
            $('#worldNewsCardDeck').append(`
                <div class="card">
                    <a href="${data.articles[i].url}" target="_blank">
                        <img src="${data.articles[i].urlToImage}" class="card-img-top" alt="No Image">
                    </a>
                        
                    <div class="card-body">
                        <h5 class="card-title">${data.articles[i].title}</h5>
                        <p class="card-text">${data.articles[i].description}</p>
                    </div>
                    
                    <div class="card-footer">
                        <small class="text-muted">${data.articles[i].author}</small>
                    </div>
                </div>
            `);            
        }    

    }); 
});
