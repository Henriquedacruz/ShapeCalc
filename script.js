function mostrarErros(idResultado, erros) {
    const container = document.getElementById(idResultado);
    container.innerHTML = '';

    if (erros.length === 0) return;

    const erroDiv = document.createElement('div');
    erroDiv.className = 'mensagem-erro-multipla';

    erroDiv.innerHTML = erros.map(erro => `
        <div class="erro-item">⚠️ <strong>${erro.campo} (${erro.valor ?? '-'})</strong>: ${erro.mensagem}</div>
    `).join('');

    container.appendChild(erroDiv);

    // Animação suave (fade-in)
    setTimeout(() => erroDiv.classList.add('visivel'), 50);

    // Some depois de alguns segundos (opcional)
    setTimeout(() => {
        erroDiv.classList.remove('visivel');
        setTimeout(() => erroDiv.remove(), 500);
    }, 6000);
}

// -------------------- IMC --------------------
function calcularIMC() {
    const peso = parseFloat(document.getElementById('peso')?.value);
    const alturaCm = parseFloat(document.getElementById('altura')?.value);
    const altura = alturaCm / 100;

    if (isNaN(peso) || isNaN(alturaCm)) return;

    const erros = [];

    if (peso < 0) erros.push({ campo: 'Peso', valor: peso, mensagem: 'Valores negativos não são aceitos!' });
    if (alturaCm < 0) erros.push({ campo: 'Altura', valor: alturaCm, mensagem: 'Valores negativos não são aceitos!' });
    if (peso > 200) erros.push({ campo: 'Peso', valor: peso, mensagem: 'www.quilosmortais.com' });
    if (alturaCm > 271) erros.push({ campo: 'Altura', valor: alturaCm, mensagem: 'Você não é o Sultan Kösen' });
    if (alturaCm < 45) erros.push({ campo: 'Altura', valor: alturaCm, mensagem: 'Engraçadinho vc' });

    if (erros.length > 0) {
        mostrarErros('resultado', erros);
        return;
    }

    const imc = peso / (altura * altura);
    let classificacao = '';

    if (imc < 18.5) classificacao = 'Abaixo do peso';
    else if (imc < 24.9) classificacao = 'Peso normal';
    else if (imc < 29.9) classificacao = 'Sobrepeso';
    else classificacao = 'Obesidade';

    document.getElementById('resultado').innerHTML = 
        `Seu IMC é <strong>${imc.toFixed(2)}</strong> (${classificacao})`;
}


// -------------------- TMB --------------------
function calcularTMB() {
    const sexo = document.getElementById('sexo')?.value;
    const idade = parseFloat(document.getElementById('idade')?.value);
    const peso = parseFloat(document.getElementById('pesoTmb')?.value);
    const altura = parseFloat(document.getElementById('alturaTmb')?.value);
    const atividade = document.getElementById('atividade')?.value;

    const erros = [];

    // Validações personalizadas
    if (!sexo) erros.push({ campo: 'Sexo', valor: '-', mensagem: 'Selecione o sexo.' });
    if (isNaN(idade)) erros.push({ campo: 'Idade', valor: idade, mensagem: 'Informe a idade corretamente.' });
    if (isNaN(peso)) erros.push({ campo: 'Peso', valor: peso, mensagem: 'Informe o peso corretamente.' });
    if (isNaN(altura)) erros.push({ campo: 'Altura', valor: altura, mensagem: 'Informe a altura corretamente.' });
    if (!atividade) erros.push({ campo: 'Atividade', valor: '-', mensagem: 'Selecione um nível de atividade.' });

    if (idade < 0) erros.push({ campo: 'Idade', valor: idade, mensagem: 'Valores negativos não são aceitos!' });
    if (peso < 0) erros.push({ campo: 'Peso', valor: peso, mensagem: 'Valores negativos não são aceitos!' });
    if (altura < 0) erros.push({ campo: 'Altura', valor: altura, mensagem: 'Valores negativos não são aceitos!' });
    if (idade > 130) erros.push({ campo: 'Idade', valor: idade, mensagem: 'O novo Matusalém!' });
    if (peso > 200) erros.push({ campo: 'Peso', valor: peso, mensagem: 'www.quilosmortais.com' });
    if (altura > 271) erros.push({ campo: 'Altura', valor: altura, mensagem: 'Você não é o Sultan Kösen' });
    if (altura < 45) erros.push({ campo: 'Altura', valor: altura, mensagem: 'Engraçadinho vc' });

    if (erros.length > 0) {
        mostrarErros('resultadoTmb', erros);
        return;
    }

    // Fórmula Mifflin–St Jeor
    let tmb;
    if (sexo === 'masculino') {
        tmb = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade);
    } else {
        tmb = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);
    }

    // Fatores oficiais (PAL – Physical Activity Level)
    const fatoresAtividade = {
        'sedentario': {
            fator: 1.2,
            desc: 'Pouca ou nenhuma atividade física.'
        },
        'leve': {
            fator: 1.375,
            desc: 'Caminhada leve 30 min, 1–3× por semana.'
        },
        'moderado': {
            fator: 1.55,
            desc: 'Treino moderado 30–60 min, 3–5× por semana.'
        },
        'intenso': {
            fator: 1.725,
            desc: 'Treino de musculação pesado (~1 h diário), trabalho físico intenso ou prática esportiva frequente.'
        },
        'muito_intenso': {
            fator: 1.9,
            desc: 'Atleta, 2 treinos por dia ou rotina altamente ativa.'
        }
    };

    const atividadeInfo = fatoresAtividade[atividade];
    const gastoTotal = tmb * atividadeInfo.fator;

    document.getElementById('resultadoTmb').innerHTML = `
        <strong>Metabolismo Basal (TMB):</strong> ${tmb.toFixed(0)} kcal/dia<br>
        <strong>Gasto calórico total estimado:</strong> ${gastoTotal.toFixed(0)} kcal/dia<br>
        <em>Nível de atividade:</em> ${atividadeInfo.desc}<br><br>
    `;
}


