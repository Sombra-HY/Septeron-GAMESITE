var canvas=document.getElementById("tela");
var ctx=canvas.getContext("2d");
//ganhando ou perdendo----------------------------------------------------------------------------------
function derrota(){
    ctx.drawImage(fim,0,0)
    game_over=1
    requestAnimationFrame()
}


//variaveis-------------------------------------------------------------------------------------------

let utimatecla=[39]

var UP=38,DOWN=40,LEFT=37,RIGHT=39,ATAQUE=90
let movedown=false, moveup=false, moveright=false, moveleft=false, ataque=false, ataqueativo=0,  com=0,game_over=0,GANHOU=0
//valor da posicao espada
let somax=0,somay=0,tamanhox=0,tamanhoy=0


//recursoss do jogo---------------------------------------------------------------------------------------
let imagem1= new Image()
imagem1.src="jogo/personagem.png"
let arma= new Image()
arma.src='jogo/arma.png'

let espadar= new Image()
espadar.src="jogo/espada/espadar.png"

let espadal= new Image()
espadal.src="jogo/espada/espadal.png"

let background= new Image()
background.src="jogo/background1.jpg"

let ini=new Image()
ini.src="jogo/INICIO.png"
let win=new Image()
win.src="jogo/win.png"

let fim=new Image()
fim.src="jogo/fim.png"
//som

let am_s= new Audio("jogo/som/ambiente.mp3")
let and_s= new Audio("jogo/som/andando.mp3")
let esp_s=new Audio("jogo/som/espada.mp3")

//sistema de audio--------------------------------------------------------------------------------------
am_s.loop=true
function musica(){
    am_s.play()
}// ao carregar o html tocara a musica

esp_s.volume=0.1
am_s.volume=0.4
and_s.volume=0.8

and_s.loop=true
//iniciar jogo-----------------------------------------------------------------------------------------------
ctx.drawImage(win,0,0,1280,720)

