const e=document.getElementById("starter");e.addEventListener("click",(function o(){console.log("start"),document.body.style.backgroundColor=function(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}(),n||(n=setInterval(o,1e3),e.disabled=!0,t.disabled=!1)}));const t=document.getElementById("stopper");let n;t.addEventListener("click",(function(){console.log("stop"),clearInterval(n),n=null,e.disabled=!1,t.disabled=!0})),t.disabled=!0;
//# sourceMappingURL=01-color-switcher.8166cefb.js.map
