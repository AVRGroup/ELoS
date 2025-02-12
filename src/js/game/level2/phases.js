import * as THREE from "three";
import { generateDefaultEditor, readOnlyState, editState, updateTheme } from "../editor";
import {
    generateDefaultSceneObjects,
    resizeCanvasToDisplaySize,
    loadDefaultActor,
    loadDefaultObjectives,
    translateActor,
    rotateActor,
    checkCollision,
    degreeToRadians,
    resetRobotColor,
    materialColor,
    corrID,
    requestID,
    changColorID
} from "../three/util";
import GridMapHelper from "../three/GridMapHelper";
import FireBase from "../three/FireBase";
import {SpikeTrap, trapsActivation, trapsDeactivation} from "../three/SpikeTrap";
import parseCode from "./parser";
import { displayTime, configureDataAndUpload } from "../timer";
import { Modal } from "bootstrap";
import { convertCode } from "../multilangcode";
import Sound from "../three/Sound/sound";

const som = new Sound();

const music = new Sound();
music.playMusic('background', 0.2, true);


const muteMusic = document.getElementById('muteMusic');
muteMusic.addEventListener('change', () => {
    if (music.audio.isPlaying) {
        music.stopMusic();
    } else {
        music.playMusic('background', 0.2, true);
    }
})

let isMuted = true;
const muteSound = document.getElementById('muteSound');
muteSound.addEventListener('change', () => {
    if (muteSound.checked) {
        isMuted = false;
        som.stopAudio();
    } else {
        isMuted = true;
    }

    fireAudios.forEach(fireAudio => {
        if (!isMuted) {
            fireAudio.setVolume(0);
        } else {
            fireAudio.setVolume(1.5);
        }
    });
});


//Defining Level 2 Scene's Properties

const sceneProperties = {
    cancelExecution: false,
    timer: 0,
    phase: 0,
    executing: false,
    mult: 1,
    lang: window.location.href.includes('english') ? 1 : 0
}


function generatePhaseTitle()
{
    switch(sceneProperties.lang)
    {
        case 1:
            return `Level 2 - Round ${sceneProperties.phase + 1} of 8`
        default:
            return `Nível 2 - Fase ${sceneProperties.phase + 1} de 8`

    }
}

const textVariations = [
    [
        generatePhaseTitle,
        "Faça o robô chegar ao cristal, após isso, o colete.",
        "Faça o robô chegar aos cristais, após isso, os colete.",
        "Robô não está em frente ao cristal.\n",
        "Cristal coletado.\n",
        "Cristal coletado com sucesso.\n",
        "Todos os cristais coletados com sucesso!\n",
        "Nível Concluído",
        "Finalizar",
        "Deseja realmente finalizar a prática?",
        "Aviso: Robô está sem extintores!\n"
    ],
    [
        generatePhaseTitle,
        "Make the robot reach the crystal and collect it.",
        "Make the robot reach the crystals and collect them.",
        "Robot is not in front of the crystal.\n",
        "Crystal collected.\n",
        "Crystal successfully collected.\n",
        "All crystals collected successfully!\n",
        "Level Completed",
        "Finish",
        "Do you really want to finish the practice?",
        "Warining: Robot is out of fire extinguishers!\n"
    ]
]

const commandsVariations = [
    [
        'andarFrente(?)\n',
        'andarTras(?)\n',
        'girarEsquerda()\n',
        'girarDireita()\n',
        'darMeiaVolta()\n',
        'coletarCristal()\n',
        'apagarFogo()\n',
        'pegandoFogo()',
        'se(?){\n\n}\n'
    ],
    [
        'moveForward(?)\n',
        'moveBackwards(?)\n',
        'rotateLeft()\n',
        'rotateRight()\n',
        'turnBack()',
        'collectCrystal()\n',
        'extinguishFire()\n',
        'isOnFire()',
        'if(?){\n\n}\n'
    ]
]

const logModal = new Modal(document.getElementById("logModal"));

let timerUpadate;

function updateTime()
{
    sceneProperties.timer++;
}

let extinguisherUses;
function displayExtinguisherUses()
{
    document.getElementById("extinguisherUses").innerText = `x${extinguisherUses}`;
}

let fireState;

let setFireStates;

let setFireStatesInterval;

let spikeTrapState;

let setSpikeTrapState;

let setSpikeTrapStateInterval;

const editor = generateDefaultEditor(document.getElementById("editorArea"));

const andarFrenteBtn = document.getElementById('andarFrente');
andarFrenteBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][0]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][0]}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const andarTrasBtn = document.getElementById('andarTras');
andarTrasBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][1]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][1]}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const girarEsquerdaBtn = document.getElementById('girarEsquerda');
girarEsquerdaBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert: commandsVariations[sceneProperties.lang][2]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert: commandsVariations[sceneProperties.lang][2]}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const girarDireitaBtn = document.getElementById('girarDireita');
girarDireitaBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert: commandsVariations[sceneProperties.lang][3]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert: commandsVariations[sceneProperties.lang][3]}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const darMeiaVoltaBtn = document.getElementById('darMeiaVolta');
darMeiaVoltaBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert: commandsVariations[sceneProperties.lang][4]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert: commandsVariations[sceneProperties.lang][4]}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const apagarFogoBtn = document.getElementById('apagarFogo');
apagarFogoBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert: commandsVariations[sceneProperties.lang][6]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert: commandsVariations[sceneProperties.lang][6]}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const coletarCristalBtn = document.getElementById('coletarCristal');
coletarCristalBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert: commandsVariations[sceneProperties.lang][5]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert: commandsVariations[sceneProperties.lang][5]}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const pegandoFogoBtn = document.getElementById('pegandoFogo');
pegandoFogoBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert: commandsVariations[sceneProperties.lang][7]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert: commandsVariations[sceneProperties.lang][7]}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const condicaoBtn = document.getElementById('condicao');
condicaoBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert: commandsVariations[sceneProperties.lang][8]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert: commandsVariations[sceneProperties.lang][8]}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const consoleElement = document.getElementById('consoleArea');

