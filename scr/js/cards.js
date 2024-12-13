import cardsDb from "./cardsDb";

const initiCards = ()=>{
    const cardDiv = document.getElementById("cards");
    const arrSvg = "./assets/east_Icon.svg"

    cardsDb.forEach((card)=>{
        let cardElment = document.createElement("a");
        cardElment.className = "card";
        cardElment.href = card.url;
        cardElment.target = "_blank";

        let img = document.createElement("img");
        img.src = card.img;

        cardElment.appendChild(img);
        
        let h3 = document.createElement("h3"); 
        h3.innerText = card.title;
        cardElment.appendChild(h3);
        
        let div = document.createElement("div");
        div.className = "cardDiv";
        cardElment.appendChild(div);
        
        let p = document.createElement("p");
        p.innerText = card.medium;
        div.appendChild(p);

        let arrow = document.createElement("div");
        div.appendChild(arrow);

        let imgArrow = document.createElement('img');
        imgArrow.src = arrSvg;
        arrow.appendChild(imgArrow);

        cardDiv.appendChild(cardElment);
    });
   
    let lastScrollY = window.scrollY;
    const observer = new IntersectionObserver(
        (entries)=>{
            
            entries.forEach((entry)=>{
                const isScrollingUp = window.scrollY <= lastScrollY;
                
                if ( entry.isIntersecting){
                    entry.target.classList.add('active');
                } else if (isScrollingUp) {
                    entry.target.classList.remove('active');
                }
            });
            lastScrollY = window.scrollY;
        },
        {
            threshold: 0.1
        }
    );

    document.querySelectorAll('.card').forEach((card) =>{
        observer.observe(card);
    });
}

export default initiCards;