function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequiredf3e"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequiredf3e"] = parcelRequire;
}
parcelRequire.register("hO50i", function(module, exports) {

var $49pUz = parcelRequire("49pUz");

var $jgsti = parcelRequire("jgsti");

var $6mhZf = parcelRequire("6mhZf");

var $2Y9dv = parcelRequire("2Y9dv");

var $4UvU9 = parcelRequire("4UvU9");

var $c6e6z = parcelRequire("c6e6z");

var $1CqPx = parcelRequire("1CqPx");
//Defining Level 1 Scene's Properties
const sceneProperties = {
    cancelExecution: false,
    timer: 0,
    phase: 0
};
//Generating default Level 1 Objects
const logModal = new (0, $1CqPx.Modal)(document.getElementById("logModal"));
let timerUpadate;
function updateTime() {
    sceneProperties.timer++;
}
const editor = (0, $jgsti.generateDefaultEditor)(document.getElementById("editorArea"));
const consoleElement = document.getElementById("consoleArea");
const { renderer , scene , camera , controls  } = (0, $6mhZf.generateDefaultSceneObjects)(document.getElementById("phaseView"));
const gridMapHelper = new (0, $2Y9dv.default)();
const plane = gridMapHelper.createGridPlane();
const actor = (0, $6mhZf.loadDefaultActor)();
let objectives;
let walls;
let traps;
scene.add(plane);
scene.add(actor);
async function andarFrente(amount) {
    await (0, $6mhZf.translateActor)(actor, amount, gridMapHelper, sceneProperties, consoleElement);
}
async function andarTras(amount) {
    await (0, $6mhZf.translateActor)(actor, -amount, gridMapHelper, sceneProperties, consoleElement);
}
async function girarEsquerda() {
    await (0, $6mhZf.rotateActor)(actor, 90, sceneProperties, 1);
}
async function girarDireita() {
    await (0, $6mhZf.rotateActor)(actor, 90, sceneProperties, -1);
}
async function darMeiaVolta() {
    await (0, $6mhZf.rotateActor)(actor, 180, sceneProperties, 1);
}
let coletarCristal;
let resetLevel;
let winCondition;
const phaseGeneration = [];
//Functions to create the phases
//Phase 1
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 1 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar ao cristal, ap\xf3s isso, o colete.";
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    scene.add(objectives[0]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor, objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado com sucesso.\n";
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 sobre o cristal.\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 2
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 2 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar ao cristal, ap\xf3s isso, o colete.";
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    scene.add(objectives[0]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor, objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado com sucesso.\n";
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 sobre o cristal.\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 3
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 3 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar aos cristais, ap\xf3s isso, os colete.";
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0.0, gridMapHelper.getGlobalZPositionFromCoord(6));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.0, gridMapHelper.getGlobalZPositionFromCoord(1));
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor, objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
        } else if ((0, $6mhZf.checkCollision)(actor, objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 sobre o cristal.\n";
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 4
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 4 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar ao cristal, ap\xf3s isso, o colete.";
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    scene.add(objectives[0]);
    walls = [];
    const boxGeometry = new $49pUz.BoxGeometry(2, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1.0, gridMapHelper.getGlobalXPositionFromCoord(5));
    gridMapHelper.addObstacle(7, 7, 5, 5);
    scene.add(walls[0]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor, objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado com sucesso.\n";
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 sobre o cristal.\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 5
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 5 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar aos cristais, ap\xf3s isso, os colete.";
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.0, gridMapHelper.getGlobalZPositionFromCoord(8));
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    walls = [];
    const boxGeometry = new $49pUz.BoxGeometry(6, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1.0, gridMapHelper.getGlobalXPositionFromCoord(7));
    walls[1].rotateY((0, $6mhZf.degreeToRadians)(90));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1.0, gridMapHelper.getGlobalXPositionFromCoord(2.5));
    gridMapHelper.addObstacle(5, 7, 7, 7);
    gridMapHelper.addObstacle(5, 5, 2, 3);
    scene.add(walls[0]);
    scene.add(walls[1]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor, objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
        } else if ((0, $6mhZf.checkCollision)(actor, objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 sobre o cristal.\n";
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 6
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 6 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar ao cristal, ap\xf3s isso, o colete.";
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    scene.add(objectives[0]);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(14, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(16, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(2, 2, 4);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5), 1.0, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1.0, gridMapHelper.getGlobalZPositionFromCoord(0.5));
    gridMapHelper.addObstacle(2, 8, 2, 2);
    gridMapHelper.addObstacle(2, 9, 4, 4);
    gridMapHelper.addObstacle(7, 7, 0, 1);
    scene.add(walls[0]);
    scene.add(walls[1]);
    scene.add(walls[2]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor, objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado com sucesso.\n";
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 sobre o cristal.\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 7
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 7 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar ao cristal, ap\xf3s isso, o colete.";
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    scene.add(objectives[0]);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(14, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(16, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(2, 2, 8);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1.0, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5), 1.0, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1.0, gridMapHelper.getGlobalZPositionFromCoord(1.5));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1.0, gridMapHelper.getGlobalZPositionFromCoord(6));
    gridMapHelper.addObstacle(2, 8, 4, 4);
    gridMapHelper.addObstacle(2, 8, 6, 6);
    gridMapHelper.addObstacle(8, 8, 0, 3);
    gridMapHelper.addObstacle(2, 9, 8, 8);
    scene.add(walls[0]);
    scene.add(walls[1]);
    scene.add(walls[2]);
    scene.add(walls[3]);
    traps = [];
    const trapGeometry = new $49pUz.BoxGeometry(2, 1, 2);
    const trapMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(255,0,0)"
    });
    traps.push(new $49pUz.Mesh(trapGeometry, trapMaterial));
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0.5, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addTrap(8, 5);
    scene.add(traps[0]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor, objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado com sucesso.\n";
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 sobre o cristal.\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 8
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 8 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar aos cristais, ap\xf3s isso, os colete.";
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(3);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.0, gridMapHelper.getGlobalZPositionFromCoord(8));
    objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    scene.add(objectives[2]);
    walls = [];
    const boxGeometry = new $49pUz.BoxGeometry(6, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1.0, gridMapHelper.getGlobalXPositionFromCoord(7));
    walls[1].rotateY((0, $6mhZf.degreeToRadians)(90));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2.5));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1.0, gridMapHelper.getGlobalZPositionFromCoord(4));
    gridMapHelper.addObstacle(5, 7, 7, 7);
    gridMapHelper.addObstacle(5, 5, 2, 3);
    gridMapHelper.addObstacle(1, 3, 4, 4);
    scene.add(walls[0]);
    scene.add(walls[1]);
    scene.add(walls[2]);
    traps = [];
    const trapGeometry = new $49pUz.BoxGeometry(2, 1, 2);
    const trapMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(255,0,0)"
    });
    traps.push(new $49pUz.Mesh(trapGeometry, trapMaterial));
    traps.push(new $49pUz.Mesh(trapGeometry, trapMaterial));
    traps.push(new $49pUz.Mesh(trapGeometry, trapMaterial));
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 0.5, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0.5, gridMapHelper.getGlobalZPositionFromCoord(3));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0.5, gridMapHelper.getGlobalZPositionFromCoord(8));
    gridMapHelper.addTrap(1, 5);
    gridMapHelper.addTrap(6, 3);
    gridMapHelper.addTrap(5, 8);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor, objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
        } else if ((0, $6mhZf.checkCollision)(actor, objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
        } else if ((0, $6mhZf.checkCollision)(actor, objectives[2], gridMapHelper)) {
            objectives[2].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 sobre o cristal.\n";
        if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible) consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
        objectives[2].visible = true;
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible) return true;
        else return false;
    };
    document.getElementById("winMessage").innerText = "N\xedvel Conclu\xeddo";
    document.getElementById("advanceBtn").innerText = "Finalizar";
    timerUpadate = setInterval(updateTime, 1000);
});
//Defining function that remove objects, scene render and button's functions
function removeObjects(crystals, walls, traps) {
    if (crystals != undefined) for(let i = 0; i < crystals.length; i++)scene.remove(crystals[i]);
    if (walls != undefined) {
        for(let i1 = 0; i1 < walls.length; i1++)scene.remove(walls[i1]);
        gridMapHelper.clearObstacles();
    }
    if (traps != undefined) {
        for(let i2 = 0; i2 < traps.length; i2++)scene.remove(traps[i2]);
        gridMapHelper.clearTraps();
    }
    crystals = undefined;
    walls = undefined;
    traps = undefined;
}
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    (0, $c6e6z.displayTime)(sceneProperties.timer, document.getElementById("timer"));
}
window.addEventListener("resize", ()=>{
    (0, $6mhZf.resizeCanvasToDisplaySize)(renderer, camera);
});
const execBtn = document.getElementById("execBtn");
execBtn.addEventListener("click", async function() {
    const codeParsed = (0, $4UvU9.default)(editor.state.doc.toString());
    sceneProperties.cancelExecution = false;
    if (codeParsed != null) {
        resetLevel();
        this.disabled = true;
        await eval(codeParsed);
        if (winCondition()) {
            (0, $jgsti.readOnlyState).doc = editor.state.doc;
            editor.setState((0, $jgsti.readOnlyState));
            document.getElementById("winMessage").classList.remove("invisible");
            document.getElementById("advanceBtn").classList.remove("invisible");
            document.getElementById("resetBtn").disabled = true;
            clearInterval(timerUpadate);
            if (sceneProperties.phase == phaseGeneration.length - 1) (0, $c6e6z.configureDataAndUpload)(document.getElementById("name"), document.getElementById("age"), document.getElementById("subBtn"), sceneProperties.timer, "../", "N\xedvel 1");
        } else this.disabled = false;
    }
});
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", ()=>{
    sceneProperties.cancelExecution = true;
    resetLevel();
});
const advanceBtn = document.getElementById("advanceBtn");
advanceBtn.addEventListener("click", (e)=>{
    sceneProperties.phase++;
    if (sceneProperties.phase < phaseGeneration.length) {
        removeObjects(objectives, walls, traps);
        phaseGeneration[sceneProperties.phase]();
        editor.setState((0, $jgsti.editState));
        consoleElement.innerText = null;
        document.getElementById("winMessage").classList.add("invisible");
        document.getElementById("advanceBtn").classList.add("invisible");
        execBtn.disabled = false;
        resetBtn.disabled = false;
    } else {
        sceneProperties.phase = sceneProperties.phase > phaseGeneration.length ? phaseGeneration.length : sceneProperties.phase;
        logModal.show();
    }
});
//Running level 1
(0, $6mhZf.resizeCanvasToDisplaySize)(renderer, camera);
phaseGeneration[sceneProperties.phase]();
animate();

});
parcelRequire.register("4UvU9", function(module, exports) {

$parcel$export(module.exports, "default", () => $39352400bed78e43$export$2e2bcd8739ae039);
const $39352400bed78e43$var$functionFilter = [
    {
        filter: new RegExp("^andarFrente(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$"),
        type: "sequential"
    },
    {
        filter: new RegExp("^andarTras(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$"),
        type: "sequential"
    },
    {
        filter: new RegExp("^girarEsquerda(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),
        type: "sequential"
    },
    {
        filter: new RegExp("^girarDireita(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),
        type: "sequential"
    },
    {
        filter: new RegExp("^darMeiaVolta(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),
        type: "sequential"
    },
    {
        filter: new RegExp("^coletarCristal(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),
        type: "normal"
    }
];
function $39352400bed78e43$var$printError(text, line) {
    const consoleElement = document.getElementById("consoleArea");
    consoleElement.innerText += `Código inválido: ${text} linha: ${line}\n`;
}
function $39352400bed78e43$export$2e2bcd8739ae039(code) {
    let codeParsed = "async function runCode(){\n";
    const lines = code.split("\n");
    let valid = true;
    for(let i = 0; i < lines.length; i++){
        let validLine = false;
        let lineType;
        if (lines[i].trim() != "") {
            for(let j = 0; j < $39352400bed78e43$var$functionFilter.length; j++){
                validLine = $39352400bed78e43$var$functionFilter[j].filter.test(lines[i].trim());
                if (validLine) {
                    lineType = $39352400bed78e43$var$functionFilter[j].type;
                    break;
                }
            }
            if (validLine) {
                if (lineType === "sequential") {
                    let lineParsed = "await " + lines[i].trim() + "\n";
                    codeParsed += lineParsed;
                } else {
                    let lineParsed1 = lines[i].trim() + "\n";
                    codeParsed += lineParsed1;
                }
            } else {
                $39352400bed78e43$var$printError(lines[i], i + 1);
                valid = false;
                break;
            }
        } else continue;
    }
    if (valid) {
        codeParsed += "}\nrunCode()";
        return codeParsed;
    } else return null;
}

});

parcelRequire.register("c6e6z", function(module, exports) {

$parcel$export(module.exports, "displayTime", () => $8cf0fc8944b9cdfc$export$cbae8a5783c0845c);
$parcel$export(module.exports, "configureDataAndUpload", () => $8cf0fc8944b9cdfc$export$ce33b877b675017a);
const $8cf0fc8944b9cdfc$var$FORM_ACCESS = "https://docs.google.com/forms/d/e/1FAIpQLSeTbA3iFSmgcNeCaFKuXEKQ0mOBg74mow2ISXzESXOI4afhOQ/formResponse";
function $8cf0fc8944b9cdfc$export$cbae8a5783c0845c(time, timerElement) {
    let hour = Math.floor(time / 3600);
    let min = Math.floor(time / 60) % 60;
    let seg = Math.floor(time % 60);
    timerElement.innerText = `Tempo: ${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min}:${seg < 10 ? "0" + seg : seg}`;
}
async function $8cf0fc8944b9cdfc$var$uploadLog(data) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", $8cf0fc8944b9cdfc$var$FORM_ACCESS, true);
    let formData = new FormData();
    for(let i = 0; i < data.length; i++)formData.append(data[i][0], data[i][1]);
    xhr.send(formData);
    return true;
}
function $8cf0fc8944b9cdfc$export$ce33b877b675017a(nameInput, ageInput, subBtn, time, redirectPath, level) {
    subBtn.addEventListener("click", async ()=>{
        let hour = Math.floor(time / 3600);
        let min = Math.floor(time / 60) % 60;
        let seg = Math.floor(time % 60);
        let name = nameInput.value;
        let age = ageInput.value;
        if (name != null && name != "" && age != null && age != "") {
            if (parseFloat(age) >= 1) {
                subBtn.disabled = true;
                let data = [
                    [
                        "entry.1867777838",
                        level
                    ],
                    [
                        "entry.746491928",
                        name
                    ],
                    [
                        "entry.1029337756",
                        age
                    ],
                    [
                        "entry.2140863999",
                        `${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min}:${seg < 10 ? "0" + seg : seg}`
                    ]
                ];
                let success = true /*await uploadLog(data)*/ ;
                if (success) {
                    console.log(data);
                    window.location.href = redirectPath;
                } else {
                    alert("Ops! Algo deu errado!");
                    subBtn.disabled = false;
                }
            } else alert("Valor da idade incorreto.");
        } else alert("\xc9 necess\xe1rio preencher o formul\xe1rio para avan\xe7ar.");
    });
}

});



parcelRequire("hO50i");
