
//lets set the maximum length for the headline.
document.getElementById("banner_heading").setAttribute("maxlength", "40");
var channel =  document.getElementById("channel_name");

// Channel selection
channel.addEventListener("change", function(){
    if(channel.value == 1)
        logoImage.src = 'images/release.png';
    else if(channel.value == 2)
        logoImage.src = 'images/beta.png';
    else if(channel.value == 3)
        logoImage.src = 'images/nightly.png';
    else if(channel.value == 4)
        logoImage.src = 'images/dev.png';

});

//now taking care of the canvases. firstly the background layer;
var background = document.getElementById("banner_background");
background_ctx = background.getContext("2d");

//lets create logo image element;
var logoLayer = document.getElementById("fxlogo");
logoLayer_ctx = logoLayer.getContext("2d");

//now the text layer;
var textLayer = document.getElementById("banner");
textLayer_ctx = textLayer.getContext("2d");
textLayer_ctx.font = "200 250% Open Sans";

//lets create an image element;
var backgroundImage = new Image(background.width, background.height);
backgroundImage.src = 'images/banner_plain.svg';
//lets create logo image
var logoImage = new Image(background.height/2.67, background.height/2.67);
logoImage.src = 'images/release.png';

//function that generates the banner preview from user input text;
function previewBanner() {
  background_ctx.clearRect(0, 0, background.width, background.height); //      Clearing all
  textLayer_ctx.clearRect(0, 0, textLayer.width, textLayer.height);  //           layers
  logoLayer_ctx.clearRect(0,0,logoLayer.width, textLayer.height); //          before preview

  background_ctx.drawImage(backgroundImage, 0, 0, background.width, background.height);
  logoLayer_ctx.drawImage(logoImage,105,110, logoLayer.height/2.2, logoLayer.height/2.2);
  textLayer_ctx.textAlign = "center";
  textLayer_ctx.fillText(document.getElementById("banner_heading").value, textLayer.width/2, textLayer.height/4);

  //now drwaing the textLayer canvas into the background canvas
  background_ctx.drawImage(textLayer, 0, 0, background.width, background.height);
  background_ctx.drawImage(logoLayer, 0, 0, background.width, background.height);
}
//Will it look good to lead the canvas totally white? Nope, show some default banner background;
window.addEventListener("load", function(){
  background_ctx.drawImage(backgroundImage, 0, 0, background.width, background.height);
  logoLayer_ctx.drawImage(logoImage,105,110, logoLayer.height/2.2, logoLayer.height/2.2);
  background_ctx.drawImage(logoLayer, 0, 0, background.width, background.height);
});
//Calling the friendly previewBanner function;
var preview = document.getElementById("preview");
preview.addEventListener("click", previewBanner);

//function that downloads the previously generated banner;
function downloadImage(link, canvasID, fileName) {
  link.href = canvasID.toDataURL('image/png'+'==');
  link.download = fileName;
}

var downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", function(){
  previewBanner(); //downloading gets the exact current state by this;
  downloadImage(this, background, "TestdayBanner.png");
});
