/* =========================================================
   VELOCITY EXPERIENCE
   Interaction + GSAP Animation System
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);


  /* =========================================================
     LOADING SCREEN
     ========================================================= */

  document.body.classList.add("loading");

  const loader = document.getElementById("loader");
  const loaderPercent = document.getElementById("loaderPercent");
  const loaderProgress = document.getElementById("loaderProgress");
  const loaderText = document.getElementById("loaderText");

  const loaderMessages = [
    "INITIALIZING EXPERIENCE",
    "LOADING PERFORMANCE",
    "CALIBRATING DESIGN",
    "PREPARING VELOCITY"
  ];

  let progress = {
    value: 0
  };

  gsap.to(progress, {
    value: 100,
    duration: 2.4,
    ease: "power2.inOut",

    onUpdate: () => {

      const value = Math.round(progress.value);

      loaderPercent.textContent = value;
      loaderProgress.style.width = `${value}%`;

      const messageIndex = Math.min(
        Math.floor(value / 25),
        loaderMessages.length - 1
      );

      loaderText.textContent = loaderMessages[messageIndex];
    },

    onComplete: finishLoading
  });


  function finishLoading() {

    const timeline = gsap.timeline({
      onComplete: () => {

        document.body.classList.remove("loading");

        heroAnimation();
      }
    });

    timeline
      .to(".loader-content", {
        scale: 1.08,
        opacity: 0,
        duration: 0.45,
        ease: "power2.in"
      })

      .to(".loader", {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.9,
        ease: "power4.inOut"
      }, "-=0.1");
  }



  /* =========================================================
     HERO INTRO ANIMATION
     ========================================================= */

  function heroAnimation() {

    const timeline = gsap.timeline();

    timeline

      // Navbar
      .from("#navbar", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })

      // Small heading
      .from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.6
      }, "-=0.35")

      // Main title
      .from(".hero-title span", {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out"
      }, "-=0.2")

      // Description
      .from(".hero-copy", {
        y: 25,
        opacity: 0,
        duration: 0.7
      }, "-=0.55")

      // Button
      .from(".hero-content .primary-btn", {
        y: 20,
        opacity: 0,
        duration: 0.6
      }, "-=0.4")

      // Car
      .from(".hero-visual", {
        x: 100,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out"
      }, "-=1")

      // Bottom information
      .from(".hero-meta, .scroll-cue", {
        opacity: 0,
        duration: 0.7
      }, "-=0.5");


    // Slowly animate the cyan glow
    gsap.to(".hero-orb", {
      scale: 1.15,
      opacity: 0.7,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }



  /* =========================================================
     NAVBAR SCROLL EFFECT
     ========================================================= */

  const navbar = document.getElementById("navbar");

  ScrollTrigger.create({

    start: "top -80",

    onEnter: () => {
      navbar.classList.add("scrolled");
    },

    onLeaveBack: () => {
      navbar.classList.remove("scrolled");
    }

  });



  /* =========================================================
     MOBILE MENU
     ========================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks =
    document.querySelectorAll(".mobile-menu-content > a");

  let menuOpen = false;


  menuToggle.addEventListener("click", () => {

    menuOpen = !menuOpen;

    menuToggle.classList.toggle("active", menuOpen);


    if (menuOpen) {

      document.body.classList.add("loading");

      gsap.timeline()

        .to(mobileMenu, {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.7,
          ease: "power4.inOut"
        })

        .from(mobileLinks, {
          y: 50,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out"
        }, "-=0.25");

    } else {

      closeMenu();

    }

  });


  function closeMenu() {

    menuOpen = false;

    menuToggle.classList.remove("active");


    gsap.to(mobileMenu, {

      clipPath: "inset(0 0 100% 0)",

      duration: 0.65,

      ease: "power4.inOut",

      onComplete: () => {
        document.body.classList.remove("loading");
      }

    });

  }


  mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

      if (menuOpen) {
        closeMenu();
      }

    });

  });



  /* =========================================================
     SCROLL REVEAL ANIMATIONS
     ========================================================= */

  const revealElements =
    gsap.utils.toArray(".reveal");


  revealElements.forEach(element => {

    gsap.to(element, {

      y: 0,
      opacity: 1,

      duration: 1,

      ease: "power3.out",

      scrollTrigger: {

        trigger: element,

        start: "top 86%",

        once: true

      }

    });

  });



  /* =========================================================
     PERFORMANCE NUMBER COUNTERS
     ========================================================= */

  const statNumbers =
    document.querySelectorAll(".stat-number");


  statNumbers.forEach(number => {

    const target =
      parseFloat(number.dataset.target);

    const hasDecimal =
      String(target).includes(".");

    const counter = {
      value: 0
    };


    gsap.to(counter, {

      value: target,

      duration: 1.8,

      ease: "power3.out",

      scrollTrigger: {

        trigger: number,

        start: "top 85%",

        once: true

      },

      onUpdate: () => {

        number.textContent =
          counter.value.toFixed(hasDecimal ? 1 : 0);

      }

    });

  });



  /* =========================================================
     3D VEHICLE CARDS
     ========================================================= */

  const cards =
    document.querySelectorAll(".tilt-card");


  cards.forEach(card => {

    const image = card.querySelector("img");
    const shine = card.querySelector(".card-shine");
    const info = card.querySelector(".card-info");


    card.addEventListener("mousemove", event => {

      // Disable tilt on smaller screens
      if (window.innerWidth <= 900) {
        return;
      }


      const rect =
        card.getBoundingClientRect();


      const mouseX =
        event.clientX - rect.left;

      const mouseY =
        event.clientY - rect.top;


      // Convert mouse position into values between -0.5 and 0.5
      const x =
        mouseX / rect.width - 0.5;

      const y =
        mouseY / rect.height - 0.5;


      // Calculate card rotation
      const rotateY = x * 14;
      const rotateX = y * -14;


      // Card movement
      gsap.to(card, {

        rotateX: rotateX,
        rotateY: rotateY,

        transformPerspective: 900,

        duration: 0.35,

        ease: "power2.out"

      });


      // Image movement
      gsap.to(image, {

        x: x * 10,
        y: y * 10,

        scale: 1.06,

        duration: 0.4,

        ease: "power2.out"

      });


      // Text movement
      gsap.to(info, {

        x: x * 8,
        y: y * 5,

        duration: 0.4,

        ease: "power2.out"

      });


      // Light sweep
      gsap.to(shine, {

        x: x * 160,

        duration: 0.4,

        ease: "power2.out"

      });

    });



    // Reset card when mouse leaves
    card.addEventListener("mouseleave", () => {

      gsap.to(card, {

        rotateX: 0,
        rotateY: 0,

        duration: 0.7,

        ease: "elastic.out(1, 0.5)"

      });


      gsap.to(image, {

        x: 0,
        y: 0,
        scale: 1,

        duration: 0.7,

        ease: "power3.out"

      });


      gsap.to(info, {

        x: 0,
        y: 0,

        duration: 0.7,

        ease: "power3.out"

      });

    });

  });



  /* =========================================================
     HERO MOUSE PARALLAX
     ========================================================= */

  if (window.innerWidth > 900) {

    const heroImage =
      document.querySelector(".hero-image-wrap");


    window.addEventListener("mousemove", event => {

      const mouseX =
        event.clientX / window.innerWidth - 0.5;

      const mouseY =
        event.clientY / window.innerHeight - 0.5;


      gsap.to(heroImage, {

        x: mouseX * 24,
        y: mouseY * 16,

        duration: 1.2,

        ease: "power3.out"

      });

    });

  }



  /* =========================================================
     CINEMATIC IMAGE SCALE
     ========================================================= */

  const cinematicImages =
    document.querySelectorAll(
      ".design-image img, .experience-bg img"
    );


  cinematicImages.forEach(image => {

    gsap.fromTo(

      image,

      {
        scale: 1.12
      },

      {
        scale: 1,

        ease: "none",

        scrollTrigger: {

          trigger: image,

          start: "top bottom",

          end: "bottom top",

          scrub: 1.2

        }

      }

    );

  });



  /* =========================================================
     GALLERY MOVEMENT
     ========================================================= */

  if (window.innerWidth > 900) {

    gsap.to(".gallery-track", {

      x: -70,

      ease: "none",

      scrollTrigger: {

        trigger: ".gallery",

        start: "top bottom",

        end: "bottom top",

        scrub: 1

      }

    });

  }



  /* =========================================================
     CTA BACKGROUND PARALLAX
     ========================================================= */

  gsap.to(".experience-bg", {

    yPercent: 10,

    ease: "none",

    scrollTrigger: {

      trigger: ".experience",

      start: "top bottom",

      end: "bottom top",

      scrub: 1

    }

  });



  /* =========================================================
     MAGNETIC-LITE BUTTON EFFECT
     ========================================================= */

  const magneticButtons =
    document.querySelectorAll(
      ".primary-btn, .nav-cta"
    );


  magneticButtons.forEach(button => {

    button.addEventListener("mousemove", event => {

      if (window.innerWidth <= 900) {
        return;
      }


      const rect =
        button.getBoundingClientRect();


      const x =
        event.clientX -
        rect.left -
        rect.width / 2;


      const y =
        event.clientY -
        rect.top -
        rect.height / 2;


      gsap.to(button, {

        x: x * 0.12,
        y: y * 0.12,

        duration: 0.3,

        ease: "power2.out"

      });

    });


    button.addEventListener("mouseleave", () => {

      gsap.to(button, {

        x: 0,
        y: 0,

        duration: 0.5,

        ease: "elastic.out(1, 0.4)"

      });

    });

  });



  /* =========================================================
     SMOOTH ANCHOR NAVIGATION
     ========================================================= */

  const anchorLinks =
    document.querySelectorAll('a[href^="#"]');


  anchorLinks.forEach(link => {

    link.addEventListener("click", event => {

      const targetID =
        link.getAttribute("href");


      if (!targetID || targetID === "#") {
        return;
      }


      const target =
        document.querySelector(targetID);


      if (!target) {
        return;
      }


      event.preventDefault();


      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });



  /* =========================================================
     REFRESH SCROLLTRIGGER
     ========================================================= */

  window.addEventListener("load", () => {

    ScrollTrigger.refresh();

  });

});