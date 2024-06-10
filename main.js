// card temp type check
function check() {
    let card_el_name = document.querySelectorAll('.card_el_name')
    let card_el_region = document.querySelectorAll('.card_el_region')
    let card_el_country = document.querySelectorAll('.card_el_country')
    let card_el_text = document.querySelectorAll('.card_el_text')
    let card_el_ico = document.querySelectorAll('.card_el_ico')
    let card_el_temp = document.querySelectorAll('.card_el_temp')
    console.log('test');
    
    for (let index = 0; index < card_el_name.length; index++) {
        console.log(card_el_name[index].innerHTML + ' ' + card_el_temp[index].innerHTML+ ' ' + card_el_region[index].innerHTML+ ' ' + card_el_country[index].innerHTML+ ' ' + card_el_text[index].innerHTML+ ' ' + card_el_ico[index].innerHTML); 
        fetch('http://api.weatherapi.com/v1/current.json?key=d30ec64cad08454ab3b75400240506&q='+card_el_name[index].innerHTML+'&aqi=no')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data=>{
            card_el_region[index].innerHTML=data.location.region
            card_el_country[index].innerHTML=data.location.country
            card_el_text[index].innerHTML=data.current.condition.text
            card_el_ico[index].src=data.current.condition.icon
            
            if (localStorage.getItem("temp_f")=='f') {
                card_el_temp[index].innerHTML=data.current.temp_f
            } else {
                card_el_temp[index].innerHTML=data.current.temp_c
            }
        })
    }
    
}    
function test(params) {
    console.log(params);
}

// localStorage.clear()

// card container
let supp_x=1
let card_container =  document.querySelector('#card_container')
if (!localStorage.getItem("card_container")&&supp_x==1) {
    localStorage.setItem("card_container", card_container.innerHTML);
    console.log('CARD CONTAINER TEST');
    card_container.innerHTML= localStorage.getItem('card_container')
    supp_x=0
}if (localStorage.getItem("card_container")&&supp_x==1) {
    card_container.innerHTML= localStorage.getItem('card_container')
    supp_x=0
}

// test api
const apiUrl = 'http://api.weatherapi.com/v1/search.json?key=d30ec64cad08454ab3b75400240506&q=Lodi';
let meteoIt
let FirstCity=document.querySelector('#FirstCity')
let FirstRegion=document.querySelector('#FirstRegion')
let FirstCountry=document.querySelector('#FirstCountry')
let FirstMeteo=document.querySelector('#FirstMeteo')
let FirstMeteoIco=document.querySelector('#FirstMeteoIco')
let FirstMeteoTemp=document.querySelector('#FirstMeteoTemp')
let card_el=document.querySelectorAll('.card_el')
let card_body_el=document.querySelectorAll('.card_body_el')
let col_card_el = document.querySelectorAll('.col_card_el')


let card_add = document.querySelector('#card_add')
let cards = document.querySelector('#cards')

// TEST LOCAL STORAGE

// creazione oggetto
let gatto = {nome:'paolo',colore:'arancione'}

// creazione item di un ogetto
localStorage.setItem("myCat",  JSON.stringify(gatto));

// lettura e sseganzione dell'item come ogetto ad una variabile
const cat = JSON.parse(localStorage.getItem("myCat"));

