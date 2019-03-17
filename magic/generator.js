
//lets set the maximum length for the headline.
document.getElementById("banner_heading").setAttribute("maxlength", "40");

// getting channel value
var channel =  document.getElementById("channel_name");

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
textLayer_ctx.font = "350 300% Zilla Slab";

//lets create a background image element;
var backgroundImage = new Image(background.width, background.height);
backgroundImage.src = 'images/banner_plain.svg';

//lets create all firefox logo image element
var fxLogoImage = [];
fxLogoImage[0] = new Image(background.height, background.height);
fxLogoImage[0].src = 'images/release.png';
fxLogoImage[1] = new Image(background.height, background.height);
fxLogoImage[1].src = 'images/beta.png';
fxLogoImage[2] = new Image(background.height, background.height);
fxLogoImage[2].src = 'images/nightly.png';
fxLogoImage[3] = new Image(background.height, background.height);
fxLogoImage[3].src = 'images/dev.png';


//now create mozqabd logo image element
var mozqabdLogoImage = new Image(background.height, background.height);
mozqabdLogoImage.src = 'images/mozqabdlogo.png'

//function that generates the banner preview from user input text;
function previewBanner() {

    background_ctx.clearRect(0, 0, background.width, background.height); //            Clearing all
    textLayer_ctx.clearRect(0, 0, textLayer.width, textLayer.height);  //                 layers
    fxLogoLayer_ctx.clearRect(0,0,fxLogoLayer.width, textLayer.height); //                before
    mozqabdLogoLayer_ctx.clearRect(0,0, mozqabdLogoLayer.width, textLayer.height); //     preview

    // Drawing background
    background_ctx.drawImage(backgroundImage, 0, 0, background.width, background.height);

    //now drwaing the textLayer canvas into the background canvas
    textLayer_ctx.textAlign = "center";
    textLayer_ctx.fillText(document.getElementById("banner_heading").value, textLayer.width/2, textLayer.height/4);
    background_ctx.drawImage(textLayer, 0, 0, background.width, background.height);

    //drawing fx logo layer
    if(channel.value>=0 && channel.value<=3)   // changing fxlogo based on selected channel
    fxLogoLayer_ctx.drawImage(fxLogoImage[channel.value],105,110, fxLogoLayer.height/2.2, fxLogoLayer.height/2.2);
    else {          // if no channel is selected, default is release
        fxLogoLayer_ctx.drawImage(fxLogoImage[0],105,110, fxLogoLayer.height/2.2, fxLogoLayer.height/2.2);
    }
    background_ctx.drawImage(fxLogoLayer, 0, 0, background.width, background.height);

    //drawing mozqabd community logo layer
    mozqabdLogoLayer_ctx.drawImage(mozqabdLogoImage, 763,285, fxLogoImage[0].height/4.3197, fxLogoImage[0].height/7.623);
    background_ctx.drawImage(mozqabdLogoLayer,0,0, background.width, background.height);
}

//Will it look good to lead the canvas totally white? Nope, show some default banner background;
window.addEventListener("load", function(){
    background_ctx.drawImage(backgroundImage, 0, 0, background.width, background.height);
    fxLogoLayer_ctx.drawImage(fxLogoImage[0],105,110, fxLogoLayer.height/2.2, fxLogoLayer.height/2.2);
    mozqabdLogoLayer_ctx.drawImage(mozqabdLogoImage, 763,285, fxLogoImage[0].height/4.3197, fxLogoImage[0].height/7.623);
    background_ctx.drawImage(fxLogoLayer, 0, 0, background.width, background.height);
    background_ctx.drawImage(mozqabdLogoLayer, 0, 0, background.width, background.height);
});


//update banner preview based on channel selection
channel.addEventListener("change", function(){
    previewBanner(); //
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
