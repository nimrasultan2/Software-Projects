const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const bg = document.getElementById("bg");

window.addEventListener("scroll", () => {
  bg.style.transform = `translateY(${window.scrollY * 0.16}px)`;
});

document.querySelectorAll(".tile").forEach((tile) => {
  tile.addEventListener("mousedown", () => {
    tile.style.transform = "scale(.98)";
  });

  tile.addEventListener("mouseup", () => {
    tile.style.transform = "";
  });

  tile.addEventListener("mouseleave", () => {
    tile.style.transform = "";
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeButton = document.getElementById("close");

document.querySelectorAll(".tile img").forEach((image) => {
    image.addEventListener("click", () => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.classList.add("show");
        document.body.style.overflow = "hidden";
    });
});

closeButton.addEventListener("click", () => {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
});

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.classList.remove("show");
        document.body.style.overflow = "";
    }
});
