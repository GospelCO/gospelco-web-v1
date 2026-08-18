/* ==========================================================
   GOSPELCO — MAIN JAVASCRIPT
   Motion philosophy: useful, subtle, optional.
========================================================== */

const header = document.querySelector(".header");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const progressBar = document.querySelector(".scroll-progress");
const topBtn = document.querySelector(".back-top");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;



const cur=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
if(cur && ring){
    document.addEventListener('mousemove',e=>{
        cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';
        ring.style.left=e.clientX+'px';ring.style.top=e.clientY+'px';
    });
}


/* ---------------- HEADER ---------------- */
function updateHeader(){
    if(!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateHeader, {passive:true});
updateHeader();

/* ---------------- MOBILE MENU ---------------- */
if(menuBtn && navLinks){
    menuBtn.addEventListener("click",()=>{
        const open = menuBtn.classList.toggle("active");
        navLinks.classList.toggle("active", open);
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });

    navLinks.querySelectorAll("a").forEach(link=>{
        link.addEventListener("click",()=>{
            menuBtn.classList.remove("active");
            navLinks.classList.remove("active");
            menuBtn.setAttribute("aria-expanded","false");
            menuBtn.setAttribute("aria-label","Open navigation");
        });
    });
}

/* ---------------- SMOOTH ANCHOR LINKS ---------------- */
if(!reduceMotion){
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
        anchor.addEventListener("click",event=>{
            const selector = anchor.getAttribute("href");
            if(!selector || selector === "#") return;
            const target = document.querySelector(selector);
            if(!target) return;
            event.preventDefault();
            target.scrollIntoView({behavior:"smooth",block:"start"});
        });
    });
}

/* ---------------- SCROLL PROGRESS ---------------- */
function updateProgress(){
    if(!progressBar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.width = `${progress}%`;
}
window.addEventListener("scroll", updateProgress, {passive:true});
updateProgress();

/* ---------------- BACK TO TOP ---------------- */
function updateTopButton(){
    if(!topBtn) return;
    topBtn.classList.toggle("show", window.scrollY > 520);
}
window.addEventListener("scroll", updateTopButton, {passive:true});
updateTopButton();

if(topBtn){
    topBtn.addEventListener("click",()=>{
        window.scrollTo({top:0,behavior:reduceMotion ? "auto" : "smooth"});
    });
}

/* ---------------- ACTIVE NAVIGATION ---------------- */
const navItems = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = [...document.querySelectorAll("section[id]")];

const activeObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        const id = entry.target.id;
        navItems.forEach(link=>{
            link.classList.toggle("current", link.getAttribute("href") === `#${id}`);
        });
    });
},{rootMargin:"-35% 0px -55% 0px",threshold:0});

sections.forEach(section=>activeObserver.observe(section));

/* ---------------- SELECTIVE REVEAL ---------------- */
const revealTargets = document.querySelectorAll(
    ".section-heading, .about-content, .featured-project, .cta-box"
);

if(!reduceMotion){
    const revealObserver = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("reveal","show");
                revealObserver.unobserve(entry.target);
            }
        });
    },{threshold:0.14});

    revealTargets.forEach(el=>revealObserver.observe(el));
}else{
    revealTargets.forEach(el=>el.classList.add("reveal","show"));
}

/* ---------------- COUNTERS ----------------
   Count up smoothly: quick movement at the start,
   then a noticeably slower finish for a premium feel.
--------------------------------------------------- */
const counters = document.querySelectorAll(".counter h2[data-target]");

if(counters.length){
    const counterObserver = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target || 0);

            if(reduceMotion){
                counter.textContent = `${target}+`;
                counterObserver.unobserve(counter);
                return;
            }

            const duration = target >= 100 ? 2800 : 2100;
            const start = performance.now();

            counter.classList.add("is-counting");

            const tick = now=>{
                const progress = Math.min((now - start) / duration, 1);
                // Ease-out quint: lively start, long gentle landing.
                const eased = 1 - Math.pow(1 - progress, 5);
                counter.textContent = `${Math.round(target * eased)}+`;

                if(progress < 1){
                    requestAnimationFrame(tick);
                }else{
                    counter.textContent = `${target}+`;
                    counter.classList.remove("is-counting");
                    counter.classList.add("count-complete");
                    window.setTimeout(()=>counter.classList.remove("count-complete"), 900);
                }
            };

            requestAnimationFrame(tick);
            counterObserver.unobserve(counter);
        });
    },{threshold:0.35});

    counters.forEach(counter=>counterObserver.observe(counter));
}