// -------------------- PROTEÍNA --------------------
function calcularProteina() {
    const peso = parseFloat(document.getElementById('pesoProteina')?.value);
    const fator = parseFloat(document.getElementById('objetivoProteina')?.value);

    if (isNaN(peso) || isNaN(fator)) return;

    const erros = [];

    if (peso < 0) erros.push({ campo: 'Peso', valor: peso, mensagem: 'Valores negativos não são aceitos!' });
    if (peso > 200) erros.push({ campo: 'Peso', valor: peso, mensagem: 'www.quilosmortais.com' });

    if (erros.length > 0) {
        mostrarErros('resultadoProteina', erros);
        return;
    }

    const proteina = peso * fator;

    document.getElementById('resultadoProteina').innerHTML = `
        <strong>Você deve consumir aproximadamente:</strong><br>
        ${proteina.toFixed(1)}g de proteína por dia
    `;
}

// -------------------- ÁGUA --------------------
function calcularAgua() {
    const peso = parseFloat(document.getElementById('pesoAgua')?.value);

    if (isNaN(peso)) return;

    const erros = [];

    if (peso < 0) erros.push({ campo: 'Peso', valor: peso, mensagem: 'Valores negativos não são aceitos!' });
    if (peso > 200) erros.push({ campo: 'Peso', valor: peso, mensagem: 'www.quilosmortais.com' });

    if (erros.length > 0) {
        mostrarErros('resultadoAgua', erros);
        return;
    }

    const agua = (peso * 35) / 1000;

    document.getElementById('resultadoAgua').innerHTML = `
        <strong>Você deve consumir aproximadamente:</strong><br>
        ${agua.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 3 })} litros de água por dia 💧 
    `;
    //alternativa antiga
    // ${agua.toFixed(2).replace('.', ',')} litros de água por dia 💧
}

// -------------------- MINI GAME --------------------
let startGame = document.getElementById("startGame");
let gameScreen = document.getElementById("gameScreen");
let player = document.getElementById("player");
let counterText = document.getElementById("counter");

let currentImage = 1;
let clickStage = 0; // controla o estágio da flexão (1 = descendo, 2 = subindo)
let flexCount = 0;  // conta as flexões completas

if (startGame) {
  startGame.addEventListener("click", () => {
    gameScreen.style.display = "block";
  });

  player.addEventListener("click", () => {
    // alterna entre imagem 1 e 2
    currentImage = currentImage === 1 ? 2 : 1;
    player.src = "img/" + currentImage + ".PNG";

    // cada clique muda o estágio
    clickStage++;

    // quando completou 2 cliques (1 ciclo), conta uma flexão
    if (clickStage === 2) {
      flexCount++;
      counterText.textContent = "Flexões: " + flexCount;
      clickStage = 0; // reseta o ciclo
    }
  });
}
