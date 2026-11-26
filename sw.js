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
