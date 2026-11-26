import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {initializeAuth,indexedDBLocalPersistence,browserLocalPersistence,browserPopupRedirectResolver,signInAnonymously,onAuthStateChanged,signOut,GoogleAuthProvider,signInWithPopup,signInWithRedirect,getRedirectResult,linkWithPopup,
  EmailAuthProvider,linkWithCredential,signInWithEmailAndPassword,createUserWithEmailAndPassword,signInWithCredential} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {getFirestore,doc,getDoc,setDoc,updateDoc,deleteDoc,addDoc,collection,onSnapshot,writeBatch} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyCadq9P5O2eLpYxpWaXYP3GXzUyqUpOs98",
  authDomain: "binebaaaaaa.firebaseapp.com",
  projectId: "binebaaaaaa",
  storageBucket: "binebaaaaaa.firebasestorage.app",
  messagingSenderId: "510064650496",
  appId: "1:510064650496:web:7ff1e5dcce6e14b1a2ebe5"
};

const SEED=[
 ['vin','22:00',"FK ME, I'M SINGLE",'','','Primești o brățară care arată că ești single, iar dacă îți place cineva, te uiți la brățara lui. Cea mai bună pentru combinat.','https://zilesinopti.ro/?p=916491'],
 ['vin','20:20','Diurnique at LOFT – Éclipse du Soleil','LOFT','44–77 lei','Prima ediție Diurnique de noapte, până la 04:04. La miezul nopții „se stinge soarele”. Dresscode: total black + un detaliu auriu sau aramă.','https://www.livetickets.ro/bilete/diurnique-eclipse-du-soleil'],
 ['vin','20:00','Interbelic: LOVE YOU BYE','Interbelic, Calea Victoriei 17','Intrare gratuită','Petrecerea de vineri de la Interbelic.','https://www.livetickets.ro/evenimente/petrecere'],
 ['vin','23:00','Old School vs New School – Fane La Platane & Carina','B52 The Club','','Hituri vechi și noi pe același ring de dans.',''],
 ['sam','Ziua','Bucharest Street Art Festival','Cartierul 23 August','','Festival în aer liber, sâmbătă și duminică.','https://b365.ro/bucuresti-de-weekend-west-side-christmas-market-bucharest-street-art-festival-targuri-de-craciun-filme-petreceri-tururi-ghidate-si-altele-au-loc-in-oras-intre-27-si-29-noiembrie-630052/'],
 ['sam','După-amiază','Vin fiert la Târgul de Crăciun','Piața Constituției','Intrare gratuită','Încălzire înainte de ieșit.',''],
 ['sam','22:00','Glow In The Dark by Erasmus Fiesta','Nook Club','0–430 lei','Petrecere Erasmus, multă lume internațională.','https://www.livetickets.ro/evenimente/petrecere'],
 ['sam','23:00','Latino Love Story – Erasmus Party','','','Latino cu studenți Erasmus.','https://www.livetickets.ro/evenimente/petrecere'],
 ['sam','23:00','Bairam ca-n anii 90 by Remi','B52 The Club','','Nostalgie și cântat cu toții.',''],
 ['sam','22:00','A.M.C × MC Phantom – Noisebreak','Quantic','','Drum & bass.','https://www.fest.ro/ro/bucuresti'],
 ['sam','22:00','PW: Detroit In Effect, Maria Antoaneta, Syntelman','Platforma Wolff','50 lei','Techno.','https://www.livetickets.ro/evenimente/petrecere'],
 ['sam','22:00','Iuly Neamțu','Princess Club','50–80 lei','Manele.','https://www.livetickets.ro/evenimente/petrecere'],
 ['sam','21:00','Interbelic – seară normală de sâmbătă','Interbelic, Calea Victoriei 17','','Deschis vineri și sâmbătă 21:00–05:00. N-am găsit un eveniment special, e seara obișnuită.','https://www.fest.ro/ro/bucuresti/locuri/bazine/bar/interbelic-cocktail-bar'],
 ['sam','Seara','La Grande Bellezza Disco Bar','La Grande Bellezza, Calea Victoriei','','Petreceri până târziu în fiecare weekend (deci și vineri). N-am găsit un eveniment special anunțat. Merită rezervare.','https://lagrandebellezza.love/'],
 ['dum','18:45','Zdob și Zdub – lansare de album','Berăria H','79–179 lei','Energie maximă. Faceți rezervare la masă.','https://www.livetickets.ro/evenimente/beraria-h-1'],
 ['dum','23:30','Diana Matei & Taraful Cleante','Berăria H','59–149 lei','Continuarea serii după Zdob.','https://www.livetickets.ro/evenimente/beraria-h-1'],
 ['dum','15:00','Brașov: petrecere Sântandrei pe Tâmpa','Restaurant Panoramic','','Varianta wow: plecăm duminică dimineață, dormim la Brașov, ne întoarcem luni după-amiază.','https://zilesinopti.ro/?p=915759','Brașov'],
 ['dum','21:00','Brașov: Distroteca × Anda Adam','Strada Republicii 62','60–80 lei','Seara la Brașov, dacă alegem varianta asta.','https://www.livetickets.ro/evenimente/petrecere','Brașov'],
 ['dum','20:00',"Interbelic: Andrei's B'day Bash",'Interbelic, Calea Victoriei 17','Intrare gratuită','Petrecere listată public duminică seara.','https://www.livetickets.ro/evenimente/petrecere'],
 ['lun','18:45','Andrei Bănuță – de Sf. Andrei','Berăria H','89–199 lei','Încălzire pentru seara mare, a doua zi e liber.','https://berariah.ro/ev/concert-andrei-banuta-sf-andrei-261130'],
 ['lun','23:30',"Ziua lui Tzancă Uraganu'",'Berăria H','89–129 lei','Petrecere dublă: Sf. Andrei + ziua lui Tzancă.','https://www.livetickets.ro/evenimente/beraria-h-1'],
 ['lun','20:00','Interbelic: SO BIZZARE | A Popcorn Revival','Interbelic, Calea Victoriei 17','Intrare gratuită','Seara de Sf. Andrei, a doua zi e liber.','https://www.livetickets.ro/evenimente/petrecere'],
 ['mar','11:00','Parada de 1 Decembrie','Arcul de Triumf','Gratuit','Day drinking la Ionut Vama',''],
 ['mar','După-amiază','Mâncare bună + Târgul de Crăciun','Piața Constituției','','Chill, acasă devreme pentru miercuri.','']];

