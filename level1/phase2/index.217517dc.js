function $parcel$export(e,t,r,a){Object.defineProperty(e,t,{get:r,set:a,enumerable:!0,configurable:!0})}var $parcel$global="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},$parcel$modules={},$parcel$inits={},parcelRequire=$parcel$global.parcelRequiredf3e;null==parcelRequire&&(parcelRequire=function(e){if(e in $parcel$modules)return $parcel$modules[e].exports;if(e in $parcel$inits){var t=$parcel$inits[e];delete $parcel$inits[e];var r={id:e,exports:{}};return $parcel$modules[e]=r,t.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a},parcelRequire.register=function(e,t){$parcel$inits[e]=t},$parcel$global.parcelRequiredf3e=parcelRequire),parcelRequire.register("dRo73",(function(e,t){var r,a;$parcel$export(e.exports,"register",(()=>r),(e=>r=e)),$parcel$export(e.exports,"resolve",(()=>a),(e=>a=e));var o={};r=function(e){for(var t=Object.keys(e),r=0;r<t.length;r++)o[t[r]]=e[t[r]]},a=function(e){var t=o[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),parcelRequire.register("9wySb",(function(module,exports){var $4xklQ=parcelRequire("4xklQ"),$6WmIx=parcelRequire("6WmIx"),$9CUYQ=parcelRequire("9CUYQ"),$apQQe=parcelRequire("apQQe"),$czjZ1=parcelRequire("czjZ1"),$iw8wP=parcelRequire("iw8wP");const scene=new $4xklQ.Scene,camera=new $4xklQ.PerspectiveCamera(45,2,1,1e3);camera.position.set(0,15,30);const renderer=new $4xklQ.WebGLRenderer({canvas:document.getElementById("sceneView")});window.addEventListener("resize",(function(){(0,$apQQe.resizeCanvasToDisplaySize)(renderer,camera)}),!1);const ambientLight=new $4xklQ.HemisphereLight("white","darkslategrey",.5),mainLight=new $4xklQ.DirectionalLight("white",.7);mainLight.position.set(2,1,1);const controls=new(0,$6WmIx.OrbitControls)(camera,renderer.domElement),gridMapHelper=new(0,$9CUYQ.GridMapHelper),plane=gridMapHelper.createGridPlane();var actorModelPath=new URL(parcelRequire("8jwWx")).toString();const actor=new $4xklQ.Object3D;(0,$apQQe.loadGLBFile)(actor,actorModelPath,"eve",2),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.rotateY((0,$apQQe.degreeToRadians)(90)),console.log(actor.rotation);const objective=new $4xklQ.Object3D;var crystalModelPath=new URL(parcelRequire("kgSYq")).toString(),crystalTexturePath=new URL(parcelRequire("d3NFX")).toString();function animate(){requestAnimationFrame(animate),controls.update(),renderer.render(scene,camera);let e=(0,$apQQe.getTotalTime)($apQQe.sceneProperties.phaseTimer.getElapsedTime());(0,$apQQe.displayTime)(e)}async function andarFrente(e){await(0,$apQQe.translateActorFoward)(actor,e,gridMapHelper,$apQQe.sceneProperties)}async function andarTras(e){await(0,$apQQe.translateActorBackward)(actor,e,gridMapHelper,$apQQe.sceneProperties)}async function girarDireita(){await(0,$apQQe.rotateActorRight)(actor,$apQQe.sceneProperties)}async function girarEsquerda(){await(0,$apQQe.rotateActorLeft)(actor,$apQQe.sceneProperties)}function checkCollision(e,t){return gridMapHelper.getXCoordFromGlobalPosition(e.position.x)==gridMapHelper.getXCoordFromGlobalPosition(t.position.x)&&gridMapHelper.getZCoordFromGlobalPosition(e.position.z)==gridMapHelper.getZCoordFromGlobalPosition(t.position.z)}function coletarCristal(){$apQQe.sceneProperties.cancelExecution||(checkCollision(actor,objective)?(objective.visible=!1,(0,$apQQe.printOnConsole)("Cristal coletado com sucesso.")):(0,$apQQe.printOnConsole)("Robô não está sobre o cristal."))}function resetLevel(){actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(5)),actor.getObjectByName("eve").rotation.set(0,0,0),actor.rotation.set(0,(0,$apQQe.degreeToRadians)(90),0),objective.visible=!0}function winCondition(){return!(!checkCollision(actor,objective)||objective.visible)}(0,$apQQe.loadOBJFile)(objective,crystalModelPath,"crystal",crystalTexturePath,2),objective.rotateX((0,$apQQe.degreeToRadians)(-90)),objective.position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0,gridMapHelper.getGlobalZPositionFromCoord(2)),scene.add(ambientLight),scene.add(mainLight),scene.add(plane),scene.add(objective),scene.add(actor);const execBtn=document.getElementById("execute");execBtn.addEventListener("click",(async function(){let codeParsed=(0,$iw8wP.parseCode)($czjZ1.editor.state.doc.toString());$apQQe.sceneProperties.cancelExecution=!1,null!=codeParsed&&(resetLevel(),document.getElementById("execute").disabled=!0,await eval(codeParsed),winCondition()?($czjZ1.readOnlyState.doc=$czjZ1.editor.state.doc,$czjZ1.editor.setState($czjZ1.readOnlyState),document.getElementById("winMessage").classList.remove("invisible"),document.getElementById("advanceBtn").classList.remove("invisible"),document.getElementById("reset").disabled=!0,$apQQe.sceneProperties.phaseTimer.stop()):document.getElementById("execute").disabled=!1)}));const resetBtn=document.getElementById("reset");resetBtn.addEventListener("click",(function(){$apQQe.sceneProperties.cancelExecution=!0,resetLevel()}));const clsConsoleBtn=document.getElementById("clsConsole");clsConsoleBtn.addEventListener("click",(function(){document.getElementById("console-printing").innerHTML=null}));const advanceBtn=document.getElementById("advanceBtn");advanceBtn.addEventListener("click",(function(e){e.preventDefault(),(0,$apQQe.setTimeForNextPhase)("./level1/phase3/",(0,$apQQe.getTotalTime)($apQQe.sceneProperties.phaseTimer.getElapsedTime())),window.location.href=advanceBtn.href})),(0,$apQQe.checkPhaseContinuity)("./level1/phase2/"),(0,$apQQe.resizeCanvasToDisplaySize)(renderer,camera),$apQQe.sceneProperties.phaseTimer.start(),animate()})),parcelRequire.register("iw8wP",(function(e,t){$parcel$export(e.exports,"parseCode",(()=>a));const r=[{filter:new RegExp("^andarFrente(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^andarTras(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^girarEsquerda(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^girarDireita(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^coletarCristal(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"normal"}];function a(e){let t="async function runCode(){\n",a=e.split("\n"),o=!0;for(let e=0;e<a.length;e++){let l,c=!1;if(""!=a[e].trim()){for(let t=0;t<r.length;t++)if(c=r[t].filter.test(a[e].trim()),c){l=r[t].type;break}if(!c){i=a[e],n=e+1,document.getElementById("console-printing").innerHTML+=`Código Inválido:<br> ${i} linha: ${n}<br>`,o=!1;break}if("sequential"===l){t+="await "+a[e].trim()+"\n"}else{t+=a[e].trim()+"\n"}}}var i,n;return o?(t+="}\nrunCode()",t):null}})),parcelRequire.register("8jwWx",(function(e,t){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("6UgDP"),import.meta.url).toString()})),parcelRequire.register("kgSYq",(function(e,t){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("2fkcW"),import.meta.url).toString()})),parcelRequire.register("d3NFX",(function(e,t){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("6V1gc"),import.meta.url).toString()}));var $e3b96c12acc2e3ee$exports={};parcelRequire("dRo73").register(JSON.parse('{"ksMh9":"index.217517dc.js","6UgDP":"eve.1d379c98.glb","2fkcW":"crystal.b012d479.obj","6V1gc":"crystal.0bf41d2e.jpg","bz2pt":"index.cb524ad5.js"}')),parcelRequire("9wySb");