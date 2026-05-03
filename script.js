/* =============================================
   QUEEN BEAUTY PARLOUR – script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ---- Hamburger menu ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  /* ---- Service Tabs ---- */
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabContent = document.querySelectorAll('.tab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContent.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById('tab-' + btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  /* ---- Gallery Filter ---- */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ---- Star Rating Widget ---- */
  const stars       = document.querySelectorAll('.rate-star');
  const rateLabel   = document.getElementById('rateLabel');
  const submitBtn   = document.getElementById('submitRating');
  const rateMsg     = document.getElementById('rateMsg');
  const rateComment = document.getElementById('rateComment');
  let selectedRating = 0;

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent!'];

  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      const val = parseInt(star.dataset.val);
      highlightStars(val);
      rateLabel.textContent = ratingLabels[val];
    });
    star.addEventListener('mouseleave', () => {
      highlightStars(selectedRating);
      rateLabel.textContent = selectedRating ? ratingLabels[selectedRating] : 'Tap a star to rate';
    });
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.dataset.val);
      highlightStars(selectedRating);
      rateLabel.textContent = ratingLabels[selectedRating];
    });
  });

  function highlightStars(val) {
    stars.forEach(s => {
      const sVal = parseInt(s.dataset.val);
      s.classList.remove('fa-solid', 'fa-regular', 'selected');
      if (sVal <= val) {
        s.classList.add('fa-solid', 'selected');
      } else {
        s.classList.add('fa-regular');
      }
    });
  }

  submitBtn.addEventListener('click', () => {
    if (!selectedRating) {
      rateMsg.textContent = '⚠️ Please select a star rating first.';
      rateMsg.style.color = '#e05c3a';
      return;
    }
    const comment = rateComment.value.trim();
    rateMsg.textContent = `✅ Thank you for your ${ratingLabels[selectedRating]} rating (${selectedRating}★)! We appreciate your feedback.`;
    rateMsg.style.color = '#2a7a4a';
    rateComment.value = '';
    selectedRating = 0;
    highlightStars(0);
    rateLabel.textContent = 'Tap a star to rate';
  });

  /* ---- Book via WhatsApp ---- */
  const bookBtn = document.getElementById('bookBtn');
  bookBtn.addEventListener('click', () => {
    const name    = document.getElementById('cfName').value.trim();
    const phone   = document.getElementById('cfPhone').value.trim();
    const service = document.getElementById('cfService').value;
    const date    = document.getElementById('cfDate').value;
    const msg     = document.getElementById('cfMsg').value.trim();

    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    let text = `Hi Queen Beauty Parlour! 👑%0A%0AI'd like to book an appointment.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}`;
    if (service) text += `%0A*Service:* ${encodeURIComponent(service)}`;
    if (date)    text += `%0A*Preferred Date:* ${encodeURIComponent(date)}`;
    if (msg)     text += `%0A*Note:* ${encodeURIComponent(msg)}`;

    window.open(`https://wa.me/919571084712?text=${text}`, '_blank');
  });

  /* ---- Back to Top ---- */
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });
  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Scroll reveal (simple IntersectionObserver) ---- */
  const revealEls = document.querySelectorAll(
    '.service-card, .review-card, .info-card, .gallery-item, .about-images, .about-text'
  );
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

});
