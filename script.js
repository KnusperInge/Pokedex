let currentpokemon;
let minOffset = 1;
let maxOffset = 21;
let load = true;
let maxValue = 152;

//load Overviewcontent
async function loadOverview() {
    let content = document.getElementById('overview-container');
    content.innerHTML = "";
    for (let i = minOffset; i < maxOffset; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let resp = await fetch(url);
        currentpokemon = await resp.json();
        content.innerHTML += renderCards(i);
        checkTypes(i, currentpokemon.types[0].type.name);
    }
    minOffset = maxOffset;
    maxOffset = 41;
    loadOnScroll();
}

// load more Pokemon on Scoll
async function loadOnScroll() {
    window.onscroll = async function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && load) {
            load = false;
            await loadPokemon();
            if (maxOffset <= 130) {
                minOffset += 20;
                maxOffset += 20;
                load = true;
            } else {
                minOffset = 141;
                maxOffset = maxValue;
                await loadPokemon();
                load = false;
            }
        }
    }
}

async function loadPokemon() {
    let content = document.getElementById('overview-container');
    for (let i = minOffset; i < maxOffset; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let resp = await fetch(url);
        currentpokemon = await resp.json();
        content.innerHTML += renderCards(i);
        checkTypes(i, currentpokemon.types[0].type.name);
    }
}

//check Types an change Background
function checkTypes(id, type) {
    if (type == type) {
        // console.log(id);
        document.getElementById(`card${id}`).classList.add(`${type}-bg`);
        document.getElementById(`type${id}`).classList.add(`${type}-type-bg`);
    }
}

//search Pokemon from Inputfield with name or Id 
async function Search() {
    let content = document.getElementById('overview-container');
    let input = document.getElementById('search').value;
    let checkInput = parseInt(input);
    console.log(input);
    content.innerHTML = "";
    let response = await (await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`)).json();
    if (isNaN(checkInput) && input != "") {        //checking Input is a String
        for (let i = 0; i < response['results'].length; i++) {
            let output = await response['results'][i].name.includes(input);
            if (output) {
                document.getElementById('overview-container').innerHTML = "";
                rendersearchInput(response['results'][i]['name']);
            }
        }
    } if (!isNaN(checkInput) && input != "") { //checking Input is a Integer
        document.getElementById('overview-container').innerHTML = "";
        rendersearchInput(response['results'][input - 1]['name']);
    }
    if (isNaN(checkInput) && input == "") {
        content.innerHTML = "";
        currentpokemon = "";
        minOffset = 1;
        maxOffset = 21;
        loadOverview();
    }
}

// render Cards with results of search
async function rendersearchInput(input) {
    let content = document.getElementById('overview-container');
    currentpokemon = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)).json();
    content.innerHTML += renderCards(currentpokemon.id);
    checkTypes(currentpokemon.id, currentpokemon.types[0].type.name);
}

