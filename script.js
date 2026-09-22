const canvas=document.getElementById("firma");
const ctx=canvas.getContext("2d");
let dibujando=false;
ctx.lineWidth=2.2;ctx.lineCap="round";ctx.strokeStyle="#17324d";

function punto(e){
 const r=canvas.getBoundingClientRect();
 const p=e.touches?e.touches[0]:e;
 return {x:(p.clientX-r.left)*(canvas.width/r.width),y:(p.clientY-r.top)*(canvas.height/r.height)};
}
function iniciar(e){e.preventDefault();dibujando=true;const p=punto(e);ctx.beginPath();ctx.moveTo(p.x,p.y)}
function dibujar(e){if(!dibujando)return;e.preventDefault();const p=punto(e);ctx.lineTo(p.x,p.y);ctx.stroke()}
function terminar(){dibujando=false;ctx.closePath()}
canvas.addEventListener("mousedown",iniciar);canvas.addEventListener("mousemove",dibujar);
canvas.addEventListener("mouseup",terminar);canvas.addEventListener("mouseleave",terminar);
canvas.addEventListener("touchstart",iniciar,{passive:false});canvas.addEventListener("touchmove",dibujar,{passive:false});canvas.addEventListener("touchend",terminar);
document.getElementById("limpiarFirma").addEventListener("click",()=>ctx.clearRect(0,0,canvas.width,canvas.height));

document.getElementById("solicitudForm").addEventListener("submit",function(){
 document.getElementById("firmaDigital").value=canvas.toDataURL("image/png");
});
