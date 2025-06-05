// Chatbot
window.watsonAssistantChatOptions = {
    integrationID: "9fe52e2d-b1ff-45a2-927f-2b49053269b0", // The ID of this integration.
    region: "us-south", // The region your integration is hosted in.
    serviceInstanceID: "d61db492-76f5-4eae-97da-0bd20514cee2", // The ID of your service instance.
    onLoad: async (instance) => { await instance.render(); }
};
setTimeout(function () {
    const t = document.createElement('script');
    t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
});

if (document.querySelector('#search')) {
    document.querySelector('#search').addEventListener('submit', async (event) => {
        event.preventDefault();

        const cityName = document.querySelector('#city_name').value;

        if (!cityName) {
            document.querySelector("#weather").classList.remove('show');
            showAlert('Você precisa digitar uma cidade...');
            return;
        }

        const apiKey = 'cd7dadee4dfaa5653ccf17ea48cc6223';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

        const results = await fetch(apiUrl);
        const json = await results.json();

        if (json.cod === 200) {
            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity,
            });
        } else {
            document.querySelector("#weather").classList.remove('show');
            showAlert(`
            Não foi possível localizar...

            <img src="./assets/images/void.png"/>
        `)
        }
    });
}

function showInfo(json) {
    showAlert('');

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}

// Abrir e fechar menu header mobile
const containerMenu = document.querySelector('.limite-container')

containerMenu.querySelector('.limite-container .abrir-menu').addEventListener('click', function () {
    containerMenu.classList.toggle('menu-aberto')
    document.body.classList.toggle('travar-body')
})

// Estilizar header conforme url da página
document.querySelectorAll('.navegador-paginas a').forEach(link => {
    if (link.pathname.split('/').pop() == window.location.pathname.split('/').pop()) {
        link.classList.add('link-ativo')
    }
})

// Abrir e fechar faq
document.querySelectorAll('.perguntas li').forEach(pergunta => {
    pergunta.addEventListener('click', function () {
        pergunta.querySelector('.resposta').classList.toggle('ativa')
        pergunta.querySelector('img').classList.toggle('rodar')
    })
})


// 
function toTitleCase(string) {
    return string
        .toLowerCase()
        .split(' ')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(' ')
}

