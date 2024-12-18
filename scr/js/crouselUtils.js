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

