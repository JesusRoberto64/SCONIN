const largeImgs = [
    "./assets/banner_escritorio_1.png",
    "./assets/ANUNCIO_2_ESCRITORIO.png"
];

const smallImgs = [
    "./assets/banner_movil_1.png",
    "./assets/ANUNCIO_2_MOVIL.png"
];

const carouselChangeImg = ()=>{
    // The number of elements in the arrays above are the overflow images that wil slide in the carousel
    
    const banner = document.querySelectorAll('.banner');
    const width = window.innerWidth;

    if (width <= 576){
       
        /*
        for (let i = 0; i < banner.length; i++) {
            const element = banner[i];
            element.src = smallImgs[i%smallImgs.length];
        }
        */
    }else{
        
        /*
        for (let i = 0; i < banner.length; i++) {
            const element = banner[i];
            element.src = largeImgs[i%largeImgs.length];
        }
         */ 
    }
}

export default carouselChangeImg;