// Gloabl
const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");
let initialColors;

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
    colorDivs.forEach((div, index) => {
        const hexText = div.children[0];
        const randomColor = generateHex();

        // add color to the background
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;
        checkTextContrast(randomColor, hexText); // checks for contrast
    });
}
randomColors();
function checkTextContrast(color, text) {
    const luminance = chroma(color).luminance(); // any color format, normal, hex or rgb
    if(luminance > 0.5) {
        text.style.color = "#262626";
    } else {
        text.style.color = "#FCFCFC";
    }
}