const ADMIN_EMAIL='ardelean.alex2003@gmail.com';
const DOMAIN='la-fam.app';
const app=initializeApp(firebaseConfig),fs=getFirestore(app);
const auth=initializeAuth(app,{persistence:[indexedDBLocalPersistence,browserLocalPersistence],popupRedirectResolver:browserPopupRedirectResolver});
const gprov=new GoogleAuthProvider();gprov.setCustomParameters({prompt:'select_account'});
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DAYS=[
  {k:'vin',s:'Vin',d:'27',n:'Vineri, 27 nov',date:'2026-11-27'},
  {k:'sam',s:'Sâm',d:'28',n:'Sâmbătă, 28 nov',date:'2026-11-28'},
  {k:'dum',s:'Dum',d:'29',n:'Duminică, 29 nov',date:'2026-11-29'},
  {k:'lun',s:'Lun',d:'30',n:'Luni, 30 nov · Sf. Andrei',date:'2026-11-30'},
  {k:'mar',s:'Mar',d:'1',n:'Marți, 1 dec · chill',date:'2026-12-01'}];
const HEART='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3.1 4.5 6.7 4.5c2 0 3.5 1.1 4.3 2.5h2c.8-1.4 2.3-2.5 4.3-2.5 3.6 0 5.8 3.7 4.3 7.2C19.5 16.4 12 21 12 21z"/></svg>';
const ls={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};
let guest=false,joinGuest=false,uid=null,isAdmin=false,photoData=null,started=false,seeding=false,mode='login',editTarget=null,busyAuth=false;
const unsubs=[];
const S={profiles:{},acts:[],likes:[],going:[],comments:[]};
const openC=new Set(),busy=new Set();
const today=new Date().toISOString().slice(0,10);
let day=ls.get('wb-day')||(DAYS.find(d=>d.date===today)||DAYS[0]).k;

