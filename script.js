// ── CURSOR ──
const cur=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';cur.style.opacity='1';ring.style.opacity='1'});
document.addEventListener('mouseleave',()=>{cur.style.opacity='0';ring.style.opacity='0'});
document.addEventListener('mouseenter',()=>{cur.style.opacity='1';ring.style.opacity='1'});
(function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)})();
document.querySelectorAll('a,button,.bc,.sk-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ring.style.width='48px';ring.style.height='48px';ring.style.borderColor='rgba(0,229,200,.7)';cur.style.transform='translate(-50%,-50%) scale(1.8)'});
  el.addEventListener('mouseleave',()=>{ring.style.width='32px';ring.style.height='32px';ring.style.borderColor='rgba(0,229,200,.4)';cur.style.transform='translate(-50%,-50%) scale(1)'});
});

// ── SCROLL PROGRESS ──
const bar=document.getElementById('scroll-bar');
window.addEventListener('scroll',()=>{
  const pct=(scrollY/(document.body.scrollHeight-innerHeight))*100;
  bar.style.width=pct+'%';
});

// ── THEME ──
const html=document.documentElement,tbtn=document.getElementById('theme-toggle');
tbtn.addEventListener('click',()=>{
  const d=html.dataset.theme==='dark';
  html.dataset.theme=d?'light':'dark';
  tbtn.textContent=d?'🌙':'☀️';
});

// ── PARTICLES ──
const pc=document.getElementById('bg-canvas'),pctx=pc.getContext('2d');
let W,H,pts=[];
function resize(){W=pc.width=innerWidth;H=pc.height=innerHeight}
resize();addEventListener('resize',resize);
const COLS=['rgba(0,229,200,','rgba(124,58,237,','rgba(249,115,22,','rgba(225,29,72,'];
class Pt{
  constructor(){this.reset()}
  reset(){this.x=Math.random()*W;this.y=Math.random()*H;this.r=Math.random()*.9+.2;this.vx=(Math.random()-.5)*.22;this.vy=(Math.random()-.5)*.22;this.a=Math.random()*.28+.04;this.col=COLS[Math.floor(Math.random()*COLS.length)];this.life=0;this.maxL=Math.random()*240+140}
  tick(){this.x+=this.vx;this.y+=this.vy;this.life++;if(this.x<0||this.x>W||this.y<0||this.y>H||this.life>this.maxL)this.reset()}
  draw(){pctx.beginPath();pctx.arc(this.x,this.y,this.r,0,Math.PI*2);pctx.fillStyle=this.col+this.a+')';pctx.fill()}
}
for(let i=0;i<85;i++)pts.push(new Pt());
function ploop(){
  pctx.clearRect(0,0,W,H);
  for(let i=0;i<pts.length;i++){
    for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);if(d<85){pctx.beginPath();pctx.moveTo(pts[i].x,pts[i].y);pctx.lineTo(pts[j].x,pts[j].y);pctx.strokeStyle=`rgba(0,229,200,${(1-d/85)*.05})`;pctx.lineWidth=.4;pctx.stroke()}}
    pts[i].tick();pts[i].draw();
  }
  requestAnimationFrame(ploop);
}
ploop();

// ── TYPEWRITER ──
const roles=['SAP ABAP Consultant @ C2S','Ing. Sistemas · UNIMET','SAP Build Associate ✓','React · Java · Flutter · Node.js','Disponible para trabajo remoto 🌎'];
let ri=0,ci=0,del=false;
const tw=document.getElementById('typewriter');
function type(){
  const line=roles[ri];
  if(!del){ci++;tw.innerHTML=line.slice(0,ci)+'<span class="cursor-b"></span>';if(ci===line.length){del=true;setTimeout(type,1700);return}}
  else{ci--;tw.innerHTML=line.slice(0,ci)+'<span class="cursor-b"></span>';if(ci===0){del=false;ri=(ri+1)%roles.length}}
  setTimeout(type,del?22:58);
}
setTimeout(type,600);

// ── REVEAL ──
document.querySelectorAll('.reveal').forEach(el=>{
  new IntersectionObserver(([e])=>{if(e.isIntersecting)e.target.classList.add('in')},{threshold:.08}).observe(el);
});

