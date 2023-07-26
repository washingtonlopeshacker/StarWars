let currentPageUrl = 'https://swapi.dev/api/starships/'  // 6 - pegando a url armazenada NA VARIAVEL para redeclarar TOD VEZ QUE atualizar
window.onload = async () => {
    try {
        await loadSpacers (currentPageUrl); //  4- passa (url) por aqui  e envia -5
    }catch (error){                                         //7 envia retornando
    console.log(error)
    alert('Erro ao carregar cards');
    }
    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadSpacers  (url) {                     // 8 - voltando a URL então é recebida aqui 
    const mainuContent = document.getElementById('mainu-content')
    mainuContent.innerHTML = '';                         // 1- limpar resultados anteriores
    try {
        const response =  await fetch(url);         // 2 -fettch - faz a requisição para url da api,  é recebido na url acima - 3
        const responseJson =  await response.json(); // 9 - estilizada ou redenerizada final primeira requizição // await - por ser uma requizição e uma promess - ( aguarde )
                                                    // espere essa requizição acontecer para depois armazenar na variavel
    responseJson.results.forEach((spacers) => {    // .result pega so o array que desjamos da Api  ForEach vais fazer o lupe que vai interar com todos objetos do array para (Character)
        const card = document.createElement("div")   // cria um novo elemnto html (card)
        card.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/starships/${spacers.url.replace(/\D/g,"")}.jpg')`
        card.className = "cards"
    
        const spacersNameBG = document.createElement("div")   // cria um novo elemnto html (characterName.BG)
        spacersNameBG.className = "spacers-name-bg"
        
        const spacersName = document.createElement("span")
        spacersName.className = "spacers-name"
        spacersName.innerText = `${spacers.name}`

        spacersNameBG.appendChild(spacersName)                // coloca um filho text dento do characterNameBG
        card.appendChild(spacersNameBG)

    card.onclick = () =>{

        const modalu =  document.getElementById('modalu')
        modalu.style.visibility = "visible"
            
        const modaluContent =  document.getElementById('modalu-content')
        modaluContent.innerHTML = '';        // innerHTML   vai alterar o HTML

        const spacersImage = document.createElement("div")   // cria um novo elemnto html (card)
        spacersImage.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/starships/${spacers.url.replace(/\D/g,"")}.jpg')`
        spacersImage.className = "spacers-image"

        const spacersName = document.createElement('span')
        spacersName.className = "spacers-name"
        spacersName.innerText = `nome:${spacers.name}`

        const spacersModel = document.createElement('span')
        spacersModel.className = "spacers-details"
        spacersModel.innerText = `Modelo: ${spacers.model}`

        const manuFacturer= document.createElement('span')
        manuFacturer.className = "spacers-details"
        manuFacturer.innerText = `Corporação: ${spacers.manufacturer}`

        const hiperSpeed = document.createElement('span')
        hiperSpeed.className = "spacers-details"
        hiperSpeed.innerText = ` velocidade: ${spacers.max_atmosphering_speed}`

        const hiperDrive = document.createElement('span')
        hiperDrive.className = "spacers-details"
        hiperDrive.innerText = `Pilotagem  ${spacers.hyperdrive_rating}`
        
        modaluContent.appendChild(spacersImage)
        modaluContent.appendChild(spacersName)
        modaluContent.appendChild(spacersModel) 
        modaluContent.appendChild(manuFacturer)        
        modaluContent.appendChild(hiperSpeed) 
        modaluContent.appendChild(hiperDrive)    
        }

        mainuContent.appendChild(card)
     });

const nextButton = document.getElementById('next-button');
const backButton = document.getElementById('back-button');

    nextButton.disabled = !responseJson.next;
    backButton.disabled = !responseJson.previous;

    backButton.style.visibility = responseJson.previous? "visible" : "hidden"

    currentPageUrl = url

    } catch (error){  
    console.log(error)   
    alert('Erro ao carregar os aeronave')          
    }
    }

async function loadNextPage(){
    if(!currentPageUrl) return;
    try {
        const response =  await fetch(currentPageUrl)         // 2 -fettch - faz a requisição para url da api,  é recebido na url acima - 3
        const responseJson =  await response.json()

        await loadSpacers(responseJson.next)
    
    }catch (error){  
    console.log(error)   
    alert('Erro ao carregar a proxima pagina')          
        }
    }

async function  loadPreviousPage(){
    if(!currentPageUrl) return;
    try {
        const response =  await fetch(currentPageUrl)         // 2 -fettch - faz a requisição para url da api,  é recebido na url acima - 3
        const responseJson =  await response.json()

        await loadSpacers(responseJson.previous)

    }catch (error){  
    console.log(error)   
    alert('Erro ao carregar a pagina anterior')          
    }
}
function hidenModal () {                    
    const modalu = document.getElementById('modalu')
    modalu.style.visibility = "hidden"
} 