function show(id){for(const s of ['gate','join','onb','msg','app'])$('#'+s).classList.toggle('hide',s!==id)}
function msg(t,p){$('#msgT').textContent=t;$('#msgP').textContent=p||'';show('msg')}
function toast(t){const d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),2800)}
const prof=id=>S.profiles[id]||{name:'Cineva'};
function av(id){const p=prof(id);const n=esc(p.name||'?');
  return typeof p.photo==='string'&&p.photo.startsWith('data:image/')?`<img class="av" src="${esc(p.photo)}" alt="${n}" title="${n}">`:`<span class="av" title="${n}">${esc((p.name||'?').charAt(0).toUpperCase())}</span>`}
function fail(e){console.error(e);toast(e&&e.code==='permission-denied'?'Nu ai voie să faci asta.':'N-a mers, mai încearcă o dată.')}

/* ---------- theme ---------- */
const SUN='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></g></svg>';
const MOON='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg>';
function curTheme(){const t=document.documentElement.dataset.theme;if(t==='light'||t==='dark')return t;return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}
function paintTheme(){const d=curTheme()==='dark';$('#themeBtn').innerHTML=(d?SUN:MOON)+(d?'Luminos':'Întunecat')}
{const t=ls.get('wb-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}
paintTheme();
$('#themeBtn').addEventListener('click',()=>{const t=curTheme()==='dark'?'light':'dark';document.documentElement.dataset.theme=t;ls.set('wb-theme',t);paintTheme()});

/* ---------- accounts ---------- */
const cleanUser=u=>u.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9._-]/g,'');
async function pwHash(user,pw){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('la-fam:'+user+':'+pw));
  return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
const hasGoogle=u=>!!(u&&u.providerData.some(p=>p.providerId==='google.com'));
const userLabel=u=>{if(!u)return'';const g=u.providerData.find(p=>p.providerId==='google.com');const e=u.providerData.find(p=>p.providerId==='password');
  return [e?'Utilizator: '+e.email.split('@')[0]:'',g?'Google: '+g.email:''].filter(Boolean).join(' · ')}
const AUTH_ERR={'auth/invalid-credential':'Utilizator sau parolă greșită.','auth/wrong-password':'Utilizator sau parolă greșită.','auth/user-not-found':'Nu există contul ăsta. Fă unul nou.',
  'auth/email-already-in-use':'Utilizatorul e luat. Alege altul sau intră în contul tău.','auth/popup-closed-by-user':'','auth/cancelled-popup-request':'',
  'auth/credential-already-in-use':'Contul Google e deja legat de alt cont.','auth/provider-already-linked':'Contul e deja legat de Google.',
  'auth/too-many-requests':'Prea multe încercări. Mai încearcă peste un minut.','auth/network-request-failed':'Nu e internet.',
  'auth/unauthorized-domain':'Google nu e încă pornit pentru site. Spune-i lui Alex.','auth/operation-not-allowed':'Metoda asta de logare nu e pornită încă. Spune-i lui Alex.'};
const authMsg=e=>{console.error(e);return e&&e.code in AUTH_ERR?AUTH_ERR[e.code]:'N-a mers, mai încearcă.'};
function setMode(m){mode=m;for(const b of document.querySelectorAll('.seg button'))b.setAttribute('aria-selected',b.dataset.mode===m);
  $('#gp').classList.toggle('hide',m!=='signup'||!!(auth.currentUser&&auth.currentUser.isAnonymous));$('#gateBtn').textContent=m==='signup'?'Fă-mi cont':'Intră';
  $('#pw').setAttribute('autocomplete',m==='signup'?'new-password':'current-password');$('#gateErr').textContent=''}
document.querySelector('.seg').addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b)setMode(b.dataset.mode)});
function gateErr(t){$('#gateErr').textContent=t;if(!t)return;const f=$('#gateF');f.classList.remove('shake');void f.offsetWidth;f.classList.add('shake')}

