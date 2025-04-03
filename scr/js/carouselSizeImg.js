const largeImgs = "./assets/banner_escritorio_1.png"

const smallImgs = "./assets/banner_movil_1.png"

const carouselChangeImg = () => {
    const banner = document.getElementById('banner');
    if (banner != null){
        const width = window.innerWidth;
        if (width <= 576){
            banner.src = smallImgs
        }else{
            banner.src = largeImgs
        }
    }
}

export default carouselChangeImg;