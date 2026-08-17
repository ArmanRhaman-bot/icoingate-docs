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

        setTimeout(() => {

          button.innerText =
            oldText;

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