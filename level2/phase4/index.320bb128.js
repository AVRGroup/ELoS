function $parcel$export(e,r,o,t){Object.defineProperty(e,r,{get:o,set:t,enumerable:!0,configurable:!0})}var $parcel$global="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},$parcel$modules={},$parcel$inits={},parcelRequire=$parcel$global.parcelRequiredf3e;null==parcelRequire&&(parcelRequire=function(e){if(e in $parcel$modules)return $parcel$modules[e].exports;if(e in $parcel$inits){var r=$parcel$inits[e];delete $parcel$inits[e];var o={id:e,exports:{}};return $parcel$modules[e]=o,r.call(o.exports,o,o.exports),o.exports}var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t},parcelRequire.register=function(e,r){$parcel$inits[e]=r},$parcel$global.parcelRequiredf3e=parcelRequire),parcelRequire.register("dRo73",(function(e,r){var o,t;$parcel$export(e.exports,"register",(()=>o),(e=>o=e)),$parcel$export(e.exports,"resolve",(()=>t),(e=>t=e));var i={};o=function(e){for(var r=Object.keys(e),o=0;o<r.length;o++)i[r[o]]=e[r[o]]},t=function(e){var r=i[e];if(null==r)throw new Error("Could not resolve bundle with id "+e);return r}})),parcelRequire.register("gCoyF",(function(module,exports){var $4xklQ=parcelRequire("4xklQ"),$6WmIx=parcelRequire("6WmIx"),$9CUYQ=parcelRequire("9CUYQ"),$apQQe=parcelRequire("apQQe"),$9Rjo8=parcelRequire("9Rjo8"),$czjZ1=parcelRequire("czjZ1"),$hWrQ2=parcelRequire("hWrQ2");const scene=new $4xklQ.Scene;let extinguisherUses=2;const camera=new $4xklQ.PerspectiveCamera(45,2,1,1e3);camera.position.set(0,15,30);const renderer=new $4xklQ.WebGLRenderer({canvas:document.getElementById("sceneView")});window.addEventListener("resize",(function(){(0,$apQQe.resizeCanvasToDisplaySize)(renderer,camera)}),!1);const ambientLight=new $4xklQ.HemisphereLight("white","darkslategrey",.5),mainLight=new $4xklQ.DirectionalLight("white",.7);mainLight.position.set(2,1,1);const controls=new(0,$6WmIx.OrbitControls)(camera,renderer.domElement),gridMapHelper=new(0,$9CUYQ.GridMapHelper),plane=gridMapHelper.createGridPlane();var actorModelPath=new URL(parcelRequire("8jwWx")).toString();const actor=new $4xklQ.Object3D;(0,$apQQe.loadGLBFile)(actor,actorModelPath,"eve",2),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotateY((0,$apQQe.degreeToRadians)(90));const objective=new $4xklQ.Object3D;var crystalModelPath=new URL(parcelRequire("kgSYq")).toString(),crystalTexturePath=new URL(parcelRequire("d3NFX")).toString();(0,$apQQe.loadOBJFile)(objective,crystalModelPath,"crystal",crystalTexturePath,2),objective.rotateX((0,$apQQe.degreeToRadians)(-90)),objective.position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(5));const boxGeometry=new $4xklQ.BoxGeometry(14,2,2),boxMaterial=new $4xklQ.MeshLambertMaterial({color:"rgb(0,255,0)"}),box1=new $4xklQ.Mesh(boxGeometry,boxMaterial),box2=new $4xklQ.Mesh(boxGeometry,boxMaterial),box3=new $4xklQ.Mesh(boxGeometry,boxMaterial),box4=new $4xklQ.Mesh(boxGeometry,boxMaterial);box1.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(4)),box2.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(6)),box3.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(2)),box4.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(8)),gridMapHelper.addObstacle(2,8,2,2),gridMapHelper.addObstacle(2,8,4,4),gridMapHelper.addObstacle(2,8,6,6),gridMapHelper.addObstacle(2,8,8,8);const fireTexPath=new URL(parcelRequire("f323l")).toString(),fireTex=(new $4xklQ.TextureLoader).load(fireTexPath),fireClock=new $4xklQ.Clock,fireHole1=new(0,$9Rjo8.default)(fireTex),fireHole2=new(0,$9Rjo8.default)(fireTex),fireHole3=new(0,$9Rjo8.default)(fireTex),fireHole4=new(0,$9Rjo8.default)(fireTex),fireHole5=new(0,$9Rjo8.default)(fireTex);fireHole1.scale.set(1.2,3,1.2),fireHole2.scale.set(1.2,3,1.2),fireHole3.scale.set(1.2,3,1.2),fireHole4.scale.set(1.2,3,1.2),fireHole5.scale.set(1.2,3,1.2),fireHole1.position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1.5,gridMapHelper.getGlobalZPositionFromCoord(3)),fireHole2.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1.5,gridMapHelper.getGlobalZPositionFromCoord(3)),fireHole3.position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1.5,gridMapHelper.getGlobalZPositionFromCoord(7)),fireHole4.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1.5,gridMapHelper.getGlobalZPositionFromCoord(7)),fireHole5.position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1.5,gridMapHelper.getGlobalZPositionFromCoord(6)),gridMapHelper.addFireHole(3,3),gridMapHelper.addFireHole(6,3),gridMapHelper.addFireHole(3,7),gridMapHelper.addFireHole(6,7),gridMapHelper.addFireHole(9,6);const trapGeometry=new $4xklQ.BoxGeometry(2,1,2),trapMaterial=new $4xklQ.MeshLambertMaterial({color:"rgb(255,0,0)"}),trap1=new $4xklQ.Mesh(trapGeometry,trapMaterial),trap2=new $4xklQ.Mesh(trapGeometry,trapMaterial),trap3=new $4xklQ.Mesh(trapGeometry,trapMaterial);function animate(){requestAnimationFrame(animate),fireHole1.update(fireClock),fireHole2.update(fireClock),fireHole3.update(fireClock),fireHole4.update(fireClock),fireHole5.update(fireClock),controls.update(),renderer.render(scene,camera)}async function andarFrente(e){await(0,$apQQe.translateActorFoward)(actor,e,gridMapHelper,$apQQe.sceneProperties)}async function andarTras(e){await(0,$apQQe.translateActorBackward)(actor,e,gridMapHelper,$apQQe.sceneProperties)}async function girarDireita(){await(0,$apQQe.rotateActorRight)(actor,$apQQe.sceneProperties)}async function girarEsquerda(){await(0,$apQQe.rotateActorLeft)(actor,$apQQe.sceneProperties)}async function darMeiaVolta(){await(0,$apQQe.rotateActorUTurn)(actor,$apQQe.sceneProperties)}function pegandoFogo(){return null!=gridMapHelper.detectHole(actor.position)}function updateExtinguisherUses(){document.getElementById("extinguisherUses").innerText=`x${extinguisherUses}`}function apagarFogoECobrirBuraco(){extinguisherUses>0?(0==gridMapHelper.detectHole(actor.position)?fireHole1.visible=!1:1==gridMapHelper.detectHole(actor.position)?fireHole2.visible=!1:2==gridMapHelper.detectHole(actor.position)?fireHole3.visible=!1:3==gridMapHelper.detectHole(actor.position)?fireHole4.visible=!1:4==gridMapHelper.detectHole(actor.position)&&(fireHole5.visible=!1),gridMapHelper.deactivateHole(actor.position,"fire"),extinguisherUses--,updateExtinguisherUses()):(0,$apQQe.printOnConsole)("Estou sem extintores!")}function checkCollision(e,r){return gridMapHelper.getXCoordFromGlobalPosition(e.position.x)==gridMapHelper.getXCoordFromGlobalPosition(r.position.x)&&gridMapHelper.getZCoordFromGlobalPosition(e.position.z)==gridMapHelper.getZCoordFromGlobalPosition(r.position.z)}function coletarCristal(){$apQQe.sceneProperties.cancelExecution||(checkCollision(actor,objective)?(objective.visible=!1,(0,$apQQe.printOnConsole)("Cristal coletado com sucesso.")):(0,$apQQe.printOnConsole)("Robô não está sobre o cristal."))}function resetLevel(){extinguisherUses=2,updateExtinguisherUses(),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotation.set(0,(0,$apQQe.degreeToRadians)(90),0),actor.getObjectByName("eve").rotation.set(0,0,0),gridMapHelper.restartHoles(),fireHole1.visible=!0,fireHole2.visible=!0,fireHole3.visible=!0,fireHole4.visible=!0,fireHole5.visible=!0,objective.visible=!0}function winCondition(){return!(!checkCollision(actor,objective)||objective.visible)}trap1.position.set(gridMapHelper.getGlobalXPositionFromCoord(9),.5,gridMapHelper.getGlobalZPositionFromCoord(2)),trap2.position.set(gridMapHelper.getGlobalXPositionFromCoord(8),.5,gridMapHelper.getGlobalZPositionFromCoord(5)),trap3.position.set(gridMapHelper.getGlobalXPositionFromCoord(9),.5,gridMapHelper.getGlobalZPositionFromCoord(8)),gridMapHelper.addTrap(9,2),gridMapHelper.addTrap(8,5),gridMapHelper.addTrap(9,8),scene.add(ambientLight),scene.add(mainLight),scene.add(plane),scene.add(objective),scene.add(actor),scene.add(box1),scene.add(box2),scene.add(box3),scene.add(box4),scene.add(fireHole1),scene.add(fireHole2),scene.add(fireHole3),scene.add(fireHole4),scene.add(fireHole5),scene.add(trap1),scene.add(trap2),scene.add(trap3);const execBtn=document.getElementById("execute");execBtn.addEventListener("click",(async function(){let codeParsed=(0,$hWrQ2.parseCode)($czjZ1.editor.state.doc.toString());$apQQe.sceneProperties.cancelExecution=!1,null!=codeParsed&&(resetLevel(),document.getElementById("execute").disabled=!0,await eval(codeParsed),winCondition()?($czjZ1.readOnlyState.doc=$czjZ1.editor.state.doc,$czjZ1.editor.setState($czjZ1.readOnlyState),document.getElementById("winMessage").classList.remove("invisible"),document.getElementById("advanceBtn").classList.remove("invisible"),document.getElementById("reset").disabled=!0):document.getElementById("execute").disabled=!1)}));const resetBtn=document.getElementById("reset");resetBtn.addEventListener("click",(function(){$apQQe.sceneProperties.cancelExecution=!0,resetLevel()}));const clsConsoleBtn=document.getElementById("clsConsole");clsConsoleBtn.addEventListener("click",(function(){document.getElementById("console-printing").innerHTML=null})),(0,$apQQe.resizeCanvasToDisplaySize)(renderer,camera),updateExtinguisherUses(),animate()})),parcelRequire.register("8jwWx",(function(e,r){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("6UgDP"),import.meta.url).toString()})),parcelRequire.register("kgSYq",(function(e,r){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("2fkcW"),import.meta.url).toString()})),parcelRequire.register("d3NFX",(function(e,r){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("6V1gc"),import.meta.url).toString()})),parcelRequire.register("f323l",(function(e,r){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("3ogLL"),import.meta.url).toString()}));var $ef08fadd4f847cf3$exports={};parcelRequire("dRo73").register(JSON.parse('{"3MliR":"index.320bb128.js","6UgDP":"eve.1d379c98.glb","2fkcW":"crystal.b012d479.obj","6V1gc":"crystal.0bf41d2e.jpg","3ogLL":"fire.e7f12c4f.png","iFhe4":"index.05bf574e.js","kbHWl":"index.5d559a84.js"}')),parcelRequire("gCoyF");