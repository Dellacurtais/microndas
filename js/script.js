let allOptions = [
    {
        "name": "Pipoca",
        "icon": "popcorn",
        "time": 10
    },
    {
        "name": "Macarrão",
        "icon": "noodles",
        "time": 8
    },
    {
        "name": "Carne",
        "icon": "beef",
        "time": 15
    },
    {
        "name": "Feijão",
        "icon": "soy",
        "time": 12
    },
    {
        "name": "Brigadeiro",
        "icon": "brigadeiro",
        "time": 12
    }
];

let limitTorrao = 2; //Limite em
let isStart = false;
let timeInit = 0;
let haveItem = false;
let interval = null;

window.onload = function (){
    let parent = document.getElementById('items');

    allOptions.forEach((item, key) =>{
        let url = './img/'+item['icon']+'.png';
        let icon = "<img src=\""+url+"\" width='15px'>";
        let html = "<button class=\"btn\" onclick=\"selectOption('"+item['time']+"', '"+key+"')\">"+icon+"</button>";
        parent.append(htmlToElement(html));
    });
};

function htmlToElement(html) {
    //ESTA FUNÇÃO NÂO FOI FEITA POR MIM.. Stackoverflow para este Atalho rapido!
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function selectOption(time, option){
    if (isStart){
        alert("Microondas está em funcionamento, cancele ou espere acabar!");
        return;
    }
    haveItem = allOptions[parseInt(option)];
    timeInit = haveItem['time'];
    document.getElementById('display').innerHTML = timeInit;
    document.getElementById('conteudo').innerHTML = `<img src="./img/${haveItem['icon']}.png">`;
    document.getElementById('time').value = timeInit;
    document.getElementById('display-name').innerHTML = haveItem['name'];
}

function changeSecond(timeAdd){
    if (timeAdd === "") return;

    if (!haveItem){
        alert("Selecione um alimento");
        return;
    }
    if (isStart){
        alert("Microondas está em funcionamento, cancele ou espere acabar!");
        return;
    }
    timeInit = timeAdd;
    document.getElementById('display').innerHTML = timeInit;
    document.getElementById('time').value = timeInit;
    document.getElementById('alert').value = "";
}

function cancelar(){
    haveItem = false;
    isStart = false;
    timeInit = 0;
    document.getElementById('display').innerHTML = "";
    document.getElementById('conteudo').innerHTML = "";
    document.getElementById('time').value = "";
    document.getElementById('alert').value = "";
    document.getElementById('display-name').innerHTML = "";
    clearInterval(interval);
}

function start(){
    if (!haveItem){
        alert("Selecione um alimento")
        return;
    }
    if (isStart){
        alert("Microondas está em funcionamento, cancele ou espere acabar!");
        return;
    }

    isStart = true;

    let originalTime = timeInit;
    document.getElementById('conteudo').childNodes[0].classList.add('start');

    interval = setInterval(function (){
        timeInit--;
        if (timeInit <= 0){
            if (originalTime < haveItem['time']){
                document.getElementById('alert').innerHTML = "Tempo Insuficiente";
            }else if (originalTime >= (haveItem['time']*limitTorrao)){
                document.getElementById('alert').innerHTML = "Seu alimento queimou";
            }else{
                document.getElementById('alert').innerHTML = "Prato pronto, bom apetite!!!";
            }
            cancelar();
        }else{
            document.getElementById('display').innerHTML = timeInit;
        }
    }, 1000);
}
