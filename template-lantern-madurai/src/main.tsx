import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {motion, useReducedMotion, useScroll, useTransform} from 'motion/react';
import {CalendarBlank, MapPin, MusicNotes, FlowerLotus, Sparkle, ArrowDown} from '@phosphor-icons/react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './styles.css';

const WEDDING = new Date('2027-02-14T07:30:00+05:30');
const events = [
  {name:'Haldi', date:'12 February 2027', time:'10:00 AM', venue:'The Courtyard, Heritage Madurai', note:'Sunshine, turmeric, and the people we love.', icon:'✦'},
  {name:'Mehendi', date:'12 February 2027', time:'4:30 PM', venue:'Mango Grove, Heritage Madurai', note:'An evening drawn in henna and laughter.', icon:'❋'},
  {name:'Sangeet', date:'13 February 2027', time:'7:00 PM', venue:'Lotus Ballroom, Heritage Madurai', note:'Come for the music. Stay for the family dance-off.', icon:'♫'},
  {name:'Wedding', date:'14 February 2027', time:'7:30 AM', venue:'Meenakshi Amman Temple, Madurai', note:'The moment two families become one.', icon:'❧'},
  {name:'Reception', date:'14 February 2027', time:'7:00 PM', venue:'Temple View Lawns, Madurai', note:'Dinner, dancing, and our first night as newlyweds.', icon:'✧'},
];

function Reveal({children, className=''}:{children:React.ReactNode,className?:string}){
 const reduce=useReducedMotion();
 return <motion.div className={className} initial={reduce?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.75,ease:[.16,1,.3,1]}}>{children}</motion.div>
}

function Countdown(){
 const [now,setNow]=useState(Date.now());
 useEffect(()=>{const id=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(id)},[]);
 const diff=Math.max(0,WEDDING.getTime()-now);
 const values=[Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];
 return <div className="countdown">{values.map((v,i)=><div className="count-unit" key={i}><div className="flip"><motion.span key={v} initial={{rotateX:-75,opacity:0}} animate={{rotateX:0,opacity:1}}>{String(v).padStart(2,'0')}</motion.span></div><small>{['days','hours','mins','secs'][i]}</small></div>)}</div>
}

function Bloom({onDone}:{onDone:()=>void}){
 const reduce=useReducedMotion(); const [open,setOpen]=useState(false);
 return <motion.div className={'welcome-card '+(open?'is-open':'')} animate={open&&!reduce?{scale:1.04,opacity:0}:{}} transition={{duration:.75,ease:[.16,1,.3,1]}}>
  <div className="welcome-names"><small>Together with our families</small><h1>Aarav <i>&</i> Ananya</h1><p>invite you to celebrate their wedding</p><span>14 · 02 · 2027</span></div>
  <motion.button aria-label="Open Aarav and Ananya's invitation" className="open-invite" onClick={()=>{setOpen(true);onDone()}} whileTap={{scale:.97}}>
   <span className="seal"><FlowerLotus size={25} weight="fill"/></span><b>Open our invitation</b><small>Tap to enter</small>
  </motion.button>
 </motion.div>
}

function addCalendar(){
 const body=['BEGIN:VCALENDAR','VERSION:2.0','BEGIN:VEVENT','DTSTART:20270214T020000Z','DTEND:20270214T060000Z','SUMMARY:Aarav & Ananya — Wedding','LOCATION:Meenakshi Amman Temple, Madurai','DESCRIPTION:Celebrate the wedding of Aarav and Ananya.','END:VEVENT','END:VCALENDAR'].join('\r\n');
 const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([body],{type:'text/calendar'})); a.download='aarav-ananya-wedding.ics'; a.click(); URL.revokeObjectURL(a.href);
}

function ScratchDate(){
 const canvas=useRef<HTMLCanvasElement>(null); const [done,setDone]=useState(false); const drawing=useRef(false); const strokes=useRef(0);
 useEffect(()=>{const c=canvas.current;if(!c)return;const ratio=Math.min(devicePixelRatio,2);const rect=c.getBoundingClientRect();c.width=rect.width*ratio;c.height=rect.height*ratio;const x=c.getContext('2d')!;x.scale(ratio,ratio);const g=x.createLinearGradient(0,0,rect.width,rect.height);g.addColorStop(0,'#d7a94f');g.addColorStop(.5,'#f0d08a');g.addColorStop(1,'#a76d1c');x.fillStyle=g;x.fillRect(0,0,rect.width,rect.height);x.fillStyle='#633f1f';x.textAlign='center';x.font='11px Marcellus, serif';x.fillText('SCRATCH TO REVEAL OUR DATE',rect.width/2,rect.height/2-6);x.font='25px serif';x.fillText('❋',rect.width/2,rect.height/2+29)},[]);
 const scratch=(e:React.PointerEvent<HTMLCanvasElement>)=>{if(!drawing.current||done)return;const c=canvas.current!,r=c.getBoundingClientRect(),x=c.getContext('2d')!;x.globalCompositeOperation='destination-out';x.beginPath();x.arc(e.clientX-r.left,e.clientY-r.top,24,0,Math.PI*2);x.fill();if(++strokes.current>42){setDone(true);c.style.opacity='0';navigator.vibrate?.(35)}};
 return <section className={'scratch-section '+(done?'revealed':'')}><div className="float-field" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i} style={{'--i':i} as React.CSSProperties}>❀</i>)}</div><Reveal><p className="script">Save our date</p><h2>A day written in the stars</h2><div className="scratch-card"><div className="date-reveal"><small>Sunday</small><b>14</b><span>February · 2027</span><em>Madurai</em></div><canvas ref={canvas} onPointerDown={e=>{drawing.current=true;e.currentTarget.setPointerCapture(e.pointerId);scratch(e)}} onPointerMove={scratch} onPointerUp={()=>drawing.current=false} onPointerCancel={()=>drawing.current=false}/></div><p className="scratch-hint">{done?'We will see you there ♡':'Use your finger to uncover the date'}</p></Reveal></section>
}

