let box=document.getElementById("box");
let menu=document.getElementById("menu");
let barras=document.getElementById("invert");
let logo = document.getElementById("logo");
let img = document.querySelector("#logo");

//animacoes

box.addEventListener("change",function evento(){
    if (box.checked){
        console.log("sim")
        menu.style.top="0%"
        barras.style.filter='invert(0%)'
        logo.style.filter='invert(100%)'
        img.setAttribute("src","Imagens/septaron_logo_branco.png")
    }
    else{
        console.log("nao")
        menu.style.top="-99.1%"
        barras.style.filter='invert(100%)'
        logo.style.filter='invert(0%)'
        img.setAttribute("src","Imagens/septaron_logo_preto.png")
    }
})
