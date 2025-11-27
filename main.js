const launcher = document.getElementById("container-launcher");
const container = document.getElementById("container");
const icons = document.querySelectorAll(".icon");
const windows = document.querySelectorAll(".window");
const projectrow = document.querySelectorAll(".project-row");


// Toggle welcome menu
launcher.addEventListener("click", () => {
  container.classList.toggle("visible");
  launcher.classList.toggle("launcher-shifted");
});


//open Windows from icons
icons.forEach(icon => {
  icon.addEventListener("click", () => {
    const id = icon.dataset.window;
    const win = document.getElementById(id);

    win.classList.add("show");

    focusWindow(win);

  });
});

//open project-windows from rows
projectrow.forEach(projectrow => {
  projectrow.addEventListener("click", () => {
    const id = projectrow.dataset.window;
    const win = document.getElementById(id);

    win.classList.add("show");

    focusWindow(win);

    enableTitleScroll(win);
  });
});


// close windows
document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", e => {
    const win = e.target.closest(".window");
    win.classList.remove("show");
    win.classList.remove("active");
  });
});


// bring window to front

let zIndexCounter = 50;

function focusWindow(win) {
  zIndexCounter++;
  win.style.zIndex = zIndexCounter;

  windows.forEach(w => w.classList.remove("active"));
  win.classList.add("active");
}


// drag windows

windows.forEach(win => {
  const titleBar = win.querySelector(".title-bar");
  let offsetX = 0, offsetY = 0;
  let isDragging = false;

  titleBar.addEventListener("mousedown", e => {
    isDragging = true;
    focusWindow(win);

    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;

    win.classList.add("dragging");
  });

  document.addEventListener("mousemove", e => {
    if (!isDragging) return;

    win.style.left = (e.clientX - offsetX) + "px";
    win.style.top = (e.clientY - offsetY) + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    win.classList.remove("dragging");
  });
});



//Gradient follows cursor

document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});



// Project overlay

const preview = document.getElementById("surgestPreview");
const overlay = document.getElementById("embedOverlay");
const iframe = document.getElementById("embedFrame");
const closeEmbed = document.getElementById("closeEmbedOverlay");

const SURGEST_URL = "https://cgvr.cs.uni-bremen.de/teaching/studentprojects/surgest/";

//Open overlay
preview.addEventListener("click", () => {
    iframe.src = SURGEST_URL;
    overlay.style.display = "flex";
});

// Close Overlay
closeEmbed.addEventListener("click", () => {
    overlay.style.display = "none";
    iframe.src = ""; // wichtig: stoppt das Laden
});


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" selected", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " selected";
} 




