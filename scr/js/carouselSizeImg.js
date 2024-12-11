const LargeImgs = [
    "./assets/ANUNCIO_1_ESCRITORIO.png",
    "./assets/ANUNCIO_2_ESCRITORIO.png"
];

const smallImgs = [
    "./assets/ANUNCIO_1_MOVIL.png",
    "./assets/ANUNCIO_2_MOVIL.png"
];

const imgRoutes = [

]

const carouselChangeImg = ()=>{
    const imgs = document.querySelectorAll('.banner');
    const width = window.innerWidth;
    
    imgs.forEach(img => {
        console.log(img.src);
    });
    if (width <= 768){
    }else{
        
    }

}

export default carouselChangeImg;