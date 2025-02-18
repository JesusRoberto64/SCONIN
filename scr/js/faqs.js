import faqs from "./faqData";


const initList = (arr)=>{
    const list = document.getElementById('faq');
    arr.forEach(element => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const button = document.createElement('button');
        button.innerHTML = `<img src="./assets/plus_icon.svg"></img>`
        div.appendChild(button);

        const h2 = document.createElement('h2');
        h2.innerText = element.question;
        div.appendChild(h2);

        const pAnswer = document.createElement('p');
        pAnswer.innerHTML = element.answer;
        pAnswer.className = "answer";

        li.appendChild(div);
        li.appendChild(pAnswer);
    
        list.appendChild(li);
        
        li.addEventListener('click', () =>{
            pAnswer.classList.toggle("answer-show");
            if (pAnswer.classList.contains("answer-show")){
                button.innerHTML = `<img src="./assets/minus_icon.svg"></img>`
            }else{
                button.innerHTML = `<img src="./assets/plus_icon.svg"></img>`
            }
        });
    });

    const questions = document.querySelectorAll('#faq li');
    const lastQuestion = questions[questions.length - 1];
    lastQuestion.classList.add("faq-downcorner");
}

export const initFaq = ()=>{
    initList(faqs);
}

export const initObras= ()=>{
    initList(faqs);
}