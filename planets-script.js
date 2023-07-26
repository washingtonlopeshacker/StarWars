
let currentPageUrl = 'https://swapi.dev/api/planets/'  
window.onload = async () => {
    try {
        await loadPlanets (currentPageUrl); 
    }catch (error){                                         
    console.log(error)
    alert('Erro ao carregar cards');
    }
    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadPlanets  (url) {                    
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '';                         
    try {
        const response =  await fetch(url);         
        const responseJson =  await response.json(); 
                                                    
    responseJson.results.forEach((planets) => {    
        const card = document.createElement("div")   
        card.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g,"")}.jpg')`
        card.className = "cards"
    
        const planetsNameBG = document.createElement("div")  
        planetsNameBG.className = "planets-name-bg"
        
        const planetsName = document.createElement("span")
        planetsName.className = "planets-name"
        planetsName.innerText = `${planets.name}`

        planetsNameBG.appendChild(planetsName)               
        card.appendChild(planetsNameBG)

    card.onclick = () =>{

        const modal =  document.getElementById('modal')
        modal.style.visibility = "visible"
            
        const modalContent =  document.getElementById('modal-content')
        modalContent.innerHTML = '';        

        const planetsImage = document.createElement("div")   
        planetsImage.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g,"")}.jpg')`
        planetsImage.className = "planets-image"

        const Name = document.createElement('span')
        Name.className = "planets-name"
        Name.innerText = `nome:${planets.name}`

        const Diameter = document.createElement('span')
        Diameter.className = "planets-details"
        Diameter.innerText = `Diametro: ${planets.diameter}`

        const Population= document.createElement('span')
        Population.className = "planets-details"
        Population.innerText = `População: ${planets.population}`

        const Gravity= document.createElement('span')
        Gravity.className = "planets-details"
        Gravity.innerText = ` Gravidade: ${planets.gravity}`

        const Climate = document.createElement('span')
        Climate.className = "planets-details"
        Climate.innerText = `Clima  ${planets.climate}`
        
        modalContent.appendChild(planetsImage)
        modalContent.appendChild(Name)
        modalContent.appendChild(Diameter) 
        modalContent.appendChild(Population)        
        modalContent.appendChild(Gravity) 
        modalContent.appendChild(Climate)    
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
    alert('Erro ao carregar os Planetas')          
    }
    }

async function loadNextPage(){
    if(!currentPageUrl) return;
    try {
        const response =  await fetch(currentPageUrl)        
        const responseJson =  await response.json()

        await loadPlanets(responseJson.next)
    
    }catch (error){  
    console.log(error)   
    alert('Erro ao carregar a proxima pagina')          
        }
    }

async function  loadPreviousPage(){
    if(!currentPageUrl) return;
    try {
        const response =  await fetch(currentPageUrl)        
        const responseJson =  await response.json()

        await loadPlanets(responseJson.previous)

    }catch (error){  
    console.log(error)   
    alert('Erro ao carregar a pagina anterior')          
    }
}
function hideModal () {                    
    const modal = document.getElementById('modal')
    modal.style.visibility = "hidden"
} 