$('#gateF').addEventListener('submit',async e=>{e.preventDefault();if(busyAuth)return;
  if($('#un').value.includes('@'))return gateErr('Ai intrat cu Google? Apasă „Continuă cu Google”. Aici scrii doar utilizatorul tău (fără @).');
  const user=cleanUser($('#un').value),pw=$('#pw').value;
  if(user.length<2)return gateErr('Alege un utilizator de minim 2 caractere (litere, cifre, . _ -).');
  if(!pw)return gateErr('Scrie o parolă.');
  busyAuth=true;$('#gateBtn').disabled=true;gateErr('');
  const email=user+'@'+DOMAIN,pass=await pwHash(user,pw);
  try{
    if(mode==='login'){await signInWithEmailAndPassword(auth,email,pass)}
    else{
      const gp=$('#gp').value.trim().toLowerCase(),cur=auth.currentUser,upgrading=!!(cur&&cur.isAnonymous);
      if(!gp&&!upgrading){gateErr('Scrie și parola găștii.');throw null}
      let cred;
      if(cur&&cur.isAnonymous){cred=await linkWithCredential(cur,EmailAuthProvider.credential(email,pass))}
      else cred=await createUserWithEmailAndPassword(auth,email,pass);
      if(gp)try{await setDoc(doc(fs,'members',cred.user.uid),{pass:gp,at:Date.now()})}catch(err){}
      if(upgrading)toast('Gata! Acum intri cu '+user+' de oriunde.');
      await route(cred.user);
    }
  }catch(err){if(err)gateErr(authMsg(err))}
  busyAuth=false;$('#gateBtn').disabled=false});

async function google(){if(busyAuth)return;busyAuth=true;gateErr('');
  try{
    const cur=auth.currentUser;
    if(cur&&cur.isAnonymous){
      try{await linkWithPopup(cur,gprov)}
      catch(err){if(err.code==='auth/credential-already-in-use'){const c=GoogleAuthProvider.credentialFromError(err);if(c)await signInWithCredential(auth,c);else throw err}else throw err}
    }else await signInWithPopup(auth,gprov);
  }catch(err){
    if(err.code==='auth/popup-blocked'||err.code==='auth/operation-not-supported-in-this-environment'){try{await signInWithRedirect(auth,gprov)}catch(e2){gateErr(authMsg(e2))}}
    else gateErr(authMsg(err))}
  busyAuth=false}
$('#gBtn').addEventListener('click',google);
getRedirectResult(auth).catch(e=>gateErr(authMsg(e)));

/* ---------- routing after login ---------- */
msg('Se încarcă…','O secundă.');
const slow=setTimeout(()=>msg('Nu mă pot conecta','Verifică internetul și reîncarcă pagina.'),12000);
onAuthStateChanged(auth,u=>{clearTimeout(slow);route(u)});
async function route(u){
  if(!u){stopApp();guest=false;setMode(mode);return show('gate')}
  uid=u.uid;
  isAdmin=u.email===ADMIN_EMAIL;
  try{
    const m=await getDoc(doc(fs,'members',uid));
    if(!m.exists()){$('#joinErr').textContent='';
      $('#joinT').textContent=joinGuest?'Doar te uiți':'Aproape gata';
      $('#joinP').textContent=joinGuest?'Scrie parola găștii și vezi tot ce plănuim, fără cont.':'Scrie parola găștii ca să intri.';
      return show('join')}
    guest=!!m.data().guest&&!!u.isAnonymous;
    if(guest)return startApp();
    const p=await getDoc(doc(fs,'profiles',uid));const d=p.exists()?p.data():null;
    if(d&&d.name&&d.photo){S.profiles[uid]=d;startApp()}else openOnboarding(uid);
  }catch(e){console.error(e);show('join')}
}
$('#joinF').addEventListener('submit',async e=>{e.preventDefault();const gp=$('#jp').value.trim().toLowerCase();if(!gp||!uid)return;
  try{await setDoc(doc(fs,'members',uid),{pass:gp,guest:joinGuest,at:Date.now()});route(auth.currentUser)}
  catch(err){$('#joinErr').textContent='Parola găștii e greșită.'}});
$('#joinOut').addEventListener('click',()=>{joinGuest=false;signOut(auth)});
$('#guestBtn').addEventListener('click',async()=>{joinGuest=true;gateErr('');
  const cur=auth.currentUser;if(cur){joinGuest=true;return route(cur)}
  try{await signInAnonymously(auth)}catch(e){gateErr(authMsg(e))}});

