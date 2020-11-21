// Global variables
let formEl = $("#search-btn")
let colorSubmit = $("#submit-btn")
let unsplashAPIKey = 'ZF6OdF1OqUv5GT4EPQ1QiuY4gaFm_c9O8ip6ZREUNRg';

// Grab DOM elements

// Make API queries
function unsplashCall(){
    let query = $("#search").val();
    let unsplashURL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashAPIKey}&per_page=10`;
    $.ajax({
        url: unsplashURL,
        method: "GET"
    }).then(function (response){
        console.log(response);
        // colorAPICall(response);
        renderImages(response);
    });
    
}

function colorAPICall(response) {
    let query = $("#hex-search").val();
    let colorURL = `https://www.thecolorapi.com/scheme?hex=${query}&mode=complement&count=4`;
    $.ajax({
        url: colorURL,
        method: "GET"
    }).then(function (response){
        console.log(response);
    });
}

// JS Rendering functions

function renderImages(response) {
    // for each image, inject image to DOM
    let imgArray = response.results;
    imgArray.forEach(function(img) {
        let imgSrc = img.urls.thumb;
        let altDes = img.alt_description;
        console.log(imgSrc);

        let photo = $("<img/>", {
            "class" : "image",
            "src" : imgSrc,
            "alt" : altDes,
            // "width" : "200px",
            // "height" : "200px"
         }).appendTo("#image-panel");
         
    });
    
}


// Set Local Storage
formEl.on('click', unsplashCall);
colorSubmit.on('click', colorAPICall);