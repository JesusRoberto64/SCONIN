export function loadHTML(filePath, continerElement){
    return new Promise((resolve, reject)=>{

        fetch(filePath)
        .then( response => {
            if (!response.ok){
                throw new Error(`HTML error! Status: ${response.status}`)
            }
            return response.text();
        })
        .then(html =>{
            continerElement.innerHTML = html;
            resolve();
        })
        .catch(error => {
            console.log(error);
            continerElement.innerHTML = `<h1>Error</h1><p>No se pudo cargar el archivo.</p>`;
            reject(error);
        });

    })
    /*
    fetch(filePath)
        .then( response => {
            if (!response.ok){
                throw new Error(`HTML error! Status: ${response.status}`)
            }
            return response.text();
        })
        .then(html =>{
            continerElement.innerHTML = html;
        })
        .catch(error => {
            console.log(error);
            continerElement.innerHTML = `<h1>Error</h1><p>No se pudo cargar el archivo.</p>`;
        });
    */
}