/* ---------- profile (own, or someone else's for the admin) ---------- */
function openOnboarding(target){
  editTarget=target||uid;const self=editTarget===uid,p=S.profiles[editTarget],edit=!!(p&&p.name);
  photoData=p?p.photo||null:null;$('#nm').value=p?p.name||'':'';
  $('#onbT').textContent=!edit?'Cine ești?':self?'Profilul tău':'Profilul lui '+(p.name||'');
  $('#onbCancel').classList.toggle('hide',!edit);$('#onbErr').textContent='';
  const u=auth.currentUser;
  const anon=!!(u&&u.isAnonymous);
  $('#acct').classList.toggle('hide',!self&&!isAdmin);
  $('#acctInfo').textContent=!self?'Ești admin: poți schimba numele, poza sau șterge contul.':anon?'Contul tău e salvat doar pe telefonul ăsta. Fă-ți utilizator și parolă ca să intri de oriunde.':userLabel(u);
  $('#saveAcc').classList.toggle('hide',!self||!anon);
  $('#linkG').classList.toggle('hide',!self||hasGoogle(u));
  $('#logoutBtn').classList.toggle('hide',!self);
  $('#logoutBtn').textContent=edit?'Ieși din cont':'Folosește alt cont';
  $('#delAcc').classList.toggle('hide',self||!isAdmin);
  paintSelfie();checkOnb();show('onb');
}
function paintSelfie(){const b=$('#selfieBox');
  b.innerHTML=photoData?'':'<span>Apasă ca să faci un selfie</span>';
  if(photoData){const i=new Image();i.src=photoData;i.alt='Selfie';b.appendChild(i)}}
function checkOnb(){$('#onbBtn').disabled=!(photoData&&$('#nm').value.trim().length>=2)}
$('#nm').addEventListener('input',checkOnb);
$('#photo').addEventListener('change',e=>{const f=e.target.files&&e.target.files[0];if(!f)return;
  const url=URL.createObjectURL(f);const img=new Image();
  img.onload=()=>{const s=Math.min(img.width,img.height),c=document.createElement('canvas');c.width=c.height=220;
    c.getContext('2d').drawImage(img,(img.width-s)/2,(img.height-s)/2,s,s,0,0,220,220);
    photoData=c.toDataURL('image/jpeg',.78);URL.revokeObjectURL(url);paintSelfie();checkOnb()};
  img.onerror=()=>{$('#onbErr').textContent='Nu pot citi poza, încearcă alta.'};img.src=url;e.target.value=''});
$('#onbCancel').addEventListener('click',()=>startApp());
$('#onbF').addEventListener('submit',async e=>{e.preventDefault();const name=$('#nm').value.trim().slice(0,24);
  if(!photoData||name.length<2)return;$('#onbBtn').disabled=true;
  const old=S.profiles[editTarget]||{};
  try{await setDoc(doc(fs,'profiles',editTarget),{name,photo:photoData,at:old.at||Date.now()});
    S.profiles[editTarget]={...old,name,photo:photoData};startApp()}
  catch(err){console.error(err);$('#onbBtn').disabled=false;$('#onbErr').textContent='N-a mers salvarea, mai încearcă.'}});
$('#linkG').addEventListener('click',async()=>{const u=auth.currentUser;if(!u)return;
  try{await linkWithPopup(u,gprov);await u.reload();toast('Gata, contul e legat de Google.');
    isAdmin=auth.currentUser.email===ADMIN_EMAIL;openOnboarding(uid)}
  catch(err){const t=authMsg(err);if(t)$('#onbErr').textContent=t}});
$('#logoutBtn').addEventListener('click',()=>signOut(auth));
$('#saveAcc').addEventListener('click',()=>{setMode('signup');$('#gp').classList.add('hide');$('#gateErr').textContent='';show('gate')});
$('#delAcc').addEventListener('click',()=>confirmDelAccount(editTarget));
function confirmDelAccount(t){const p=prof(t),m=$('#modal');
  m.innerHTML=`<div class="sheet"><h2>Ștergi contul lui ${esc(p.name)}?</h2><p>Dispar profilul, like-urile, „Merg și eu” și comentariile lui. Activitățile adăugate de el rămân. Nu se poate anula.</p>
    <div class="row"><button class="btn sec" id="dN">Nu</button><button class="btn" id="dY">Da, șterge</button></div></div>`;
  m.classList.remove('hide');$('#dN').onclick=closeModal;
  $('#dY').onclick=async()=>{closeModal();try{
    for(const col of ['likes','going','comments'])for(const x of S[col].filter(x=>x.uid===t))await deleteDoc(doc(fs,col,x.id));
    await deleteDoc(doc(fs,'profiles',t));await deleteDoc(doc(fs,'members',t));
    delete S.profiles[t];toast('Cont șters.');startApp()}catch(e){fail(e)}}}

