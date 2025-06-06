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

            const dialog = document.querySelector(".alerta-dialog");
            const tituloDialog = dialog.querySelector("h2");
            const nomeEvento = dialog.querySelector(".nome");
            const instrucaoEvento = dialog.querySelector(".instrucao");

            const eventosCompativeis = eventos.filter(evento => evento.localizacao.toLowerCase() === localizacaoDigitada.toLowerCase());

            if (eventosCompativeis.length > 0) {
                tituloDialog.textContent = `Eventos climáticos em ${toTitleCase(localizacaoDigitada)}`;
                nomeEvento.textContent = `ALERTA: Sua localização está vulnerável a ${eventosCompativeis.map(e => e.tipo).join(", ")}`;
                nomeEvento.style.display ='block'
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
})

const botaoDicas = document.querySelectorAll('.lista-dicas li')
botaoDicas.forEach(item => {
    const dialog = document.querySelector('.dicas-dialog')
    const tituloDialog = dialog.querySelector("h2");
    const conteudoAntes = dialog.querySelector(".antes");
    const conteudoDurante = dialog.querySelector(".durante");
    const conteudoDepois = dialog.querySelector(".depois");

    item.addEventListener('click', () => {
        // Conteúdo das dicas
        const dicas = [
            {
                nome: 'Onda de calor',
                antes: [
                    'Hidrate-se com frequência, mesmo sem sede.',
                    'Prefira alimentos leves e frutas com alto teor de água.',
                    'Use roupas leves, de algodão e cores claras.',
                    'Planeje atividades físicas para antes das 10h ou após as 16h.'
                ],
                durante: [
                    'Fique em ambientes ventilados e com sombra.',
                    'Evite exposição direta ao sol.',
                    'Molhe nuca, pulsos e rosto para aliviar o calor.',
                    'Diminua o ritmo: evite esforços físicos.'
                ],
                depois: [
                    'Reponha líquidos e eletrólitos.',
                    'Dê atenção especial a crianças, idosos e pets.',
                    'Observe sintomas como tontura, pele quente e seca ou náuseas.',
                ],
                prever: [
                    'companhe previsões com temperatura acima de 35 °C por mais de 2 dias.',
                    'Alta sensação térmica e umidade do ar abaixo de 20% indicam risco.',
                    'Fique atento à previsão do tempo e mantenha-se hidratado o dia todo.'

                ]
            },
            {
                nome: 'Frio Intenso',
                antes: [
                    'Use roupas em camadas: térmica, lã, moletom, jaqueta.',
                    'Proteja mãos, pés, cabeça e pescoço.',
                    'Feche janelas e bloqueie entradas de vento em casa.'
                ],
                durante: [
                    'Evite dormir em locais abertos.',
                    'Consuma líquidos quentes e sopas.',
                    'Fique atento a sinais de hipotermia (tremores intensos, confusão mental).'
                ],
                depois: [
                    'Lave roupas e cobertores usados e mantenha secos.',
                    'Se tossir muito, tiver febre ou dificuldade para respirar, procure ajuda.'
                ],
                prever: [
                    'Frentes frias com mínimas abaixo de 10 °C.',
                    'Alertas meteorológicos para “massa polar” ou “onda de frio”.',
                    'Use o site para verificar se há risco nos próximos dias e se prepare com antecedência.'
                ]
            },
            {
                nome: 'Chuvas Intensas',
                antes: [
                    'Fique de olho no nível de rios e alagamentos.',
                    'Evite deixar móveis ou eletrônicos no chão de casa.',
                    'Guarde documentos em local alto e protegido.'
                ],
                durante: [
                    'Não enfrente áreas alagadas a pé ou de carro.',
                    'Evite contato com água da enchente (pode estar contaminada).',
                    'Desligue a energia elétrica se a água começar a entrar.'
                ],
                depois: [
                    'Use luvas e botas para limpeza.',
                    'Ferva ou filtre a água antes de usar.',
                    'Registre danos e acione a Defesa Civil se necessário.',
                ],
                prever: [
                    'Volume acumulado maior que 50 mm em 24h é sinal de alerta.',
                    'Monitoramento via app ou TV ajuda a antecipar.',
                    'Se puder, evite sair de casa nos dias de chuva forte. Use o site para conferir alertas.'
                ]
            },
            {
                nome: 'Ventos Fortes',
                antes: [
                    'Retire vasos e objetos soltos de janelas e sacadas.',
                    'Reforce telhados e estruturas leves.',
                    'Estacione carros longe de árvores ou placas'
                ],
                durante: [
                    'Não permaneça próximo a janelas, postes ou árvores.',
                    'Se estiver fora, busque abrigo em prédios.',
                    'Desligue aparelhos eletrônicos e evite usar celular conectado à tomada.'
                ],
                depois: [
                    'Cuidado com fios caídos ou estruturas danificadas.',
                    'Não tente consertar postes ou fiações sozinho.',
                    'Fotografe os danos para acionar autoridades.',
                ],
                prever: [
                    'Rajadas acima de 60 km/h.',
                    'Alertas com termos como “ventos fortes”, “vendaval” ou “tempestade com ventos”.',
                    'Use o site para se antecipar. Se houver alerta de ventania, evite se expor.'
                ]
            }
        ]

        const botaoCompativel = dicas.filter(dica => dica.nome.toLowerCase == 'ondas de calor')

        dialog.showModal()
    })

    dialog.querySelector('.fechar').addEventListener('click', () => {
        dialog.close()
    })
})