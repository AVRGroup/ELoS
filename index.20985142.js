function openModal(e){const t=document.getElementById("myModal");document.getElementById("videoFrame").src=`https://www.youtube.com/embed/${e}`,t.style.display="block"}function closeModal(){const e=document.getElementById("myModal");document.getElementById("videoFrame").src="",e.style.display="none"}window.addEventListener("click",(function(e){const t=document.getElementById("myModal");e.target==t&&closeModal()}));