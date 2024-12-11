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
    
    if (width <= 768){
        imgs.forEach(img => {
            const route = img.src
            //img.src = route + "_MOVIL.png"
            console.log(img.src);
        });
    }else{
        
    }

}

export default carouselChangeImg;