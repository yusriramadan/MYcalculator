  // SELECTOR HTML //

const tombolKalkulator= document.querySelector(".tombolTombol");
const layar = document.querySelector(".layar");
const display = document.querySelector(".display");



  // DEKLARASI AUDIO TOMBOL //

const audioAngka = new Audio('sound-angka.mp3');
const audioOperator = new Audio('sound-operator.mp3');



  // EVENT LISTENER //

tombolKalkulator.addEventListener("click", tombol) // UNTUK TOMBOL PADA DOM //
window.addEventListener("keydown", ketikAngka); // UNTUK KETIK PADA KEYBOARD //
layar.addEventListener("keypress", ketikAngka); // UNTUK MENAMPILKAN INPUT ANGKA KE LAYAR //
tombolKalkulator.addEventListener("click", displayLayar); // UNTUK MENAMPILKAN PROSES OPERASI ANGKA PADA SAAT MENGKLIK TOMBOL PADA DOM KE LAYAR DISPLAY //
window.addEventListener("keydown", displayLayar); // UNTUK MENAMPILKAN PROSES OPERASI ANGKA PADA SAAT MENGETIK KEYBOARD PADA DOM KE LAYAR DISPLAY //



  // DECLARATION & INITIALIZATION BEFORE FUNCTION //

// UNTUK INPUTAN DARI TOMBOL & KETIK //
layar.value = "0"
layar.readOnly = true;
let resetLayar = false;
let hitung = false;
let tmpAngka = "";
let tmpOperator = "";

// UNTUK DISPLAY DARI TOMBOL & KETIK //
let simpanDisplay = false;
let stopDisplay = false;
let tmpAngOpe = "";
let tmpAngOpeAng = "";



  // FUNCTION TOMBOL & KETIK

function tombol(e) {
  e.preventDefault();

  const tombolKlik = e.target;

    // MENCEGAH TERINPUT APABILA MENGEBLOK SEMUA TOMBOL / MENGKLIK DILUAR TOMBOL //
    if(!tombolKlik.classList.contains("tombol")) {
      return;
    }
  
    // MENGHASILKAN SUARA PADA SAAT TOMBOL DI KLIK //
    if (tombolKlik.classList.contains("operator") || tombolKlik.classList.contains("samdeng")) {
      audioOperator.pause();
      audioOperator.currentTime = 0;
      audioOperator.volume = 0.7;
      audioOperator.play();
    } else {
      audioAngka.pause();
      audioAngka.currentTime = 0;
      audioAngka.volume = 0.4;
      audioAngka.play();
    }
  

  const tombolInput = tombolKlik.innerText;

  // MENGINPUT KE LAYAR PADA SAAT TOMBOL PADA DOM DI KLIK
  if(tombolInput == "=") {
    if (hitung == true) {
      layar.value = eval(tmpAngka + tmpOperator + layar.value);
      
      hitung = false;
    } else if (layar.value.endsWith(".")) {
      layar.value = parseInt(layar.value);

    }

  } else if (tombolInput == ".") {
    if(!layar.value.includes(".")) {
      layar.value = layar.value + ".";
  
    } else {
      return;
    }
   
  } else if (tombolInput == "CE") {
    layar.value = "";
    tmpLayar = "";
    tmpOperator = "";
    layar.value = "0";

  } else if (tombolInput == "C") {
    layar.value = "0";


  } else if (tombolInput == "<") {
    if (layar.value == "0") {
      return;

    } else if (resetLayar == true) {

    return;

    } else if (display.innerText == `${layar.value} =`) {
      return;

    } else {
      layar.value = layar.value.slice(0, -1);

      if (layar.value == "") {
        layar.value = "0";
      }
    }
    
  
  } else if (tombolKlik.classList.contains("operator")) {
    if (hitung == true) {
      layar.value = eval(tmpAngka + tmpOperator + layar.value);
      
      hitung = false;
    }

    if (layar.value.endsWith(".")) {
      layar.value = parseFloat(layar.value).toFixed(1);
    }
    
    tmpAngka = layar.value;
    tmpOperator = tombolInput;
    resetLayar = true;

  } else {
    if (resetLayar == true) {
      layar.value = tombolInput;

      hitung = true;
      resetLayar = false;

    } else {
      if (layar.value == "0") {
        layar.value = tombolInput

      } else {
        layar.value = layar.value + tombolInput;
      }
      
    }
    
    

  }

  
}