const {renderer, scene, camera, controls} = generateDefaultSceneObjects(document.getElementById("phaseView"));

const gridMapHelper = new GridMapHelper();

const plane = gridMapHelper.createGridPlane();

const actor = loadDefaultActor();

const wallTexture = new THREE.TextureLoader().load(new URL('../../../assets/textures/stoneWallLvl2.png',import.meta.url).toString());
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;

let fireAudios = [];

function setFireAudio(count, mutedFire){

    for(let i = 0; i < count; i++){
        const listener = new THREE.AudioListener();
        camera.add(listener)
        const fireAudio = new THREE.PositionalAudio(listener);
        const audioLoader = new THREE.AudioLoader();
        let mutedFire = false;
    
        const audioPath = new URL(`../../../assets/audios/campfire.wav`, import.meta.url).toString();
    
        if(!mutedFire){
            audioLoader.load(audioPath, (buffer) => {
                fireAudio.setBuffer(buffer);
                fireAudio.setRefDistance(10);
                fireAudio.setLoop(true);
                fireAudio.setVolume(1.5);
                fireAudio.play();
            });
        }else{
            fireAudio.setVolume(0);
        }


        fireAudios.push(fireAudio);
    }
}

let objectives;
let walls;
let traps;
const fireClock = new THREE.Clock();
let fires;
function changeFireActiveStatus(index,status)
{
    gridMapHelper.fires[index].active = status;
    fires[index].setFireVisibility(status);

    if(!status){
        fireAudios[index].stop();
    } else {
        fireAudios[index].play();
    }
}
function firesVisualRestart()
{
    for(let i = 0;i < fires.length;i++)
    {
        fires[i].setFireVisibility(true);
    }
}

scene.add(plane);
scene.add(actor);

async function andarFrente(amount)
{
    let correctedAmount = amount > 10 ? 10 : amount;
    som.playAudio('moving', isMuted, 0.08, true);
    await translateActor(actor,correctedAmount,gridMapHelper,sceneProperties,consoleElement);
    som.stopAudio();
}

async function andarTras(amount)
{
    let correctedAmount = amount > 10 ? 10 : amount;
    som.playAudio('moving', isMuted, 0.08, true);
    await translateActor(actor,-correctedAmount,gridMapHelper,sceneProperties,consoleElement);
    som.stopAudio();
}

async function girarEsquerda()
{
    await rotateActor(actor,90,sceneProperties,1);
}

async function girarDireita()
{
    await rotateActor(actor,90,sceneProperties,-1);
}

async function darMeiaVolta()
{
    await rotateActor(actor,180,sceneProperties,1);
}

function pegandoFogo()
{
    const vec = new THREE.Vector3();
    actor.getObjectByName('interactionReference').getWorldPosition(vec);
    if(gridMapHelper.detectFire(vec) != null)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function apagarFogo()
{
    if (extinguisherUses > 0) {
        const vec = new THREE.Vector3();
        actor.getObjectByName('interactionReference').getWorldPosition(vec);
        let fireIndex = gridMapHelper.detectFire(vec);

        if (fireIndex != null) {
            changeFireActiveStatus(fireIndex, false);
            som.playAudio('extinguisher', isMuted,0.08, false);
        }
        extinguisherUses--;
        displayExtinguisherUses();
    }
    else
    {
        consoleElement.innerText += textVariations[sceneProperties.lang][10];
    }
}

function badLuck(position)
{
    const vector = new THREE.Vector3(gridMapHelper.getGlobalXPositionFromCoord(position[0]),0,gridMapHelper.getGlobalZPositionFromCoord(position[1]));
    let fireIndex = gridMapHelper.detectFire(vector,false);

    if(fireIndex != null)
    {
        changeFireActiveStatus(fireIndex,true);
    }
}

let coletarCristal;

let resetLevel;

let winCondition;

const phaseGeneration = [];

//Functions to create the phases

//Phase 1
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][1];

        extinguisherUses = 1;
        
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(1);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addObstacle(9,9,5,5);
        scene.add(objectives[0]);

        walls = [];
        const boxGeometry = new THREE.BoxGeometry(18,2,2);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(9,1);
        boxMaterial[3].map.repeat.set(9,1);
        boxMaterial[4].map.repeat.set(9,1);
        boxMaterial[5].map.repeat.set(9,1);
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        scene.add(walls[0]);
        scene.add(walls[1]);
        gridMapHelper.addObstacle(1,9,4,4);
        gridMapHelper.addObstacle(1,9,6,6);

        fires = [];
        fires.push(new FireBase());
        fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.1,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addFire(7,5);
        setFireAudio(1);
        scene.add(fires[0]);

        fires[0].add(fireAudios[0]);
        

        coletarCristal = () => {

            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[0].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.restartFires();
            fires[0].setFireVisibility(true);
            extinguisherUses = 1;
            displayExtinguisherUses();
        }

        winCondition = () =>{
            if(!objectives[0].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        timerUpadate = setInterval(updateTime,1000);
    }
);

