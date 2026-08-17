// ===============================
// MOBILE SIDEBAR
// ===============================

const menuBtn =
  document.getElementById("menuBtn");

const sidebar =
  document.getElementById("sidebar");


menuBtn.addEventListener(
  "click",
  () => {

    sidebar.classList.toggle("open");

  }
);


// ===============================
// CLOSE SIDEBAR AFTER NAVIGATION
// ===============================

document
  .querySelectorAll(".nav-link")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        sidebar.classList.remove("open");

      }
    );

  });


// ===============================
// COPY BUTTON
// ===============================

document
  .querySelectorAll(".copy-btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      async () => {

        const targetId =
          button.dataset.copyTarget;

        const target =
          document.getElementById(targetId);

        if (!target) return;

        const text =
          target.innerText;

        try {

          await navigator.clipboard.writeText(
            text
          );

          const original =
            button.textContent;

          button.textContent =
            "Copied";

          setTimeout(() => {

            button.textContent =
              original;

          }, 1400);

        } catch (error) {

          button.textContent =
            "Failed";

          setTimeout(() => {

            button.textContent =
              "Copy";

          }, 1400);

        }

      }
    );

  });


// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections =
  document.querySelectorAll(
    ".doc-section, .hero"
  );

const navLinks =
  document.querySelectorAll(
    ".nav-link"
  );


const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting)
          return;

        navLinks.forEach(link => {

          link.classList.remove(
            "active"
          );

        });

        const active =
          document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`
          );

        if (active) {

          active.classList.add(
            "active"
          );

        }

      });

    },

    {
      rootMargin:
        "-20% 0px -70% 0px"
    }

  );


sections.forEach(section => {

  observer.observe(section);

});