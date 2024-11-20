(function ($) {
  /*
        1. Sticky Header
        2. Mobile Menu
        3. Bobile menu Toggle
        4. Back To Top
        5. Strech Image 
        6. Hero Slider
        7. wow js
        8. Pricing Tab
    */

  document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault();
    const switcher = document.getElementById("custom-language-switcher");
    const selectedOption = switcher.querySelector(".selected-option");
    const options = switcher.querySelector(".options");

    // Toggle the dropdown
    selectedOption.addEventListener("click", () => {
      options.style.display = options.style.display === "block" ? "none" : "block";
    });

    // Handle option click
    options.addEventListener("click", (e) => {
      if (e.target.tagName === "LI" || e.target.closest("LI")) {
        const li = e.target.closest("LI");
        const lang = li.getAttribute("data-lang");
        const imgSrc = li.querySelector("img").src;
        const text = li.textContent.trim();

        // Update selected option
        selectedOption.innerHTML = `<img src="${imgSrc}" alt="Flag"> ${text}`;
        options.style.display = "none";

        // Redirect to the selected language page
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        window.location.href = `/${lang}/${currentPage}`;
      }
    });

    // Close the dropdown if clicked outside
    document.addEventListener("click", (e) => {
      if (!switcher.contains(e.target)) {
        options.style.display = "none";
      }
    });
  });

  /**==============================================
   * Language Switcher
   */

  const languageSwitcher = document.getElementById("language-switcher");
  // Detect current path
  const currentPath = window.location.pathname;

  const currentLang = currentPath.includes("/ar/") ? "ar" : "en"; // Checks if the path contains 'ar'
  languageSwitcher.value = currentLang; // Set current dropdown selection

  // Add an event listener for switching languages
  languageSwitcher.addEventListener("change", function (e) {
    e.preventDefault();
    const selectedLang = this.value; // Get the selected language

    // Extract the current page name from the URL
    const pathParts = currentPath.split("/");
    console.log(pathParts);
    const currentPage = pathParts.pop() || "index.html"; // Fallback to 'index.html' if no page

    // Construct the new path based on the selected language
    const newPath = selectedLang === "ar" ? `/ar/${currentPage}` : `/en/${currentPage}`;

    // Redirect to the constructed path
    window.location.href = newPath;
  });

  /* document.addEventListener("DOMContentLoaded", function () {
    // Get the current page's filename
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    console.log(currentPage);
    // Generate links for language switching
    const enLink = "/en/" + currentPage;
    const arLink = "/ar/" + currentPage;

    document.getElementById("switch-en").href = enLink;
    document.getElementById("switch-ar").href = arLink;

    // Optional: Check if the file exists
    fetch(enLink).catch(() => (document.getElementById("switch-en").href = "/en/index.html"));
    fetch(arLink).catch(() => (document.getElementById("switch-ar").href = "/ar/index.html"));
  }); */

  // 1. Sticky Header
  document.addEventListener("DOMContentLoaded", function () {
    const stickyElement = document.querySelector(".isSticky");

    if (stickyElement) {
      const headerHeight = stickyElement.offsetHeight;

      window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
          stickyElement.classList.add("fixedHeader", "animate__animated", "animate__slideInDown");
        } else {
          stickyElement.classList.remove("fixedHeader", "animate__animated", "animate__slideInDown");
        }
      });
    }
  });

  // 2. Mobile Menu
  $(window).on("load", function (e) {
    $(".main_menu .sub-menu > a").on("click", function (e) {
      e.preventDefault();
      if ($(window).width() < 992) {
        $(this).siblings("ul").stop(true, true).slideToggle();
      }
    });
  });

  // 3. Bobile menu Toggle
  $(".humbarger-button").click(function () {
    $(".arabic_header_menus").slideToggle();
    $(this).toggleClass("active");
  });

  // 4. Back To Top
  function backtotop() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $("#backtotop").addClass("activate");
      } else {
        $("#backtotop").removeClass("activate");
      }
    });
    $("#backtotop").on("click", function () {
      $("html, body").animate({scrollTop: 0}, 600);
      return false;
    });
  }
  backtotop();

  // 5. Strech Image
  function aravic_stretch() {
    var windowWidth = window.innerWidth;

    // Apply stretch logic only if the window width is greater than 1921px
    document.querySelectorAll(".row .aravic_stretch-element-inside-column").forEach(function (element) {
      var row = element.closest(".row");
      var cols = element.closest('[class^="col-"]');
      var colsHeight = cols.offsetHeight;

      var rect = element.getBoundingClientRect();
      var rowRect = row.getBoundingClientRect();
      var colsRect = cols.getBoundingClientRect();

      var elementLeft = rect.left;
      var elementRight = rect.right;
      var rowLeft = rowRect.left + (parseFloat(getComputedStyle(row).paddingLeft) || 0);
      var rowRight = windowWidth - rowRect.right + (parseFloat(getComputedStyle(row).paddingRight) || 0);

      var colsLeft = colsRect.left;
      var colsRight = windowWidth - colsRect.right;

      var styles = {
        marginLeft: "0px",
        marginRight: "0px",
      };

      if (Math.round(rowLeft) === Math.round(colsLeft)) {
        var marginLeft = parseFloat(getComputedStyle(element).marginLeft) || 0;
        styles.marginLeft = marginLeft - elementLeft + "px";
      }

      if (Math.round(rowRight) === Math.round(colsRight)) {
        var marginRight = parseFloat(getComputedStyle(element).marginRight) || 0;
        styles.marginRight = marginRight - (windowWidth - elementRight) + "px";
      }

      Object.assign(element.style, styles);
    });
  }

  // Call the function on load
  aravic_stretch();

  // Also call it on window resize to ensure responsiveness
  window.addEventListener("resize", aravic_stretch);

  // 6. Hero Slider
  var swiper = new Swiper(".heroSlider", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // 7. wow js
  new WOW().init();

  // Number validation
  function validatePhoneNumber() {
    const phoneInput = document.getElementById("number").value;
    const numberError = document.getElementById("numberError");

    // Remove the '+' symbol if present
    const cleanedNumber = phoneInput.replace(/\+/g, "").trim();

    // Check if the number has exactly 9 digits
    if (cleanedNumber.length !== 12 || isNaN(cleanedNumber)) {
      numberError.textContent = "رقم الجوال يجب أن يحتوي على 9 أرقام.";
    } else {
      numberError.textContent = "";
    }
  }

  // Form validation before submitting
  document.getElementById("phoneInput").addEventListener("input", function () {
    const phoneNumber = this.value;
    const phoneRegex = /^[0-9]{9}$/;

    if (phoneRegex.test(phoneNumber)) {
      document.getElementById("numberError").textContent = "";
    } else {
      document.getElementById("numberError").textContent = "أدخل رقم هاتف صالح";
      document.getElementById("numberError").style.color = "red";
    }
  });
})(jQuery);

// Tab Audio Sound
var mouseclick = new Audio();
mouseclick.src = "https://uploads.sitepoint.com/wp-content/uploads/2023/06/1687569402mixkit-fast-double-click-on-mouse-275.wav";