//Phase 2
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][1];
        extinguisherUses = 1;
        displayExtinguisherUses();
        sceneProperties.executing = false;

        camera.position.set(0,15,30);
        camera.rotation.set(0,0,0);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(1);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addObstacle(9,9,5,5);
        scene.add(objectives[0]);

        walls = [];
        const boxGeometry = new THREE.BoxGeometry(14,2,2);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(7,1);
        boxMaterial[3].map.repeat.set(7,1);
        boxMaterial[4].map.repeat.set(7,1);
        boxMaterial[5].map.repeat.set(7,1);
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        gridMapHelper.addObstacle(2,8,2,2);
        gridMapHelper.addObstacle(2,8,4,4);
        gridMapHelper.addObstacle(2,8,6,6);
        gridMapHelper.addObstacle(2,8,8,8);
        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);
        scene.add(walls[3]);

        fires = [];
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0.1,gridMapHelper.getGlobalZPositionFromCoord(3));
        fires[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.1,gridMapHelper.getGlobalZPositionFromCoord(3));
        fires[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0.1,gridMapHelper.getGlobalZPositionFromCoord(7));
        fires[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.1,gridMapHelper.getGlobalZPositionFromCoord(7));
        fires[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.1,gridMapHelper.getGlobalZPositionFromCoord(6));
        gridMapHelper.addFire(3,3);
        gridMapHelper.addFire(6,3);
        gridMapHelper.addFire(3,7);
        gridMapHelper.addFire(6,7);
        gridMapHelper.addFire(9,6);
        fireState = 0;
        setFireStates = () => {
            if(fireState == 0)
            {

                changeFireActiveStatus(0,false);
                changeFireActiveStatus(3,false);

                changeFireActiveStatus(1,true);
                changeFireActiveStatus(4,true);
            }
            else
            {


                changeFireActiveStatus(0,true);
                changeFireActiveStatus(3,true);

                changeFireActiveStatus(1,false);
                changeFireActiveStatus(4,false);
            }
        }
        setFireAudio(5);

        scene.add(fires[0]);
        scene.add(fires[1]);
        scene.add(fires[2]);
        scene.add(fires[3]);
        scene.add(fires[4]);

       for (let index in fires) {
            fires[index].add(fireAudios[index]);
        }

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(2));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(8));
        gridMapHelper.addTrap(9,2,traps[0]);
        gridMapHelper.addTrap(8,5,traps[1]);
        gridMapHelper.addTrap(9,8,traps[2]);
        scene.add(traps[0]);
        scene.add(traps[1]);
        scene.add(traps[2]);

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[0].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.restartFires();
            firesVisualRestart();
            setFireStates();
            extinguisherUses = 1;
            displayExtinguisherUses();
        }

        winCondition = () =>{
            if(!objectives[0].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        setFireStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            fireState = (fireState + 1) % 2;
            setFireStates();
        },1000);

        spikeTrapState = 0;
        setSpikeTrapState = () => {
            if(spikeTrapState == 0)
            {
                trapsDeactivation(traps)
            }
            else
            {
                trapsActivation(traps)

            }
        }

        setSpikeTrapStateInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            spikeTrapState = (spikeTrapState + 1) % 2;
            setSpikeTrapState();
        },1000);
        timerUpadate = setInterval(updateTime,1000);
    }
);

//Phase 3
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][2];

        extinguisherUses = 1;
        displayExtinguisherUses();
        sceneProperties.executing = false;

        camera.position.set(0,15,30);
        camera.rotation.set(0,0,0);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        gridMapHelper.addObstacle(0,0,0,0);
        gridMapHelper.addObstacle(9,9,9,9);
        scene.add(objectives[0]);
        scene.add(objectives[1]);

        walls = [];
        const boxGeometry = new THREE.BoxGeometry(12,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(2,2,14);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(6,1);
        boxMaterial[3].map.repeat.set(6,1);
        boxMaterial[4].map.repeat.set(6,1);
        boxMaterial[5].map.repeat.set(6,1);
        const boxMaterial2 = new THREE.MeshLambertMaterial({map:wallTexture.clone()});
        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[0].map.repeat.set(7,1);
        boxMaterial3[1].map.repeat.set(7,1);
        boxMaterial3[2].map.repeat.set(1,7);
        boxMaterial3[3].map.repeat.set(1,7);
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addObstacle(1,6,2,2);
        gridMapHelper.addObstacle(2,2,1,1);
        gridMapHelper.addObstacle(8,8,7,7);
        gridMapHelper.addObstacle(7,7,3,8);
        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);
        scene.add(walls[3]);

        fires = [];
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0.1,gridMapHelper.getGlobalZPositionFromCoord(2));
        fires[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0.1,gridMapHelper.getGlobalZPositionFromCoord(0));
        fires[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.1,gridMapHelper.getGlobalZPositionFromCoord(7));
        gridMapHelper.addFire(0,2);
        gridMapHelper.addFire(2,0);
        gridMapHelper.addFire(9,7);
        fireState = 0;
        setFireStates = () => {
            if(fireState == 0)
            {
                changeFireActiveStatus(1,false);
                
                changeFireActiveStatus(2,true);
            }
            else
            {
                changeFireActiveStatus(1,true);
                
                changeFireActiveStatus(2,false);
            }
        }
        setFireAudio(3);
        scene.add(fires[0]);
        scene.add(fires[1]);
        scene.add(fires[2]);

       for (let index in fires) {
            fires[index].add(fireAudios[index]);
        }

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[1].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }

            if(!objectives[0].visible && !objectives[1].visible)
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][6];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
            gridMapHelper.restartFires();
            firesVisualRestart();
            setFireStates();
            extinguisherUses = 1;
            displayExtinguisherUses();
        }

        winCondition = () =>{
            if(!objectives[0].visible && !objectives[1].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        setFireStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            fireState = (fireState + 1) % 2;
            setFireStates();
        },1000);
        timerUpadate = setInterval(updateTime,1000);
    }
);

