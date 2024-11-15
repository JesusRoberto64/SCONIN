import { createViewport, onWindowResize, animate } from "./js/viewport";
import initiCards from "./js/cards";
//import { loadHTML } from "./js/loader";

//Load carousel
$('.carousel').slick({
    centerMode: true,
    slidesToShow: 3,
    accessibility: false,
    centerPadding: '25px',
    dots: false,
    arrows: false,
    responsive: [
        {
            breakpoint : 576,
            settings:{
                dots: true,
                slidesToShow: 1,
                centerPadding: '50px',
                arrows: true
            }
        }
    ]
    
});
/*
*/
//card new design
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
