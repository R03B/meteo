// TEST LOCAL STORAGE

// lettura e sseganzione dell'item come ogetto ad una variabile
const cat = JSON.parse(localStorage.getItem("myCat"));

// lettura
// console.log(cat.nome);
console.log(localStorage.getItem("temp_f"));

let temp_option = document.querySelector('#temp_option')
let button_save = document.querySelector('#save')

let temp_c = document.createElement('option')
temp_c.value = 'c'
temp_c.innerHTML ='Celsius'
let temp_f = document.createElement('option')
temp_f.value = 'f'
temp_f.innerHTML ='Fahrenheit'
if (localStorage.getItem("temp_f")=='f') {
    temp_f.selected = 1
    console.log('f selezionato');
} else {
    temp_c.selected = 1
    console.log('c selezionato');
}
temp_option.appendChild(temp_c)
temp_option.appendChild(temp_f)

function save() {
    // temeperatura
    if (temp_option.value == 'f') {   
        localStorage.setItem("temp_f",  'f');
    }else{
        localStorage.setItem("temp_f",  'c');
    }
    console.log(localStorage.getItem("temp_f"));
}