//Phase 4
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][2];

        extinguisherUses = 1;
        displayExtinguisherUses();
        sceneProperties.executing = false;

        camera.position.set(0,15,30);
        camera.rotation.set(0,0,0);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        gridMapHelper.addObstacle(9,9,9,9);
        gridMapHelper.addObstacle(9,9,0,0);
        scene.add(objectives[0]);
        scene.add(objectives[1]);

        walls = [];
        const boxGeometry = new THREE.BoxGeometry(16,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(2,2,6);
        const boxGeometry3 = new THREE.BoxGeometry(2,2,8);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(8,1);
        boxMaterial[3].map.repeat.set(8,1);
        boxMaterial[4].map.repeat.set(8,1);
        boxMaterial[5].map.repeat.set(8,1);
        const boxMaterial2 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial2[0].map.repeat.set(3,1);
        boxMaterial2[1].map.repeat.set(3,1);
        boxMaterial2[2].map.repeat.set(1,3);
        boxMaterial2[3].map.repeat.set(1,3);
        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[0].map.repeat.set(4,1);
        boxMaterial3[1].map.repeat.set(4,1);
        boxMaterial3[2].map.repeat.set(1,4);
        boxMaterial3[3].map.repeat.set(1,4);
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4.5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(4.5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(1.5));
        gridMapHelper.addObstacle(1,8,4,4);
        gridMapHelper.addObstacle(1,8,6,6);
        gridMapHelper.addObstacle(8,8,7,9);
        gridMapHelper.addObstacle(8,8,0,3);
        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);
        scene.add(walls[3]);

        fires = [];
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.1,gridMapHelper.getGlobalZPositionFromCoord(3));
        fires[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.1,gridMapHelper.getGlobalZPositionFromCoord(7));
        gridMapHelper.addFire(9,3);
        gridMapHelper.addFire(9,7);
        fireState = 0;
        setFireStates = () => {
            if(fireState == 0)
            {
                changeFireActiveStatus(0,false);
                
                changeFireActiveStatus(1,true);
            }
            else
            {
                changeFireActiveStatus(0,true);
                
                changeFireActiveStatus(1,false);
            }
        }
        setFireAudio(2);
        scene.add(fires[0]);
        scene.add(fires[1]);

       for (let index in fires) {
            fires[index].add(fireAudios[index]);
        }

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[1].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }

            if(!objectives[0].visible && !objectives[1].visible)
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][6];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
            gridMapHelper.restartFires();
            firesVisualRestart();
            setFireStates();
            extinguisherUses = 1;
            displayExtinguisherUses();
        }

        winCondition = () =>{
            if(!objectives[0].visible && !objectives[1].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        setFireStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            fireState = (fireState + 1) % 2;
            setFireStates();
        },1000);
        timerUpadate = setInterval(updateTime,1000);
    }
);

