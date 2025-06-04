$(document).ready(function() {
    var cartas = [
        { nome: "🍓" }, { nome: "🍏" }, { nome: "🍈" }, { nome: "🍉" },
        { nome: "🍅" }, { nome: "🍌" }, { nome: "🍓" }, { nome: "🍏" },
        { nome: "🍈" }, { nome: "🍉" }, { nome: "🍅" }, { nome: "🍌" }
    ];

    var cartaVirada = [];
    var jogadas = 0;
    var pontos = 0;
    var tempoRestante = 0;
    var intervalo;

    $('.btn-dificuldade').click(function() {
        tempoRestante = parseInt($(this).data('tempo')); // segundos
        $('#popup-dificuldade').hide(); // Esconde o popup
        iniciarJogo();
    });

    function iniciarJogo() {
        cartas.sort(() => Math.random() - 0.6);
        $('.carta').each(function(index) {
            $(this).data('valor', cartas[index].nome).removeClass('virada').text('');
        });

        $('#tempo').text(tempoRestante + 's');
        $('#pontos').text(pontos);

        intervalo = setInterval(() => {
            tempoRestante--;
            $('#tempo').text(tempoRestante + 's');
            if (tempoRestante <= 0) {
                clearInterval(intervalo);
                alert('⏰ Tempo esgotado! Game Over.');
                location.reload();
            }
        }, 1000);

        $('.carta').off('click').click(function() {
            if ($(this).hasClass('virada') || cartaVirada.length === 2) return;

            $(this).addClass('virada').text($(this).data('valor'));
            cartaVirada.push($(this));

            if (cartaVirada.length === 2) {
                if (cartaVirada[0].data('valor') === cartaVirada[1].data('valor')) {
                    cartaVirada = [];
                    jogadas++;
                    pontos++;
                    $('#pontos').text(pontos);

                    if (jogadas >= 6) {
                        clearInterval(intervalo);
                        setTimeout(() => {
                            alert(`🎉 Você venceu!\nTempo restante: ${tempoRestante}s\nPontos: ${pontos}`);
                            location.reload();
                        }, 300);
                    }
                } else {
                    setTimeout(() => {
                        cartaVirada[0].removeClass('virada').text('');
                        cartaVirada[1].removeClass('virada').text('');
                        cartaVirada = [];
                    }, 500);
                }
            }
        });
    }
});
