//Progress bar for dots of carousel
let width = 0;
let progressBar;
let intervalID;

//timer
let hoverTimer = null;
let hovering = false;


const fillBar = ()=>{
    if ( progressBar === null){return}
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
    if ( progressBar === null){return}
    $('.carousel').on('afterChange', (event, slick, currentSlide)=>{
        width = 0
        if (progressBar !== null){
            progressBar.style.width = width + "%"
        }
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

export const setTimer = (carousel)=>{
    carousel.addEventListener('mouseover', ()=>{
        if (!hovering){
            hovering = true;
            stopFillBar();
        }
    
        //Cancelar hover timer
        if ( hoverTimer !== null){
            clearTimeout(hoverTimer);
        }
        //inicirar nuevo timer
        hoverTimer = setTimeout(()=>{
            startFillBar();
        },3000);
        
    });
        
    carousel.addEventListener('mousemove', ()=>{
        stopFillBar();
    
        //Reiniciar temporalizador
        if ( hoverTimer !== null){
            clearTimeout(hoverTimer);
        }
        
        hoverTimer = setTimeout(()=>{
            startFillBar();
        },3000);
            
    });
        
    carousel.addEventListener('mouseout', ()=>{
        if (hovering){
            hovering = false;
            startFillBar();
        }
    
        //clear hover timer
        if ( hoverTimer !== null){
            clearTimeout(hoverTimer);
        }
    });
};

export const restartBar = ()=>{
    clearInterval(intervalID);
    progressBar.style.width = '0%';
    width = 0;
    startFillBar();
};