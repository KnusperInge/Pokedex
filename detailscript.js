let Detailpokemon;

// Open Detailview with ID of Pokemon
async function openDetails(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let resp = await fetch(url);
    Detailpokemon = await resp.json();
    let type = Detailpokemon.types[0].type.name;
    document.getElementById('detailview-container').classList.remove('d-none');
    document.getElementById('detailview-container').classList.add('animate1');
   document.getElementById('detail-card').innerHTML = renderDetailHead(id);
   document.getElementById('detail-card').classList.add('animate2');
   document.body.classList.add('d-scroll');
    checkDetailTypes(id, type);
    loadAboutSection(id);
}

//render Detailview Navigation
function loadAboutSection(id){
    let content= document.getElementById('detail-about-stats');
    content.innerHTML="";
    document.getElementById('stats').classList.remove('txt-black');
    document.getElementById('about').classList.add('txt-black');
    content.innerHTML=renderAbout();
    renderAbilities();
}

//render Abilites 
function renderAbilities(){
    for(let i=0;i<Detailpokemon.abilities.length;i++){
        let ability= Detailpokemon.abilities[i].ability.name;
        document.getElementById('abilities').innerHTML+=`<span>${ability} </span>`;
    }
}

//check Types for Bg
function checkDetailTypes(id, type) {
    if (type == type) {
        document.getElementById(`cardHead${id}`).classList.add(`${type}-bg`);
        document.getElementById(`detail-type`).classList.add(`${type}-type-bg`);
     }
}

// render Stats 
function stats(i) {
    let content = document.getElementById('detail-about-stats');
    content.innerHTML = "";
    content.innerHTML = '<table id=statstbl></table>'
    document.getElementById('about').classList.remove('txt-black');
    document.getElementById('stats').classList.add('txt-black');
    for (let i = 0; i < Detailpokemon['stats'].length; i++) {
        let statValue = Detailpokemon['stats'][i]['base_stat'];
        let statName = Detailpokemon['stats'][i]['stat']['name'];
        renderStats(statName, statValue, i);
        statsBar(statValue, i);
    }
}

//render Statsbars 
function statsBar(value, x) {
    let elem = document.getElementById(`output${x}`);
    if (value > 100) {
        value = 100;
        elem.style.width = value + "%";
    }
    elem.style.width = value + "%";
}

//Close Detailview
function closeDetails() {
    document.getElementById('detail-card').classList.remove('animate2');
    document.getElementById('detailview-container').classList.add('d-none');
    document.getElementById('detailview-container').classList.remove('animate1');
    document.body.classList.remove('d-scroll');
}

function next(i) {
    if (i == i && i < 151) {
        let id = i + 1;
        openDetails(id);
    } if (i == 151) {
        let id = 1;
        openDetails(id);
    }
}

function previous(i) {
    let id;
    if (i == i && i <= 151 && i > 1) {
        id = i - 1;
    } if (i == 1) {
        id = 151;
    }
    openDetails(id);
}