
// variavel let redeclarada
// 1- onload - toda vez que a pagina for atualizada roda o onload
// Tray -tray significa tentaticas, (tente fazer) responsavel por fazer a requizição dos Cards
// Get- {}- faça o que tem de fazer nessa chamave  tray, caso contrario caso seja bem sucedida
// a função vai ser execultada.
// assync e await função asicrona await vai esperar e vai ser chamada pela função loadCharapter
// TODOS CARS ESTAO EM "mainContent"
// getElementById  =   basicamente estamos manipulando elemento COM javaScript LA NO HTML usando DOM.
//a variavel se torna o proprio elemento escrito no HTML getElementById (mainContent)
// innerHTML - vamos modificar pra dentro desse elemnto , " " importar
// innerHTML  '' - qundo clicar em proxima vai limpar os resultados anteriores se não cria novos cards


let currentPageUrl = 'https://swapi.dev/api/people/'  // 6 - pegando a url armazenada NA VARIAVEL para redeclarar TOD VEZ QUE atualizar
window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl); //  4- passa (url) por aqui  e envia -5
    }catch (error){                                         //7 envia retornando
    console.log(error)
    alert('Erro ao carregar cards');
    }
    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacters (url) {                     // 8 - voltando a URL então é recebida aqui 
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '';                         // 1- limpar resultados anteriores
    try {
        const response =  await fetch(url);         // 2 -fettch - faz a requisição para url da api,  é recebido na url acima - 3
        const responseJson =  await response.json(); // 9 - estilizada ou redenerizada final primeira requizição // await - por ser uma requizição e uma promess - ( aguarde )
                                                    // espere essa requizição acontecer para depois armazenar na variavel
    responseJson.results.forEach((character) => {    // .result pega so o array que desjamos da Api  ForEach vais fazer o lupe que vai interar com todos objetos do array para (Character)
        const card = document.createElement("div")   // cria um novo elemnto html (card)
        card.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g,"")}.jpg')`
        card.className = "cards"
    
        const characterNameBG = document.createElement("div")   // cria um novo elemnto html (characterName.BG)
        characterNameBG.className = "character-name-bg"
        
        const characterName = document.createElement("span")
        characterName.className = "character-name"
        characterName.innerText = `${character.name}`

        characterNameBG.appendChild(characterName)                // coloca um filho text dento do characterNameBG
        card.appendChild(characterNameBG)

    card.onclick = () =>{

        const modal =  document.getElementById('modal')
        modal.style.visibility = "visible"
            
        const modalContent =  document.getElementById('modal-content')
        modalContent.innerHTML = '';        // innerHTML   vai alterar o HTML

        const characterImage = document.createElement("div")   // cria um novo elemnto html (card)
        characterImage.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g,"")}.jpg')`
        characterImage.className = "character-image"

        const name = document.createElement('span')
        name.className = "character-name"
        name.innerText = `nome:${character.name}`

        const characteHeight = document.createElement('span')
        characteHeight.className = "character-details"
        characteHeight.innerText = `Autura: ${convertHeight(character.height)}`

        const mass = document.createElement('span')
        mass.className = "character-details"
        mass.innerText = `Peso: ${convertMass(character.mass)}`

        const eyeColor = document.createElement('span')
        eyeColor.className = "character-details"
        eyeColor.innerText = `Cor dos Olhos: ${convertEyeColor(character.eye_color)}`

        const birtYears = document.createElement('span')
        birtYears.className = "character-details"
        birtYears.innerText = `Nascimento: ${convertBirtYear (character.birth_year)}`
        
        modalContent.appendChild(characterImage)
        modalContent.appendChild(name)
        modalContent.appendChild(characteHeight )
        modalContent.appendChild(mass)
        modalContent.appendChild(eyeColor)
        modalContent.appendChild(birtYears)
        }

        mainContent.appendChild(card)
     });

const nextButton = document.getElementById('next-button');
const backButton = document.getElementById('back-button');

    nextButton.disabled = !responseJson.next;
    backButton.disabled = !responseJson.previous;

    backButton.style.visibility = responseJson.previous? "visible" : "hidden"

    currentPageUrl = url

    } catch (error){  
    console.log(error)   
    alert('Erro ao carregar os personagens')          
    }
    }

async function loadNextPage(){
    if(!currentPageUrl) return;
    try {
        const response =  await fetch(currentPageUrl)         // 2 -fettch - faz a requisição para url da api,  é recebido na url acima - 3
        const responseJson =  await response.json()

        await loadCharacters(responseJson.next)
    
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

        await loadCharacters(responseJson.previous)

    }catch (error){  
    console.log(error)   
    alert('Erro ao carregar a pagina anterior')          
    }
}
function hideModal () {                    
    const modal = document.getElementById('modal')
    modal.style.visibility = "hidden"
} 

function convertEyeColor(eyeColor){
    const cores = {
        blue:"azul",
        red:"vermelho",
        broun:"castanho",
        green:"verde",
        yellow:"amarelo",
        black:"preto",
        orange:"laranja",
        hazel:"avela",
        unknown:"desconhecido",
        pink:"roza",
        }
        return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height){
   if(height === "unknown"){
    return "desconhecida"
    }
    return (height /  100).toFixed(2);
}

function convertMass(mass){
    if(mass === "unknown"){
     return "desconhecido"
     }
     return `${mass} kg`;
 }

 function convertBirtYear(birtYears){
    if(birtYears=== "unknown"){
     return "desconhecido"
     }
     return birtYears
 }