document.addEventListener("DOMContentLoaded", () => {
    const localizacaoInput = document.getElementById("localizacao");
    const botaoAlertas = document.getElementById("alertas");
    const botaoAbrigos = document.getElementById("abrigos");

    const eventos = [
        {
            localizacao: "São Paulo",
            tipo: "Tempestade severa"
        },
        {
            localizacao: "Rio de Janeiro",
            tipo: "Ondas de calor"
        },
        {
            localizacao: "São Paulo",
            tipo: "Chuvas intensas"
        },
        {
            localizacao: "Curitiba",
            tipo: "Nevasca inesperada"
        }
    ]

    const listaAbrigos = [
        {
            nome: 'CRAS Mooca',
            imagem: '../assets/images/abrigo1.png',
            endereco: 'Rua Taquari, 549 – Mooca',
            cidade: 'São Paulo',
            avaliacao: '4',
            telefone: '(11) 2383-4539 ou (11) 2383-4541',
            recursos: 'abrigo, alimentação básica, proteção contra frio'
        },
        {
            nome: 'Centro Esportivo Tietê',
            imagem: '../assets/images/abrigo2.jpg',
            endereco: 'Av. Santos Dumont, 843 – Luz',
            cidade: 'São Paulo',
            avaliacao: '4',
            telefone: '(11) 3113-8000 ou (11) 95774-5830',
            recursos: 'espaço amplo coberto, alimentação emergencial, banheiro'
        },
        {
            nome: 'Terminal Rodoviário Tietê (emergencial)',
            imagem: '../assets/images/abrigo3.jpg',
            endereco: 'Av. Cruzeiro do Sul, 1800 – Santana',
            cidade: 'São Paulo',
            avaliacao: '3',
            telefone: '(11) 3866-1100',
            recursos: 'acesso a transporte, bancos, abrigo parcial'
        },
        {
            nome: 'Casa de Passagem da Prefeitura (Centro)',
            imagem: '../assets/images/abrigo4.jpeg',
            endereco: 'R. do Glicério, 420 – Liberdade',
            cidade: 'São Paulo',
            avaliacao: '4',
            telefone: '(11) 4035-2785',
            recursos: 'abrigo, alimentação, banho, suporte social'
        }
    ]

    if (botaoAlertas) {
        botaoAlertas.addEventListener("click", () => {
            const localizacaoDigitada = localizacaoInput?.value.trim();
            if (!localizacaoDigitada) {
                alert("Por favor, informe uma localização antes de verificar alertas.");
                return;
            }

            const dialog = document.querySelector("dialog");
            const tituloDialog = dialog.querySelector("h2");
            const nomeEvento = dialog.querySelector(".nome");
            const instrucaoEvento = dialog.querySelector(".instrucao");

            const eventosCompativeis = eventos.filter(evento => evento.localizacao.toLowerCase() === localizacaoDigitada.toLowerCase());

            if (eventosCompativeis.length > 0) {
                tituloDialog.textContent = `Eventos climáticos em ${toTitleCase(localizacaoDigitada)}`;
                nomeEvento.textContent = `ALERTA: Sua localização está vulnerável a ${eventosCompativeis.map(e => e.tipo).join(", ")}`;
                instrucaoEvento.textContent = "Para se preparar, volte ao menu e acesse as dicas de preparo para eventos climáticos e localize abrigos para se proteger.";
            } else {
                tituloDialog.textContent = `Nenhum evento climático em ${toTitleCase(localizacaoDigitada)}`;
                nomeEvento.style.display = "none";
                instrucaoEvento.textContent = "Parece que não há alertas no momento, mas fique sempre preparado para possíveis eventos climáticos.";
            }

            dialog.querySelector('.fechar').addEventListener('click', function () {
                dialog.close()
            })

            dialog.showModal();
        });
    }

    if (botaoAbrigos) {
        botaoAbrigos.addEventListener("click", () => {
            const localizacaoDigitada = localizacaoInput?.value.trim();
            if (!localizacaoDigitada) {
                alert("Por favor, informe uma localização antes de conferir abrigos.");
                return;
            }

            localStorage.setItem("localizacaoDigitada", localizacaoDigitada);
            window.location.href = "abrigos.html";
        });
    }

    if (window.location.pathname.includes("abrigos.html")) {
        const localizacaoDigitada = localStorage.getItem("localizacaoDigitada");

        if (!localizacaoDigitada) {
            alert("Nenhuma localização foi inserida anteriormente. Volte e insira uma localização para conferir abrigos.");
            return;
        }

        const abrigosCompativeis = listaAbrigos.filter(abrigo => abrigo.cidade.toLowerCase() === localizacaoDigitada.toLowerCase());
        const abrigoLista = document.querySelector(".abrigos")

        if (abrigosCompativeis.length > 0) {
            abrigoLista.innerHTML = "";
            abrigosCompativeis.forEach(abrigo => {
                const li = document.createElement("li");
                li.className = 'abrigo'

                const img = document.createElement("img");
                img.src = abrigo.imagem;
                img.alt = "Imagem do abrigo";

                const endereco = document.createElement("p");
                endereco.className = "endereco";
                endereco.innerHTML = `${abrigo.endereco}. ${abrigo.cidade}.`

                const telefone = document.createElement("p");
                telefone.className = "telefone";
                telefone.textContent = abrigo.telefone;

                const recursos = document.createElement("p");
                recursos.innerHTML = `Recursos disponíveis: <span class="recursos">${abrigo.recursos}.</span>`;

                const avaliacaoUl = document.createElement("ul");
                avaliacaoUl.className = "avaliacao";
                for (let i = 0; i < 5; i++) {
                    const estrela = document.createElement("li");
                    estrela.className = "estrela";
                    if (i < abrigo.avaliacao) {
                        estrela.classList.add("estrela-ativa");
                    }
                    avaliacaoUl.appendChild(estrela);
                }

                const botaoRotas = document.createElement("a");
                botaoRotas.href = "#";
                botaoRotas.className = "botao";
                botaoRotas.textContent = "Conferir Rotas";

                li.appendChild(img);
                li.appendChild(avaliacaoUl);
                li.appendChild(endereco);
                li.appendChild(telefone);
                li.appendChild(recursos);
                li.appendChild(botaoRotas);

                abrigoLista.appendChild(li);
            })

        } else {
            abrigoLista.style.display = 'none'
            document.querySelector(".sem-abrigos").style.display = "flex"
        }
    }
});

// Emitir alerta
// const formLocal = document.querySelector('#pesquisar-local')
// const modal = document.querySelector('dialog')

// formLocal.addEventListener('submit', function (element) {
//     element.preventDefault()
// })

// document.querySelector('dialog .fechar').addEventListener('click', function () {
//     modal.close()
// })

// document.querySelector('#alertas').addEventListener('click', function () {
//     if (formLocal.querySelector('input').value == '') {
//         alert('preencha')
//     } else {
//         modal.querySelector('h2').innerText = `Evento climático em ${formLocal.querySelector('input').value}`
//         modal.showModal()
//     }
// })

// document.querySelector('#abrigos').addEventListener('click', function () {
//     if (formLocal.querySelector('input').value == '') {
//         alert('preencha')
//     } else {
//         modal.querySelector('h2').innerText = `Locais seguros para ${formLocal.querySelector('input').value}`
//         modal.showModal()
//     }
// })

/* 
// Testes
const formLocal = document.querySelector('#pesquisar-local')
const modal = document.querySelector('dialog')
const inputLocal = formLocal.querySelector('input')
var eventoClimatico = 'Chuva Intensa'

formLocal.addEventListener('submit', function (element) {
    element.preventDefault()
})

document.querySelector('#alertas').addEventListener('click', function () {
    if (inputLocal.value == '') {
        alert('preencha')
    } else {
        modal.querySelector('h2').innerText = `Evento climático em ${formLocal.querySelector('input').value.trim()}`
        modal.querySelector('.nome').innerText = `Chances de ${eventoClimatico}!`
        modal.querySelector('.instrucao').innerText = `Acesse as dicas para se preparar e procure locais seguros acima.`
        modal.showModal()
    }
})

document.querySelector('#abrigos').addEventListener('click', function () {
    if (formLocal.querySelector('input').value == '') {
        alert('preencha')
    } else {
        window.location.href = 'abrigos.html'
    }
})

document.querySelector('dialog .fechar').addEventListener('click', function () {
    document.querySelector('dialog').close()
})

*/