importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
firebase.initializeApp({apiKey:"AIzaSyDrI60LwjtiebaL-svtIPJ3sA2jjf801TQ",authDomain:"jasmine-site-fed6f.firebaseapp.com",projectId:"jasmine-site-fed6f",storageBucket:"jasmine-site-fed6f.firebasestorage.app",messagingSenderId:"705021328187",appId:"1:705021328187:web:4035a7bb49e9fb0837951e"});
firebase.messaging();
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return clients.openWindow('./')}))});
const C='jsw-v2';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(
 caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 const u=new URL(r.url);
 const same=u.origin===location.origin;
 if(!same&&!/gstatic\.com|fonts\.googleapis\.com|fonts\.gstatic\.com/.test(u.host))return;
 /* الصفحة وملفات البيانات: من النت الأول، والكاش للطوارئ بس (عشان ما يظهرش قديم) */
 if(same){
  e.respondWith(fetch(r,{cache:'no-store'}).then(x=>{
   if(x&&x.ok){const cp=x.clone();caches.open(C).then(c=>c.put(r,cp))}
   return x;
  }).catch(()=>caches.match(r)));
  return;
 }
 /* مكتبات جوجل والخطوط: كاش أولاً */
 e.respondWith(caches.open(C).then(async c=>{
  const hit=await c.match(r);
  const net=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque'))c.put(r,x.clone());return x}).catch(()=>hit);
  return hit||net;
 }));
});
