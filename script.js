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
    const atividade = parseFloat(document.getElementById('atividade')?.value);

    if (!sexo || isNaN(idade) || isNaN(peso) || isNaN(altura) || isNaN(atividade)) return;

    const erros = [];

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

    let tmb;
    if (sexo === 'masculino')
        tmb = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade);
    else
        tmb = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);

    const gastoTotal = tmb * atividade;

    document.getElementById('resultadoTmb').innerHTML = `
        <strong>Seu metabolismo basal:</strong> ${tmb.toFixed(0)} kcal/dia<br>
        <strong>Gasto calórico total estimado:</strong> ${gastoTotal.toFixed(0)} kcal/dia
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

console.log('ShapeCalc validando múltiplos campos com mensagens detalhadas!');


let startGame = document.getElementById("startGame");
let gameScreen = document.getElementById("gameScreen");
let player = document.getElementById("player");
let counterText = document.getElementById("counter");
let currentImage = 1;
let clicks = 0;

if(startGame){
startGame.addEventListener("click", () => {
    gameScreen.style.display = "block";
});

player.addEventListener("click", () => {
    clicks++;
    counterText.textContent = "Flexões: " + clicks;
    currentImage = currentImage === 1 ? 2 : 1;
    player.src = "img/" + currentImage + ".PNG";
});
}
