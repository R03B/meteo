// test api
const apiUrl = 'http://api.weatherapi.com/v1/search.json?key=d30ec64cad08454ab3b75400240506&q=Lodi';
let meteoIt
let FirstCity=document.querySelector('#FirstCity')
let FirstRegion=document.querySelector('#FirstRegion')
let FirstCountry=document.querySelector('#FirstCountry')
let FirstMeteo=document.querySelector('#FirstMeteo')
let FirstMeteoIco=document.querySelector('#FirstMeteoIco')
let FirstMeteoTemp=document.querySelector('#FirstMeteoTemp')

let card_add = document.querySelector('#card_add')
let cards = document.querySelector('#cards')

// TEST LOCAL STORAGE

// creazione oggetto
let gatto = {nome:'paolo',colore:'arancione'}

// creazione item di un ogetto
localStorage.setItem("myCat",  JSON.stringify(gatto));

// lettura e sseganzione dell'item come ogetto ad una variabile
const cat = JSON.parse(localStorage.getItem("myCat"));

// lettura
console.log(cat.nome);



// LOCAL STORAGE


// CODE

// lodi
fetch(apiUrl)
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log(data);
    
    data.forEach(el => {

        console.log(el.country);

        if (el.country=='Italy') {

            console.log('in italia');

            // usare città italiane
            meteoIt = 'http://api.weatherapi.com/v1/current.json?key=d30ec64cad08454ab3b75400240506&q=id:'+el.id

            console.log(meteoIt);

            // utlizzo con meteo della città
            fetch(meteoIt)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                FirstCity.innerHTML=data.location.name
                FirstRegion.innerHTML=data.location.region
                FirstCountry.innerHTML=data.location.country
                FirstMeteo.innerHTML=data.current.condition.text
                // temperatura
                if (localStorage.getItem("temp_f")=='f') {
                    FirstMeteoTemp.innerHTML=data.current.temp_f
                } else {
                    FirstMeteoTemp.innerHTML=data.current.temp_c
                }
                
                let MeteoIco = document.createElement('img')
                MeteoIco.src=data.current.condition.icon
                FirstMeteoIco.appendChild(MeteoIco)
            })
        }
    });
})
.catch(error => {
    console.error('Error:', error);
});

// card add

function pre_add() {
    card_add.innerHTML='<div class="card" style="width: 18rem;"><div class="card-body"><input type="text" class="form-control" id="new_city_name" placeholder="" aria-label="Username" aria-describedby="basic-addon1"></input><button onclick="add()" type="button" class="btn btn-primary">add</button></div></div>'
    let new_city_name=document.querySelector('#new_city_name')
}

let new_city

function add() {

    new_city=new_city_name.value

    let new_card = document.createElement('div')
    new_card.classList.add('col-4')
    new_card.innerHTML='<div class="card '+'id_'+new_city+'" style="width: 18rem;"><div class="card-body '+'id_body_'+new_city+'"></div></div>'
    
    cards.append(new_card)
    
    let api_new_city = 'http://api.weatherapi.com/v1/current.json?key=d30ec64cad08454ab3b75400240506&q='+new_city+'&aqi=no'
    
    fetch(api_new_city)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data =>{

        console.log(data);
        
        let new_card_body=document.querySelectorAll('.id_body_'+new_city)

        let new_card_name=document.createElement('h3')
        console.log(data.location.name);
        new_card_name.innerHTML=data.location.name

        let new_card_region=document.createElement('p')
        console.log(data.location.region);
        new_card_region.innerHTML=data.location.region

        let new_card_country=document.createElement('p')
        console.log(data.location.country);
        new_card_country.innerHTML=data.location.country

        let new_card_text=document.createElement('p')
        console.log(data.current.condition.text);
        new_card_text.innerHTML=data.current.condition.text

        let new_card_ico=document.createElement('img')
        new_card_ico.src=data.current.condition.icon

        let new_card_temp=document.createElement('p')
        new_card_temp.innerHTML=data

        new_card_body=[...new_card_body]
        console.log(new_card_body);
        new_card_body.forEach(el => {

            el.append(new_card_name)
            el.append(new_card_region)
            el.append(new_card_country)
            el.append(new_card_text)
            el.append(new_card_ico)
        });
        new_city= ''
    })


    cards.removeChild(card_add)
    card_add.innerHTML='<div class="card" style="width: 18rem;"><div class="card-body"><button onclick="pre_add()" type="button" class="btn btn-primary">add</button></div></div>'
    cards.append(card_add)
}
