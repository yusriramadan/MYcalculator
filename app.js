const tombol = document.querySelector(".tombol-tombol");
const layar = document.querySelector(".layar");
const display = document.querySelector("#update-display");



let resetLayar = false;
let hitung = false;
let simpanLayar = false;
let tombolAwal = true;
let samdengAngOpe = false;
let tmpAngka = "";
let tmpOperator = "";
let tmpAngOpe = "";
let hitungAngOpe = "";
layar.value = 0;



tombol.addEventListener("click", tombolKalkulator);
tombol.addEventListener("click", displayCal);
layar.addEventListener('keypress', function(e) {
  if (!/[0-9]/.test(String.fromCharCode(e.which))) {
    e.preventDefault();
  }
});



function tombolKalkulator(e) {
  const tombolKlik = e.target;

  if (!tombolKlik.classList.contains("tombol")) {
    return;
  }
  
  const tombolInput = tombolKlik.innerText;

  if (tombolInput == "CE") {
    tmpAngka = "";
    tmpOperator = "";
    layar.value = "";
    
  } else if (tombolInput == "C") {
    layar.value = "";
    
  } else if (tombolInput == "<") {
    layar.value = layar.value.slice(0, -1);

  } else if (tombolInput == ".") {
    if(!layar.value.includes(".")) {
      layar.value = layar.value + ".";
    } else if (isNaN(tombolInput) && !tombolKlik.classList.contains("operator")) {
      alert("Input harus berupa angka, titik, atau operator!");
      return;
    }
    
  } else if (tombolInput == "=") {
    if(hitung == true) {
      layar.value = eval(tmpAngka + tmpOperator + layar.value);

      hitung = false;
    }

  } else if (tombolKlik.classList.contains("operator")) {

    if(hitung == true) {
      layar.value = eval(tmpAngka + tmpOperator + layar.value);

      hitung = false;
    }

    tmpAngka = layar.value;
    tmpOperator = tombolInput;
    
    resetLayar = true;
  

  } else {
    if(resetLayar == true) {
      layar.value = tombolInput;

      resetLayar = false;
      hitung = true;

    } else {
      layar.value = layar.value == "0" ? tombolInput : layar.value + tombolInput;
    }
  }

}

function displayCal(e) {
  const tombolKlik = e.target;

  if (!tombolKlik.classList.contains("tombol")) {
    return;
  }
  
  const tombolInput = tombolKlik.innerText;


  if (tombolInput == "=") {
    if(samdengAngOpe) {
      display.innerText = layar.value;
      simpanLayar = false;
      
    } else {
      samdengAngOpe = display.innerText = `${tmpAngOpe} ${hitungAngOpe} =`
      simpanLayar = false;
    }

  } else if (tombolInput == "." && simpanLayar == true) {
    display.innerText = `${tmpAngOpe} ${layar.value}`

  } else if (tombolInput == ".") {
    display.innerText = layar.value

  } else if (tombolInput == "<") {
    return;

  } else if (tombolInput == "C" && simpanLayar == false) {
    tmpAngOpe = ""
    display.innerText = tmpAngOpe

  } else if(tombolKlik.classList.contains("operator")) {
    tmpAngOpe = display.innerText = `${tmpAngka} ${tmpOperator}`
    simpanLayar = true;
    
  } else if (simpanLayar == true) {
    display.innerText = `${tmpAngOpe} ${layar.value}`
    hitungAngOpe = layar.value;

  } else if (tombolAwal == true) {
    display.innerText = layar.value
    samdengAngOpe = true;
    
    

  } else {
    alert("ada yang salah nih")
  }
  
}

