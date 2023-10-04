// Gloabl
const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");
let initialColors;

// adding event listeners
sliders.forEach(slider => {
    slider.addEventListener("input", hslControls);
});

colorDivs.forEach((div, index) => {
    div.addEventListener("change", () => {
        updateTextUI(index);
    });
});
//Functions

// color generator
function generateHex() {
    // const letters = '#0123456789ABCDEF';
    // let hash = '#';
    
    // for(let i=0; i<6; i++) {
    //     hash += letters[Math.floor(Math.random() * 16)];
    // }
    // return hash;
    const hexColor = chroma.random();
    return hexColor;
}

// random color divs on the page
function randomColors() {
    //
    initialColors = [];
    colorDivs.forEach((div, index) => {
        const hexText = div.children[0];
        const randomColor = generateHex();

        //add generated colors to the array
        initialColors.push(chroma(randomColor).hex());

        // add color to the background
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;
        checkTextContrast(randomColor, hexText); // checks for contrast

        //initialize colorize sliders
        const color = chroma(randomColor);
        const sliders = div.querySelectorAll(".sliders input");
        // console.log(sliders);
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];

        colorizeSliders(color, hue, brightness, saturation);
    });
}

function checkTextContrast(color, text) {
    const luminance = chroma(color).luminance(); // any color format, normal, hex or rgb
    if(luminance > 0.5) {
        text.style.color = "#262626";
    } else {
        text.style.color = "#FCFCFC";
    }
}

function colorizeSliders(color, hue, brightness, saturation) {
    // scale saturation
    const noSat = color.set('hsl.s', 0);
    const fullSat = color.set('hsl.s', 1);
    const scaleSat = chroma.scale([noSat, color, fullSat]);

    // scale brightness
    const midBright = color.set('hsl.l', 0.5);
    const scaleBright = chroma.scale(["black", midBright, "white"]);

    // update input colors
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)}, ${scaleBright(0.5)}, ${scaleBright(1)})`
    hue.style.backgroundImage = `linear-gradient(to right, rgb(204, 75, 75), rgb(204, 204, 75), rgb(75, 204, 75), rgb(75, 204, 204), rgb(75, 75, 204), rgb(204, 75, 204), rgb(204, 75, 75))`;
}

function hslControls(e) {
    // console.log(e);
    const index = 
    e.target.getAttribute('data-bright') ||
    e.target.getAttribute('data-sat') ||
    e.target.getAttribute('data-hue');
    // console.log(index);

    let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    const bgColor = initialColors[index];
    console.log(bgColor);
    let color = chroma(bgColor)
        .set('hsl.s', saturation.value)
        .set('hsl.l', brightness.value)
        .set('hsl.h', hue.value);

    colorDivs[index].style.backgroundColor = color;    
}

function updateTextUI(index) {
    const activeDiv = colorDivs[index];
    const color = chroma(activeDiv.style.backgroundColor);
    // console.log(color);
    const textHex = activeDiv.querySelector("h1");
    const icons = activeDiv.querySelectorAll(".controls button");
    textHex.innerText = color.hex();

    //check contrast
    checkTextContrast(color, textHex);
    for ( let icon of icons ) {
        checkTextContrast(color, icon);
    }
}

randomColors();