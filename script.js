function showNotification() {
  if (!("Notification" in window)) {
    // Fala pro usuário que a API de notificações WEB não tem apoio nesse navegador
    console.log("ERRO: Notificações WEB não tem suporte neste navegador");
    return;
  }

  Notification.requestPermission().then(function (permission) {
    if (permission === "granted") {
      var notification = new Notification("Time's up!", {
        body: "The timer has reached 0.",
        icon: "path/to/notification-icon.png" // Optional icon path
      });
    }
  });
}

// Executa o bloco de código apenas depois do HTML carregar
window.addEventListener('DOMContentLoaded', function () {
    // Pega os elementos do HTML através do ID e atribui a variáveis, prontas pra manipulação
    var startButton = document.getElementById('start-btn');
    var resetButton = document.getElementById('reset-btn');
    var timerDisplay = document.getElementById('timer__pomodoro-display');
    var pomodoroLink = document.querySelector('.timer__options-list-link--pomodoro');
    var breakLink = document.querySelector('.timer__options-list-link--break');
    var longBreakLink = document.querySelector('.timer__options-list-link--longBreak');
    var timer__container = document.querySelector('.timer__container');
  
    // Define variáveis globais para serem acessadas por funções e eventListeners
    var countdown;
    var isRunning = false;
    var timerDuration = 25 * 60; // Duração do Timer em Segundos
    var timerValue = timerDuration; // Valor atual do Timer
  
    function startTimer() {
      // Cria uma função callBack que executa o bloco de código a cada segundo
      countdown = setInterval(function () {
        // Converte o timerValue em minutos e segundos
        var minutes = parseInt(timerValue / 60, 10);
        var seconds = parseInt(timerValue % 60, 10);
  
        console.log(timerValue)

        // Adiciona um 0 na frente caso o número de minutos/segundos caia pra baixo de 10
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
  
        // Atualiza o Display do Timer
        timerDisplay.textContent = minutes + ':' + seconds;

  
        // Executa o bloco de código apenas se o valor do Timer for menor que 0, parando a contagem
        if (--timerValue < 0) {
          clearInterval(countdown);
          timerDisplay.textContent = 'Time\'s up!';
          isRunning = false;
          showNotification(); 
        }
      }, 1000);
    }
  
    // Função designada ao botão de reset, reseta a contagem e limpa a função callback setInterval()
    function resetTimer() {
      clearInterval(countdown);
      timerValue = timerDuration;
      timerDisplay.textContent = "25:00";
      isRunning = false;
    }
  
    // Adiciona um event listener ao botão Start 
    startButton.addEventListener('click', function () {
      audio.play();
      startButton.classList.toggle("start-active");
      // Verifica se o botão Start contém a classe pause-active ou se o valor da variável isRunning for false
      if (startButton.classList.contains("start-active")) {
        startButton.textContent = "Pause";
        startTimer();
        isRunning = true;
      } else if (timerDisplay.textContent < timerDuration){
        startButton.textContent = "Resume";
        clearInterval(countdown);
        isRunning = false;
      } else {
        startButton.textContent = "Start";
        clearInterval(countdown);
        isRunning = false;
      }
    });
  
    // Remove a pause-active 
    resetButton.addEventListener('click', function () {
      audio.play();
      resetTimer();
      startButton.classList.remove("start-active");
      startButton.textContent = "Start";
    });

    // Alterna entre as cores do body de acordo com a opção selecionada 
    pomodoroLink.addEventListener('click', function(e) {
      clearInterval(countdown)
      e.preventDefault();
      timerValue = 25 * 60;
      timerDisplay.textContent = "25:00";
      startButton.classList.remove("start-active");
      startButton.textContent = "Start";
      timer__container.classList.add("pomodoroBg");
      timer__container.classList.remove("breakBg");
      timer__container.classList.remove("longBreakBg");
    })

    breakLink.addEventListener('click', function(e) {
      clearInterval(countdown)
      e.preventDefault();
      timerValue = 5 * 60; 
      timerDisplay.textContent = "05:00";
      startButton.classList.remove("start-active");
      startButton.textContent = "Start";
      timer__container.classList.remove("pomodoroBg");
      timer__container.classList.add("breakBg");
      timer__container.classList.remove("longBreakBg");
    })

    longBreakLink.addEventListener('click', function(e) {
      clearInterval(countdown)
      e.preventDefault();
      timerValue = 15 * 60; 
      timerDisplay.textContent = "15:00";
      startButton.classList.remove("start-active");
      startButton.textContent = "Start";
      timer__container.classList.remove("pomodoroBg");
      timer__container.classList.remove("breakBg");
      timer__container.classList.add("longBreakBg");
    })

    // Incrementa um efeito sonoro ao clicar nos botões
    var audio = new Audio();
    audio.src = "./assets/audio/clicking-sound-2.wav"

  });