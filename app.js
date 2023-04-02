const carac = ['Nom latin : ', 'Taille : ','Couleur : ','Régime alimentaire : ','Zone de nichage : ','Comportement : ']

const birds =[
    ['mésange+bleue','Cyanistes caeruleus','10 cm','bleue et jaune','graines et insectes','cavités','sociable','Mésange bleue'],
    ['rougegorge+familier','Erithacus rubecula','13 cm','brune et rouge','insectes',"trou d'arbre",'solitaire','Rouge-gorge familier'],
    ['moineau+domestique','Passer domesticus','15 cm','brune et beige','graines','cavité','grégaire','Moineau domestique'],
    ['bergeronnette+grise','Motacilla alba','10 cm','noire et blanc','graines et insectes','cavité','territorial','Bergeronnette Grise']
] 

const image = document.querySelectorAll(".vignette")
const result = document.querySelector(".result")

image.forEach(el=> el.addEventListener('click', selection))
const espece = document.querySelectorAll(".espece");
console.log(espece)
const elements = document.querySelectorAll(".element");
var paramActiv

function selection(){ //modifie le rendu des photos en fonction de la sélection, fait apparaitre l'encart d'informations et mise à jour des indications, API pour le chant
    restart();
    stopMusic();
    let index = this.id;
    image.forEach(el => { if(el.id===index) el.classList.add("active"); 
                        else el.classList.add("wait")})
    result.style.display = "flex";
    getAPIxeno(`${birds[index-1][0]}`)
    paramActiv = `${birds[index-1][0]}`.toString()
    for(let i=0; i<elements.length;i++){
    elements[i].textContent = `${carac[i]} ${birds[index-1][i+1]}`
    espece[0].innerHTML = `${birds[index-1][7]}`
    }
}
function restart(){ //réinitialise le rendu des photos et les informations dans l'encart
    for(let i=0; i<elements.length;i++){
        elements[i].textContent = `${carac[i]}`
        }
        audio.scr="";
    image.forEach(el => { el.classList.remove("wait","active")});
}

// url = https://xeno-canto.org/api/2/recordings?query=bearded+bellbird+q:A

const audio = document.querySelector("audio");
const timer = document.querySelector(".time")
// var urlString
async function getAPIxeno(param) {
    const url = `https://xeno-canto.org/api/2/recordings?query=${param}`
    console.log(url)

    const requete = await fetch(url)

    if(!requete.ok){
        alert('un problème est survenu')
    }
    const data = await requete.json();

    audio.src = `${data.recordings[1].file}`
    
}

//Fonction des boutons play, pause et stop

const play = document.querySelector(".play")
play.addEventListener('click',playMusic)

function playMusic(){
  if(audio.paused)
    {
        audio.play();
        play.textContent = "Pause"
    }
    else
    {
        audio.pause();
        play.textContent = "Play"
    }
}

const stop = document.querySelector(".stop")
stop.addEventListener('click',stopMusic)

function stopMusic(){
        console.log(audio.currentTime)
        audio.pause();
        play.textContent = "Play"
        audio.currentTime = 0;
        console.log(audio.currentTime)
}
//Animation du décompte sur la silhouette de l'oiseau

audio.addEventListener('timeupdate', setTime)

const mask = document.querySelector(".masque")

function setTime() {
    var barLength = 230 - (230 * (audio.currentTime/audio.duration));
    mask.style.width = barLength + 'px';
}

//Changer le son entre chant et cri

const options = document.querySelectorAll('.change-song')

for (option in options) {
    options[option].onchange = function(){
        audio.scr="";
        console.log(paramActiv)
        // url = `${url} ${this.value}`
        console.log(audio.src)
        getAPIxeno(`${paramActiv}+${this.value}`)
        console.log(audio.src)
    }
}