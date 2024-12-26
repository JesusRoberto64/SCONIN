import faqs from "./faqData";

export const initFaq = ()=>{
    const faqList = document.getElementById('faq');
    faqs.forEach(faq => {
        const li = document.createElement('li');
    
        const div = document.createElement('div');
        
        const button = document.createElement('button');
        
        button.innerHTML = `<img src="./assets/plus_icon.svg"></img>`
        div.appendChild(button);
    
        const h2 = document.createElement('h2');
        h2.innerText = faq.question;
        div.appendChild(h2);
    
        const pAnswer = document.createElement('p');
        pAnswer.innerText = faq.answer;
        pAnswer.className = "answer";
    
        li.appendChild(div);
        li.appendChild(pAnswer);
    
        faqList.appendChild(li);
    
        button.addEventListener('click', ()=>{
            pAnswer.classList.toggle("answer-show");
            
        })
    });
    
    const questions = document.querySelectorAll('.nosotros-section li div');
    const lastQuestion = questions[questions.length - 1];
    lastQuestion.classList.add("faq-downcorner");
}

