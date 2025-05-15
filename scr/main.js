import Navigo from "navigo";
import initiCards from "./js/cards";
import carouselChangeImg from "./js/carouselSizeImg";
import { loadHTML } from "./js/loader";
import { simpleCarousel } from "./js/crouselUtils";
import { initFaq } from "./js/faqs";

// NVIGATION APP
const router = new Navigo('/', {hash: false, noMatchWarning: true});
const appElement = document.getElementById('app');

router.on({
    '': () => {
        loadHTML('./views/main.html', appElement)
        .then( ()=>{    
            initiCards();
            
            window.addEventListener('resize', carouselChangeImg);
            carouselChangeImg();
            
            const goToTopLink = document.getElementById("goToTop");
            if (goToTopLink){
                goToTopLink.addEventListener("click", (event)=>{
                    event.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'instant' });
                })
            }
            
        });
    },
    'nosotros' : () =>{
        loadHTML('./views/nosotros.html', appElement)
        .then(initFaq)
        .then(simpleCarousel)
    },
    'apoyo' : () =>{
        loadHTML('./views/apoyo.html', appElement)
        .then(simpleCarousel)
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
            //loading screen
            loading.style.display = 'none';
        }
    }, 1000);  
})




