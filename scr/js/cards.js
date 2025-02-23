import cardsDb from "./cardsDb";

const initiCards = ()=>{
    const cardDiv = document.getElementById("cards");
    if (!cardDiv){ return }

    const arrSvg = "./assets/east_Icon.svg"

    cardsDb.forEach((card)=>{
        let cardElment = document.createElement("a");
        cardElment.className = "card";
        cardElment.href = card.url;
        cardElment.target = "_blank";

        let imgDiv = document.createElement('div');
        cardElment.appendChild(imgDiv);

        let img = document.createElement("img");
        img.src = card.img;
        imgDiv.appendChild(img);
        
        let div = document.createElement("div");
        div.className = "cardDiv";
        cardElment.appendChild(div);
        
        let h3 = document.createElement("h3"); 
        h3.innerText = card.title;
        div.appendChild(h3);
        
        let p = document.createElement("p");
        p.innerText = card.medium;
        div.appendChild(p);

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