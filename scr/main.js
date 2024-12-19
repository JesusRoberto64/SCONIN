import Navigo from "navigo";
import initiCards from "./js/cards";
import carouselChangeImg from "./js/carouselSizeImg";
import { setProgressBar, startFillBar, setTimer, restartBar } from "./js/progressBar";
import { loadHTML } from "./js/loader";
import { carouselConfig } from "./js/crouselUtils";

// NVIGATION APP
const router = new Navigo('/SCONIN', {hash: false, noMatchWarning: true});
const appElement = document.getElementById('app');

router.on({
    '': () => {
        loadHTML('./views/main.html', appElement)
        .then( ()=>{    
            initiCards();
            $('.carousel').slick(carouselConfig);
            
            window.addEventListener('resize', carouselChangeImg);
            carouselChangeImg();

            setProgressBar();
            const carousel = document.querySelector('.carousel');
            setTimer(carousel);
            startFillBar();
            
        })
        
    },
    'nosotros' : () =>{
        loadHTML('./views/nosotros.html', appElement);
    },
    'proyectos' : () =>{
        appElement.innerHTML = `<h1>Nuestro trabajo</h1>`
    }
}).resolve();


//NAV MENU
const toogleBtn = document.getElementById("toogle-menu");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

const toogle = () =>{ 
    navMenu.classList.toggle("hidden");
    navMenu.classList.toggle("visible");
    toogleBtn.classList.toggle("cancel");
};

toogleBtn.addEventListener('click', toogle);

navLinks.forEach(element => {
    element.addEventListener('click', toogle)
});

//LOADING SCREEN
document.body.classList.add('no-scroll');
window.addEventListener("load", ()=>{
    setTimeout(()=>{
        document.body.classList.remove('no-scroll');
        let loading = document.querySelector('#loadig-screen');
        if (loading) {
           loading.style.display = 'none';
           
           if ( document.querySelector('.carousel') ){ 
                restartBar();
            }
            
        }
    }, 1000);  
})




