/* This funtion is the configuration using slick lybary https://kenwheeler.github.io/slick/
    to get it wrking just use in the main.js -> $('.carousel').slick(carouselConfig);
    and for the use of the filling bar use
    
    setProgressBar();
    const carousel = document.querySelector('.carousel');
    setTimer(carousel);
    startFillBar();
*/
export const carouselConfig = {
    centerMode: true,
    slidesToShow: 1,
    accessibility: false,
    centerPadding: '0px',
    dots: true,
    prevArrow: '<button type="button" class="custom-prev"><img src="./assets/east_Icon.svg" alt="Next"></button>',
    nextArrow: '<button type="button" class="custom-next"><img src="./assets/east_Icon.svg" alt="Next"></button>',
    responsive: [
        {
            breakpoint : 576,
            settings:{
                arrows: false, 
            }
        }
    ]
}

//SIMPLE CAROUSEL ANIM
export const simpleCarousel = ()=>{
    const track = document.querySelector('.carousel-nosotros-track');
    let position = 0;
    const speed = 0.5;

    const animate = ()=>{
        position -= speed;
        if ( Math.abs(position) >= track.offsetWidth / 2) {
            position = 0;
        };
        track.style.transform = `translateX(${Math.round(position)}px)`;
        requestAnimationFrame(animate);
    }

    animate();
}