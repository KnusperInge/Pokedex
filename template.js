// Render Cards
function renderCards(id) {
    return `
<div  id="card${id}"class="card" onclick="openDetails(${id})">
    <div class="card-left">
        <h3>Nr. ${currentpokemon.id}</h3>
        <h3>${currentpokemon.name}</h3>
        <span id="type${id}">${currentpokemon.types[0].type.name}</span>
    </div>
<div class="card-right">
    <img src="${currentpokemon.sprites.other['official-artwork'].front_default}" alt="">
</div>
</div>`;
}

// Render Detailhead Img

function renderDetailHead(i){
    return ` 
    <div class="head-card" id="cardHead${i}">

    <div class="Nav">
        <img src="icon/pokeball.png" alt="">
        <div class="detailTitle">
            <h3>Nr. #${Detailpokemon.id}</h3>
            <h3>${Detailpokemon.name}</h3>
           <span id="detail-type">${Detailpokemon.types[0].type.name}</span>
            </div>
        <img src="icon/cancel.png" alt="" onclick="closeDetails()">
    </div>
    
    <div class="Img-card" id="Img-card">
    <img class="icon" src="icon/left-arrow.png" onclick="previous(${i})">
        <img id="detail-img" src="${Detailpokemon.sprites.other['official-artwork'].front_default}">
        <img class="icon" src="icon/right-arrow.png" onclick="next(${i})">
    </div>
    <div class="menu-card">
    <h3 id="about" onclick="loadAboutSection()">About</h3>
    <h3 id="stats"onclick="stats(${i})">Base stats</h3>
    </div>
    <div id="detail-about-stats" class="about-Stats-Container">
    
    
    </div>
    
 `
}


function renderAbout(){
    return`
    <table class="abouttbl">
    <tr>
    <td>ID:</td>
    <td>Nr. #${Detailpokemon.id}</td>
    <tr/>
    <tr>
    <td>Name:</td>
    <td>${Detailpokemon.name}</td>
    <tr/>
    <tr>
    <td>Height:</td>
    <td>${(Detailpokemon.height)/10} m</td>
    <tr/>
    <tr>
    <td>Weight:</td>
    <td>${(Detailpokemon.weight)/10} kg</td>
    <tr/>
    <tr>
    <td>Abilities:</td>
    <td id="abilities"></td>
    <tr/>
    </table>
    `;
}

// render Stats
function renderStats(statName, statValue, number) {
    document.getElementById('statstbl').innerHTML += `<tr><td><span>${statName}:</span></td><td><div  class="output "id="output${number}"></div></td><td><span>${statValue}</span></td><tr>`;
}