function ketikAngka(e) {
  const ketikInput = e.key;

    // MENCEGAH TERINPUT APABILA MENGETIK SELAIN ANGKA 0 - 9
    if (!/[0-9]/.test(String.fromCharCode(e.which))) {
      e.preventDefault();

    }

    // MENGHASILKAN SUARA PADA SAAT KEYBOARD DI KETIK
    if (ketikInput == "Shift") {
      return;

    } else if (ketikInput == "+" || ketikInput == "-" || ketikInput == "/" || ketikInput == "*" || ketikInput == "Backspace" || ketikInput == "Delete" || ketikInput == "Escape" || ketikInput == "." || ketikInput == "=" || ketikInput == "Enter"){
      audioOperator.pause();
      audioOperator.currentTime = 0;
      audioOperator.volume = 0.7;
      audioOperator.play();
    } else if (/[0-9]/.test(ketikInput)) {
      audioAngka.pause();
      audioAngka.currentTime = 0;
      audioAngka.volume = 0.4;
      audioAngka.play();
    }


  // MENGINPUT KE LAYAR PADA SAAT KEYBOARD TERTENTU DI KETIK
  if (ketikInput == "=" || ketikInput == "Enter") {
    if (hitung == true) {
      layar.value = eval(tmpAngka + tmpOperator + layar.value);
      
      hitung = false;
    } else if (layar.value.endsWith(".")) {
      layar.value = parseInt(layar.value);
    }
  
  } else if (ketikInput == ".") {
    if(!layar.value.includes(".")) {
      layar.value = layar.value + ".";
  
    } else {
      return;
    }

  } else if (ketikInput == "Escape") {
    layar.value = "";
    tmpLayar = "";
    tmpOperator = "";
    layar.value = "0";

  } else if (ketikInput == "Delete") {
    layar.value = "0";

  } else if (ketikInput == "Backspace") {
    if (layar.value == "0") {
      return;

    } else if (resetLayar == true) {

    return;

    } else if (display.innerText == `${layar.value} =`) {
      return;

    } else {
      layar.value = layar.value.slice(0, -1);

      if (layar.value == "") {
        layar.value = "0";
      }
    }
    

  } else if (ketikInput == "+" || ketikInput == "-" || ketikInput == "/" || ketikInput == "*") {
    if (hitung == true) {
      layar.value = eval(tmpAngka + tmpOperator + layar.value);
      
      hitung = false;
    }

    if (layar.value.endsWith(".")) {
      layar.value = parseFloat(layar.value).toFixed(1);
    }
    
    tmpAngka = layar.value;
    tmpOperator = ketikInput;
    resetLayar = true;

  

  } else if (ketikInput >= 0 && ketikInput <= 9) {

    if (resetLayar == true) {
      layar.value = ketikInput;

      hitung = true;
      resetLayar = false;

    } else {
      if (layar.value == "0") {
        layar.value = ketikInput;

      } else {
        layar.value = layar.value + ketikInput;
      }
    }

  }
 
}



  // FUNCTION DISPLAY LAYAR //
  
function displayLayar(e) {

  const tombolKlik = e.target;
  const tombolInput = tombolKlik.innerText;
  const ketikInput = e.key;

  // MENAMPILKAN PROSES KE LAYAR DISPLAY PADA SAAT TOMBOL DI KLIK / DIKETIK PADA KEYBOARD //
  if (tombolInput == "=" || ketikInput == "=" || ketikInput == "Enter") {
    if (simpanDisplay == true) {
      display.innerText = `${tmpAngOpeAng} =`;
      simpanDisplay = false;
      stopDisplay = true;
      tmpAngOpe = "";
      tmpAngOpeAng = "";

    } else {
      display.innerText = `${layar.value} =`;
    }
     
  } else if (tombolInput == "CE" || ketikInput == "Escape") {
    display.innerText = "";
    tmpAngOpe = "";
    tmpAngOpeAng = "";

  } else if (tombolInput == "C" || ketikInput == "Delete") {
    display.innerText = `${tmpAngOpe} 0`;

  } else if (tombolInput == "<" || ketikInput == "Backspace") {

    if (simpanDisplay == true) {
      if(stopDisplay == true) {
        display.innerText = `${tmpAngOpe}`;

       } else {
        tmpAngOpeAng = display.innerText = `${tmpAngOpe} ${layar.value}`;
       }

    } else {
      if (display.innerText == `${layar.value} =`) {
        return;

      } else if (stopDisplay == true) {
          if (display.innerText == `${layar.value} =`) {
            return;
            
          } else {
            display.innerText = layar.value;
          }

      } else {
        display.innerText = display.innerText.slice(0, -1);
      }
    }

  } else if (tombolInput == "." || ketikInput == ".") {
    return;
    
  } else if (tombolKlik.classList.contains("operator") || ketikInput == "+" || ketikInput == "-" || ketikInput == "/" || ketikInput == "*") {
    if (ketikInput) {
      display.innerText = `${layar.value} ${ketikInput} `;
    } else {
      display.innerText = `${layar.value} ${tombolInput} `;
    }

    tmpAngOpe = display.innerText;
    simpanDisplay = true;
    stopDisplay = true;

  } else if (simpanDisplay == true) {
    tmpAngOpeAng = display.innerText = `${tmpAngOpe} ${layar.value} `;
    stopDisplay = false;
      
  } else {
      display.innerText = layar.value;
  }
  
}