const hover = document.querySelector('#hover');
const buttonRed = document.querySelector('#buttonRed')
const buttonGreen = document.querySelector('#buttonGreen')
const buttonBlue = document.querySelector('#buttonBlue')
const textColor = document.querySelector('#textColor')
const background = document.querySelector('#background')
const buttonConta = document.querySelector('#buttonConta')
const variableCount = document.querySelector('#counter')
const colorValue = document.querySelector('#colorInput')
const backgroundColor = document.querySelector('#backgroundColor')
clrNumber = 0;
counter = 0;

function hoverText() {
    hover.innerText = "Obrigado por passares!";
}

function buttonChangeRed(){
    textColor.style.color = "red";
}

function buttonChangeGreen(){
    textColor.style.color = "green";
}

function buttonChangeBlue(){
    textColor.style.color = "blue";
}

function changeTextBoxColor(){
    clrNumber++;
    if(clrNumber % 4 == 0) background.style.backgroundColor = 'lightgrey'
    if(clrNumber % 4 == 1) background.style.backgroundColor = 'lightblue'
    if(clrNumber % 4 == 2) background.style.backgroundColor = 'salmon'
    if(clrNumber % 4 == 3) background.style.backgroundColor = 'khaki'

}

function count(){
    counter++;
    variableCount.innerHTML=counter;
}

hover.addEventListener('mousehover', hoverText);
hover.addEventListener('mouseout', hoverText);
buttonRed.addEventListener('click', buttonChangeRed);
buttonGreen.addEventListener('click', buttonChangeGreen);
buttonBlue.addEventListener('click', buttonChangeBlue);
background.addEventListener('keyup', changeTextBoxColor)
buttonConta.addEventListener('click', count)