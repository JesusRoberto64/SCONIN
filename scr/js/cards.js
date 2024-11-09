import cardsDb from "./cardsDb";

const initiCards = ()=>{
    const cardDiv = document.getElementById("cards");


    cardsDb.forEach((card)=>{
        let a = document.createElement("a");
        a.className = "card";
        a.href = card.url;
        a.target = "_blank";
        
        let overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.innerText = card.title;
        a.appendChild(overlay);
       
        let img = document.createElement("img");
        img.src = card.img;

        a.appendChild(img);
        
        let p = document.createElement("p");
        p.innerText = card.medium;
        a.appendChild(p);

        let h3 = document.createElement("h3"); 
        h3.innerText = card.title;
        a.appendChild(h3);

        cardDiv.appendChild(a);
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