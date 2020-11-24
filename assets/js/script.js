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

function colorAPICall() {
    let query = $("#hex-search").val();
    let colorURL = `https://www.thecolorapi.com/scheme?hex=${query}&mode=complement&count=4`;
    $.ajax({
        url: colorURL,
        method: "GET"
    }).then(function (response){
        console.log(response);
        renderColors(response);
    });
}

// JS Rendering functions

function renderImages(response) {
    // for each image, inject image to DOM
    let imgArray = response.results;

    $("#image-panel").empty();

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

function renderColors(response) {
    // for each color, inject color to DOM
    let colorArray = response.colors;

    $("#color-themes").empty();

    colorArray.forEach(function(color) {
        let colorSrc = color.hex.value;
        console.log(colorSrc);

        let colors = $("<div>", {
            "class" : "color",
            "width" : "200px",
            "height" : "100px",
            "background-color" : colorSrc,
            "text" : colorSrc
         }).css({"background-color" : colorSrc, "color" : "white"}).appendTo("#color-themes");
         
        // $('.color').css({"background-color" : colorSrc});
         
         // colors.appendTo("#color-themes");
         
    });

}


// Set Local Storage
formEl.on('click', unsplashCall);
colorSubmit.on('click', colorAPICall);