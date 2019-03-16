
//lets set the maximum length for the headline.
document.getElementById("banner_heading").setAttribute("maxlength", "40");
var channel =  document.getElementById("channel_name");

// updatesfxlogo source based on channel selection
function updatefxlogo(){
    if(channel.value == 1){
        fxLogoImage.src = 'images/release.png';
    }
    else if(channel.value == 2){
        fxLogoImage.src = 'images/beta.png';
    }
    else if(channel.value == 3){
        fxLogoImage.src = 'images/nightly.png';
    }
    else if(channel.value == 4){
        fxLogoImage.src = 'images/dev.png';
    }
}

channel.addEventListener("change", ()=>{
    updatefxlogo();
    setTimeout(previewBanner, 50); // update banner preview
});

//now taking care of the canvases. firstly the background layer;
var background = document.getElementById("banner_background");
background_ctx = background.getContext("2d");

//lets create firefox logo layer;
var fxLogoLayer = document.getElementById("fxlogo");
fxLogoLayer_ctx = fxLogoLayer.getContext("2d");

//creates mozqabd logo layer
var mozqabdLogoLayer = document.getElementById("mozqabdlogo");
mozqabdLogoLayer_ctx = mozqabdLogoLayer.getContext("2d");

//now the text layer;
var textLayer = document.getElementById("banner");
textLayer_ctx = textLayer.getContext("2d");
textLayer_ctx.font = "400 250% Zilla Slab";

//lets create a background image element;
var backgroundImage = new Image(background.width, background.height);
backgroundImage.src = 'images/banner_plain.svg';

//lets create firefox logo image element
var fxLogoImage = new Image(background.height, background.height);
fxLogoImage.src = 'images/release.png';

//now create mozqabd logo image element
var mozqabdLogoImage = new Image(background.height, background.height);
mozqabdLogoImage.src = 'images/mozqabdlogo.png'

//function that generates the banner preview from user input text;
function previewBanner() {
  background_ctx.clearRect(0, 0, background.width, background.height); //            Clearing all
  textLayer_ctx.clearRect(0, 0, textLayer.width, textLayer.height);  //                 layers
  fxLogoLayer_ctx.clearRect(0,0,fxLogoLayer.width, textLayer.height); //                before
  mozqabdLogoLayer_ctx.clearRect(0,0, mozqabdLogoLayer.width, textLayer.height); //     preview

  background_ctx.drawImage(backgroundImage, 0, 0, background.width, background.height);
  fxLogoLayer_ctx.drawImage(fxLogoImage,105,110, fxLogoLayer.height/2.2, fxLogoLayer.height/2.2);
  mozqabdLogoLayer_ctx.drawImage(mozqabdLogoImage, 763,285, fxLogoImage.height/4.3197, fxLogoImage.height/7.623);
  textLayer_ctx.textAlign = "center";
  textLayer_ctx.fillText(document.getElementById("banner_heading").value, textLayer.width/2, textLayer.height/4);

  //now drwaing the textLayer canvas into the background canvas
  background_ctx.drawImage(textLayer, 0, 0, background.width, background.height);
  //drawing fx logo layer
  background_ctx.drawImage(fxLogoLayer, 0, 0, background.width, background.height);
  background_ctx.drawImage(mozqabdLogoLayer,0,0, background.width, background.height);
}
//Will it look good to lead the canvas totally white? Nope, show some default banner background;
window.addEventListener("load", function(){
  background_ctx.drawImage(backgroundImage, 0, 0, background.width, background.height);
  fxLogoLayer_ctx.drawImage(fxLogoImage,105,110, fxLogoLayer.height/2.2, fxLogoLayer.height/2.2);
  mozqabdLogoLayer_ctx.drawImage(mozqabdLogoImage, 763,285, fxLogoImage.height/4.3197, fxLogoImage.height/7.623);
  background_ctx.drawImage(fxLogoLayer, 0, 0, background.width, background.height);

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