/* ---------- live data ---------- */
function chrome(){$('#ro').classList.toggle('hide',!guest);$('#addBtn').classList.toggle('hide',guest);
  $('#profBtn').classList.toggle('hide',guest);$('#signupBtn').classList.toggle('hide',!guest);$('#adminBtn').classList.toggle('hide',!isAdmin)}
function startApp(){show('app');chrome();if(started)return render();started=true;
  const stale=setTimeout(()=>$('#stale').classList.remove('hide'),10000);
  const sub=(col,fn)=>unsubs.push(onSnapshot(collection(fs,col),s=>{if(!s.metadata.fromCache){clearTimeout(stale);$('#stale').classList.add('hide')}fn(s);render()},
    e=>{console.error(e);clearTimeout(stale);$('#stale').classList.remove('hide')}));
  sub('profiles',s=>{S.profiles={};s.forEach(d=>S.profiles[d.id]=d.data())});
  sub('acts',s=>{S.acts=s.docs.map(d=>({id:d.id,...d.data()}));if(s.empty&&!s.metadata.fromCache)seed()});
  sub('likes',s=>{S.likes=s.docs.map(d=>({id:d.id,...d.data()}))});
  sub('going',s=>{S.going=s.docs.map(d=>({id:d.id,...d.data()}))});
  sub('comments',s=>{S.comments=s.docs.map(d=>({id:d.id,...d.data()}))});
  render();
}
function stopApp(){while(unsubs.length)unsubs.pop()();started=false;S.profiles={};S.acts=[];S.likes=[];S.going=[];S.comments=[];openC.clear()}
async function seed(){if(seeding)return;seeding=true;
  try{const b=writeBatch(fs);b.set(doc(fs,'meta','seeded'),{by:uid,at:Date.now()});
    SEED.forEach((r,i)=>b.set(doc(fs,'acts','s'+String(i+1).padStart(2,'0')),{day:r[0],time:r[1],title:r[2],place:r[3],price:r[4],desc:r[5],link:r[6],city:r[7]||'',createdBy:uid,createdAt:i+1}));
    await b.commit()}catch(e){/* already seeded by someone else */}}