/* ---------------- CARD CLICK GLOW ----------------
   A short visual acknowledgement. It does not change layout.
--------------------------------------------------- */
const interactiveCards = document.querySelectorAll(
    ".card, .service-card, .project-card, .why-card, .testimonial-card, .counter"
);

interactiveCards.forEach(card=>{
    card.addEventListener("click",()=>{
        card.classList.remove("is-active");
        void card.offsetWidth;
        card.classList.add("is-active");

        window.setTimeout(()=>{
            card.classList.remove("is-active");
        }, 650);
    });
});

/* ---------------- WHATSAPP ----------------
   Replace the placeholder number once with the GospelCO WhatsApp number.
   Use international format without + or spaces, e.g. 2348012345678.
--------------------------------------------------- */
const WHATSAPP_NUMBER = "2349034013236";

function whatsappUrl(message){
    const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g,"");
    const text = encodeURIComponent(message || "Hi GospelCO, I would like to start a project.");
    return `https://wa.me/${cleanNumber}?text=${text}`;
}

document.querySelectorAll(".whatsapp-link").forEach(link=>{
    link.addEventListener("click",event=>{
        event.preventDefault();

        if(WHATSAPP_NUMBER.includes("X")){
            alert("Add your GospelCO WhatsApp number in assets/js/main.js first.");
            return;
        }

        const message = link.dataset.whatsappMessage || "Hi GospelCO, I would like to start a project.";
        window.open(whatsappUrl(message),"_blank","noopener");
    });
});

/* ---------------- FLOATING WHATSAPP PROMPT ----------------
   Wiggle once, reveal the label, then rest. Repeats every 2 minutes.
--------------------------------------------------- */
const msgBtn = document.getElementById("float-btn");

function triggerWiggleSequence(){
    if(!msgBtn || reduceMotion) return;

    msgBtn.classList.remove("active");
    void msgBtn.offsetWidth;
    msgBtn.classList.add("active");

    window.setTimeout(()=>{
        msgBtn.classList.remove("active");
    },3200);
}

if(msgBtn && !reduceMotion){
    window.setTimeout(triggerWiggleSequence,3000);
    window.setInterval(triggerWiggleSequence,120000);
}

/* ---------------- COUNTDOWN PAGE ---------------- */
const countdown = document.querySelector("[data-countdown]");
if(countdown){
    const days = Number(countdown.dataset.days || 30);
    const key = "gospelco-relaunch-target";
    let target = Number(localStorage.getItem(key));

    if(!target || target < Date.now()){
        target = Date.now() + days * 24 * 60 * 60 * 1000;
        localStorage.setItem(key,String(target));
    }

    const fields = {
        days: countdown.querySelector("[data-days]"),
        hours: countdown.querySelector("[data-hours]"),
        minutes: countdown.querySelector("[data-minutes]"),
        seconds: countdown.querySelector("[data-seconds]")
    };

    const updateCountdown=()=>{
        const remaining=Math.max(0,target-Date.now());
        const totalSeconds=Math.floor(remaining/1000);
        const d=Math.floor(totalSeconds/86400);
        const h=Math.floor((totalSeconds%86400)/3600);
        const m=Math.floor((totalSeconds%3600)/60);
        const s=totalSeconds%60;

        if(fields.days) fields.days.textContent=String(d).padStart(2,"0");
        if(fields.hours) fields.hours.textContent=String(h).padStart(2,"0");
        if(fields.minutes) fields.minutes.textContent=String(m).padStart(2,"0");
        if(fields.seconds) fields.seconds.textContent=String(s).padStart(2,"0");

        if(remaining<=0){
            countdown.classList.add("complete");
            const label=countdown.querySelector("[data-countdown-label]");
            if(label) label.textContent="The new page is ready.";
            clearInterval(timer);
        }
    };

    updateCountdown();
    const timer=setInterval(updateCountdown,1000);
}
