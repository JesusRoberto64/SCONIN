import { createViewport, onWindowResize, animate } from "./js/viewport";
import { loadHTML } from "./js/loader";

//card new design

const initiCards = ()=>{
    const cardDiv = document.getElementById("cards");

    const cardsDb = [
        {
            title: "Eliab y el Círculo del Juego",
            medium: "WEBTOON - WEB COMIC",
            img: "./assets/proyect_G&W.png",
            url: "https://www.webtoons.com/es/canvas/el-microbusero-2/la-revelaci%C3%B3n/viewer?title_no=742802&episode_no=1"
        },
        {
            title: "Jairo: El Pirata Callejero",
            medium: "MINI COMIC IMPRESO",
            img: "./assets/proyect_plank.png",
            url: "https://www.google.com/"
        },
        {
            title: "PROTECTOR",
            medium: "JUEGO LCD DE ACCIÓN",
            img: "./assets/proyect_helix.png",
            url: "https://sconin.itch.io/protector"
        }
    ]; 

    cardsDb.forEach((card)=>{
        let a = document.createElement("a");
        a.className = "card";
        a.href = card.url;
        a.target = "_blank";
        
        let overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.innerText = card.title;
        a.appendChild(overlay);
       
        let img = document.createElement("img");
        //img.src = card.img;

        a.appendChild(img);
        
        let p = document.createElement("p");
        p.innerText = card.medium;
        a.appendChild(p);

        let h3 = document.createElement("h3"); 
        h3.innerText = card.title;
        a.appendChild(h3);

        cardDiv.appendChild(a);
    })


}

initiCards();


//Carrusel load
initializeCarousel();

//shader load
let previousWidth = window.innerWidth;

const viewport = document.getElementById('viewport');
let hero = document.getElementById('hero');
const isMobileDevice = isMobile();
centerHeroTitle();

document.body.classList.add('no-scroll');

window.addEventListener("load", ()=>{
    setTimeout(()=>{
        shaderFitScreen();
        createViewport();
        onWindowResize();
        animate();
        document.body.classList.remove('no-scroll');
        let loading = document.querySelector('#loadig-screen');
        if (loading) {
            loading.style.display = 'none';
        }
    }, 1000);  
})

//shader and hero sizes
const shaderFitScreen = ()=>{
    
    if (!isMobileDevice){
        viewport.style.height = window.innerHeight-16;
    }else{
        viewport.style.height = window.innerHeight;
    }

    viewport.style.width = window.innerWidth;

    centerHeroTitle();
}

window.addEventListener('resize', ()=>{
    const currentWidth = window.innerWidth;
    if (isMobileDevice){
        const significanteChange = 
            currentWidth > previousWidth || currentWidth < previousWidth;
        
        if ( significanteChange ){
            //---> aspect ratio
            shaderFitScreen();
        }
    } else {
        //-->Aspect ratio
        shaderFitScreen();
    }

    previousWidth = currentWidth;
    centerHeroTitle();
    onWindowResize();
});

function centerHeroTitle(){
    let v = getComputedStyle(viewport).height;
    let viewportValue = parseFloat(v);

    let halfHeight = (viewportValue/2) - 60.0;

    hero.style.top = `${halfHeight}px`
    hero.style.width = "100%"
}

function isMobile(){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

////

async function loadConfigureCarousel(htmlPath, elementId, carouselSelector, options) {
    await loadHTML(htmlPath, elementId);
    const carouselElement  = document.querySelector(carouselSelector);
    new bootstrap.Carousel(carouselElement, options);


}

async function initializeCarousel() {
    try {
        await loadConfigureCarousel("./views/courruselEliab.html", "carruselEliab","#carouselEliabIndicators", {
            interval: 2000,
            touche: true
        });
        await loadConfigureCarousel("./views/carolseProtecor.html", "carruselProtector","#carouselProtectorIndicators", {
            interval: 2000,
            touche: true
        });
    } catch (error) {
        console.error("Error al cargar y configurar los carruseles:", error);
    }
}