import { createViewport, onWindowResize, animate } from "./js/viewport";
//import { loadHTML } from "./js/loader";

//card new design
const initiCards = ()=>{
    const cardDiv = document.getElementById("cards");

    const cardsDb = [
        {
            title: "Eliab y el Círculo del Juego",
            medium: "WEBTOON - WEB COMIC",
            img: "./assets/card_Eliab_00.png",
            url: "https://www.webtoons.com/es/canvas/el-microbusero-2/la-revelaci%C3%B3n/viewer?title_no=742802&episode_no=1"
        },
        {
            title: "Jairo: El Pirata Callejero",
            medium: "MINI COMIC IMPRESO",
            img: "./assets/card_Eliab_01.png",
            url: "https://www.google.com/"
        },
        {
            title: "Protector",
            medium: "JUEGO LCD DE ACCIÓN",
            img: "./assets/card_Protector_00.png",
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
        img.src = card.img;

        a.appendChild(img);
        
        let p = document.createElement("p");
        p.innerText = card.medium;
        a.appendChild(p);

        let h3 = document.createElement("h3"); 
        h3.innerText = card.title;
        a.appendChild(h3);

        cardDiv.appendChild(a);
    });
   
    let lastScrollY = window.scrollY;
    const observer = new IntersectionObserver(
        (entries)=>{
            
            entries.forEach((entry)=>{
                const isScrollingUp = window.scrollY <= lastScrollY;
                
                if ( entry.isIntersecting){
                    entry.target.classList.add('active');
                } else if (isScrollingUp) {
                    entry.target.classList.remove('active');
                }
            });
            lastScrollY = window.scrollY;
        },
        {
            threshold: 0.1
        }
    );

    document.querySelectorAll('.card').forEach((card) =>{
        observer.observe(card);
    });
}

initiCards();

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
