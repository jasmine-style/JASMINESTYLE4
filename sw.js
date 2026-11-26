importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
firebase.initializeApp({apiKey:"AIzaSyDrI60LwjtiebaL-svtIPJ3sA2jjf801TQ",authDomain:"jasmine-site-fed6f.firebaseapp.com",projectId:"jasmine-site-fed6f",storageBucket:"jasmine-site-fed6f.firebasestorage.app",messagingSenderId:"705021328187",appId:"1:705021328187:web:4035a7bb49e9fb0837951e"});
firebase.messaging();
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return clients.openWindow('./')}))});
const C='jsw-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 const u=new URL(r.url);
 if(u.origin!==location.origin&&!/gstatic\.com|fonts\.googleapis\.com/.test(u.host))return;
 e.respondWith(caches.open(C).then(async c=>{
  const hit=await c.match(r);
  const net=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque'))c.put(r,x.clone());return x}).catch(()=>hit);
  return hit||net;
 }));
});