addEventListener("keydown",inicar_jogo)
function inicar_jogo(evento){
    let tecla= evento.keyCode
    console.log(tecla)
    if(tecla===13 && com===0){
        com=1
        jogo()
    }
    if(tecla===13 && game_over===1){
        com=0
        window.location.reload()
    }
}
function jogo(){
    //pegando as teclas--------------------------------------------------------------------------------------
    document.addEventListener('keydown',pressionado)
    document.addEventListener('keyup',soltado)

    function pressionado(evento){ //move o personagem e toca uma musica ao andar, equanto movedown estiver true
        let tecla = evento.keyCode;
        if (tecla === DOWN && tecla!== UP){
            movedown=true
            evento.preventDefault()
        }
        if (tecla === LEFT && tecla!==RIGHT){//a
            moveleft=true
            utimatecla.unshift(tecla)
            and_s.play()
        }
        if (tecla === UP && tecla!==DOWN){//w
            moveup=true
            evento.preventDefault()
        }
        if (tecla === RIGHT && tecla!==LEFT) {//d
            moveright = true
            utimatecla.unshift(tecla)
            and_s.play()
        }


        console.log(utimatecla[0])
    } //som e movimento on
    function soltado(evento){ //se tiver verdadeiro fica falso ao soltar a tecla, com isso para a musica e o movimento
        let tecla = evento.keyCode;
        if (tecla === DOWN ){
            movedown=false
            and_s.pause()
        }
        if (tecla === LEFT && tecla!==RIGHT){//a
            moveleft=false
            and_s.pause()
        }
        if (tecla === UP && tecla!==DOWN){//w
            moveup=false
            and_s.pause()
        }
        if (tecla === RIGHT && tecla!==LEFT) {//d
            moveright = false
            and_s.pause()
        }
        if (tecla === ATAQUE && ataqueativo===0) {//ataque no Z
            ataque = true
            esp_s.play()
            ataqueativo=1
            setTimeout(tempo, 200)//determina que espada aparecera por 1 segundo na tela
            function tempo() {
                ataque = false
                barra_ataque=0
                setTimeout(exaustao,2000)
                function exaustao(){
                    ataqueativo=0
                    barra_ataque=59
                }
            }
        }
    } //som e movimento off

    let barra_ataque=59,barra_vida=599
    let personagem={
        x:300,
        y:300,
        largura:80,
        altura:60,
        velocidade: 3
    }

    let espada_r={
        x:(personagem.x),
        y:personagem.y,
        largura:80,
        altura:25,
    }
    let espada_l={
        x:personagem.x,
        y:personagem.y,
        largura:80,
        altura:25,
    }

    let obejto={
        x:Math.floor(Math.random()*(1500-1300)+1300),
        y:Math.floor(Math.random()*(900-800)+800),
        widht:150,
        height:100,
        velocidade: 1.2
    }
    function colisao(){
        if(ataque){
            if(utimatecla[0]===RIGHT){
                if(personagem.x+personagem.largura+40>obejto.x &&
                    personagem.x<obejto.x+obejto.widht &&
                    personagem.y+personagem.altura+25>obejto.y &&
                    personagem.y<obejto.y+obejto.height){
                    console.log("bateu")
                    obejto.x+=400
                    obejto.y+=Math.floor(Math.random() * 150) - 150
                    obejto.velocidade+=0.25
                    barra_vida+=-130
                    if (barra_vida<10){
                        ganhou()
                    }
                }
            }
            if(utimatecla[0]===LEFT) {
                if(personagem.x-40<obejto.x+obejto.widht &&
                    personagem.y+personagem.altura<obejto.y+obejto.widht &&
                    personagem.y>obejto.y){
                    console.log("bateuz")
                    obejto.x+=400
                    obejto.y+=Math.floor(Math.random() * 150) - 150
                    obejto.velocidade+=0.25
                    barra_vida+=-130
                    if (barra_vida<10){
                        ganhou()
                    }
                }
            }
        }

    }
    function colisao_personagem(){
        if(GANHOU===0 && personagem.x+personagem.largura>obejto.x &&
            personagem.x<obejto.x+obejto.widht &&
            personagem.y+personagem.altura>obejto.y &&
            personagem.y<obejto.y+obejto.height){
            derrota()
        }
    }
//atualizando jogo--------------------------------------------------------------------------------------
    update()
    function update(){
        requestAnimationFrame(update)
        colisao()
        mover()
        colisao_personagem()
        iminigo()
        desenha()
    }
    function desenha(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.drawImage(background,0,0,1280,720)

        ctx.fillStyle="red"
        ctx.fillRect(21,691,barra_ataque,8)
        ctx.fillRect(341,21,barra_vida,18)
        ctx.drawImage(imagem1,personagem.x,personagem.y,personagem.largura,personagem.altura)
        if(ataque){
            if(utimatecla[0]===RIGHT){
                ctx.drawImage(espadar,personagem.x+40,personagem.y+25,espada_r.largura,espada_r.altura)

            }
            if(utimatecla[0]===LEFT){
                ctx.drawImage(espadal,personagem.x-45,personagem.y+25,espada_l.largura,espada_l.altura)
            }

        }//define como o ataque sera feito com base na ultima tecla apertada
        if (obejto.velocidade>1.2 && GANHOU===0){ //chance do boss teletransportar
            let chance=Math.floor(Math.random() * 10000) //existe uma possibilidade do boss teletransportar atras do player de 0.2%
            if (chance>9980){
                if(chance>9980 && chance<1991){
                    obejto.y=personagem.y+180
                    obejto.x=personagem.x-400
                }
                if(chance>1991){
                    obejto.y=personagem.y+180
                    obejto.x=personagem.x-400
                }
            }
        }
        ctx.drawImage(arma,obejto.x,obejto.y,obejto.widht,obejto.height)
        ctx.beginPath()
        ctx.strokeStyle="gray"
        ctx.moveTo(340,40)
        ctx.lineTo(940,40)
        ctx.lineTo(940,20)
        ctx.lineTo(340,20)
        ctx.lineTo(340,40)
        ctx.stroke()

        ctx.beginPath()
        ctx.strokeStyle="gray"
        ctx.moveTo(20,700)
        ctx.lineTo(80,700)
        ctx.lineTo(80,690)
        ctx.lineTo(20,690)
        ctx.lineTo(20,700)
        ctx.stroke()

    }
    function mover(){
        if (personagem.x >40 && personagem.x<1030 && personagem.y>40 && personagem.y<670 && game_over===0){ //colisao do personagem com as bordas do mundo
            if (moveright) {//s
                personagem.x +=personagem.velocidade
            }
            if (moveleft) {//a
                personagem.x -=personagem.velocidade
            }
            if (moveup) {//w
                personagem.y -=personagem.velocidade
            }
            if (movedown) {//d
                personagem.y +=personagem.velocidade
            }
            console.log(personagem.x)
        }
        if(personagem.x<=42) {
            personagem.x=42
        }
        if(personagem.x>=1030) {
            personagem.x=1028
        }
        if(personagem.y<=42) {
            personagem.y=42
        }
        if(personagem.y>=670) {
            personagem.y=668
        }


    }
    function iminigo(){
        if (personagem.x> obejto.x){
            obejto.x+=obejto.velocidade
        }
        if (personagem.x< obejto.x){
            obejto.x-=obejto.velocidade
        }
        if (personagem.y-30> obejto.y){
            obejto.y+=obejto.velocidade
        }
        if (personagem.y-30< obejto.y){
            obejto.y-=obejto.velocidade
        }
    }
}

function inicio(){
    ctx.drawImage(background,0,0)
    ctx.drawImage(ini,0,0,1280,720)
    requestAnimationFrame(inicio)
}
function ganhou(){
    ctx.drawImage(win,0,0)
    game_over=1
    GANHOU=1
    requestAnimationFrame(ganhou)


}
inicio()