/* ---------- render ---------- */
function render(){
  const me=uid;
  const ids=Object.keys(S.profiles).sort((a,b)=>a===me?-1:b===me?1:(S.profiles[a].at||0)-(S.profiles[b].at||0));
  $('#crew').innerHTML=ids.map(id=>`<button class="${id===me?'me':isAdmin?'other':''}" data-prof="${esc(id)}" aria-label="${id===me?'Editează profilul':esc(prof(id).name)}">${av(id)}<small>${id===me?'Tu':esc(prof(id).name)}</small></button>`).join('');
  $('#tabs').innerHTML=DAYS.map(d=>{const n=S.acts.filter(a=>a.day===d.k).length;
    return `<button role="tab" aria-selected="${d.k===day}" data-day="${d.k}">${d.s}<b>${d.d}</b><small>${n} opț.</small></button>`}).join('');
  const D=DAYS.find(d=>d.k===day)||DAYS[0];$('#dayT').textContent=D.n;
  const cnt=(arr,id)=>arr.filter(x=>x.actId===id);
  const acts=S.acts.filter(a=>a.day===D.k).map(a=>({...a,L:cnt(S.likes,a.id),G:cnt(S.going,a.id),C:cnt(S.comments,a.id).sort((x,y)=>(x.at||0)-(y.at||0))}))
    .sort((a,b)=>b.L.length-a.L.length||(a.createdAt||0)-(b.createdAt||0));
  if(!acts.length){$('#list').innerHTML='<div class="empty">Nimic pe ziua asta încă. Apasă „+ Adaugă”.</div>';return}
  $('#list').innerHTML=acts.map((a,i)=>{
    const win=i===0&&a.L.length>0,liked=a.L.some(x=>x.uid===me),going=a.G.some(x=>x.uid===me);
    const mine=a.createdBy===me||isAdmin;
    const meta=[a.place,a.price].filter(Boolean).map(esc).join(' · ');
    const link=typeof a.link==='string'&&a.link.startsWith('https://')?`<a href="${esc(a.link)}" target="_blank" rel="noopener">Detalii / bilete</a>`:'';
    const map=a.place?`<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.place+(a.city?' '+a.city:' București'))}" target="_blank" rel="noopener">Hartă</a>`:'';
    const goingNames=a.G.map(x=>prof(x.uid).name||'Cineva');
    return `<article class="tk${win?' win':''}">
      <div class="tm${(a.time||'').length>6?' long':''}">${esc(a.time||'—')}</div>
      <div class="bd">
        ${win?'<span class="badge">Favorita zilei</span>':''}
        <h3>${esc(a.title)}</h3>
        ${meta?`<p class="meta">${meta}</p>`:''}
        ${a.desc?`<p class="desc">${esc(a.desc)}</p>`:''}
        ${link||map?`<div class="lnk">${link}${map}</div>`:''}
        <div class="acts">
          <button class="pill${liked?' on':''}" data-a="like" data-id="${esc(a.id)}" aria-pressed="${liked}"${guest?' disabled':''}>${HEART}${a.L.length}</button>
          <button class="pill${going?' on':''}" data-a="go" data-id="${esc(a.id)}" aria-pressed="${going}"${guest?' disabled':''}>Merg și eu${a.G.length?' · '+a.G.length:''}</button>
          <button class="pill" data-a="cm" data-id="${esc(a.id)}" aria-expanded="${openC.has(a.id)}">Comentarii${a.C.length?' · '+a.C.length:''}</button>
          ${a.G.length?`<span class="stack">${a.G.slice(0,6).map(x=>av(x.uid)).join('')}</span>`:''}
        </div>
        ${a.G.length?`<div class="who">Merg: ${goingNames.map(esc).join(', ')}</div>`:''}
        ${mine&&!guest?`<div class="own"><button data-a="edit" data-id="${esc(a.id)}">Editează</button><button data-a="del" data-id="${esc(a.id)}">Șterge</button></div>`:''}
        ${openC.has(a.id)?`<div class="cm">${a.C.map(c=>`<div class="c">${av(c.uid)}<div><b>${esc(prof(c.uid).name)}</b><p>${esc(c.text)}</p></div>${(c.uid===me||isAdmin)?`<button data-a="delc" data-id="${esc(c.id)}" aria-label="Șterge comentariul">×</button>`:''}</div>`).join('')||'<p class="who">Niciun comentariu încă.</p>'}
          ${guest?'':`<form class="cf" data-id="${esc(a.id)}"><input maxlength="300" placeholder="Scrie ceva…" aria-label="Comentariu"><button type="submit">Trimite</button></form>`}</div>`:''}
      </div></article>`}).join('');
}

/* ---------- actions ---------- */
async function toggle(col,actId){const key=actId+'__'+uid;if(busy.has(col+key))return;busy.add(col+key);
  const has=S[col].some(x=>x.id===key);
  try{has?await deleteDoc(doc(fs,col,key)):await setDoc(doc(fs,col,key),{actId,uid,at:Date.now()})}catch(e){fail(e)}
  busy.delete(col+key)}
$('#crew').addEventListener('click',e=>{const b=e.target.closest('[data-prof]');if(!b)return;const id=b.dataset.prof;if(id===uid||isAdmin)openOnboarding(id)});
$('#profBtn').addEventListener('click',()=>openOnboarding(uid));
$('#outBtn').addEventListener('click',()=>{$('#pw').value='';$('#gp').value='';joinGuest=false;signOut(auth)});
$('#signupBtn').addEventListener('click',async()=>{joinGuest=false;await signOut(auth);setMode('signup')});
$('#adminBtn').addEventListener('click',adminPanel);
function adminPanel(){const m=$('#modal');
  const ids=Object.keys(S.profiles).sort((a,b)=>(S.profiles[a].name||'').localeCompare(S.profiles[b].name||''));
  m.innerHTML=`<div class="sheet"><h2>Conturi (${ids.length})</h2><p class="who">Schimbă nume și poze sau șterge conturile în plus.</p><ul class="alist">${ids.map(id=>`<li>${av(id)}<span class="nm">${esc(prof(id).name)}${id===uid?' (tu)':''}<small>…${esc(id.slice(-6))}</small></span><button data-ae="${esc(id)}">Editează</button>${id===uid?'':`<button class="del" data-ad="${esc(id)}">Șterge</button>`}</li>`).join('')}</ul>
    <div class="row"><button class="btn sec" id="aC">Închide</button></div></div>`;
  m.classList.remove('hide');$('#aC').onclick=closeModal;
  m.querySelector('.alist').onclick=e=>{const b=e.target.closest('button');if(!b)return;
    if(b.dataset.ae){closeModal();openOnboarding(b.dataset.ae)}else if(b.dataset.ad)confirmDelAccount(b.dataset.ad)}}