//Phase 5
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][2];

        extinguisherUses = 1;
        displayExtinguisherUses();
        sceneProperties.executing = false;

        camera.position.set(0,15,30);
        camera.rotation.set(0,0,0);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0.0,gridMapHelper.getGlobalZPositionFromCoord(7));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0.0,gridMapHelper.getGlobalZPositionFromCoord(3));
        gridMapHelper.addObstacle(5,5,7,7);
        gridMapHelper.addObstacle(5,5,3,3);
        scene.add(objectives[0]);
        scene.add(objectives[1]);

        walls = [];
        const boxGeometry = new THREE.BoxGeometry(10,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(2,2,6);
        const boxGeometry4 = new THREE.BoxGeometry(4,2,6);
        const boxGeometry5 = new THREE.BoxGeometry(12,2,2);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(5,1);
        boxMaterial[3].map.repeat.set(5,1);
        boxMaterial[4].map.repeat.set(5,1);
        boxMaterial[5].map.repeat.set(5,1);
        const boxMaterial2 = new THREE.MeshLambertMaterial({map:wallTexture.clone()});
        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[0].map.repeat.set(3,1);
        boxMaterial3[1].map.repeat.set(3,1);
        boxMaterial3[2].map.repeat.set(1,3);
        boxMaterial3[3].map.repeat.set(1,3);
        const boxMaterial4 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial4[0].map.repeat.set(3,1);
        boxMaterial4[1].map.repeat.set(3,1);
        boxMaterial4[2].map.repeat.set(2,3);
        boxMaterial4[3].map.repeat.set(2,3);
        boxMaterial4[4].map.repeat.set(2,1);
        boxMaterial4[5].map.repeat.set(2,1);
        const boxMaterial5 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial5[2].map.repeat.set(6,1);
        boxMaterial5[3].map.repeat.set(6,1);
        boxMaterial5[4].map.repeat.set(6,1);
        boxMaterial5[5].map.repeat.set(6,1);
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry5,boxMaterial5));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        gridMapHelper.addObstacle(3,7,8,8);
        gridMapHelper.addObstacle(7,7,6,6);
        gridMapHelper.addObstacle(3,4,4,6);
        gridMapHelper.addObstacle(6,6,4,6);
        gridMapHelper.addObstacle(3,8,2,2);
        gridMapHelper.addObstacle(7,7,4,4);
        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);
        scene.add(walls[3]);
        scene.add(walls[4]);
        scene.add(walls[5]);

        traps = [];
        traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addTrap(5,5,traps[0]);
        scene.add(traps[0]);

        fires = [];
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0.1,gridMapHelper.getGlobalZPositionFromCoord(7));
        fires[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.1,gridMapHelper.getGlobalZPositionFromCoord(7));
        fires[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.1,gridMapHelper.getGlobalZPositionFromCoord(3));
        fires[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0.1,gridMapHelper.getGlobalZPositionFromCoord(3));
        fires[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.1,gridMapHelper.getGlobalZPositionFromCoord(2));
        gridMapHelper.addFire(3,7);
        gridMapHelper.addFire(7,7);
        gridMapHelper.addFire(7,3);
        gridMapHelper.addFire(3,3);
        gridMapHelper.addFire(9,2);
        fireState = 0;
        setFireStates = () => {
            if(fireState == 0)
            {
                changeFireActiveStatus(1,false);
                
                changeFireActiveStatus(2,true);
            }
            else
            {
                changeFireActiveStatus(1,true);
                
                changeFireActiveStatus(2,false);
            }
        }
        setFireAudio(5);
        scene.add(fires[0]);
        scene.add(fires[1]);
        scene.add(fires[2]);
        scene.add(fires[3]);
        scene.add(fires[4]);

       for (let index in fires) {
            fires[index].add(fireAudios[index]);
        }

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[1].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }

            if(!objectives[0].visible && !objectives[1].visible)
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][6];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
            gridMapHelper.restartFires();
            firesVisualRestart();
            setFireStates();
            extinguisherUses = 1;
            displayExtinguisherUses();
        }

        winCondition = () =>{
            if(!objectives[0].visible && !objectives[1].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        setFireStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            fireState = (fireState + 1) % 2;
            setFireStates();
        },1000);

        spikeTrapState = 0;
        setSpikeTrapState = () => {
            if(spikeTrapState == 0)
            {
                trapsDeactivation(traps)
            }
            else
            {
                trapsActivation(traps)

            }
        }

        setSpikeTrapStateInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            spikeTrapState = (spikeTrapState + 1) % 2;
            setSpikeTrapState();
        },1000);
        timerUpadate = setInterval(updateTime,1000);
    }
);
//Phase 6
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][2];

        extinguisherUses = 1;
        displayExtinguisherUses();
        sceneProperties.executing = false;

        camera.position.set(0,15,30);
        camera.rotation.set(0,0,0);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0.0,gridMapHelper.getGlobalZPositionFromCoord(7));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        gridMapHelper.addObstacle(5,5,7,7);
        gridMapHelper.addObstacle(7,7,0,0);
        scene.add(objectives[0]);
        scene.add(objectives[1]);

        walls = [];
        const boxGeometry = new THREE.BoxGeometry(14,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(2,2,6);
        const boxGeometry4 = new THREE.BoxGeometry(4,2,2);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(7,1);
        boxMaterial[3].map.repeat.set(7,1);
        boxMaterial[4].map.repeat.set(7,1);
        boxMaterial[5].map.repeat.set(7,1);
        const boxMaterial2 = new THREE.MeshLambertMaterial({map:wallTexture.clone()});
        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[0].map.repeat.set(3,1);
        boxMaterial3[1].map.repeat.set(3,1);
        boxMaterial3[2].map.repeat.set(1,3);
        boxMaterial3[3].map.repeat.set(1,3);
        const boxMaterial4 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial4[2].map.repeat.set(2,1);
        boxMaterial4[3].map.repeat.set(2,1);
        boxMaterial4[4].map.repeat.set(2,1);
        boxMaterial4[5].map.repeat.set(2,1);
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[4].rotateY(degreeToRadians(90));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[5].rotateY(degreeToRadians(90));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        gridMapHelper.addObstacle(2,8,8,8);
        gridMapHelper.addObstacle(2,2,6,6);
        gridMapHelper.addObstacle(4,4,6,6);
        gridMapHelper.addObstacle(5,5,4,6);
        gridMapHelper.addObstacle(4,6,2,2);
        gridMapHelper.addObstacle(8,8,1,7);
        gridMapHelper.addObstacle(6,6,1,1);
        gridMapHelper.addObstacle(2,3,4,4);
        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);
        scene.add(walls[3]);
        scene.add(walls[4]);
        scene.add(walls[5]);
        scene.add(walls[6]);
        scene.add(walls[7]);

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0,gridMapHelper.getGlobalZPositionFromCoord(3));
        traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0,gridMapHelper.getGlobalZPositionFromCoord(7));
        traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0,gridMapHelper.getGlobalZPositionFromCoord(6));
        traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0,gridMapHelper.getGlobalZPositionFromCoord(3));
        gridMapHelper.addTrap(2,5,traps[0]);
        gridMapHelper.addTrap(2,3,traps[1]);
        gridMapHelper.addTrap(2,7,traps[2]);
        gridMapHelper.addTrap(6,6,traps[3]);
        gridMapHelper.addTrap(5,3,traps[4]);
        scene.add(traps[0]);
        scene.add(traps[1]);
        scene.add(traps[2]);
        scene.add(traps[3]);
        scene.add(traps[4]);

        fires = [];
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.1,gridMapHelper.getGlobalZPositionFromCoord(5));
        fires[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0.1,gridMapHelper.getGlobalZPositionFromCoord(0));
        fires[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.1,gridMapHelper.getGlobalZPositionFromCoord(0));
        fires[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.1,gridMapHelper.getGlobalZPositionFromCoord(2));
        gridMapHelper.addFire(7,5);
        gridMapHelper.addFire(5,0);
        gridMapHelper.addFire(9,0);
        gridMapHelper.addFire(7,2);
        fireState = 0;
        setFireStates = () => {
            if(fireState == 0)
            {
                changeFireActiveStatus(0,false);
                
                changeFireActiveStatus(3,true);
            }
            else
            {
                changeFireActiveStatus(0,true);
                
                changeFireActiveStatus(3,false);
            }
        }
        setFireAudio(4);
        scene.add(fires[0]);
        scene.add(fires[1]);
        scene.add(fires[2]);
        scene.add(fires[3]);

       for (let index in fires) {
            fires[index].add(fireAudios[index]);
        }

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[1].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }

            if(!objectives[0].visible && !objectives[1].visible)
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][6];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
            gridMapHelper.restartFires();
            firesVisualRestart();
            setFireStates();
            extinguisherUses = 1;
            displayExtinguisherUses();
        }

        winCondition = () =>{
            if(!objectives[0].visible && !objectives[1].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        setFireStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            fireState = (fireState + 1) % 2;
            setFireStates();
        },1000);

        spikeTrapState = 0;
        setSpikeTrapState = () => {
            if(spikeTrapState == 0)
            {
                trapsDeactivation(traps)
            }
            else
            {
                trapsActivation(traps)

            }
        }

        setSpikeTrapStateInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            spikeTrapState = (spikeTrapState + 1) % 2;
            setSpikeTrapState();
        },1000);
        timerUpadate = setInterval(updateTime,1000);
    }
);
//Phase 7
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][2];

        extinguisherUses = 1;
        displayExtinguisherUses();
        sceneProperties.executing = false;

        camera.position.set(0,15,30);
        camera.rotation.set(0,0,0);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.0,gridMapHelper.getGlobalZPositionFromCoord(3));
        gridMapHelper.addObstacle(3,3,5,5);
        gridMapHelper.addObstacle(7,7,3,3);
        scene.add(objectives[0]);
        scene.add(objectives[1]);

        walls = [];
        const boxGeometry = new THREE.BoxGeometry(14,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(2,2,6);
        const boxGeometry4 = new THREE.BoxGeometry(4,2,2);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(7,1);
        boxMaterial[3].map.repeat.set(7,1);
        boxMaterial[4].map.repeat.set(7,1);
        boxMaterial[5].map.repeat.set(7,1);
        const boxMaterial2 = new THREE.MeshLambertMaterial({map:wallTexture.clone()});
        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[0].map.repeat.set(3,1);
        boxMaterial3[1].map.repeat.set(3,1);
        boxMaterial3[2].map.repeat.set(1,3);
        boxMaterial3[3].map.repeat.set(1,3);
        const boxMaterial4 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial4[2].map.repeat.set(2,1);
        boxMaterial4[3].map.repeat.set(2,1);
        boxMaterial4[4].map.repeat.set(2,1);
        boxMaterial4[5].map.repeat.set(2,1);
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(2.5));
        walls[10].rotateY(degreeToRadians(90));
        gridMapHelper.addObstacle(2,8,8,8);
        gridMapHelper.addObstacle(2,2,7,7);
        gridMapHelper.addObstacle(2,2,3,3);
        gridMapHelper.addObstacle(5,5,4,6);
        gridMapHelper.addObstacle(2,3,6,6);
        gridMapHelper.addObstacle(8,8,1,7);
        gridMapHelper.addObstacle(5,5,2,2);
        gridMapHelper.addObstacle(2,3,4,4);
        gridMapHelper.addObstacle(8,8,7,7);
        gridMapHelper.addObstacle(7,8,5,5);
        gridMapHelper.addObstacle(8,8,2,3);
        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);
        scene.add(walls[3]);
        scene.add(walls[4]);
        scene.add(walls[5]);
        scene.add(walls[6]);
        scene.add(walls[7]);
        scene.add(walls[8]);
        scene.add(walls[9]);
        scene.add(walls[10]);

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0,gridMapHelper.getGlobalZPositionFromCoord(3));
        gridMapHelper.addTrap(2,5,traps[0]);
        gridMapHelper.addTrap(5,3,traps[1]);
        scene.add(traps[0]);
        scene.add(traps[1]);

        fires = [];
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0.1,gridMapHelper.getGlobalZPositionFromCoord(9));
        fires[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0.1,gridMapHelper.getGlobalZPositionFromCoord(0));
        fires[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.1,gridMapHelper.getGlobalZPositionFromCoord(5));
        fires[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0.1,gridMapHelper.getGlobalZPositionFromCoord(6));
        fires[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0.1,gridMapHelper.getGlobalZPositionFromCoord(4));
        fires[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),0.1,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addFire(2,9);
        gridMapHelper.addFire(2,0);
        gridMapHelper.addFire(6,5);
        gridMapHelper.addFire(8,6);
        gridMapHelper.addFire(8,4);
        gridMapHelper.addFire(4,5);
        fireState = 0;
        setFireStates = () => {
            if(fireState == 0)
            {
                changeFireActiveStatus(2,false);
                changeFireActiveStatus(3,false);
                changeFireActiveStatus(4,false);
                
                changeFireActiveStatus(0,true);
                changeFireActiveStatus(1,true);
                changeFireActiveStatus(5,true);
            }
            else
            {
                changeFireActiveStatus(2,true);
                changeFireActiveStatus(3,true);
                changeFireActiveStatus(4,true);
                
                changeFireActiveStatus(0,false);
                changeFireActiveStatus(1,false);
                changeFireActiveStatus(5,false);
            }
        }
        setFireAudio(6);
        scene.add(fires[0]);
        scene.add(fires[1]);
        scene.add(fires[2]);
        scene.add(fires[3]);
        scene.add(fires[4]);
        scene.add(fires[5]);

       for (let index in fires) {
            fires[index].add(fireAudios[index]);
        }

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[1].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }

            if(!objectives[0].visible && !objectives[1].visible)
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][6];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
            gridMapHelper.restartFires();
            firesVisualRestart();
            setFireStates();
            extinguisherUses = 1;
            displayExtinguisherUses();
        }

        winCondition = () =>{
            if(!objectives[0].visible && !objectives[1].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        setFireStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            fireState = (fireState + 1) % 2;
            setFireStates();
        },1000);

        spikeTrapState = 0;
        setSpikeTrapState = () => {
            if(spikeTrapState == 0)
            {
                trapsDeactivation(traps)
            }
            else
            {
                trapsActivation(traps)

            }
        }

        setSpikeTrapStateInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            spikeTrapState = (spikeTrapState + 1) % 2;
            setSpikeTrapState();
        },1000);
        timerUpadate = setInterval(updateTime,1000);
    }
);
//Phase 8
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][2];

        extinguisherUses = 1;
        displayExtinguisherUses();
        sceneProperties.executing = false;

        camera.position.set(0,15,30);
        camera.rotation.set(0,0,0);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(3);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addObstacle(3,3,5,5);
        gridMapHelper.addObstacle(5,5,5,5);
        gridMapHelper.addObstacle(7,7,5,5);
        scene.add(objectives[0]);
        scene.add(objectives[1]);
        scene.add(objectives[2]);

        walls = [];
        const boxGeometry = new THREE.BoxGeometry(2,2,4);
        const boxGeometry2 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(2,2,6);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[0].map.repeat.set(2,1);
        boxMaterial[1].map.repeat.set(2,1);
        boxMaterial[2].map.repeat.set(1,2);
        boxMaterial[3].map.repeat.set(1,2);
        const boxMaterial2 = new THREE.MeshLambertMaterial({map:wallTexture.clone()});
        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[0].map.repeat.set(3,1);
        boxMaterial3[1].map.repeat.set(3,1);
        boxMaterial3[2].map.repeat.set(1,3);
        boxMaterial3[3].map.repeat.set(1,3);
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(6.5));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(3.5));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(0.5));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(1.5));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(6.5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[4].rotateY(degreeToRadians(90));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        gridMapHelper.addObstacle(2,2,6,7);
        gridMapHelper.addObstacle(2,2,3,4);
        gridMapHelper.addObstacle(2,2,0,1);
        gridMapHelper.addObstacle(4,4,1,2);
        gridMapHelper.addObstacle(6,7,2,2);
        gridMapHelper.addObstacle(8,8,1,3);
        gridMapHelper.addObstacle(4,4,6,6);
        gridMapHelper.addObstacle(6,6,6,6);
        gridMapHelper.addObstacle(4,4,4,4);
        gridMapHelper.addObstacle(6,6,4,4);
        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);
        scene.add(walls[3]);
        scene.add(walls[4]);
        scene.add(walls[5]);
        scene.add(walls[6]);
        scene.add(walls[7]);
        scene.add(walls[8]);
        scene.add(walls[9]);

        traps = [];
        const trapGeometry = new THREE.BoxGeometry(2,1,2)
        const trapMaterial = new THREE.MeshLambertMaterial({color: "rgb(255,0,0)"})
        traps.push(new SpikeTrap())
        traps.push(new SpikeTrap())
        traps.push(new SpikeTrap())
        traps.push(new SpikeTrap())
        traps.push(new SpikeTrap())
        traps.push(new SpikeTrap())
        traps.push(new SpikeTrap())
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),0,gridMapHelper.getGlobalZPositionFromCoord(7));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0,gridMapHelper.getGlobalZPositionFromCoord(7));
        traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0,gridMapHelper.getGlobalZPositionFromCoord(0));
        gridMapHelper.addTrap(4,7,traps[0]);
        gridMapHelper.addTrap(6,7,traps[1]);
        gridMapHelper.addTrap(2,5,traps[2]);
        gridMapHelper.addTrap(4,5,traps[3]);
        gridMapHelper.addTrap(6,5,traps[4]);
        gridMapHelper.addTrap(8,5,traps[5]);
        gridMapHelper.addTrap(6,0,traps[6]);
        scene.add(traps[0]);
        scene.add(traps[1]);
        scene.add(traps[2]);
        scene.add(traps[3]);
        scene.add(traps[4]);
        scene.add(traps[5]);
        scene.add(traps[6]);

        fires = [];
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires.push(new FireBase());
        fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0.1,gridMapHelper.getGlobalZPositionFromCoord(7));
        fires[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0.1,gridMapHelper.getGlobalZPositionFromCoord(7));
        fires[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.1,gridMapHelper.getGlobalZPositionFromCoord(7));
        fires[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0.1,gridMapHelper.getGlobalZPositionFromCoord(3));
        fires[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0.1,gridMapHelper.getGlobalZPositionFromCoord(3));
        fires[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.1,gridMapHelper.getGlobalZPositionFromCoord(3));
        fires[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.1,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addFire(3,7);
        gridMapHelper.addFire(5,7);
        gridMapHelper.addFire(7,7);
        gridMapHelper.addFire(3,3);
        gridMapHelper.addFire(5,3);
        gridMapHelper.addFire(7,3);
        gridMapHelper.addFire(9,5);
        fireState = 0;
        setFireStates = () => {
            if(fireState == 0)
            {
                changeFireActiveStatus(3,false);
                changeFireActiveStatus(5,false);
                
                changeFireActiveStatus(4,true);
                changeFireActiveStatus(6,true);
            }
            else
            {
                changeFireActiveStatus(3,true);
                changeFireActiveStatus(5,true);
                
                changeFireActiveStatus(4,false);
                changeFireActiveStatus(6,false);
            }
        }
        setFireAudio(7);
        scene.add(fires[0]);
        scene.add(fires[1]);
        scene.add(fires[2]);
        scene.add(fires[3]);
        scene.add(fires[4]);
        scene.add(fires[5]);
        scene.add(fires[6]);

        for (let index in fires) {
            fires[index].add(fireAudios[index]);
        }

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[1].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[2],gridMapHelper))
            {
                const som = new Sound();
                som.playAudio('crystal', isMuted);  
                objectives[2].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[2].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }

            if(!objectives[0].visible && !objectives[1].visible && !objectives[2].visible)
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][6];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            objectives[2].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
            gridMapHelper.obstacles[2].active = true;
            gridMapHelper.restartFires();
            firesVisualRestart();
            setFireStates();
            extinguisherUses = 1;
            displayExtinguisherUses();
        }

        winCondition = () =>{
            if(!objectives[0].visible && !objectives[1].visible && !objectives[2].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        document.getElementById('winMessage').innerText = textVariations[sceneProperties.lang][7];
        document.getElementById('advanceBtn').innerText = textVariations[sceneProperties.lang][8];
        
        setFireStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            fireState = (fireState + 1) % 2;
            setFireStates();
        },1000);

        spikeTrapState = 0;
        setSpikeTrapState = () => {
            if(spikeTrapState == 0)
            {
                trapsDeactivation(traps)
            }
            else
            {
                trapsActivation(traps)

            }
        }

        setSpikeTrapStateInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            spikeTrapState = (spikeTrapState + 1) % 2;
            setSpikeTrapState();
        },1000);
        timerUpadate = setInterval(updateTime,1000);
    }
);