function App(){
 const [entered,setEntered]=useState(false); const [introPlaying,setIntroPlaying]=useState(false); const introVideo=useRef<HTMLVideoElement>(null); const reduce=useReducedMotion(); const {scrollYProgress}=useScroll();
 const leafY=useTransform(scrollYProgress,[0,1],[0,180]); const templeY=useTransform(scrollYProgress,[0,1],[0,95]);
 const page=useRef<HTMLElement>(null);
 useEffect(()=>{if(reduce||!entered||!page.current)return;gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{
  gsap.fromTo('.hero-copy>*',{opacity:0,y:30},{opacity:1,y:0,duration:1,stagger:.12,ease:'power3.out'});
  gsap.to('.hero-art',{scale:1.09,yPercent:7,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
  gsap.utils.toArray<HTMLElement>('.event').forEach((el,i)=>gsap.fromTo(el,{opacity:0,x:i%2?-42:42,rotate:.5},{opacity:1,x:0,rotate:0,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%',end:'top 58%',scrub:.8}}));
  gsap.fromTo('.ceremony-image img',{scale:1.18,yPercent:-5},{scale:1,yPercent:5,ease:'none',scrollTrigger:{trigger:'.ceremony-image',start:'top bottom',end:'bottom top',scrub:1}});
  gsap.fromTo('.story-inner',{clipPath:'inset(0 50% 0 50%)',opacity:.4},{clipPath:'inset(0 0% 0 0%)',opacity:1,ease:'power2.out',scrollTrigger:{trigger:'.story',start:'top 80%',end:'center 55%',scrub:1}});
  gsap.to('.map i',{y:-10,repeat:-1,yoyo:true,duration:1.2,ease:'sine.inOut'});
  gsap.utils.toArray<HTMLElement>('.atmos-lantern').forEach((el,i)=>{const depth=Number(el.dataset.depth||.4);gsap.to(el,{yPercent:-90*depth,x:Math.sin(i)*18*depth,rotation:i%2?4:-4,ease:'none',scrollTrigger:{trigger:page.current,start:'top top',end:'bottom bottom',scrub:1.2+depth}});gsap.to(el.querySelector('.lantern-flame'),{scaleY:1.18,opacity:.72,repeat:-1,yoyo:true,duration:.7+i*.08,ease:'sine.inOut'})});
 },page);return()=>ctx.revert()},[entered,reduce]);
 return <main ref={page}>
  <motion.div className="scroll-progress" style={{scaleX:scrollYProgress}}/>
  <div className="lantern-atmosphere" aria-hidden="true">{[
   {x:6,y:12,d:.22,s:.62,b:2.2},{x:89,y:20,d:.35,s:.78,b:1.4},{x:12,y:42,d:.7,s:1.05,b:.4},{x:93,y:55,d:.28,s:.58,b:2.6},{x:4,y:72,d:1,s:1.35,b:.2},{x:87,y:84,d:.62,s:.92,b:.8},{x:48,y:64,d:.18,s:.42,b:3.2}
  ].map((l,i)=><span key={i} className="atmos-lantern" data-depth={l.d} style={{left:`${l.x}%`,top:`${l.y}%`,'--scale':l.s,'--blur':`${l.b}px`,'--delay':`${-i*.6}s`} as React.CSSProperties}><i className="lantern-chain"/><i className="lantern-cap"/><i className="lantern-body"><b className="lantern-flame"/></i><i className="lantern-tail"/></span>)}</div>
  {!entered&&<div className={'welcome '+(introPlaying?'intro-playing':'')}><video ref={introVideo} className="welcome-video" muted playsInline preload="auto" poster="/assets/entrance-first-frame.png" onEnded={()=>setEntered(true)} aria-label="Aarav and Ananya's illustrated wedding invitation opening"><source src="/assets/aarav-ananya-opening.mp4" type="video/mp4"/></video><div className="welcome-shade"/><div className="garland-edge"/>{!introPlaying&&<Bloom onDone={()=>{const v=introVideo.current;if(!v)return;v.currentTime=0;setIntroPlaying(true);void v.play().catch(()=>setIntroPlaying(false))}}/>}{introPlaying&&<button className="skip-intro" onClick={()=>setEntered(true)}>Skip intro</button>}</div>}
  <section className="hero">
   <motion.img className="hero-art" src="/assets/invitation-reference.png" alt="Aarav and Ananya before a South Indian temple, framed by jasmine and lotus flowers" style={{y:reduce?0:templeY}} />
   <div className="hero-scrim"/><motion.div className="hero-copy" initial={{opacity:0,y:24}} animate={{opacity:entered?1:0,y:entered?0:24}} transition={{delay:.15,duration:1}}>
    <p className="blessing">With the blessings of our families</p><h1>Aarav <span>&</span> Ananya</h1><div className="date-rule"><i/>14 · 02 · 2027<i/></div><p>Madurai, Tamil Nadu</p>
   </motion.div>
   <motion.div className="leaf-float left" style={{y:reduce?0:leafY}}/><motion.div className="leaf-float right" style={{y:reduce?0:leafY}}/>
   <div className="scroll-cue"><ArrowDown size={20}/><span>Our celebration</span></div>
  </section>

  <section className="count-section"><Reveal><p className="kicker">Until we say “I do”</p><h2>Counting every heartbeat</h2><Countdown/></Reveal></section>

  <ScratchDate/>

  <section className="story ornamental"><Reveal className="story-inner"><FlowerLotus size={34} weight="thin"/><p className="script">A celebration of love</p><h2>Two paths, one forever</h2><p>From chance hellos to a thousand shared dreams, we found home in each other. With joyful hearts, we invite you to witness the beginning of our forever.</p><div className="signature">Aarav <i>&</i> Ananya</div></Reveal></section>

  <section className="ceremony-moment"><div className="floating-glass lotus-one">✿</div><div className="floating-glass lotus-two">❀</div><div className="floating-diya">◒</div><div className="ceremony-image"><img src="/assets/haldi-mehendi.png" loading="lazy" alt="Aarav and Ananya sharing a joyful haldi and mehendi moment"/></div><Reveal className="ceremony-caption"><p className="script">Painted in sunshine</p><h2>Before forever begins</h2><p>Turmeric on our cheeks, henna on our hands, and every favorite person gathered close.</p><span>Swipe through our celebrations below</span></Reveal></section>

  <section className="events"><Reveal><h2>Wedding festivities</h2><p className="section-intro">Five beautiful moments. One unforgettable celebration.</p></Reveal><div className="event-list">{events.map((e,i)=><Reveal className={'event '+(i===3?'featured':'')} key={e.name}><div className="event-number">0{i+1}</div><div><span className="event-icon">{e.icon}</span><h3>{e.name}</h3><p>{e.note}</p><dl><div><dt>Date</dt><dd>{e.date}</dd></div><div><dt>Time</dt><dd>{e.time}</dd></div><div><dt>Venue</dt><dd>{e.venue}</dd></div></dl></div></Reveal>)}</div></section>

  <section className="venue ornamental"><Reveal><MapPin size={38} weight="thin"/><p className="script">Meet us in Madurai</p><h2>Meenakshi Amman Temple</h2><p>Madurai Main, Madurai, Tamil Nadu 625001</p><div className="map google-map"><iframe title="Google Map of Meenakshi Amman Temple" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Meenakshi%20Amman%20Temple%2C%20Madurai&z=15&output=embed"/><div className="map-overlay"><span><MapPin size={19} weight="fill"/>Wedding venue</span><b>Meenakshi Amman Temple</b><small>Pinch or drag to explore</small></div></div><div className="actions"><a className="button primary" href="https://www.google.com/maps/search/?api=1&query=Meenakshi+Amman+Temple+Madurai" target="_blank" rel="noreferrer"><MapPin size={19}/>Open in Google Maps</a><button className="button secondary" onClick={addCalendar}><CalendarBlank size={19}/>Add to Calendar</button></div></Reveal></section>

  <footer><img src="/assets/og-aarav-ananya.png" loading="lazy" alt="Aarav and Ananya wedding illustration"/><div className="footer-overlay"/><Reveal className="footer-copy"><Sparkle size={27} weight="thin"/><p>We cannot wait to celebrate with you</p><h2>Aarav <i>&</i> Ananya</h2><span>14 February 2027 · Madurai</span></Reveal><a href="https://www.instagram.com/invitestory.in/" target="_blank" rel="noreferrer" style={{position:'relative',zIndex:2,display:'block',marginTop:'16px',fontSize:'8px',textTransform:'uppercase',letterSpacing:'.18em',color:'rgba(255,242,214,.35)',textDecoration:'none',paddingBottom:'12px'}}>Follow @invitestory.in on Instagram</a></footer>
 </main>
}
createRoot(document.getElementById('root')!).render(<App/>);
