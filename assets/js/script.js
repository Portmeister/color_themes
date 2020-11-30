// Global variables, grab DOM elements
let formEl = $("#search-btn")
let colorSubmit = $("#submit-btn")
let unsplashAPIKey = 'ZF6OdF1OqUv5GT4EPQ1QiuY4gaFm_c9O8ip6ZREUNRg';
let palettes = JSON.parse(localStorage.getItem("palette")) || [];
let dropdown = $('select');
let savedSearch = $('#saved-search');

// iterates through past queries in saved storage and appends them as options in the select menu
function loadDropdown(){
    $.each(palettes, function() {
        dropdown.append($("<option />").val(this).text(this));
    });
}

// Make API queries
function unsplashCall(){
    let query = $("#search").val();
    let unsplashURL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashAPIKey}&per_page=9`;
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
    let query = String($("#hex-search").val()).toLowerCase();
    let colorURL = `https://www.thecolorapi.com/scheme?hex=${query}&mode=complement&count=4`;
    $.ajax({
        url: colorURL,
        method: "GET"
    }).then(function (response){
        
        if (! palettes.includes(query)){
            palettes.push(query);
        }
        
        renderColors(response);
        // empty dropdown menu of previously loaded content
        $("select").empty();
        // Load all entries from local storage, inlcuding new search term
        loadDropdown();
    });
}

function dropdownSelect() {
    let output = dropdown.val();
    let colorURL = `https://www.thecolorapi.com/scheme?hex=${output}&mode=complement&count=4`;
    $.ajax({
        url: colorURL,
        method: "GET"
    }).then(function (response){
        renderColors(response);
    });
}

// JS Rendering functions
function renderImages(response) {
    // for each image, inject image to DOM
    let imgArray = response.results;

    $("#image-panel").empty();

    imgArray.forEach(function(img) {
        let imgSrc = img.urls.regular;
        let altDes = img.alt_description;
        console.log(imgSrc);

        let photo = $("<img/>", {
            "class" : "img-fluid flex-wrap",
            "src" : imgSrc,
            "alt" : altDes,
            "width" : "400px",
            "height" : "400px",

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
            "class" : "color column is-2",
            "width" : "200px",
            "height" : "100px",
            "background-color" : colorSrc,
            "text" : colorSrc
         }).css({"background-color" : colorSrc, "color" : "white"}).appendTo("#color-themes");
         
    });

    localStorage.setItem("palette", JSON.stringify(palettes));
}


// Set Local Storage
formEl.on('click', unsplashCall);
colorSubmit.on('click', colorAPICall);
savedSearch.on('click', dropdownSelect);

// On first load on page, populate past searches dropdown with terms from local storage
loadDropdown();