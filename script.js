// CURSOR
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
const EMAILJS_PUBLIC_KEY = 'GE9BRRo8pPs-yGPmf';
const EMAILJS_SERVICE_ID = 'service_hd3cjhw';
const EMAILJS_TEMPLATE_ID = 'template_v353jya';

if (window.emailjs) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .project-item, .skill-tag, .edu-card, .cert-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// LOADER
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loader-bar');
  const counter = document.getElementById('loader-counter');
  const name = document.getElementById('loader-name');
  const tag = document.getElementById('loader-tag');

  gsap.to(name, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 });
  gsap.to(tag, { opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 });

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        gsap.to(loader, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => {
            loader.style.display = 'none';
            initAnimations();
          }
        });
      }, 300);
    }
    bar.style.width = progress + '%';
    counter.textContent = String(Math.floor(progress)).padStart(3, '0');
  }, 60);
});

// GSAP ANIMATIONS
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.title-line', {
    yPercent: 110,
    stagger: 0.12,
    duration: 1,
    ease: 'power4.out'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.floor(this.targets()[0].val) + '+';
          }
        });
      }
    });
  });
}

// CONTACT FORM
async function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  const successMsg = document.getElementById('form-success');

  btn.disabled = true;
  btn.innerHTML = '<span>Sending...</span>';
  successMsg.style.display = 'none';
  successMsg.style.color = '#1f5c4a';

  try {
    if (!window.emailjs) {
      throw new Error('EmailJS SDK failed to load.');
    }

    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, e.target);

    btn.innerHTML = '<span>Sent &#10003;</span>';
    successMsg.textContent = 'Message sent successfully! I will get back to you soon.';
    successMsg.style.display = 'block';
    e.target.reset();
  } catch (error) {
    btn.innerHTML = '<span>Try Again</span>';
    const errorText = error?.text || error?.message || 'Unknown EmailJS error';
    successMsg.textContent = `Message could not be sent: ${errorText}`;
    successMsg.style.color = '#b42318';
    successMsg.style.display = 'block';
  } finally {
    setTimeout(() => {
      btn.innerHTML = '<span>Send Message &rarr;</span>';
      btn.disabled = false;
    }, 3000);
  }
}

// MOBILE MENU
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    }
  });
});