//Defining function that remove objects, scene render and button's functions

function removeObjects(crystals, walls, traps, fires)
{
    if(crystals != undefined)
    {
        for(let i = 0; i < crystals.length; i++)
        {
            scene.remove(crystals[i]);
        }
    }

    if(walls != undefined)
    {
        for(let i = 0; i < walls.length; i++)
        {
            scene.remove(walls[i]);
        }
        gridMapHelper.clearObstacles();   
    }

    if(traps != undefined)
    {
        for(let i = 0; i < traps.length; i++)
        {
            scene.remove(traps[i]);
        }   
        gridMapHelper.clearTraps();
    }

    if(fires != undefined)
    {
        for(let i = 0; i < fires.length; i++)
        {
            scene.remove(fires[i]);
        }   
        gridMapHelper.clearFires();   
    }

    crystals = undefined;
    walls = undefined;
    traps = undefined;
    fires = undefined;
}

function animate()
{
    if(fires)
    {
        for(let i = 0; i < fires.length;i++)
        {
            fires[i].update(fireClock);
        }   
    }
    renderer.render(scene,camera);
    controls.update();
    requestAnimationFrame(animate);
    displayTime(sceneProperties.timer,document.getElementById("timer"));
}

window.addEventListener('resize',() => {
    resizeCanvasToDisplaySize(renderer,camera);
});