$('#tabs').addEventListener('click',e=>{const b=e.target.closest('[data-day]');if(!b)return;day=b.dataset.day;ls.set('wb-day',day);render()});
$('#addBtn').addEventListener('click',()=>form(null));
$('#list').addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const id=b.dataset.id,a=b.dataset.a;
  if(a==='like')toggle('likes',id);
  else if(a==='go')toggle('going',id);
  else if(a==='cm'){openC.has(id)?openC.delete(id):openC.add(id);render()}
  else if(a==='edit')form(S.acts.find(x=>x.id===id));
  else if(a==='del')confirmDel(id);
  else if(a==='delc')deleteDoc(doc(fs,'comments',id)).catch(fail)});
$('#list').addEventListener('submit',async e=>{e.preventDefault();const f=e.target.closest('.cf');if(!f)return;
  const inp=f.querySelector('input'),text=inp.value.trim().slice(0,300);if(!text)return;inp.disabled=true;
  try{await addDoc(collection(fs,'comments'),{actId:f.dataset.id,uid,text,at:Date.now()});inp.value=''}catch(err){fail(err)}
  inp.disabled=false;inp.focus()});

function closeModal(){$('#modal').classList.add('hide');$('#modal').innerHTML=''}
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
function form(a){const m=$('#modal'),v=k=>esc(a?a[k]||'':'');
  m.innerHTML=`<form class="sheet" id="actF"><h2>${a?'Editează':'Adaugă ceva'}</h2>
    <label for="fT">Ce facem? *</label><input id="fT" required maxlength="80" value="${v('title')}">
    <div class="two"><div><label for="fD">Ziua</label><select id="fD">${DAYS.map(d=>`<option value="${d.k}"${(a?a.day:day)===d.k?' selected':''}>${esc(d.n)}</option>`).join('')}</select></div>
    <div><label for="fH">Ora</label><input id="fH" maxlength="12" placeholder="22:00" value="${v('time')}"></div></div>
    <div class="two"><div><label for="fP">Unde</label><input id="fP" maxlength="60" value="${v('place')}"></div>
    <div><label for="fR">Preț</label><input id="fR" maxlength="30" placeholder="50 lei" value="${v('price')}"></div></div>
    <label for="fX">Detalii</label><textarea id="fX" maxlength="400">${v('desc')}</textarea>
    <label for="fL">Link (https://…)</label><input id="fL" maxlength="300" inputmode="url" value="${v('link')}">
    <div class="row"><button type="button" class="btn sec" id="fC">Renunță</button><button class="btn" type="submit">Salvează</button></div></form>`;
  m.classList.remove('hide');$('#fT').focus();$('#fC').onclick=closeModal;
  $('#actF').onsubmit=async e=>{e.preventDefault();const title=$('#fT').value.trim();if(!title)return;
    let link=$('#fL').value.trim();if(link&&!link.startsWith('https://'))link=link.startsWith('http://')?'':'https://'+link;
    const d={title,day:$('#fD').value,time:$('#fH').value.trim(),place:$('#fP').value.trim(),price:$('#fR').value.trim(),desc:$('#fX').value.trim(),link,updatedAt:Date.now()};
    const btn=e.target.querySelector('[type=submit]');btn.disabled=true;
    try{if(a)await updateDoc(doc(fs,'acts',a.id),d);else await addDoc(collection(fs,'acts'),{...d,city:'',createdBy:uid,createdAt:Date.now()});
      day=d.day;ls.set('wb-day',day);closeModal();render()}catch(err){btn.disabled=false;fail(err)}}}
function confirmDel(id){const a=S.acts.find(x=>x.id===id);if(!a)return;const m=$('#modal');
  m.innerHTML=`<div class="sheet"><h2>Ștergi „${esc(a.title)}”?</h2><p>Dispare și tot ce ține de ea. Nu se poate anula.</p>
    <div class="row"><button class="btn sec" id="dN">Nu</button><button class="btn" id="dY">Da, șterge</button></div></div>`;
  m.classList.remove('hide');$('#dN').onclick=closeModal;
  $('#dY').onclick=async()=>{closeModal();try{await deleteDoc(doc(fs,'acts',id))}catch(e){fail(e)}}}