check()
// lettura
// console.log(cat.nome);

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
    
    data.forEach(el => {
        
        
        if (el.country=='Italy') {
            
            
            // usare città italiane
            meteoIt = 'http://api.weatherapi.com/v1/current.json?key=d30ec64cad08454ab3b75400240506&q=id:'+el.id
            
            
            // utlizzo con meteo della città
            fetch(meteoIt)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
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
    console.log('pre add activate');
    card_add.innerHTML='<div class="card" style="width: 18rem;"><div class="card-body"><input type="text" class="form-control" id="new_city_name" placeholder="" aria-label="Username" aria-describedby="basic-addon1"></input><button onclick="add()" type="button" class="btn btn-primary">add</button></div></div>'
    let new_city_name=document.querySelector('#new_city_name')
}

let new_city

function add() {
    
    new_city=new_city_name.value
    
    let new_card = document.createElement('div')
    new_card.classList.add('col-4')
    new_card.classList.add('col_card_el')
    new_card.innerHTML='<div class="card card_el '+'id_'+new_city+'" style="width: 18rem;"><div class="card-body '+'id_body_'+new_city+' card_body_el"></div></div>'
    
    cards.appendChild(new_card)
    
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
        new_card_name.classList.add('card_el_name')
        
        let new_card_region=document.createElement('p')
        console.log(data.location.region);
        new_card_region.innerHTML=data.location.region
        new_card_region.classList.add('card_el_region')
        
        let new_card_country=document.createElement('p')
        console.log(data.location.country);
        new_card_country.innerHTML=data.location.country
        new_card_country.classList.add('card_el_country')
        
        let new_card_text=document.createElement('p')
        console.log(data.current.condition.text);
        new_card_text.innerHTML=data.current.condition.text
        new_card_text.classList.add('card_el_text')
        
        let new_card_ico=document.createElement('img')
        new_card_ico.src=data.current.condition.icon
        new_card_ico.classList.add('card_el_ico')
        
        let new_card_temp=document.createElement('p')
        new_card_temp.innerHTML=data
        new_card_temp.classList.add('card_el_temp')

        let remove_button=document.createElement('span')
        remove_button.classList.add('remove_button_span')
        remove_button.innerHTML='<button onclick="remove()" type="button" class="btn btn-danger">remove</button>'
        console.log(remove_button.outerHTML);
        
        if (localStorage.getItem("temp_f")=='f') {
            new_card_temp.innerHTML=data.current.temp_f
        } else {
            new_card_temp.innerHTML=data.current.temp_c
        }
        
        new_card_body=[...new_card_body]
        console.log(new_card_body);
        new_card_body.forEach(el => {
            
            el.appendChild(new_card_name)
            el.appendChild(new_card_region)
            el.appendChild(new_card_country)
            el.appendChild(new_card_text)
            el.appendChild(new_card_ico)
            el.appendChild(new_card_temp)
            el.appendChild(remove_button)
            
        });
        new_city= ''
        
        // id signer
        card_el=document.querySelectorAll('.card_el')
        card_body_el=document.querySelectorAll('.card_body_el')
        let remove_button_span= document.querySelectorAll('.remove_button_span')
        col_card_el = document.querySelectorAll('.col_card_el')

        card_el.forEach(function(el,index) {
        });
        
        for (let index = 0; index < card_el.length; index++) {
            col_card_el[index].id= 'card_'+index
            let remove_button_span_supp=remove_button_span[index]

            console.log(card_body_el[index]);
            console.log(remove_button_span_supp);

            card_body_el[index].removeChild(remove_button_span_supp)
            remove_button_span[index].innerHTML='<button onclick="remove('+`'card_`+index+`'`+')" type="button" class="btn btn-danger">remove</button>'
            card_body_el[index].appendChild(remove_button_span[index])
            
        }

        // card container local storage update
        card_container= document.querySelector('#card_container')
        localStorage.setItem("card_container", card_container.innerHTML);
    })
    
    
    cards.removeChild(card_add)
    card_add.innerHTML='<div class="card" style="width: 18rem;"><div class="card-body"><button onclick="pre_add()" type="button" class="btn btn-primary">add</button></div></div>'
    cards.appendChild(card_add)
}

// card remove

function remove(x) {
    col_card_el.forEach(el => {
        if (el.id==x) {
            cards.removeChild(el)
        }
    });

    // card container local storage update
    card_container= document.querySelector('#card_container')
    localStorage.setItem("card_container", card_container.innerHTML);
    
}