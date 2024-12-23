$(document).ready(function() {
    var cartas = [
        { nome: "🍓" }, 
        { nome: "🍏" }, 
        { nome: "🍈" }, 
        { nome: "🍉" },
        { nome: "🍅" }, 
        { nome: "🍌" }, 
        { nome: "🍓" }, 
        { nome: "🍏" },
        { nome: "🍈" }, 
        { nome: "🍉" }, 
        { nome: "🍅" }, 
        { nome: "🍌" }
    ];
    cartas.sort(() => Math.random() - 0.6)
    var cartaVirada = []
    var jogadas = 0
    $('.carta').each(function (index, element) {
        $(this).data('valor', cartas[index].nome)        
    });
    $('.carta').click(function (e) { 
        if($(this).hasClass('virada')|| cartaVirada.length === 2){
            return
        }
        $(this).addClass('virada').text($(this).data('valor'))
        cartaVirada.push($(this))

        if(cartaVirada.length === 2){
            if(cartaVirada[0].data('valor') === cartaVirada[1].data('valor')){
                cartaVirada = []
                jogadas++
                if(jogadas>=6){
                    alert('ganhou!!')
                    location.reload()
                }
            }else{
                setTimeout(() => {
                    cartaVirada[0].removeClass('virada').text('')
                    cartaVirada[1].removeClass('virada').text('')
                    cartaVirada = []
                }, 500);
            }
        }
        
    });
});