import * as bootstrap from "bootstrap";

let langSelector = window.location.href.includes('english') ? 1 : 0;
const commandsVariantions = [
    [
        'Abrir',
        'Fechar'
    ],
    [
        'Open',
        'Close'
    ]
];

const collpaseFunctions = document.getElementById('collapseFunctions');
const collapseBtn = document.getElementById('collapseBtn');
collpaseFunctions.addEventListener('show.bs.collapse',(e) =>{
    collapseBtn.innerText = commandsVariantions[langSelector][1];
});
collpaseFunctions.addEventListener('hide.bs.collapse',(e) =>{
    collapseBtn.innerText = commandsVariantions[langSelector][0];
});

const consoleElement = document.getElementById('consoleArea');
const clearBtn = document.getElementById('clsConsole');
clearBtn.addEventListener('click',() =>{
    consoleElement.innerText = null;
});

const secForm = document.getElementById('second-form');
const secUser = document.getElementById('second-user');
secUser.addEventListener('change',(e) => {
    if(!secUser.checked)
    {
        secForm.setAttribute('hidden',true);
    }
    else
    {
        secForm.removeAttribute('hidden');
    }
});