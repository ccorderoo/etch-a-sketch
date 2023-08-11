const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#333333'

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function setCurrentColor(newColor) {
    currentColor = newColor;
}

let colorBtn = document.getElementById('color-btn');
let clearBtn = document.getElementById('clear-btn');
let sizeValue = document.getElementById('size-value');
let sizeSlider = document.getElementById('settings-slider');
let grid = document.getElementById('grid');

colorBtn.oninput = (e) => setCurrentColor(e.target.value)
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = '';
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElement);
    }
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function changeColor(e) {
    if(e.type === 'mouseover' && !mouseDown) return 
    e.target.style.backgroundColor = currentColor;
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE);
}