let running = false;
let n = 20;
let speed = 400;
let array = [];
let buttonslider = document.getElementById("Number");

function btn_off(){
    let buttonplay = document.getElementById("buttonplay");
    buttonplay.disabled = true;
    buttonslider.disabled = true; 
    buttonplay.style.cursor = "not-allowed";
    buttonslider.style.cursor = "not-allowed";
}
    
function btn_on(){
    let buttonplay = document.getElementById("buttonplay");
    buttonplay.disabled = false;
    buttonslider.disabled = false; 
    buttonplay.style.cursor = "pointer";
    buttonslider.style.cursor = "pointer";
}

reset();

function reset() {
    running = false;
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showBars(); 
    document.addEventListener("DOMContentLoaded", function () {
    btn_on();
    });
}

function play() {
    btn_off();
    const copy = [...array];
    const moves = BubbleSort(copy);
    animate(moves);
}

function animate(moves) {
    if (running == false) {
        btn_on();
        showBars();
        return ;
    }
    if (moves.length == 0) {
        showBars();
        btn_on();
        return ;
    }
    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.type == "swap") {
        [array[i], array[j]] = [array[j], array[i]];
    }
    showBars(move);
    setTimeout(function () {
        animate(moves);
    }, speed);
   
}

function BubbleSort(array) {
    running = true;
    const moves = [];
    for (let i = 0; i < array.length-1; i++) {
        for (let j = 0; j < array.length-1-i; j++) {
            moves.push({ indices: [j, j+1], type: "comp" });
            if (array[j] > array[j+1]){
                if (running == false) {
                    return;
                }
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                moves.push({ indices: [j, j+1], type: "swap" });
            }
        }
    }
    return moves;
}


function showBars(move) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.style.width = n * 100 + "%";
        bar.style.backgroundColor = "#66FCF1";
        bar.style.borderRadius = "15px";
        bar.classList.add("bar");
        if (move && move.indices.includes(i)) {
            if (move.type == "swap")
                bar.style.backgroundColor = "blue"
            else
                bar.style.backgroundColor = "red";
        }
        container.appendChild(bar);
    }
}

function sliderChange() {
    let slider = document.getElementById("Number").value;
    document.getElementById("sliderRangeValue").innerHTML = slider;
    n = slider;
    array = [];
    reset();
}

function speedChange() {
    let spd = document.getElementById("Speed").value;
    speed=1000-spd*100;
    document.getElementById("speedRangeValue").innerHTML = spd;
}

// SCROLL TO TOP BUTTON
let mybutton = document.getElementById("TopBtn");
window.onscroll = scrollFunction;

function scrollFunction() {
  if (document.body.scrollTop > 20|| document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
