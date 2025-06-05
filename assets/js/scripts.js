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

// Emitir alerta
const formLocal = document.querySelector('#pesquisar-local')
const modal = document.querySelector('dialog')

formLocal.addEventListener('submit', function (element) {
    element.preventDefault()
})

document.querySelector('dialog .fechar').addEventListener('click', function () {
    modal.close()
})

document.querySelector('#alertas').addEventListener('click', function () {
    if (formLocal.querySelector('input').value == '') {
        alert('preencha')
    } else {
        modal.querySelector('h2').innerText = `Evento climático em ${formLocal.querySelector('input').value}`
        modal.showModal()
    }
})

document.querySelector('#abrigos').addEventListener('click', function () {
    if (formLocal.querySelector('input').value == '') {
        alert('preencha')
    } else {
        modal.querySelector('h2').innerText = `Locais seguros para ${formLocal.querySelector('input').value}`
        modal.showModal()
    }
})

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
    modal.close()
})

*/