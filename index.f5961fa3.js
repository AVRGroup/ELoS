var imgarr=[' <img src="https://avrgroup.github.io/vrtools/img/flags/br-icon.png" width="20" height="20" style="vertical-align:middle;margin-bottom:3px">',' <img src="https://avrgroup.github.io/vrtools/img/flags/us-icon.png" width="20" height="20" style="vertical-align:middle;margin-bottom:3px">'];const currentURL=window.location.href,urlObj=new URL(currentURL),repoName=urlObj.pathname.split("/")[1];console.log(repoName);var x,i,j,l,ll,selElmnt,a,b,c,hrefs=[`/${repoName}/`,`/${repoName}/english`];for(l=(x=document.getElementsByClassName("custom-select")).length,i=0;i<l;i++){for(ll=(selElmnt=x[i].getElementsByTagName("select")[0]).length,(a=document.createElement("DIV")).setAttribute("class","select-selected"),a.innerHTML=selElmnt.options[selElmnt.selectedIndex].innerHTML+imgarr[selElmnt.selectedIndex],x[i].appendChild(a),(b=document.createElement("DIV")).setAttribute("class","select-items select-hide"),j=0;j<ll;j++){(c=document.createElement("DIV")).innerHTML=selElmnt.options[j].innerHTML+imgarr[j];let e=j;c.addEventListener("click",(function(t){var l,s,i,n,a,r,c;for(r=(n=this.parentNode.parentNode.getElementsByTagName("select")[0]).length,a=this.parentNode.previousSibling,s=0;s<r;s++)if(n.options[s].innerHTML+imgarr[s]==this.innerHTML){for(n.selectedIndex=s,a.innerHTML=this.innerHTML,c=(l=this.parentNode.getElementsByClassName("same-as-selected")).length,i=0;i<c;i++)l[i].removeAttribute("class");this.setAttribute("class","same-as-selected");break}window.location.href=hrefs[e],a.click()})),b.appendChild(c)}x[i].appendChild(b),a.addEventListener("click",(function(e){e.stopPropagation(),closeAllSelect(this),this.nextSibling.classList.toggle("select-hide"),this.classList.toggle("select-arrow-active")}))}function closeAllSelect(e){var t,l,s,i,n,a=[];for(t=document.getElementsByClassName("select-items"),l=document.getElementsByClassName("select-selected"),i=t.length,n=l.length,s=0;s<n;s++)e==l[s]?a.push(s):l[s].classList.remove("select-arrow-active");for(s=0;s<i;s++)a.indexOf(s)&&t[s].classList.add("select-hide")}document.addEventListener("click",closeAllSelect);