const finishEarlierButton = document.getElementById('finishEarlier');

const execBtn = document.getElementById("execBtn")
execBtn.addEventListener("click",async function() {
    cancelAnimationFrame(corrID);    
    cancelAnimationFrame(requestID);
    const codeParsed = parseCode(convertCode(sceneProperties.lang,editor.state.doc.toString()));
    actor.getObjectByName('eve').position.y = 0;
    if(materialColor.length != 0)
        resetRobotColor(actor);
    if(traps != null)
        trapsDeactivation(traps)
    sceneProperties.cancelExecution = false;
    if(codeParsed != null)
    {
        updateTheme(editor,1);
        resetLevel();
        sceneProperties.executing = true;
        this.disabled = true;
        await eval(codeParsed);
        if(winCondition())
        {
            readOnlyState.doc = editor.state.doc;
            editor.setState(readOnlyState);
            document.getElementById('winMessage').classList.remove('invisible');
            document.getElementById('advanceBtn').classList.remove('invisible');
            document.getElementById("resetBtn").disabled = true;
            finishEarlierButton.disabled = true;
            clearInterval(timerUpadate);
            if(sceneProperties.phase == phaseGeneration.length - 1)
            {
                configureDataAndUpload(document.getElementById("name"),document.getElementById("age"),'gender',document.getElementById("subBtn"),sceneProperties.timer,'../','Nível 2/Completo', document.getElementById('second-user'));
            }
        }
        else
        {
            updateTheme(editor,0);
            sceneProperties.executing = false;
            this.disabled = false;
        }
    }
});

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click",() => {
    cancelAnimationFrame(corrID);
    cancelAnimationFrame(requestID);
    cancelAnimationFrame(changColorID);
    updateTheme(editor,0);
    sceneProperties.cancelExecution = true;
    actor.getObjectByName('eve').position.y = 0;
    if(materialColor.length != 0)
        resetRobotColor(actor);
    resetLevel();
});

