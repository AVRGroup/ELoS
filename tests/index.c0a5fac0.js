var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},r=e.parcelRequiredf3e;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in i){var r=i[e];delete i[e];var t={id:e,exports:{}};return n[e]=t,r.call(t.exports,t,t.exports),t.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){i[e]=n},e.parcelRequiredf3e=r),r.register("hWrQ2",(function(e,n){var i,t,o,l;i=e.exports,t="parseCode",o=()=>g,Object.defineProperty(i,t,{get:o,set:l,enumerable:!0,configurable:!0});var s=r("apQQe");const a=[{filter:new RegExp("^andarFrente(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^andarTras(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^girarEsquerda(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^girarDireita(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^coletarCristal(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"normal"},{filter:new RegExp("^se(\\s+)?\\((\\s+)?.+\\)$"),type:"conditional"},{filter:new RegExp("^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?{$"),type:"conditional&&blockValidation"},{filter:new RegExp("^senao$"),type:"elseValidation"},{filter:new RegExp("^senao(\\s+)?{$"),type:"elseValidation&&blockValidation"},{filter:new RegExp("^}$"),type:"closeBlockValidation"},{filter:new RegExp("^{$"),type:"blockValidation"}],f=[new RegExp("true"),new RegExp("false")];function d(e){let n=e.trim(),i=e.substring(n.indexOf("(")+1,n.lastIndexOf(")"));for(let e=0;e<f.length;e++)if(f[e].test(i.trim()))return!0;return!1}function p(e,n){let i=!1,r=0;for(let t=n+1;t<e.length;t++)if(e[t].includes("}")){if(0==r){i=!0;break}r--}else{if(!e[t].includes("{"))continue;r++}return i}function u(e,n){let i=!1;for(let r=n-1;r>=0;r--)if(e[r].includes("{")){i=!0;break}return i}function c(e,n){let i=!1,r=new RegExp("^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?.+(\\s+)?$"),t=new RegExp("^se(\\s+)?\\((\\s+)?.+\\)$"),o=new RegExp("^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?{[^]*?}$"),l=new RegExp("^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?{$"),s=null;for(let i=n-1;i>=0;i--)if(t.test(e[i].trim())||l.test(e[i].trim())){s=i;break}if(null!=s){let t="";for(let i=s;i<n;i++)t+=`${e[i].trim()}`;return r.test(t.trim())||o.test(t.trim())?(i=!0,i):i}return i}function g(e,n=0){let i="async function runCode(){\n",r=e.split("\n"),t=!0,o=0;for(let e=0;e<r.length;e++){let l,f=!1;if(""!=r[e].trim()){for(let n=0;n<a.length;n++)if(f=a[n].filter.test(r[e].trim()),f){l=a[n].type;break}if(!f){(0,s.printErrorOnConsole)(r[e],e+1),t=!1;break}if("sequential"===l){i+=`await ${r[e].trim()}\n`,o++}else if("conditional&&blockValidation"===l){let n=!1;if(p(r,e)?d(r[e])?n=!0:(0,s.printErrorOnConsole)(`${r[e]} (Condição inválida)`,e+1):(0,s.printErrorOnConsole)(`${r[e]} (Bloco é aberto mas nunca é fechado)`,e+1),!n){t=!1;break}{let n=r[e].trim();i+=`if${n.substring(n.indexOf("("))}\n`,o++}}else if("conditional"===l){if(!d(r[e])){(0,s.printErrorOnConsole)(`${r[e]} (Condição inválida)`,e+1),t=!1;break}{let n=r[e].trim();i+=`if${n.substring(n.indexOf("("))}\n`,o++}}else if("elseValidation"===l){if(!c(r,e)){(0,s.printErrorOnConsole)(`${r[e]} (Condição inválida)`,e+1),t=!1;break}i+="else\n",o++}else if("elseValidation&&blockValidation"===l){let n=!1;if(p(r,e)?c(r,e)?n=!0:(0,s.printErrorOnConsole)(`${r[e]} (Condição inválida)`,e+1):(0,s.printErrorOnConsole)(`${r[e]} (Bloco é aberto mas nunca é fechado)`,e+1),!n){t=!1;break}i+="else{\n",o++}else if("blockValidation"===l){if(!p(r,e)){(0,s.printErrorOnConsole)(`${r[e]} (Bloco é aberto mas nunca é fechado)`,e+1),t=!1;break}i+=`${r[e].trim()}\n`,o++}else if("closeBlockValidation"===l){if(!u(r,e)){(0,s.printErrorOnConsole)(`${r[e]} (Bloco é fechado mas nunca é aberto)`,e+1),t=!1;break}i+=`${r[e].trim()}\n`,o++}else{i+=`${r[e].trim()}\n`,o++}if(n>0&&o>n){(0,s.printOnConsole)(`O código tem mais linhas do que o robô pode processar. Tente rescrever seu código em ${n} linhas ou menos.`),t=!1;break}}}return t?(i+="}\nrunCode()",i):null}}));