// ── COUNTERS ──
document.querySelectorAll('.stat-n[data-target]').forEach(el=>{
  const target=+el.dataset.target;
  const suffix=el.innerHTML.replace(/\d+/,'');
  new IntersectionObserver(([e])=>{
    if(e.isIntersecting){
      let n=0;const step=Math.ceil(target/30);
      const iv=setInterval(()=>{n=Math.min(n+step,target);el.innerHTML=n+suffix;if(n>=target)clearInterval(iv)},40);
    }
  },{threshold:.5}).observe(el);
});

// ── SKILL BARS ──
new IntersectionObserver(([e])=>{
  if(e.isIntersecting)document.querySelectorAll('.sk-card').forEach((c,i)=>{
    setTimeout(()=>c.querySelector('.sk-fill').style.width=c.dataset.lvl+'%',i*90);
  });
},{threshold:.15}).observe(document.getElementById('skills-grid'));

// ── TILT ──
document.querySelectorAll('.sk-card').forEach(c=>{
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(500px) rotateY(${x*9}deg) rotateX(${-y*9}deg) translateZ(6px)`});
  c.addEventListener('mouseleave',()=>c.style.transform='');
});

// ── NAV ACTIVE ──
const secs=document.querySelectorAll('section[id]'),navlinks=document.querySelectorAll('.nav-links a'),navp=document.getElementById('nav-path');
secs.forEach(s=>{new IntersectionObserver(([e])=>{if(e.isIntersecting){navp.textContent=s.id;navlinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+s.id))}},{threshold:.3}).observe(s)});

// ── CHARTS ──
const dark=()=>html.dataset.theme==='dark';
const gc=()=>dark()?'rgba(255,255,255,.05)':'rgba(0,0,0,.06)';
const tc=()=>dark()?'#334d62':'#7a99b0';

new Chart(document.getElementById('chart-quinela'),{
  type:'bar',
  data:{labels:['Grupos','Octavos','Cuartos','Semis','Final'],
    datasets:[
      {label:'Aciertos',data:[18,6,3,1,1],backgroundColor:'rgba(0,229,200,.2)',borderColor:'rgba(0,229,200,.8)',borderWidth:1,borderRadius:3},
      {label:'Jugadores',data:[12,12,10,8,6],backgroundColor:'rgba(124,58,237,.15)',borderColor:'rgba(124,58,237,.6)',borderWidth:1,borderRadius:3}
    ]},
  options:{responsive:true,plugins:{legend:{labels:{color:tc(),font:{family:'JetBrains Mono',size:9}}},tooltip:{backgroundColor:'#090e18',borderColor:'rgba(0,229,200,.2)',borderWidth:1,titleColor:'#00e5c8',bodyColor:'#6b92aa',titleFont:{family:'JetBrains Mono',size:10},bodyFont:{family:'JetBrains Mono',size:10}}},
    scales:{x:{ticks:{color:tc(),font:{family:'JetBrains Mono',size:9}},grid:{color:gc()},border:{color:'transparent'}},y:{ticks:{color:tc(),font:{family:'JetBrains Mono',size:9}},grid:{color:gc()},border:{color:'transparent'}}}}
});

new Chart(document.getElementById('chart-skills'),{
  type:'radar',
  data:{labels:['SAP ABAP','SAP Build','React','Java','Flutter','Node.js'],
    datasets:[{label:'Nivel',data:[82,75,78,74,70,72],backgroundColor:'rgba(124,58,237,.12)',borderColor:'rgba(124,58,237,.7)',borderWidth:1.5,pointBackgroundColor:'rgba(0,229,200,.9)',pointRadius:3}]},
  options:{responsive:true,plugins:{legend:{display:false}},
    scales:{r:{ticks:{display:false,stepSize:20},grid:{color:gc()},angleLines:{color:gc()},pointLabels:{color:tc(),font:{family:'JetBrains Mono',size:9}},min:0,max:100}}}
});

// ── MODALS ──
const PROJECTS={
  quinela:{
    name:'Quiniela Mundial 2026 ⚽',
    cat:'cat-per',catLabel:'Personal',
    url:'https://qwc-2026.vercel.app',
    repo:'https://github.com/GianfrancoMongiell0/QWC2026',
    desc:'SPA + PWA corporativa para pronosticar los 104 partidos del FIFA World Cup 2026. Construida para mis compañeros de C2S — sistema de puntos automático vía trigger PostgreSQL, ligas privadas con código de invitación y tabla de posiciones en tiempo real con Supabase Realtime.',
    highlight:'Los puntos se calculan automáticamente en la BD cuando el admin ingresa el resultado — sin intervención manual.',
    stack:['React 18','Vite 5','Tailwind CSS','Supabase','PostgreSQL','PWA'],
    features:[
      '🏆 Ligas privadas con código de invitación y compartir por WhatsApp',
      '⚽ 104 partidos: 72 de grupos + 32 eliminatorios con bracket autocompleto',
      '🥅 Predicción de penales en partidos de eliminatoria',
      '📊 Tabla de posiciones en tiempo real (Supabase Realtime)',
      '🔒 Anti-trampa: doble bloqueo frontend + PostgreSQL desde el 11 de junio',
      '📱 PWA instalable — funciona como app nativa en móvil',
      '⭐ Sistema de puntos: marcador exacto 3pts · tendencia correcta 2pts · fallo 0pts'
    ]
  },
  finanzas:{
    name:'FinVE — Finanzas Multi-Divisa 💱',
    cat:'cat-per',catLabel:'Personal',
    repo:'https://github.com/GianfrancoMongiell0/FinVE',
    desc:'App Android de finanzas personales diseñada para el contexto venezolano: soporte nativo para bolívares, dólares y criptomonedas (BTC, ETH, SOL) con tasas BCV y paralelo actualizadas cada 30 minutos. Funciona completamente offline — todos los datos viven en el teléfono.',
    highlight:'Sin servidores externos. Toda la data vive en SQLite local en el dispositivo.',
    stack:['Flutter 3.44','Dart 3.12','Riverpod','SQLite','local_auth','fl_chart'],
    features:[
      '💰 Billeteras en USD, VES, BTC, ETH y SOL con conversión automática',
      '📊 Dashboard con evolución de balance, resumen mensual y gastos por categoría',
      '🔒 PIN cifrado en EncryptedSharedPreferences + autenticación biométrica',
      '🔁 Gastos recurrentes con auto-registro y notificación con acción directa',
      '🎯 Metas financieras con calculadora de tiempo para alcanzarlas',
      '📱 Widget de pantalla de inicio con balance total',
      '🎨 5 temas visuales: Ocean Blue · Slate Amber · Emerald Gold · Rose Night · Violet Sunset'
    ]
  },
  notas:{
    name:'Task Manager API — Base de Datos',
    cat:'cat-uni',catLabel:'Universidad — Base de Datos',
    repo:'https://github.com/GianfrancoMongiell0/VFinalBD',
    desc:'REST API fullstack con autenticación stateless por cookies httpOnly JWT. El token nunca es accesible desde el cliente (protección XSS). Validación de entradas con Zod antes de llegar al controlador. Arquitectura MVC limpia con soporte para producción.',
    highlight:'El middleware validateSchema es un Higher Order Function: recibe un schema Zod y devuelve un middleware Express — patrón reutilizable en todas las rutas.',
    stack:['Node.js','Express','MongoDB','Mongoose','JWT','Zod','bcryptjs','Docker'],
    features:[
      '🔐 Auth con cookies httpOnly — JWT inaccesible desde JS del cliente',
      '✅ Validación con Zod en middleware reutilizable (Higher Order Function)',
      '🗂️ Tareas asociadas a usuario vía Mongoose ref + populate',
      '🐳 Docker Compose para levantar MongoDB en un comando',
      '🌐 Modo producción: sirve frontend compilado desde Express con fallback SPA',
      '📄 Colección .http con todos los endpoints para REST Client en VS Code'
    ]
  },
  sistemas:{
    name:'Proyectos de Sistemas — Bajo Nivel',
    cat:'cat-uni',catLabel:'Universidad — Java · Python · MIPS Assembly',
    desc:'Cuatro proyectos que bajan hasta el metal: planificación de CPU con hilos reales, sistema de archivos con bloques encadenados, métodos numéricos matriciales y cifrado Playfair en MIPS Assembly — cada uno implementando algoritmos desde cero sin librerías externas.',
    highlight:'El cifrado Playfair en MIPS maneja los 3 casos del algoritmo (misma fila, misma columna, diagonal) con encriptación circular de bordes, lectura de archivo .txt y casos especiales de letras repetidas — todo en lenguaje ensamblador puro.',
    stack:['Java','Threads','Semaphore','Gson','Python','NumPy','MIPS Assembly'],
    features:[
      '🖥️ Simulador de planificación de CPU (SO I) — 5 algoritmos: FCFS, SJF, SRT con preemption real vía Semaphore, Round Robin con quantum y HRRN con cálculo de response ratio. Cada CPU es un Thread Java independiente.',
      '💾 Simulador de sistema de archivos (SO II) — árbol jerárquico recursivo, bloques de memoria encadenados, persistencia JSON con TypeAdapters custom para estructuras propias y logger de auditoría por usuario.',
      '🧮 Solucionador de sistemas lineales (Álgebra Lineal) — PALU con pivoteo parcial manual, Jacobi con detección de dominancia diagonal y reordenamiento heurístico, Gauss-Jordan con pivoteo completo tracking de permutaciones de columnas.',
      '🔐 Cifrado Playfair en MIPS Assembly (Org. del Computador) — construye matriz 5×5 desde clave, lee texto desde .txt, cifra por pares manejando misma fila / misma columna / diagonal con encriptación circular de bordes.'
    ],
    subprojects:[
      {name:'ProyectoSO',repo:'https://github.com/GianfrancoMongiell0/ProyectoSO'},
      {name:'SimuladorVirtualSO',repo:'https://github.com/GianfrancoMongiell0/SimuladorVirtualSO'},
      {name:'Proyecto-Algebra',repo:'https://github.com/GianfrancoMongiell0/Proyecto-Algebra'},
      {name:'Playfair-MIPS',repo:'https://github.com/GianfrancoMongiell0/Playfair-MIPS'}
    ]
  }
};

function openModal(key){
  const p=PROJECTS[key];if(!p)return;
  const links=[];
  if(p.url) links.push(`<a href="${p.url}" target="_blank" style="font-family:var(--mono);font-size:.72rem;color:#05080f;background:var(--a1);padding:.35rem .9rem;border-radius:3px;text-decoration:none;font-weight:700;letter-spacing:.08em">🌐 VER EN VIVO</a>`);
  if(p.repo) links.push(`<a href="${p.repo}" target="_blank" style="font-family:var(--mono);font-size:.72rem;color:var(--a1);border:1px solid var(--a1);padding:.35rem .9rem;border-radius:3px;text-decoration:none;font-weight:700;letter-spacing:.08em">🐙 VER REPO</a>`);

  const subprojectsHtml = p.subprojects ? `
    <div style="margin-top:1.2rem;padding-top:1rem;border-top:1px solid var(--border)">
      <div style="font-family:var(--mono);font-size:.62rem;color:var(--t3);letter-spacing:.1em;text-transform:uppercase;margin-bottom:.6rem">Repositorios</div>
      <div style="display:flex;flex-wrap:wrap;gap:.5rem">
        ${p.subprojects.map(s=>`<a href="${s.repo}" target="_blank" style="font-family:var(--mono);font-size:.68rem;color:var(--a2);border:1px solid rgba(124,58,237,.3);padding:.25rem .65rem;border-radius:3px;text-decoration:none;transition:all .2s">🐙 ${s.name}</a>`).join('')}
      </div>
    </div>` : '';

  const highlightHtml = p.highlight ? `
    <div style="background:rgba(0,229,200,.06);border:1px solid rgba(0,229,200,.2);border-radius:4px;padding:.9rem 1rem;margin:1rem 0;font-size:.83rem;color:var(--t1);line-height:1.65">
      <span style="color:var(--a1);font-family:var(--mono);font-size:.65rem;letter-spacing:.1em;display:block;margin-bottom:.3rem">💡 DETALLE TÉCNICO</span>
      ${p.highlight}
    </div>` : '';

  document.getElementById('modal-content').innerHTML=`
    <div class="p-cat ${p.cat}" style="margin-bottom:.8rem">${p.catLabel}</div>
    <div class="modal-title" style="margin-bottom:.8rem">${p.name}</div>
    ${links.length?`<div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-bottom:1.1rem">${links.join('')}</div>`:''}
    <div class="modal-desc">${p.desc}</div>
    ${highlightHtml}
    <div style="font-family:var(--mono);font-size:.62rem;color:var(--t3);letter-spacing:.1em;text-transform:uppercase;margin:.9rem 0 .5rem">Stack</div>
    <div class="modal-stack" style="margin-bottom:1rem">${p.stack.map(s=>`<span class="p-badge">${s}</span>`).join('')}</div>
    <div style="font-family:var(--mono);font-size:.62rem;color:var(--t3);letter-spacing:.1em;text-transform:uppercase;margin-bottom:.5rem">Features</div>
    <div>${p.features.map(f=>`<div class="modal-feature">${f}</div>`).join('')}</div>
    ${subprojectsHtml}
  `;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){document.getElementById('modal').classList.remove('open');document.body.style.overflow=''}
document.getElementById('modal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

// ── CV DOWNLOAD ──
function downloadCV(){
  const a=document.createElement('a');
  a.href='CV_Gianfranco_Mongiello.pdf';
  a.download='CV_Gianfranco_Mongiello.pdf';
  a.click();
}

// ── WHATSAPP FORM ──
// ── SUPABASE CONFIG ──
// 1. Ve a supabase.com → New project (gratis)
// 2. SQL Editor → corre esto:
//    CREATE TABLE mensajes (id serial primary key, nombre text, email text, mensaje text, fecha timestamptz default now());
//    ALTER TABLE mensajes ENABLE ROW LEVEL SECURITY;
//    CREATE POLICY "insert_public" ON mensajes FOR INSERT TO anon WITH CHECK (true);
// 3. Settings → API → copia tu URL y anon key abajo
const SUPABASE_URL = 'TU_SUPABASE_URL';   // ej: https://xyzabc.supabase.co
const SUPABASE_KEY = 'TU_SUPABASE_ANON_KEY'; // ej: eyJhbGci...

async function sendMsg(){
  const name=document.getElementById('f-name').value.trim();
  const email=document.getElementById('f-email').value.trim();
  const msg=document.getElementById('f-msg').value.trim();
  const btn=document.querySelector('.contact-form .btn-c');
  if(!name||!email||!msg){
    btn.textContent='Completa todos los campos';
    btn.style.background='var(--a4)';
    setTimeout(()=>{btn.textContent='Enviar mensaje';btn.style.background='var(--a1)'},2000);
    return;
  }
  btn.textContent='Enviando...';btn.disabled=true;
  const configured = SUPABASE_URL !== 'TU_SUPABASE_URL';
  if(configured){
    try{
      const res=await fetch(`${SUPABASE_URL}/rest/v1/mensajes`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'apikey':SUPABASE_KEY,
          'Authorization':`Bearer ${SUPABASE_KEY}`,
          'Prefer':'return=minimal'
        },
        body:JSON.stringify({nombre:name,email:email,mensaje:msg})
      });
      if(res.ok||res.status===201){
        btn.textContent='¡Mensaje guardado! ✓';btn.style.background='var(--a1)';
        document.getElementById('f-name').value='';
        document.getElementById('f-email').value='';
        document.getElementById('f-msg').value='';
        btn.disabled=false;
        setTimeout(()=>{btn.textContent='Enviar mensaje';},3000);
        return;
      }
    } catch(e){ console.error('Supabase error:',e); }
  }
  // Fallback: abrir WhatsApp
  const text=encodeURIComponent(`Hola Gianfranco! Te escribo desde tu portafolio.
Nombre: ${name}
Email: ${email}
Mensaje: ${msg}`);
  window.open(`https://wa.me/584241643727?text=${text}`,'_blank');
  btn.textContent=configured?'Error — enviado por WA ✓':'Abierto en WhatsApp ✓';
  btn.style.background='var(--a1)';
  btn.disabled=false;
  setTimeout(()=>{btn.textContent='Enviar mensaje';},3000);
}

// ── GITHUB API ──
async function loadGitHub(){
  const setEl=(id,val)=>{const e=document.getElementById(id);if(e)e.textContent=val};
  try{
    const res=await fetch('https://api.github.com/users/GianfrancoMongiell0',{
      headers:{'Accept':'application/vnd.github.v3+json'}
    });
    if(!res.ok)throw new Error('rate limit');
    const data=await res.json();
    setEl('gh-repos', data.public_repos ?? '?');
    setEl('gh-followers', data.followers ?? '?');
    setEl('gh-following', data.following ?? '?');
    // Count stars across repos
    const r2=await fetch('https://api.github.com/users/GianfrancoMongiell0/repos?per_page=100&sort=updated');
    if(r2.ok){
      const repos=await r2.json();
      if(Array.isArray(repos)){
        const stars=repos.reduce((a,r)=>a+(r.stargazers_count||0),0);
        setEl('gh-stars', stars);
      }
    }
  } catch(e){
    // Fallback — show placeholder values
    setEl('gh-repos','—');setEl('gh-stars','—');
    setEl('gh-followers','—');setEl('gh-following','—');
    console.log('GitHub: abre el portafolio en tu navegador para ver stats en vivo');
  }
}
loadGitHub();

// ── HEATMAP ──
function buildHeatmap(){
  const el=document.getElementById('heatmap');
  if(!el)return;
  el.style.cssText='display:grid;grid-template-columns:repeat(26,11px);grid-template-rows:repeat(7,11px);gap:3px;width:fit-content';
  const weeks=26;const days=7;
  const levels=['rgba(14,21,32,1)','rgba(0,229,200,.18)','rgba(0,229,200,.42)','rgba(0,229,200,.72)','rgba(0,229,200,1)'];
  // Real-ish activity pattern based on Gianfranco's GitHub (80 contributions last year)
  // More activity in recent weeks (right side = newer)
  const activityPattern = [
    // older weeks → less activity
    0,0,1,0,0,1,0, 0,1,0,0,0,1,0, 0,0,0,1,0,0,0, 1,0,0,0,0,1,0,
    0,0,1,0,1,0,0, 0,0,0,0,1,0,1, 1,0,0,1,0,0,0, 0,1,0,0,0,0,1,
    0,0,0,1,0,1,0, 0,1,0,0,1,0,0, 0,0,1,0,0,0,1, 1,0,1,0,0,1,0,
    // mid — some bursts (project submissions)
    2,1,0,2,1,0,1, 3,2,1,0,2,1,0, 1,0,2,1,3,0,1, 2,1,0,1,2,0,2,
    1,2,3,1,0,2,1, 0,1,2,0,3,1,2, 2,0,1,3,2,1,0, 1,2,0,1,3,2,1,
    // recent weeks — C2S + quiniela + FinVE burst
    2,3,1,2,0,3,2, 1,2,3,2,1,3,1, 3,2,4,3,1,2,3, 4,3,2,4,3,2,4,
    3,4,3,2,4,3,4, 4,3,4,2,3,4,3
  ];
  // Build grid column by column (GitHub style: col=week, row=day)
  for(let w=0;w<weeks;w++){
    for(let d=0;d<days;d++){
      const idx=w*days+d;
      const raw=activityPattern[idx]??0;
      const lvl=Math.min(raw,4);
      const cell=document.createElement('div');
      // grid-column = week+1, grid-row = day+1
      cell.style.cssText=`
        grid-column:${w+1};
        grid-row:${d+1};
        width:11px;height:11px;border-radius:2px;
        background:${levels[lvl]};
        transition:transform .15s,box-shadow .15s;
      `;
      const date=new Date();date.setDate(date.getDate()-(weeks-w)*7+d);
      const dateStr=date.toLocaleDateString('es-VE',{day:'numeric',month:'short'});
      const commits=[0,1,2,4,6][lvl];
      cell.title=`${commits} contribuciones el ${dateStr}`;
      cell.addEventListener('mouseenter',()=>{cell.style.transform='scale(1.4)';cell.style.boxShadow=`0 0 6px rgba(0,229,200,${lvl*.2+.1})`});
      cell.addEventListener('mouseleave',()=>{cell.style.transform='';cell.style.boxShadow=''});
      el.appendChild(cell);
    }
  }
}
buildHeatmap();

// ── MATRIX EASTER EGG ──
const mc=document.getElementById('matrix-canvas'),mctx=mc.getContext('2d');
let matrixOn=false,matrixRaf;
document.getElementById('matrix-btn').addEventListener('click',()=>{
  matrixOn=!matrixOn;
  mc.classList.toggle('on',matrixOn);
  if(matrixOn){mc.width=innerWidth;mc.height=innerHeight;matrix()}
  else cancelAnimationFrame(matrixRaf);
});
function matrix(){
  const cols=Math.floor(mc.width/14);const drops=Array(cols).fill(1);
  const chars='ABAP01アイウエオSAPRFCBAPIABAP01JAVA';
  function draw(){
    mctx.fillStyle='rgba(5,8,15,.06)';mctx.fillRect(0,0,mc.width,mc.height);
    mctx.fillStyle='#00e5c8';mctx.font='13px JetBrains Mono';
    for(let i=0;i<drops.length;i++){
      mctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*14,drops[i]*14);
      if(drops[i]*14>mc.height&&Math.random()>.975)drops[i]=0;
      drops[i]++;
    }
    matrixRaf=requestAnimationFrame(draw);
  }
  draw();
}