const advanceBtn = document.getElementById('advanceBtn');
advanceBtn.addEventListener('click',(e) => {
    sceneProperties.phase++;
    if(sceneProperties.phase < phaseGeneration.length)
    {
        if(setFireStatesInterval)
        {
            clearInterval(setFireStatesInterval);
            setFireStatesInterval = undefined;
        }
        removeObjects(objectives,walls,traps,fires);
        phaseGeneration[sceneProperties.phase]();
        editor.setState(editState);
        consoleElement.innerText = null;
        document.getElementById('winMessage').classList.add('invisible');
        document.getElementById('advanceBtn').classList.add('invisible');
        execBtn.disabled = false;
        resetBtn.disabled = false;
        finishEarlierButton.disabled = false;
    }
    else
    {
        sceneProperties.phase = sceneProperties.phase > phaseGeneration.length ? phaseGeneration.length : sceneProperties.phase;
        logModal.show();
    }
});

const reloadBtn = document.getElementById('reloadBtn');
reloadBtn.addEventListener('click',(e) => {

    clearInterval(timerUpadate);
    
    if(sceneProperties.phase < phaseGeneration.length)
    {
        removeObjects(objectives,walls,traps,fires);
        phaseGeneration[sceneProperties.phase]();
        editor.setState(editState);
        consoleElement.innerText = null;
        execBtn.disabled = false;
        resetBtn.disabled = false;
        finishEarlierButton.disabled = false;
    }
    else
    {
        sceneProperties.phase = sceneProperties.phase > phaseGeneration.length ? phaseGeneration.length : sceneProperties.phase;
    }
});


finishEarlierButton.addEventListener('click', (e) => {
    if(confirm(textVariations[sceneProperties.lang][9]))
    {
        clearInterval(timerUpadate);
        configureDataAndUpload(document.getElementById("name"),document.getElementById("age"),'gender',document.getElementById("subBtn"),sceneProperties.timer,'../',`Nível 2/Fase ${sceneProperties.phase + 1}`, document.getElementById('second-user'));
        logModal.show();
    }
});

let normalSpeedBtn = document.getElementById("normalSpeed");
let fastSpeedBtn = document.getElementById("fastSpeed");
normalSpeedBtn.addEventListener("click", function() {
    this.disabled = true;
    fastSpeedBtn.disabled = false;
    sceneProperties.mult = 1; 
});

fastSpeedBtn.addEventListener("click", function() {
    this.disabled = true;
    normalSpeedBtn.disabled = false;
    sceneProperties.mult = 6; 
});

//Running level 2
resizeCanvasToDisplaySize(renderer,camera);
phaseGeneration[sceneProperties.phase]();
displayExtinguisherUses();
animate();