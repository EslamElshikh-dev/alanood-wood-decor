
(function(){
  const root=document.documentElement;
  const menuBtn=document.querySelector('[data-menu-toggle]');
  const navLinks=[...document.querySelectorAll('[data-nav-link]')];
  const dropdownToggles=[...document.querySelectorAll('[data-dropdown-toggle]')];
  const filterButtons=[...document.querySelectorAll('[data-filter]')];
  const serviceCards=[...document.querySelectorAll('[data-service-card]')];
  const leadForm=document.getElementById('leadForm');
  const yearEl=document.getElementById('year');
  const whatsappNumber='966542473441';
  const savedTheme=localStorage.getItem('theme');
  if(savedTheme){root.setAttribute('data-theme',savedTheme)}
  if(yearEl)yearEl.textContent=new Date().getFullYear();
  if(menuBtn){menuBtn.addEventListener('click',()=>{const open=document.body.classList.toggle('nav-open');menuBtn.setAttribute('aria-expanded',open?'true':'false')})}
  navLinks.forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('nav-open');if(menuBtn)menuBtn.setAttribute('aria-expanded','false')}));
  dropdownToggles.forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();const box=btn.closest('.nav-dropdown');const open=box.classList.toggle('is-open');btn.setAttribute('aria-expanded',open?'true':'false')}));
  document.addEventListener('click',e=>{if(!e.target.closest('.nav-dropdown'))document.querySelectorAll('.nav-dropdown.is-open').forEach(x=>x.classList.remove('is-open'))});
  filterButtons.forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;filterButtons.forEach(btn=>btn.classList.toggle('active',btn===button));serviceCards.forEach(card=>{const match=filter==='الكل'||card.dataset.category===filter;card.classList.toggle('is-hidden',!match)})}));
  const revealItems=[...document.querySelectorAll('.reveal')];
  if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');io.unobserve(entry.target)}})},{threshold:.12});revealItems.forEach(item=>io.observe(item))}else{revealItems.forEach(item=>item.classList.add('in-view'))}
  function enc(t){return encodeURIComponent(t).replace(/'/g,'%27')}
  if(leadForm){leadForm.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(leadForm);const name=String(data.get('name')||'').trim();const phone=String(data.get('phone')||'').trim();const service=String(data.get('service')||'').trim();const message=String(data.get('message')||'').trim();if(!name||!phone||!service){alert('فضلاً اكتب الاسم ورقم الجوال واختر الخدمة المطلوبة.');return}const text=`السلام عليكم، أنا ${name}. أرغب في طلب خدمة: ${service} من مؤسسة العنود للديكور الخشبي. رقم التواصل: ${phone}. التفاصيل: ${message||'سأرسل التفاصيل والصور عبر واتساب.'}`;window.open(`https://wa.me/${whatsappNumber}?text=${enc(text)}`,'_blank','noopener')})}
})();
