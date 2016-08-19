
var banner = document.getElementById("banner");
var context = banner.getContext("2d");
context.font = "50px Open Sans";

//function that generates the banner preview from user input text;
function previewBanner() {
  context.clearRect(0, 0, banner.width, banner.height);
  context.textAlign = "center";
  context.fillText(document.getElementById("banner_heading").value, banner.width/2, banner.height/4);
    
}

var preview = document.getElementById("preview");
preview.addEventListener("click", previewBanner);

//function that downloads the previously generated banner;
function downloadImage() {
  
}


var downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", downloadImage);