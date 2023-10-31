function $parcel$export(e,t,a,r){Object.defineProperty(e,t,{get:a,set:r,enumerable:!0,configurable:!0})}var $parcel$global="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},$parcel$modules={},$parcel$inits={},parcelRequire=$parcel$global.parcelRequiredf3e;null==parcelRequire&&(parcelRequire=function(e){if(e in $parcel$modules)return $parcel$modules[e].exports;if(e in $parcel$inits){var t=$parcel$inits[e];delete $parcel$inits[e];var a={id:e,exports:{}};return $parcel$modules[e]=a,t.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r},parcelRequire.register=function(e,t){$parcel$inits[e]=t},$parcel$global.parcelRequiredf3e=parcelRequire),parcelRequire.register("dRo73",(function(e,t){var a,r;$parcel$export(e.exports,"register",(()=>a),(e=>a=e)),$parcel$export(e.exports,"resolve",(()=>r),(e=>r=e));var o={};a=function(e){for(var t=Object.keys(e),a=0;a<t.length;a++)o[t[a]]=e[t[a]]},r=function(e){var t=o[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),parcelRequire.register("2RQXo",(function(module,exports){var $4xklQ=parcelRequire("4xklQ"),$bsNDL=parcelRequire("bsNDL"),$7FzN9=parcelRequire("7FzN9"),$1M2iF=parcelRequire("1M2iF"),$cCC00=parcelRequire("cCC00"),$hfAuX=parcelRequire("hfAuX"),$8TDdX=parcelRequire("8TDdX"),$dhcg3=parcelRequire("dhcg3"),$7TtGC=parcelRequire("7TtGC");const sceneProperties={cancelExecution:!1,timer:0,phase:0,mult:1,lang:window.location.href.includes("english")?1:0};function generatePhaseTitle(){return 1===sceneProperties.lang?`Level 1 - Round ${sceneProperties.phase+1} of 8`:`Nível 1 - Fase ${sceneProperties.phase+1} de 8`}const textVariations=[[generatePhaseTitle,"Faça o robô chegar ao cristal, após isso, o colete.","Faça o robô chegar aos cristais, após isso, os colete.","Robô não está em frente ao cristal.\n","Cristal coletado.\n","Cristal coletado com sucesso.\n","Todos os cristais coletados com sucesso!\n","Nível Concluído","Finalizar","Deseja realmente finalizar a prática?"],[generatePhaseTitle,"Make the robot reach the crystal and collect it.","Make the robot reach the crystals and collect them.","Robot is not in front of the crystal.\n","Crystal collected.\n","Crystal successfully collected.\n","All crystals collected successfully!\n","Level Completed","Finish","Do you really want to finish the practice?"]],commandsVariations=[["andarFrente(?)\n","andarTras(?)\n","girarEsquerda()\n","girarDireita()\n","darMeiaVolta()\n","coletarCristal()\n"],["moveForward(?)\n","moveBackwards(?)\n","rotateLeft()\n","rotateRight()\n","turnBack()","collectCrystal()\n"]],logModal=new(0,$8TDdX.Modal)(document.getElementById("logModal"));let timerUpadate;function updateTime(){sceneProperties.timer++}const editor=(0,$bsNDL.generateDefaultEditor)(document.getElementById("editorArea"),{lineNumbers:!0}),andarFrenteBtn=document.getElementById("andarFrente");andarFrenteBtn.addEventListener("click",(()=>{let e,t,a=editor.state.selection.main.anchor,r=editor.state.selection.main.head;a<=r?(e=editor.state.update({changes:{from:a,to:r,insert:commandsVariations[sceneProperties.lang][0]}}),t=editor.state.doc.lineAt(a).number):(e=editor.state.update({changes:{from:r,to:a,insert:commandsVariations[sceneProperties.lang][0]}}),t=editor.state.doc.lineAt(r).number),editor.dispatch(e),editor.focus();let o=editor.state.doc.line(t+1).to;editor.dispatch({selection:{anchor:o}})}));const andarTrasBtn=document.getElementById("andarTras");andarTrasBtn.addEventListener("click",(()=>{let e,t,a=editor.state.selection.main.anchor,r=editor.state.selection.main.head;a<=r?(e=editor.state.update({changes:{from:a,to:r,insert:commandsVariations[sceneProperties.lang][1]}}),t=editor.state.doc.lineAt(a).number):(e=editor.state.update({changes:{from:r,to:a,insert:commandsVariations[sceneProperties.lang][1]}}),t=editor.state.doc.lineAt(r).number),editor.dispatch(e),editor.focus();let o=editor.state.doc.line(t+1).to;editor.dispatch({selection:{anchor:o}})}));const girarEsquerdaBtn=document.getElementById("girarEsquerda");girarEsquerdaBtn.addEventListener("click",(()=>{let e,t,a=editor.state.selection.main.anchor,r=editor.state.selection.main.head;a<=r?(e=editor.state.update({changes:{from:a,to:r,insert:commandsVariations[sceneProperties.lang][2]}}),t=editor.state.doc.lineAt(a).number):(e=editor.state.update({changes:{from:r,to:a,insert:commandsVariations[sceneProperties.lang][2]}}),t=editor.state.doc.lineAt(r).number),editor.dispatch(e),editor.focus();let o=editor.state.doc.line(t+1).to;editor.dispatch({selection:{anchor:o}})}));const girarDireitaBtn=document.getElementById("girarDireita");girarDireitaBtn.addEventListener("click",(()=>{let e,t,a=editor.state.selection.main.anchor,r=editor.state.selection.main.head;a<=r?(e=editor.state.update({changes:{from:a,to:r,insert:commandsVariations[sceneProperties.lang][3]}}),t=editor.state.doc.lineAt(a).number):(e=editor.state.update({changes:{from:r,to:a,insert:commandsVariations[sceneProperties.lang][3]}}),t=editor.state.doc.lineAt(r).number),editor.dispatch(e),editor.focus();let o=editor.state.doc.line(t+1).to;editor.dispatch({selection:{anchor:o}})}));const darMeiaVoltaBtn=document.getElementById("darMeiaVolta");darMeiaVoltaBtn.addEventListener("click",(()=>{let e,t,a=editor.state.selection.main.anchor,r=editor.state.selection.main.head;a<=r?(e=editor.state.update({changes:{from:a,to:r,insert:commandsVariations[sceneProperties.lang][4]}}),t=editor.state.doc.lineAt(a).number):(e=editor.state.update({changes:{from:r,to:a,insert:commandsVariations[sceneProperties.lang][4]}}),t=editor.state.doc.lineAt(r).number),editor.dispatch(e),editor.focus();let o=editor.state.doc.line(t+1).to;editor.dispatch({selection:{anchor:o}})}));const coletarCristalBtn=document.getElementById("coletarCristal");coletarCristalBtn.addEventListener("click",(()=>{let e,t,a=editor.state.selection.main.anchor,r=editor.state.selection.main.head;a<=r?(e=editor.state.update({changes:{from:a,to:r,insert:commandsVariations[sceneProperties.lang][5]}}),t=editor.state.doc.lineAt(a).number):(e=editor.state.update({changes:{from:r,to:a,insert:commandsVariations[sceneProperties.lang][5]}}),t=editor.state.doc.lineAt(r).number),editor.dispatch(e),editor.focus();let o=editor.state.doc.line(t+1).to;editor.dispatch({selection:{anchor:o}})}));const consoleElement=document.getElementById("consoleArea"),{renderer:renderer,scene:scene,camera:camera,controls:controls}=(0,$7FzN9.generateDefaultSceneObjects)(document.getElementById("phaseView")),gridMapHelper=new(0,$1M2iF.default),plane=gridMapHelper.createGridPlane(),actor=(0,$7FzN9.loadDefaultActor)(),wallTexture=(new $4xklQ.TextureLoader).load(new URL(parcelRequire("jGR73")).toString());let objectives,walls,traps,spikeTrapState,setSpikeTrapState,setSpikeTrapStateInterval,coletarCristal,resetLevel,winCondition;async function andarFrente(e){let t=e>10?10:e;await(0,$7FzN9.translateActor)(actor,t,gridMapHelper,sceneProperties,consoleElement)}async function andarTras(e){let t=e>10?10:e;await(0,$7FzN9.translateActor)(actor,-t,gridMapHelper,sceneProperties,consoleElement)}async function girarEsquerda(){await(0,$7FzN9.rotateActor)(actor,90,sceneProperties,1)}async function girarDireita(){await(0,$7FzN9.rotateActor)(actor,90,sceneProperties,-1)}async function darMeiaVolta(){await(0,$7FzN9.rotateActor)(actor,180,sceneProperties,1)}wallTexture.wrapS=$4xklQ.RepeatWrapping,wallTexture.wrapT=$4xklQ.RepeatWrapping,scene.add(plane),scene.add(actor);const phaseGeneration=[];function removeObjects(e,t,a){if(null!=e)for(let t=0;t<e.length;t++)scene.remove(e[t]);if(null!=t){for(let e=0;e<t.length;e++)scene.remove(t[e]);gridMapHelper.clearObstacles()}if(null!=a){for(let e=0;e<a.length;e++)scene.remove(a[e]);gridMapHelper.clearTraps()}e=void 0,t=void 0,a=void 0}function animate(){requestAnimationFrame(animate),controls.update(),renderer.render(scene,camera),(0,$hfAuX.displayTime)(sceneProperties.timer,document.getElementById("timer"))}phaseGeneration.push((()=>{document.getElementById("phaseTitle").innerText=textVariations[sceneProperties.lang][0](),document.getElementById("phaseObjective").innerText=textVariations[sceneProperties.lang][1],camera.position.set(0,15,30),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),objectives=(0,$7FzN9.loadDefaultObjectives)(1),objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(5)),gridMapHelper.addObstacle(9,9,5,5),scene.add(objectives[0]),coletarCristal=()=>{sceneProperties.cancelExecution||((0,$7FzN9.checkCollision)(actor.getObjectByName("interactionReference"),objectives[0],gridMapHelper)?(objectives[0].visible=!1,consoleElement.innerText+=textVariations[sceneProperties.lang][5],gridMapHelper.obstacles[0].active=!1):consoleElement.innerText+=textVariations[sceneProperties.lang][3])},resetLevel=()=>{actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),actor.getObjectByName("eve").rotation.set(0,0,0),objectives[0].visible=!0,gridMapHelper.obstacles[0].active=!0},winCondition=()=>!objectives[0].visible,timerUpadate=setInterval(updateTime,1e3)})),phaseGeneration.push((()=>{document.getElementById("phaseTitle").innerText=textVariations[sceneProperties.lang][0](),document.getElementById("phaseObjective").innerText=textVariations[sceneProperties.lang][1],camera.position.set(0,15,30),camera.rotation.set(0,0,0),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),objectives=(0,$7FzN9.loadDefaultObjectives)(1),objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0,gridMapHelper.getGlobalZPositionFromCoord(2)),gridMapHelper.addObstacle(8,8,2,2),scene.add(objectives[0]),coletarCristal=()=>{sceneProperties.cancelExecution||((0,$7FzN9.checkCollision)(actor.getObjectByName("interactionReference"),objectives[0],gridMapHelper)?(objectives[0].visible=!1,consoleElement.innerText+=textVariations[sceneProperties.lang][5],gridMapHelper.obstacles[0].active=!1):consoleElement.innerText+=textVariations[sceneProperties.lang][3])},resetLevel=()=>{actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),actor.getObjectByName("eve").rotation.set(0,0,0),objectives[0].visible=!0,gridMapHelper.obstacles[0].active=!0},winCondition=()=>!objectives[0].visible,timerUpadate=setInterval(updateTime,1e3)})),phaseGeneration.push((()=>{document.getElementById("phaseTitle").innerText=textVariations[sceneProperties.lang][0](),document.getElementById("phaseObjective").innerText=textVariations[sceneProperties.lang][2],camera.position.set(0,15,30),camera.rotation.set(0,0,0),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(2)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),objectives=(0,$7FzN9.loadDefaultObjectives)(2),objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0,gridMapHelper.getGlobalZPositionFromCoord(6)),objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0,gridMapHelper.getGlobalZPositionFromCoord(1)),gridMapHelper.addObstacle(2,2,6,6),gridMapHelper.addObstacle(7,7,1,1),scene.add(objectives[0]),scene.add(objectives[1]),coletarCristal=()=>{sceneProperties.cancelExecution||((0,$7FzN9.checkCollision)(actor.getObjectByName("interactionReference"),objectives[0],gridMapHelper)?(objectives[0].visible=!1,consoleElement.innerText+=textVariations[sceneProperties.lang][4],gridMapHelper.obstacles[0].active=!1):(0,$7FzN9.checkCollision)(actor.getObjectByName("interactionReference"),objectives[1],gridMapHelper)?(objectives[1].visible=!1,consoleElement.innerText+=textVariations[sceneProperties.lang][4],gridMapHelper.obstacles[1].active=!1):consoleElement.innerText+=textVariations[sceneProperties.lang][3],objectives[0].visible||objectives[1].visible||(consoleElement.innerText+=textVariations[sceneProperties.lang][6]))},resetLevel=()=>{actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(2)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),actor.getObjectByName("eve").rotation.set(0,0,0),objectives[0].visible=!0,objectives[1].visible=!0,gridMapHelper.obstacles[0].active=!0,gridMapHelper.obstacles[1].active=!0},winCondition=()=>!objectives[0].visible&&!objectives[1].visible,timerUpadate=setInterval(updateTime,1e3)})),phaseGeneration.push((()=>{document.getElementById("phaseTitle").innerText=textVariations[sceneProperties.lang][0](),document.getElementById("phaseObjective").innerText=textVariations[sceneProperties.lang][1],camera.position.set(0,15,30),camera.rotation.set(0,0,0),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),objectives=(0,$7FzN9.loadDefaultObjectives)(1),objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(5)),gridMapHelper.addObstacle(9,9,5,5),scene.add(objectives[0]),walls=[];const e=new $4xklQ.BoxGeometry(2,2,2),t=new $4xklQ.MeshLambertMaterial({map:wallTexture});walls.push(new $4xklQ.Mesh(e,t)),walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalXPositionFromCoord(5)),gridMapHelper.addObstacle(7,7,5,5),scene.add(walls[0]),coletarCristal=()=>{sceneProperties.cancelExecution||((0,$7FzN9.checkCollision)(actor.getObjectByName("interactionReference"),objectives[0],gridMapHelper)?(objectives[0].visible=!1,consoleElement.innerText+=textVariations[sceneProperties.lang][5],gridMapHelper.obstacles[0].active=!1):consoleElement.innerText+=textVariations[sceneProperties.lang][3])},resetLevel=()=>{actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),actor.getObjectByName("eve").rotation.set(0,0,0),objectives[0].visible=!0,gridMapHelper.obstacles[0].active=!0},winCondition=()=>!objectives[0].visible,timerUpadate=setInterval(updateTime,1e3)})),phaseGeneration.push((()=>{document.getElementById("phaseTitle").innerText=textVariations[sceneProperties.lang][0](),document.getElementById("phaseObjective").innerText=textVariations[sceneProperties.lang][2],camera.position.set(0,15,30),camera.rotation.set(0,0,0),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(2)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),objectives=(0,$7FzN9.loadDefaultObjectives)(2),objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0,gridMapHelper.getGlobalZPositionFromCoord(2)),objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0,gridMapHelper.getGlobalZPositionFromCoord(8)),gridMapHelper.addObstacle(6,6,2,2),gridMapHelper.addObstacle(7,7,8,8),scene.add(objectives[0]),scene.add(objectives[1]),walls=[];const e=new $4xklQ.BoxGeometry(6,2,2),t=new $4xklQ.BoxGeometry(4,2,2),a=[new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()})];a[2].map.repeat.set(3,1),a[3].map.repeat.set(3,1),a[4].map.repeat.set(3,1),a[5].map.repeat.set(3,1);const r=[new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()})];r[2].map.repeat.set(2,1),r[3].map.repeat.set(2,1),r[4].map.repeat.set(2,1),r[5].map.repeat.set(2,1),walls.push(new $4xklQ.Mesh(e,a)),walls.push(new $4xklQ.Mesh(t,r)),walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalXPositionFromCoord(7)),walls[1].rotateY((0,$7FzN9.degreeToRadians)(90)),walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalXPositionFromCoord(2.5)),gridMapHelper.addObstacle(5,7,7,7),gridMapHelper.addObstacle(5,5,2,3),scene.add(walls[0]),scene.add(walls[1]),coletarCristal=()=>{sceneProperties.cancelExecution||((0,$7FzN9.checkCollision)(actor.getObjectByName("interactionReference"),objectives[0],gridMapHelper)?(objectives[0].visible=!1,consoleElement.innerText+=textVariations[sceneProperties.lang][4],gridMapHelper.obstacles[0].active=!1):(0,$7FzN9.checkCollision)(actor.getObjectByName("interactionReference"),objectives[1],gridMapHelper)?(objectives[1].visible=!1,consoleElement.innerText+=textVariations[sceneProperties.lang][4],gridMapHelper.obstacles[1].active=!1):consoleElement.innerText+=textVariations[sceneProperties.lang][3],objectives[0].visible||objectives[1].visible||(consoleElement.innerText+=textVariations[sceneProperties.lang][6]))},resetLevel=()=>{actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(2)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),actor.getObjectByName("eve").rotation.set(0,0,0),objectives[0].visible=!0,objectives[1].visible=!0,gridMapHelper.obstacles[0].active=!0,gridMapHelper.obstacles[1].active=!0},winCondition=()=>!objectives[0].visible&&!objectives[1].visible,timerUpadate=setInterval(updateTime,1e3)})),phaseGeneration.push((()=>{document.getElementById("phaseTitle").innerText=textVariations[sceneProperties.lang][0](),document.getElementById("phaseObjective").innerText=textVariations[sceneProperties.lang][1],camera.position.set(0,15,30),camera.rotation.set(0,0,0),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),objectives=(0,$7FzN9.loadDefaultObjectives)(1),objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0,gridMapHelper.getGlobalZPositionFromCoord(0)),gridMapHelper.addObstacle(8,8,0,0),scene.add(objectives[0]),walls=[];const e=new $4xklQ.BoxGeometry(14,2,2),t=new $4xklQ.BoxGeometry(16,2,2),a=new $4xklQ.BoxGeometry(2,2,4),r=[new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()})];r[2].map.repeat.set(7,1),r[3].map.repeat.set(7,1),r[4].map.repeat.set(7,1),r[5].map.repeat.set(7,1);const o=[new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()})];o[2].map.repeat.set(8,1),o[3].map.repeat.set(8,1),o[4].map.repeat.set(8,1),o[5].map.repeat.set(8,1);const i=[new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()})];i[0].map.repeat.set(2,1),i[1].map.repeat.set(2,1),i[2].map.repeat.set(1,2),i[3].map.repeat.set(1,2),walls.push(new $4xklQ.Mesh(e,r)),walls.push(new $4xklQ.Mesh(t,o)),walls.push(new $4xklQ.Mesh(a,i)),walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(2)),walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5),1,gridMapHelper.getGlobalZPositionFromCoord(4)),walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(.5)),gridMapHelper.addObstacle(2,8,2,2),gridMapHelper.addObstacle(2,9,4,4),gridMapHelper.addObstacle(7,7,0,1),scene.add(walls[0]),scene.add(walls[1]),scene.add(walls[2]),coletarCristal=()=>{sceneProperties.cancelExecution||((0,$7FzN9.checkCollision)(actor.getObjectByName("interactionReference"),objectives[0],gridMapHelper)?(objectives[0].visible=!1,consoleElement.innerText+=textVariations[sceneProperties.lang][5],gridMapHelper.obstacles[0].active=!1):consoleElement.innerText+=textVariations[sceneProperties.lang][3])},resetLevel=()=>{actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),actor.getObjectByName("eve").rotation.set(0,0,0),objectives[0].visible=!0,gridMapHelper.obstacles[0].active=!0},winCondition=()=>!objectives[0].visible,timerUpadate=setInterval(updateTime,1e3)})),phaseGeneration.push((()=>{document.getElementById("phaseTitle").innerText=textVariations[sceneProperties.lang][0](),document.getElementById("phaseObjective").innerText=textVariations[sceneProperties.lang][1],camera.position.set(0,15,30),camera.rotation.set(0,0,0),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),objectives=(0,$7FzN9.loadDefaultObjectives)(1),objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(0)),gridMapHelper.addObstacle(9,9,0,0),scene.add(objectives[0]),walls=[];const e=new $4xklQ.BoxGeometry(14,2,2),t=new $4xklQ.BoxGeometry(16,2,2),a=new $4xklQ.BoxGeometry(2,2,8),r=[new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()})];r[2].map.repeat.set(7,1),r[3].map.repeat.set(7,1),r[4].map.repeat.set(7,1),r[5].map.repeat.set(7,1);const o=[new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()})];o[2].map.repeat.set(8,1),o[3].map.repeat.set(8,1),o[4].map.repeat.set(8,1),o[5].map.repeat.set(8,1);const i=[new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()})];i[0].map.repeat.set(4,1),i[1].map.repeat.set(4,1),i[2].map.repeat.set(1,4),i[3].map.repeat.set(1,4),walls.push(new $4xklQ.Mesh(e,r)),walls.push(new $4xklQ.Mesh(t,o)),walls.push(new $4xklQ.Mesh(a,i)),walls.push(new $4xklQ.Mesh(e,r)),walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(4)),walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5),1,gridMapHelper.getGlobalZPositionFromCoord(8)),walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(1.5)),walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(6)),gridMapHelper.addObstacle(2,8,4,4),gridMapHelper.addObstacle(2,8,6,6),gridMapHelper.addObstacle(8,8,0,3),gridMapHelper.addObstacle(2,9,8,8),scene.add(walls[0]),scene.add(walls[1]),scene.add(walls[2]),scene.add(walls[3]),traps=[],traps.push(new(0,$dhcg3.SpikeTrap)),traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0,gridMapHelper.getGlobalZPositionFromCoord(5)),gridMapHelper.addTrap(8,5,traps[0]),scene.add(traps[0]),coletarCristal=()=>{sceneProperties.cancelExecution||((0,$7FzN9.checkCollision)(actor.getObjectByName("interactionReference"),objectives[0],gridMapHelper)?(objectives[0].visible=!1,consoleElement.innerText+=textVariations[sceneProperties.lang][5],gridMapHelper.obstacles[0].active=!1):consoleElement.innerText+=textVariations[sceneProperties.lang][3])},resetLevel=()=>{actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),actor.getObjectByName("eve").rotation.set(0,0,0),objectives[0].visible=!0,gridMapHelper.obstacles[0].active=!0},winCondition=()=>!objectives[0].visible,spikeTrapState=0,setSpikeTrapState=()=>{0==spikeTrapState?(0,$dhcg3.trapsDeactivation)(traps):(0,$dhcg3.trapsActivation)(traps)},setSpikeTrapStateInterval=setInterval((()=>{sceneProperties.executing||(spikeTrapState=(spikeTrapState+1)%2,setSpikeTrapState())}),1e3),timerUpadate=setInterval(updateTime,1e3)})),phaseGeneration.push((()=>{document.getElementById("phaseTitle").innerText=textVariations[sceneProperties.lang][0](),document.getElementById("phaseObjective").innerText=textVariations[sceneProperties.lang][2],camera.position.set(0,15,30),camera.rotation.set(0,0,0),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(2)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),objectives=(0,$7FzN9.loadDefaultObjectives)(3),objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0,gridMapHelper.getGlobalZPositionFromCoord(2)),objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0,gridMapHelper.getGlobalZPositionFromCoord(8)),objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0,gridMapHelper.getGlobalZPositionFromCoord(5)),gridMapHelper.addObstacle(6,6,2,2),gridMapHelper.addObstacle(7,7,8,8),gridMapHelper.addObstacle(2,2,5,5),scene.add(objectives[0]),scene.add(objectives[1]),scene.add(objectives[2]),walls=[];const e=new $4xklQ.BoxGeometry(6,2,2),t=new $4xklQ.BoxGeometry(4,2,2),a=[new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()})];a[2].map.repeat.set(3,1),a[3].map.repeat.set(3,1),a[4].map.repeat.set(3,1),a[5].map.repeat.set(3,1);const r=[new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()}),new $4xklQ.MeshLambertMaterial({map:wallTexture.clone()})];r[2].map.repeat.set(2,1),r[3].map.repeat.set(2,1),r[4].map.repeat.set(2,1),r[5].map.repeat.set(2,1),walls.push(new $4xklQ.Mesh(e,a)),walls.push(new $4xklQ.Mesh(t,r)),walls.push(new $4xklQ.Mesh(e,a)),walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalXPositionFromCoord(7)),walls[1].rotateY((0,$7FzN9.degreeToRadians)(90)),walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(2.5)),walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(4)),gridMapHelper.addObstacle(5,7,7,7),gridMapHelper.addObstacle(5,5,2,3),gridMapHelper.addObstacle(1,3,4,4),scene.add(walls[0]),scene.add(walls[1]),scene.add(walls[2]),traps=[],traps.push(new(0,$dhcg3.SpikeTrap)),traps.push(new(0,$dhcg3.SpikeTrap)),traps.push(new(0,$dhcg3.SpikeTrap)),traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0,gridMapHelper.getGlobalZPositionFromCoord(5)),traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0,gridMapHelper.getGlobalZPositionFromCoord(3)),traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0,gridMapHelper.getGlobalZPositionFromCoord(8)),gridMapHelper.addTrap(1,5,traps[0]),gridMapHelper.addTrap(6,3,traps[1]),gridMapHelper.addTrap(5,8,traps[2]),scene.add(traps[0]),scene.add(traps[1]),scene.add(traps[2]),coletarCristal=()=>{sceneProperties.cancelExecution||((0,$7FzN9.checkCollision)(actor.getObjectByName("interactionReference"),objectives[0],gridMapHelper)?(objectives[0].visible=!1,consoleElement.innerText+=textVariations[sceneProperties.lang][4],gridMapHelper.obstacles[0].active=!1):(0,$7FzN9.checkCollision)(actor.getObjectByName("interactionReference"),objectives[1],gridMapHelper)?(objectives[1].visible=!1,consoleElement.innerText+=textVariations[sceneProperties.lang][4],gridMapHelper.obstacles[1].active=!1):(0,$7FzN9.checkCollision)(actor.getObjectByName("interactionReference"),objectives[2],gridMapHelper)?(objectives[2].visible=!1,consoleElement.innerText+=textVariations[sceneProperties.lang][4],gridMapHelper.obstacles[2].active=!1):consoleElement.innerText+=textVariations[sceneProperties.lang][3],objectives[0].visible||objectives[1].visible||objectives[2].visible||(consoleElement.innerText+=textVariations[sceneProperties.lang][6]))},resetLevel=()=>{actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(2)),actor.rotation.set(0,(0,$7FzN9.degreeToRadians)(90),0),actor.getObjectByName("eve").rotation.set(0,0,0),objectives[0].visible=!0,objectives[1].visible=!0,objectives[2].visible=!0,gridMapHelper.obstacles[0].active=!0,gridMapHelper.obstacles[1].active=!0,gridMapHelper.obstacles[2].active=!0},winCondition=()=>!(objectives[0].visible||objectives[1].visible||objectives[2].visible),spikeTrapState=0,setSpikeTrapState=()=>{0==spikeTrapState?(0,$dhcg3.trapsDeactivation)(traps):(0,$dhcg3.trapsActivation)(traps)},setSpikeTrapStateInterval=setInterval((()=>{sceneProperties.executing||(spikeTrapState=(spikeTrapState+1)%2,setSpikeTrapState())}),1e3),document.getElementById("winMessage").innerText=textVariations[sceneProperties.lang][7],document.getElementById("advanceBtn").innerText=textVariations[sceneProperties.lang][8],timerUpadate=setInterval(updateTime,1e3)})),window.addEventListener("resize",(()=>{(0,$7FzN9.resizeCanvasToDisplaySize)(renderer,camera)}));const finishEarlierButton=document.getElementById("finishEarlier"),execBtn=document.getElementById("execBtn");execBtn.addEventListener("click",(async function(){cancelAnimationFrame($7FzN9.corrID),cancelAnimationFrame($7FzN9.requestID);const codeParsed=(0,$cCC00.default)((0,$7TtGC.convertCode)(sceneProperties.lang,editor.state.doc.toString()));sceneProperties.cancelExecution=!1,actor.getObjectByName("eve").position.y=0,null!=traps&&(0,$dhcg3.trapsDeactivation)(traps),null!=codeParsed&&((0,$bsNDL.updateTheme)(editor,1),resetLevel(),sceneProperties.executing=!0,this.disabled=!0,await eval(codeParsed),winCondition()?($bsNDL.readOnlyState.doc=editor.state.doc,editor.setState($bsNDL.readOnlyState),document.getElementById("winMessage").classList.remove("invisible"),document.getElementById("advanceBtn").classList.remove("invisible"),document.getElementById("resetBtn").disabled=!0,finishEarlierButton.disabled=!0,clearInterval(timerUpadate),sceneProperties.phase==phaseGeneration.length-1&&(0,$hfAuX.configureDataAndUpload)(document.getElementById("name"),document.getElementById("age"),"gender","prog-exp",document.getElementById("subBtn"),sceneProperties.timer,"../","Nível 1/Completo",document.getElementById("second-user"))):((0,$bsNDL.updateTheme)(editor,0),sceneProperties.executing=!1,this.disabled=!1))}));const resetBtn=document.getElementById("resetBtn");resetBtn.addEventListener("click",(()=>{cancelAnimationFrame($7FzN9.corrID),cancelAnimationFrame($7FzN9.requestID),(0,$bsNDL.updateTheme)(editor,0),sceneProperties.cancelExecution=!0,resetLevel()}));const advanceBtn=document.getElementById("advanceBtn");advanceBtn.addEventListener("click",(e=>{sceneProperties.phase++,sceneProperties.phase<phaseGeneration.length?(removeObjects(objectives,walls,traps),phaseGeneration[sceneProperties.phase](),editor.setState($bsNDL.editState),consoleElement.innerText=null,document.getElementById("winMessage").classList.add("invisible"),document.getElementById("advanceBtn").classList.add("invisible"),execBtn.disabled=!1,resetBtn.disabled=!1,finishEarlierButton.disabled=!1):(sceneProperties.phase=sceneProperties.phase>phaseGeneration.length?phaseGeneration.length:sceneProperties.phase,logModal.show())})),finishEarlierButton.addEventListener("click",(e=>{confirm(textVariations[sceneProperties.lang][9])&&(clearInterval(timerUpadate),(0,$hfAuX.configureDataAndUpload)(document.getElementById("name"),document.getElementById("age"),"gender","prog-exp",document.getElementById("subBtn"),sceneProperties.timer,"../",`Nível 1/Fase ${sceneProperties.phase+1}`,document.getElementById("second-user")),logModal.show())}));let normalSpeedBtn=document.getElementById("normalSpeed"),fastSpeedBtn=document.getElementById("fastSpeed");normalSpeedBtn.addEventListener("click",(function(){this.disabled=!0,fastSpeedBtn.disabled=!1,sceneProperties.mult=1})),fastSpeedBtn.addEventListener("click",(function(){this.disabled=!0,normalSpeedBtn.disabled=!1,sceneProperties.mult=6})),(0,$7FzN9.resizeCanvasToDisplaySize)(renderer,camera),phaseGeneration[sceneProperties.phase](),animate()})),parcelRequire.register("cCC00",(function(e,t){$parcel$export(e.exports,"default",(()=>i));const a=[["Código inválido:","linha:"],["Invalid code:","line:"]];let r=window.location.href.includes("english")?1:0;const o=[{filter:new RegExp("^andarFrente(\\s+)?\\((\\s+)?(0|[1-9][0-9]*)(\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^andarTras(\\s+)?\\((\\s+)?(0|[1-9][0-9]*)(\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^girarEsquerda(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^girarDireita(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^darMeiaVolta(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^coletarCristal(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"normal"}];function i(e){let t="const delay = (milisecs) => {return new Promise((resolve) => setTimeout(resolve,milisecs));}\nasync function runCode(){\n";const i=e.split("\n");let s=!0;for(let e=0;e<i.length;e++){let c,p=!1;if(""!=i[e].trim()){for(let t=0;t<o.length;t++)if(p=o[t].filter.test(i[e].trim()),p){c=o[t].type;break}if(!p){l=i[e],n=e+1,document.getElementById("consoleArea").innerText+=`${a[r][0]} ${l} ${a[r][1]} ${n}\n`,s=!1;break}if("sequential"===c){let a=`editor.focus();\n                    editor.dispatch({selection:{anchor:editor.state.doc.line(${e+1}).from}});\n`;a+="await "+i[e].trim()+"\n",t+=a}else{let a=`editor.focus();\n                    editor.dispatch({selection:{anchor:editor.state.doc.line(${e+1}).from}});\n                    await delay(250);\n`;a+=i[e].trim()+"\n",t+=a}}}var l,n;return s?(t+="}\nrunCode()",t):null}})),parcelRequire.register("jGR73",(function(e,t){e.exports=new URL("../"+parcelRequire("dRo73").resolve("4beZm"),import.meta.url).toString()}));var $ace897f25b087cfd$exports={};parcelRequire("dRo73").register(JSON.parse('{"4bX1V":"index.664535a4.js","4beZm":"stone_wallLvl1.1bfa8bf5.jpg","gyvkO":"index.97f2df01.js"}')),parcelRequire("2RQXo");