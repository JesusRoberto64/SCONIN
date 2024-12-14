//Progress bar for dots of carousel
let width = 0;
let progressBar;
let intervalID;

const fillBar = ()=>{
    if ( width >= 100){
        clearInterval(intervalID);
        progressBar.style.width = width + "%"
        $('.carousel').slick('slickNext');
    } else {
        width ++;
        progressBar.style.width = width + "%"
    }
}

export const setProgressBar = ()=>{
    progressBar = document.querySelector('.slick-dots li.slick-active button');

    $('.carousel').on('afterChange', (event, slick, currentSlide)=>{
        width = 0
        progressBar.style.width = width + "%"
        progressBar = document.querySelector('.slick-dots li.slick-active button');
        
        if (intervalID){
            clearInterval(intervalID);
        }
    
        intervalID = setInterval(fillBar,30);
    });
};

export const startFillBar = ()=>{
    if (intervalID){
        clearInterval(intervalID)
    }
    intervalID = setInterval(fillBar,30);
};

export const stopFillBar = ()=>{
    clearInterval(intervalID);
};

