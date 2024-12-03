import { createViewport, onWindowResize, animate } from "./js/viewport";
import initiCards from "./js/cards";

//Load carousel
$('.carousel').slick({
    centerMode: true,
    slidesToShow: 1,
    accessibility: false,
    centerPadding: '0px',
    dots: true,
    //appendDots: $(".dots"),
    arrows: false,
    
    responsive: [
        {
            breakpoint : 576,
            settings:{
                arrows: true
            }
        }
    ]
    
});



//NAV MENU
const toogleBtn = document.getElementById("toogle-menu");
const navMenu = document.getElementById("nav-menu");

toogleBtn.addEventListener('click', ()=>{
    navMenu.classList.toggle("hidden");
    navMenu.classList.toggle("visible");
});

//card new design
initiCards();

//SHADER LOAD
let previousWidth = window.innerWidth;

const viewport = document.getElementById('viewport');
const hero = document.getElementById('hero');
const isMobileDevice = isMobile();

if ( viewport !== null ){
    centerHeroTitle();
}

document.body.classList.add('no-scroll');

window.addEventListener("load", ()=>{
    setTimeout(()=>{
        if (viewport !== null){
            shaderFitScreen();
            createViewport();
            onWindowResize();
            animate();
        }
        document.body.classList.remove('no-scroll');
        let loading = document.querySelector('#loadig-screen');
        if (loading) {
           loading.style.display = 'none';
        }

        //Carousel Buttons
        let btns = document.querySelectorAll(".carousel li button")
        
        btns.forEach(btn => {
            //btn.innerHTML = "";
            
        });

    }, 1000);  
})

if ( viewport !== null){

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
}

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
