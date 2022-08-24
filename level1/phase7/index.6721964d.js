function $parcel$export(e,r,t,o){Object.defineProperty(e,r,{get:t,set:o,enumerable:!0,configurable:!0})}var $parcel$global="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},$parcel$modules={},$parcel$inits={},parcelRequire=$parcel$global.parcelRequiredf3e;null==parcelRequire&&(parcelRequire=function(e){if(e in $parcel$modules)return $parcel$modules[e].exports;if(e in $parcel$inits){var r=$parcel$inits[e];delete $parcel$inits[e];var t={id:e,exports:{}};return $parcel$modules[e]=t,r.call(t.exports,t,t.exports),t.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o},parcelRequire.register=function(e,r){$parcel$inits[e]=r},$parcel$global.parcelRequiredf3e=parcelRequire),parcelRequire.register("dRo73",(function(e,r){var t,o;$parcel$export(e.exports,"register",(()=>t),(e=>t=e)),$parcel$export(e.exports,"resolve",(()=>o),(e=>o=e));var a={};t=function(e){for(var r=Object.keys(e),t=0;t<r.length;t++)a[r[t]]=e[r[t]]},o=function(e){var r=a[e];if(null==r)throw new Error("Could not resolve bundle with id "+e);return r}})),parcelRequire.register("hef7l",(function(module,exports){var $4xklQ=parcelRequire("4xklQ"),$6WmIx=parcelRequire("6WmIx"),$9CUYQ=parcelRequire("9CUYQ"),$apQQe=parcelRequire("apQQe"),$czjZ1=parcelRequire("czjZ1"),$iw8wP=parcelRequire("iw8wP");const scene=new $4xklQ.Scene,camera=new $4xklQ.PerspectiveCamera(45,2,1,1e3);camera.position.set(0,15,30);const renderer=new $4xklQ.WebGLRenderer({canvas:document.getElementById("sceneView")});window.addEventListener("resize",(function(){(0,$apQQe.resizeCanvasToDisplaySize)(renderer,camera)}),!1);const ambientLight=new $4xklQ.HemisphereLight("white","darkslategrey",.5),mainLight=new $4xklQ.DirectionalLight("white",.7);mainLight.position.set(2,1,1);const controls=new(0,$6WmIx.OrbitControls)(camera,renderer.domElement),gridMapHelper=new(0,$9CUYQ.GridMapHelper),plane=gridMapHelper.createGridPlane();var actorModelPath=new URL(parcelRequire("8jwWx")).toString();const actor=new $4xklQ.Object3D;(0,$apQQe.loadGLBFile)(actor,actorModelPath,"eve",2),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotateY((0,$apQQe.degreeToRadians)(90));const objective=new $4xklQ.Object3D;var crystalModelPath=new URL(parcelRequire("kgSYq")).toString(),crystalTexturePath=new URL(parcelRequire("d3NFX")).toString();(0,$apQQe.loadOBJFile)(objective,crystalModelPath,"crystal",crystalTexturePath,2),objective.rotateX((0,$apQQe.degreeToRadians)(-90)),objective.position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(0));const boxGeometry1=new $4xklQ.BoxGeometry(14,2,2),boxGeometry2=new $4xklQ.BoxGeometry(16,2,2),boxGeometry3=new $4xklQ.BoxGeometry(2,2,8),boxMaterial=new $4xklQ.MeshLambertMaterial({color:"rgb(0,255,0)"}),box1=new $4xklQ.Mesh(boxGeometry1,boxMaterial),box2=new $4xklQ.Mesh(boxGeometry2,boxMaterial),box3=new $4xklQ.Mesh(boxGeometry3,boxMaterial),box4=new $4xklQ.Mesh(boxGeometry1,boxMaterial);box1.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(4)),box2.position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5),1,gridMapHelper.getGlobalZPositionFromCoord(8)),box3.position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(1.5)),box4.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(6)),gridMapHelper.addObstacle(2,8,4,4),gridMapHelper.addObstacle(2,8,6,6),gridMapHelper.addObstacle(8,8,0,3),gridMapHelper.addObstacle(2,9,8,8);const trapGeometry=new $4xklQ.BoxGeometry(2,1,2),trapMaterial=new $4xklQ.MeshLambertMaterial({color:"rgb(255,0,0)"}),trap=new $4xklQ.Mesh(trapGeometry,trapMaterial);function animate(){requestAnimationFrame(animate),controls.update(),renderer.render(scene,camera)}async function andarFrente(e){await(0,$apQQe.translateActorFoward)(actor,e,gridMapHelper,$apQQe.sceneProperties)}async function andarTras(e){await(0,$apQQe.translateActorBackward)(actor,e,gridMapHelper,$apQQe.sceneProperties)}async function girarDireita(){await(0,$apQQe.rotateActorRight)(actor,$apQQe.sceneProperties)}async function girarEsquerda(){await(0,$apQQe.rotateActorLeft)(actor,$apQQe.sceneProperties)}function checkCollision(e,r){return gridMapHelper.getXCoordFromGlobalPosition(e.position.x)==gridMapHelper.getXCoordFromGlobalPosition(r.position.x)&&gridMapHelper.getZCoordFromGlobalPosition(e.position.z)==gridMapHelper.getZCoordFromGlobalPosition(r.position.z)}function colherCristal(){$apQQe.sceneProperties.cancelExecution||(checkCollision(actor,objective)?(objective.visible=!1,(0,$apQQe.printOnConsole)("Cristal colhido.")):(0,$apQQe.printOnConsole)("Robô não está sobre o cristal."))}function resetLevel(){actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.getObjectByName("eve").rotation.set(0,0,0),actor.rotation.set(0,(0,$apQQe.degreeToRadians)(90),0),objective.visible=!0}function winCondition(){return!(!checkCollision(actor,objective)||objective.visible)}trap.position.set(gridMapHelper.getGlobalXPositionFromCoord(8),.5,gridMapHelper.getGlobalZPositionFromCoord(5)),gridMapHelper.addTrap(8,5),scene.add(ambientLight),scene.add(mainLight),scene.add(plane),scene.add(objective),scene.add(actor),scene.add(box1),scene.add(box2),scene.add(box3),scene.add(box4),scene.add(trap);const execBtn=document.getElementById("execute");execBtn.addEventListener("click",(async function(){let codeParsed=(0,$iw8wP.parseCode)($czjZ1.editor.state.doc.toString());$apQQe.sceneProperties.cancelExecution=!1,null!=codeParsed&&(resetLevel(),document.getElementById("execute").disabled=!0,await eval(codeParsed),winCondition()?($czjZ1.readOnlyState.doc=$czjZ1.editor.state.doc,$czjZ1.editor.setState($czjZ1.readOnlyState),document.getElementById("winMessage").classList.remove("invisible"),document.getElementById("advanceBtn").classList.remove("invisible"),document.getElementById("reset").disabled=!0):document.getElementById("execute").disabled=!1)}));const resetBtn=document.getElementById("reset");resetBtn.addEventListener("click",(function(){$apQQe.sceneProperties.cancelExecution=!0,resetLevel()}));const clsConsoleBtn=document.getElementById("clsConsole");clsConsoleBtn.addEventListener("click",(function(){document.getElementById("console-printing").innerHTML=null})),(0,$apQQe.resizeCanvasToDisplaySize)(renderer,camera),animate()})),parcelRequire.register("iw8wP",(function(e,r){$parcel$export(e.exports,"parseCode",(()=>o));const t=[{filter:new RegExp("^andarFrente(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^andarTras(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^girarEsquerda(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^girarDireita(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^colherCristal(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"normal"}];function o(e){let r="async function runCode(){\n",o=e.split("\n"),a=!0;for(let e=0;e<o.length;e++){let l,s=!1;if(""!=o[e].trim()){for(let r=0;r<t.length;r++)if(s=t[r].filter.test(o[e].trim()),s){l=t[r].type;break}if(!s){i=o[e],n=e+1,document.getElementById("console-printing").innerHTML+=`Código Inválido:<br> ${i} linha: ${n}<br>`,a=!1;break}if("sequential"===l){r+="await "+o[e].trim()+"\n"}else{r+=o[e].trim()+"\n"}}}var i,n;return a?(r+="}\nrunCode()",r):null}})),parcelRequire.register("8jwWx",(function(e,r){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("6UgDP"),import.meta.url).toString()})),parcelRequire.register("kgSYq",(function(e,r){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("2fkcW"),import.meta.url).toString()})),parcelRequire.register("d3NFX",(function(e,r){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("6V1gc"),import.meta.url).toString()}));var $6f24b09aec2f3b58$exports={};parcelRequire("dRo73").register(JSON.parse('{"hhiPH":"index.6721964d.js","6UgDP":"eve.1d379c98.glb","2fkcW":"crystal.b012d479.obj","6V1gc":"crystal.0bf41d2e.jpg","bz2pt":"index.6ef8f5e9.js"}')),parcelRequire("hef7l");