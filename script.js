// ==========================================
// MOBILE MENU
// ==========================================

const menuBtn =
  document.getElementById("menuBtn");

const mobileMenu =
  document.getElementById("mobileMenu");


menuBtn.addEventListener("click", () => {

  mobileMenu.classList.toggle("active");

});


// Close menu after clicking a link

document
  .querySelectorAll(".mobile-menu a")
  .forEach(link => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("active");

    });

  });


// ==========================================
// COPY CODE
// ==========================================

document
  .querySelectorAll(".copy-btn")
  .forEach(button => {

    button.addEventListener("click", async () => {

      const targetId =
        button.getAttribute("data-copy");

      const target =
        document.getElementById(targetId);

      if(!target){
        return;
      }

      const text =
        target.innerText;

      try {

        await navigator.clipboard.writeText(text);

        const oldText =
          button.innerText;

        button.innerText =
          "Copied!";

        button.classList.add("copied");

        setTimeout(() => {

          button.innerText =
            oldText;

          button.classList.remove("copied");

        }, 1500);

      } catch(error) {

        button.innerText =
          "Failed";

        setTimeout(() => {

          button.innerText =
            "Copy";

        }, 1500);

      }

    });

  });


// ==========================================
// CURRENT YEAR
// ==========================================

const year =
  new Date().getFullYear();

const footer =
  document.querySelector("footer span");

if(footer){

  footer.innerText =
    `© ${year} iCoinGate`;

}


// ==========================================
// EXTERNAL LINKS
// ==========================================

document
  .querySelectorAll('a[target="_blank"]')
  .forEach(link => {

    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );

  });


// ==========================================
// SCROLL PROGRESS BAR
// ==========================================

const progressBar =
  document.getElementById("progressBar");

function updateProgress(){

  if(!progressBar) return;

  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  progressBar.style.width = `${pct}%`;

}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();


// ==========================================
// BACK TO TOP
// ==========================================

const toTopBtn =
  document.getElementById("toTop");

function updateToTop(){

  if(!toTopBtn) return;

  if(window.scrollY > 420){
    toTopBtn.classList.add("visible");
  } else {
    toTopBtn.classList.remove("visible");
  }

}

window.addEventListener("scroll", updateToTop, { passive: true });
updateToTop();

if(toTopBtn){

  toTopBtn.addEventListener("click", () => {

    window.scrollTo({ top: 0, behavior: "smooth" });

  });

}


// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

const revealEls =
  document.querySelectorAll(".reveal");

if("IntersectionObserver" in window && revealEls.length){

  const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);

      }

    });

  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealEls.forEach(el => revealObserver.observe(el));

} else {

  revealEls.forEach(el => el.classList.add("in-view"));

}


// ==========================================
// SCROLLSPY (DESKTOP NAV)
// ==========================================

const navLinks =
  document.querySelectorAll("[data-nav]");

const spySections = Array.from(navLinks)
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateActiveNav(){

  if(!spySections.length) return;

  let currentId = spySections[0].id;

  spySections.forEach(section => {

    const rect = section.getBoundingClientRect();

    if(rect.top <= 120){
      currentId = section.id;
    }

  });

  navLinks.forEach(link => {

    const isActive =
      link.getAttribute("href") === `#${currentId}`;

    link.classList.toggle("active", isActive);

  });

}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();


// ==========================================
// ANIMATED STAT COUNTERS
// ==========================================

const statEls =
  document.querySelectorAll(".stat strong[data-count]");

function animateCount(el){

  const target = parseFloat(el.getAttribute("data-count")) || 0;
  const suffix = el.getAttribute("data-suffix") || "";
  const duration = 1100;
  const start = performance.now();

  function tick(now){

    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);

    el.textContent = `${value}${suffix}`;

    if(progress < 1){
      requestAnimationFrame(tick);
    }

  }

  requestAnimationFrame(tick);

}

if("IntersectionObserver" in window && statEls.length){

  const statObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        animateCount(entry.target);
        observer.unobserve(entry.target);

      }

    });

  }, { threshold: 0.4 });

  statEls.forEach(el => statObserver.observe(el));

} else {

  statEls.forEach(el => {
    el.textContent = `${el.getAttribute("data-count")}${el.getAttribute("data-suffix") || ""}`;
  });

}


// ==========================================
// LIGHTWEIGHT JS SYNTAX HIGHLIGHTING
// ==========================================

function escapeHtml(str){

  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

}

function highlightJs(code){

  const escaped = escapeHtml(code);

  const pattern =
    /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|(\b(?:let|const|var|return|if|else|new|function|typeof|await|async)\b)/gm;

  return escaped.replace(pattern, (match, comment, str, num, kw) => {

    if(comment) return `<span class="tok-com">${comment}</span>`;
    if(str) return `<span class="tok-str">${str}</span>`;
    if(num) return `<span class="tok-num">${num}</span>`;
    if(kw) return `<span class="tok-kw">${kw}</span>`;

    return match;

  });

}

document
  .querySelectorAll("pre.language-js code")
  .forEach(codeEl => {

    const raw = codeEl.textContent;
    codeEl.innerHTML = highlightJs(raw);

  });
