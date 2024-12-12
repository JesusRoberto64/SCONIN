const largeImgs = [
    "./assets/ANUNCIO_1_ESCRITORIO.png",
    "./assets/ANUNCIO_2_ESCRITORIO.png"
];

const smallImgs = [
    "./assets/ANUNCIO_1_MOVIL.png",
    "./assets/ANUNCIO_2_MOVIL.png"
];

const carouselChangeImg = ()=>{
    const imgs = document.querySelectorAll('.banner');
    const width = window.innerWidth;

    if (width <= 576){
       for (let i = 0; i < imgs.length; i++) {
            const element = imgs[i];
            element.src = smallImgs[i%smallImgs.length];
        }
    }else{
        for (let i = 0; i < imgs.length; i++) {
            const element = imgs[i];
            element.src = largeImgs[i%largeImgs.length];
        }  
    }
}

export default carouselChangeImg;