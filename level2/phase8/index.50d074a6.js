function $parcel$export(e,o,r,i){Object.defineProperty(e,o,{get:r,set:i,enumerable:!0,configurable:!0})}var $parcel$global="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},$parcel$modules={},$parcel$inits={},parcelRequire=$parcel$global.parcelRequiredf3e;null==parcelRequire&&(parcelRequire=function(e){if(e in $parcel$modules)return $parcel$modules[e].exports;if(e in $parcel$inits){var o=$parcel$inits[e];delete $parcel$inits[e];var r={id:e,exports:{}};return $parcel$modules[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i},parcelRequire.register=function(e,o){$parcel$inits[e]=o},$parcel$global.parcelRequiredf3e=parcelRequire),parcelRequire.register("dRo73",(function(e,o){var r,i;$parcel$export(e.exports,"register",(()=>r),(e=>r=e)),$parcel$export(e.exports,"resolve",(()=>i),(e=>i=e));var t={};r=function(e){for(var o=Object.keys(e),r=0;r<o.length;r++)t[o[r]]=e[o[r]]},i=function(e){var o=t[e];if(null==o)throw new Error("Could not resolve bundle with id "+e);return o}})),parcelRequire.register("eX0hr",(function(module,exports){var $4xklQ=parcelRequire("4xklQ"),$6WmIx=parcelRequire("6WmIx"),$9CUYQ=parcelRequire("9CUYQ"),$apQQe=parcelRequire("apQQe"),$9Rjo8=parcelRequire("9Rjo8"),$czjZ1=parcelRequire("czjZ1"),$hWrQ2=parcelRequire("hWrQ2");const scene=new $4xklQ.Scene;let extinguisherUses=1,executing=!1;const camera=new $4xklQ.PerspectiveCamera(45,2,1,1e3);camera.position.set(0,15,30);const renderer=new $4xklQ.WebGLRenderer({canvas:document.getElementById("sceneView")});window.addEventListener("resize",(function(){(0,$apQQe.resizeCanvasToDisplaySize)(renderer,camera)}),!1);const ambientLight=new $4xklQ.HemisphereLight("white","darkslategrey",.5),mainLight=new $4xklQ.DirectionalLight("white",.7);mainLight.position.set(2,1,1);const controls=new(0,$6WmIx.OrbitControls)(camera,renderer.domElement),gridMapHelper=new(0,$9CUYQ.GridMapHelper),plane=gridMapHelper.createGridPlane();var actorModelPath=new URL(parcelRequire("8jwWx")).toString();const actor=new $4xklQ.Object3D;(0,$apQQe.loadGLBFile)(actor,actorModelPath,"eve",2),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotateY((0,$apQQe.degreeToRadians)(90));const objective1=new $4xklQ.Object3D;var crystalModelPath=new URL(parcelRequire("kgSYq")).toString(),crystalTexturePath=new URL(parcelRequire("d3NFX")).toString();(0,$apQQe.loadOBJFile)(objective1,crystalModelPath,"crystal",crystalTexturePath,2),objective1.rotateX((0,$apQQe.degreeToRadians)(-90));const objective2=new $4xklQ.Object3D;(0,$apQQe.loadOBJFile)(objective2,crystalModelPath,"crystal",crystalTexturePath,2),objective2.rotateX((0,$apQQe.degreeToRadians)(-90));const objective3=new $4xklQ.Object3D;(0,$apQQe.loadOBJFile)(objective3,crystalModelPath,"crystal",crystalTexturePath,2),objective3.rotateX((0,$apQQe.degreeToRadians)(-90)),objective1.position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0,gridMapHelper.getGlobalZPositionFromCoord(5)),objective2.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0,gridMapHelper.getGlobalZPositionFromCoord(5)),objective3.position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0,gridMapHelper.getGlobalZPositionFromCoord(5));const boxGeometry=new $4xklQ.BoxGeometry(2,2,4),boxGeometry2=new $4xklQ.BoxGeometry(2,2,2),boxGeometry3=new $4xklQ.BoxGeometry(2,2,6),boxMaterial=new $4xklQ.MeshLambertMaterial({color:"rgb(0,255,0)"}),box1=new $4xklQ.Mesh(boxGeometry,boxMaterial),box2=new $4xklQ.Mesh(boxGeometry,boxMaterial),box3=new $4xklQ.Mesh(boxGeometry,boxMaterial),box4=new $4xklQ.Mesh(boxGeometry,boxMaterial),box5=new $4xklQ.Mesh(boxGeometry,boxMaterial),box6=new $4xklQ.Mesh(boxGeometry2,boxMaterial),box7=new $4xklQ.Mesh(boxGeometry2,boxMaterial),box8=new $4xklQ.Mesh(boxGeometry2,boxMaterial),box9=new $4xklQ.Mesh(boxGeometry2,boxMaterial),box10=new $4xklQ.Mesh(boxGeometry3,boxMaterial);box1.position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(6.5)),box2.position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(3.5)),box3.position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(.5)),box4.position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(1.5)),box5.position.set(gridMapHelper.getGlobalXPositionFromCoord(6.5),1,gridMapHelper.getGlobalZPositionFromCoord(2)),box5.rotateY((0,$apQQe.degreeToRadians)(90)),box6.position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(6)),box7.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(6)),box8.position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(4)),box9.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(4)),box10.position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(2)),gridMapHelper.addObstacle(2,2,6,7),gridMapHelper.addObstacle(2,2,3,4),gridMapHelper.addObstacle(2,2,0,1),gridMapHelper.addObstacle(4,4,1,2),gridMapHelper.addObstacle(6,7,2,2),gridMapHelper.addObstacle(8,8,1,3),gridMapHelper.addObstacle(4,4,6,6),gridMapHelper.addObstacle(6,6,6,6),gridMapHelper.addObstacle(4,4,4,4),gridMapHelper.addObstacle(6,6,4,4);const trapGeometry=new $4xklQ.BoxGeometry(2,1,2),trapMaterial=new $4xklQ.MeshLambertMaterial({color:"rgb(255,0,0)"}),trap1=new $4xklQ.Mesh(trapGeometry,trapMaterial),trap2=new $4xklQ.Mesh(trapGeometry,trapMaterial),trap3=new $4xklQ.Mesh(trapGeometry,trapMaterial),trap4=new $4xklQ.Mesh(trapGeometry,trapMaterial),trap5=new $4xklQ.Mesh(trapGeometry,trapMaterial),trap6=new $4xklQ.Mesh(trapGeometry,trapMaterial),trap7=new $4xklQ.Mesh(trapGeometry,trapMaterial);trap1.position.set(gridMapHelper.getGlobalXPositionFromCoord(4),.5,gridMapHelper.getGlobalZPositionFromCoord(7)),trap2.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),.5,gridMapHelper.getGlobalZPositionFromCoord(7)),trap3.position.set(gridMapHelper.getGlobalXPositionFromCoord(2),.5,gridMapHelper.getGlobalZPositionFromCoord(5)),trap4.position.set(gridMapHelper.getGlobalXPositionFromCoord(4),.5,gridMapHelper.getGlobalZPositionFromCoord(5)),trap5.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),.5,gridMapHelper.getGlobalZPositionFromCoord(5)),trap6.position.set(gridMapHelper.getGlobalXPositionFromCoord(8),.5,gridMapHelper.getGlobalZPositionFromCoord(5)),trap7.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),.5,gridMapHelper.getGlobalZPositionFromCoord(0)),gridMapHelper.addTrap(4,7),gridMapHelper.addTrap(6,7),gridMapHelper.addTrap(2,5),gridMapHelper.addTrap(4,5),gridMapHelper.addTrap(6,5),gridMapHelper.addTrap(8,5),gridMapHelper.addTrap(6,0);const fireTexPath=new URL(parcelRequire("f323l")).toString(),fireTex=(new $4xklQ.TextureLoader).load(fireTexPath),fireClock=new $4xklQ.Clock,fireHole=new(0,$9Rjo8.default)(fireTex),fireHole2=new(0,$9Rjo8.default)(fireTex),fireHole3=new(0,$9Rjo8.default)(fireTex),fireHole4=new(0,$9Rjo8.default)(fireTex),fireHole5=new(0,$9Rjo8.default)(fireTex),fireHole6=new(0,$9Rjo8.default)(fireTex),fireHole7=new(0,$9Rjo8.default)(fireTex),provisoryHole=new $4xklQ.Mesh(new $4xklQ.CylinderGeometry(.5,.5,.1),new $4xklQ.MeshLambertMaterial({color:"rgb(0,0,0)"}));function animate(){requestAnimationFrame(animate),fireHole.update(fireClock),fireHole2.update(fireClock),fireHole3.update(fireClock),fireHole4.update(fireClock),fireHole5.update(fireClock),fireHole6.update(fireClock),fireHole7.update(fireClock),controls.update(),renderer.render(scene,camera)}function alternateFire(){executing||(gridMapHelper.fireHoles[3].active&&gridMapHelper.fireHoles[5].active?(gridMapHelper.fireHoles[3].active=!1,fireHole4.visible=!1,gridMapHelper.fireHoles[5].active=!1,fireHole6.visible=!1,gridMapHelper.fireHoles[4].active=!0,fireHole5.visible=!0,gridMapHelper.fireHoles[6].active=!0,fireHole7.visible=!0):(gridMapHelper.fireHoles[3].active=!0,fireHole4.visible=!0,gridMapHelper.fireHoles[5].active=!0,fireHole6.visible=!0,gridMapHelper.fireHoles[4].active=!1,fireHole5.visible=!1,gridMapHelper.fireHoles[6].active=!1,fireHole7.visible=!1))}async function andarFrente(e){await(0,$apQQe.translateActorFoward)(actor,e,gridMapHelper,$apQQe.sceneProperties)}async function andarTras(e){await(0,$apQQe.translateActorBackward)(actor,e,gridMapHelper,$apQQe.sceneProperties)}async function girarDireita(){await(0,$apQQe.rotateActorRight)(actor,$apQQe.sceneProperties)}async function girarEsquerda(){await(0,$apQQe.rotateActorLeft)(actor,$apQQe.sceneProperties)}async function darMeiaVolta(){await(0,$apQQe.rotateActorUTurn)(actor,$apQQe.sceneProperties)}function pegandoFogo(){return null!=gridMapHelper.detectHole(actor.position)}function updateExtinguisherUses(){document.getElementById("extinguisherUses").innerText=`x${extinguisherUses}`}function apagarFogoECobrirBuraco(){extinguisherUses>0?(0==gridMapHelper.detectHole(actor.position)?fireHole.visible=!1:1==gridMapHelper.detectHole(actor.position)?fireHole2.visible=!1:2==gridMapHelper.detectHole(actor.position)?fireHole3.visible=!1:3==gridMapHelper.detectHole(actor.position)?fireHole4.visible=!1:4==gridMapHelper.detectHole(actor.position)?fireHole5.visible=!1:5==gridMapHelper.detectHole(actor.position)?fireHole6.visible=!1:6==gridMapHelper.detectHole(actor.position)&&(fireHole7.visible=!1),gridMapHelper.deactivateHole(actor.position,"fire"),extinguisherUses--,updateExtinguisherUses()):(0,$apQQe.printOnConsole)("Estou sem extintores!")}function checkCollision(e,o){return gridMapHelper.getXCoordFromGlobalPosition(e.position.x)==gridMapHelper.getXCoordFromGlobalPosition(o.position.x)&&gridMapHelper.getZCoordFromGlobalPosition(e.position.z)==gridMapHelper.getZCoordFromGlobalPosition(o.position.z)}function coletarCristal(){$apQQe.sceneProperties.cancelExecution||(checkCollision(actor,objective1)?(objective1.visible=!1,(0,$apQQe.printOnConsole)("Cristal coletado.")):checkCollision(actor,objective2)?(objective2.visible=!1,(0,$apQQe.printOnConsole)("Cristal coletado.")):checkCollision(actor,objective3)?(objective3.visible=!1,(0,$apQQe.printOnConsole)("Cristal coletado.")):(0,$apQQe.printOnConsole)("Robô não está sobre o cristal."),objective1.visible||objective2.visible||(0,$apQQe.printOnConsole)("Todos os cristais coletados com sucesso!"))}function resetLevel(){extinguisherUses=1,executing=!1,updateExtinguisherUses(),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotation.set(0,(0,$apQQe.degreeToRadians)(90),0),actor.getObjectByName("eve").rotation.set(0,0,0),gridMapHelper.restartHoles(),fireHole.visible=!0,fireHole2.visible=!0,fireHole3.visible=!0,gridMapHelper.fireHoles[3].active=!0,fireHole4.visible=!0,gridMapHelper.fireHoles[5].active=!0,fireHole6.visible=!0,gridMapHelper.fireHoles[4].active=!1,fireHole5.visible=!1,gridMapHelper.fireHoles[6].active=!1,fireHole7.visible=!1,objective1.visible=!0,objective2.visible=!0,objective3.visible=!0}function winCondition(){return!(objective1.visible||objective2.visible||objective3.visible)}function badLuck(e){console.log(e);const o=new $4xklQ.Vector3(gridMapHelper.getGlobalXPositionFromCoord(e[0]),0,gridMapHelper.getGlobalZPositionFromCoord(e[1])),r=gridMapHelper.detectHole(o,"fire",!0);null!=r&&(gridMapHelper.fireHoles[r].active=!0,3==r?fireHole4.visible=!0:4==r?fireHole5.visible=!0:5==r?fireHole6.visible=!0:6==r&&(fireHole7.visible=!0))}provisoryHole.position.set(0,-.5,0),fireHole.add(provisoryHole),fireHole2.add(provisoryHole.clone()),fireHole3.add(provisoryHole.clone()),fireHole4.add(provisoryHole.clone()),fireHole5.add(provisoryHole.clone()),fireHole6.add(provisoryHole.clone()),fireHole7.add(provisoryHole.clone()),fireHole.scale.set(1.2,3,1.2),fireHole2.scale.set(1.2,3,1.2),fireHole3.scale.set(1.2,3,1.2),fireHole4.scale.set(1.2,3,1.2),fireHole5.scale.set(1.2,3,1.2),fireHole6.scale.set(1.2,3,1.2),fireHole7.scale.set(1.2,3,1.2),fireHole.position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1.5,gridMapHelper.getGlobalZPositionFromCoord(7)),fireHole2.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1.5,gridMapHelper.getGlobalZPositionFromCoord(7)),fireHole3.position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1.5,gridMapHelper.getGlobalZPositionFromCoord(7)),fireHole4.position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1.5,gridMapHelper.getGlobalZPositionFromCoord(3)),fireHole5.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1.5,gridMapHelper.getGlobalZPositionFromCoord(3)),fireHole6.position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1.5,gridMapHelper.getGlobalZPositionFromCoord(3)),fireHole7.position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1.5,gridMapHelper.getGlobalZPositionFromCoord(5)),gridMapHelper.addFireHole(3,7),gridMapHelper.addFireHole(5,7),gridMapHelper.addFireHole(7,7),gridMapHelper.addFireHole(3,3),gridMapHelper.addFireHole(5,3),gridMapHelper.addFireHole(7,3),gridMapHelper.addFireHole(9,5),scene.add(ambientLight),scene.add(mainLight),scene.add(plane),scene.add(objective1),scene.add(objective2),scene.add(objective3),scene.add(actor),scene.add(box1),scene.add(box2),scene.add(box3),scene.add(box4),scene.add(box5),scene.add(box6),scene.add(box7),scene.add(box8),scene.add(box9),scene.add(box10),scene.add(trap1),scene.add(trap2),scene.add(trap3),scene.add(trap4),scene.add(trap5),scene.add(trap6),scene.add(trap7),scene.add(fireHole),scene.add(fireHole2),scene.add(fireHole3),scene.add(fireHole4),scene.add(fireHole5),scene.add(fireHole6),scene.add(fireHole7);const execBtn=document.getElementById("execute");execBtn.addEventListener("click",(async function(){let codeParsed=(0,$hWrQ2.parseCode)($czjZ1.editor.state.doc.toString());$apQQe.sceneProperties.cancelExecution=!1,null!=codeParsed&&(resetLevel(),executing=!0,document.getElementById("execute").disabled=!0,await eval(codeParsed),winCondition()?($czjZ1.readOnlyState.doc=$czjZ1.editor.state.doc,$czjZ1.editor.setState($czjZ1.readOnlyState),document.getElementById("winMessage").classList.remove("invisible"),document.getElementById("advanceBtn").classList.remove("invisible"),document.getElementById("reset").disabled=!0):(executing=!1,document.getElementById("execute").disabled=!1))}));const resetBtn=document.getElementById("reset");resetBtn.addEventListener("click",(function(){$apQQe.sceneProperties.cancelExecution=!0,resetLevel()}));const clsConsoleBtn=document.getElementById("clsConsole");clsConsoleBtn.addEventListener("click",(function(){document.getElementById("console-printing").innerHTML=null})),(0,$apQQe.resizeCanvasToDisplaySize)(renderer,camera),updateExtinguisherUses();const fireInterval=setInterval(alternateFire,1e3);animate()})),parcelRequire.register("8jwWx",(function(e,o){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("6UgDP"),import.meta.url).toString()})),parcelRequire.register("kgSYq",(function(e,o){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("2fkcW"),import.meta.url).toString()})),parcelRequire.register("d3NFX",(function(e,o){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("6V1gc"),import.meta.url).toString()})),parcelRequire.register("f323l",(function(e,o){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("3ogLL"),import.meta.url).toString()}));var $4a67ed5b69faebde$exports={};parcelRequire("dRo73").register(JSON.parse('{"dVMSO":"index.50d074a6.js","6UgDP":"eve.1d379c98.glb","2fkcW":"crystal.b012d479.obj","6V1gc":"crystal.0bf41d2e.jpg","3ogLL":"fire.e7f12c4f.png","7whLb":"index.d3d9bc73.js","fAugp":"index.8e5a20e0.js"}')),parcelRequire("eX0hr");