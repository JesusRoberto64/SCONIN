//NAV MENU
const toogleBtn = document.getElementById("toogle-menu");
const navMenu = document.getElementById("nav-menu");

toogleBtn.addEventListener('click', ()=>{
    navMenu.classList.toggle("hidden");
    navMenu.classList.toggle("visible");
    toogleBtn.classList.toggle("cancel");
});