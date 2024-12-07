/* Consult form ============================================================== */
$(function () {
  $('.popup-consult form').on('submit', function (e) {
    e.preventDefault();

    const $form = $(this);
    $form.addClass('sending');
    var data = new FormData($form[0]);

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: data,
      contentType: false,
      processData: false,
      success: (function (data) {
        $form.addClass('thanks');
        $form.removeClass('sending');
        dataLayer.push({
          event: 'userEvent',
          eventCategory: 'conversions',
          eventAction: 'formSubmit',
          eventLabel: 'allLeads',
          eventNonInteraction: false,
          firingOptions: 'oncePerEvent'
        });
      }),
      error: (function () {
        alert('Oops... There was an error');
      })
    })
  });
});

/* Brochure form */
$(function () {
  $('.popup-brochure form').on('submit', function (e) {
    e.preventDefault();

    const $form = $(this);
    $form.addClass('sending');
    var data = new FormData($form[0]);

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: data,
      contentType: false,
      processData: false,
      success: (function (data) {
        window.location.href = "https://cdn.metropolitan.realestate/brochures/ava.pdf";
        $form.addClass('thanks');
        $form.removeClass('sending');
        dataLayer.push({
          event: 'userEvent',
          eventCategory: 'conversions',
          eventAction: 'formSubmit',
          eventLabel: 'allLeads',
          eventNonInteraction: false,
          firingOptions: 'oncePerEvent'
        });
      }),
      error: (function () {
        alert('Oops... There was an error');
      })
    })
  });
});

/* Popup floors form ================================================================ */
$(function () {
  $('.popup-floor form').on('submit', function (e) {
    e.preventDefault();

    const $form = $(this);
    $form.addClass('sending');
    var data = new FormData($form[0]);

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: data,
      contentType: false,
      processData: false,
      success: (function (data) {
        window.location.href = "https://cdn.metropolitan.realestate/brochures/ava-fp.pdf";
        $form.addClass('thanks');
        $form.removeClass('sending');
        dataLayer.push({
          event: 'userEvent',
          eventCategory: 'conversions',
          eventAction: 'formSubmit',
          eventLabel: 'allLeads',
          eventNonInteraction: false,
          firingOptions: 'oncePerEvent'
        });
      }),
      error: (function () {
        alert('Oops... There was an error');
      })
    })
  });
});

/* Sign up form ====================================================================== */
$(function () {
  $('.sign__form').on('submit', function (e) {
    e.preventDefault();

    const $form = $(this);
    $form.addClass('sending');
    var data = new FormData($form[0]);

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: data,
      contentType: false,
      processData: false,
      success: (function (data) {
        $('.form__succsess').css('display', 'flex');
        $form.removeClass('sending');
        setTimeout(() => {
          $('.form__succsess').css('display', 'none');
        }, 5000);
        dataLayer.push({
          event: 'userEvent',
          eventCategory: 'conversions',
          eventAction: 'formSubmit',
          eventLabel: 'allLeads',
          eventNonInteraction: false,
          firingOptions: 'oncePerEvent'
        });
      }),
      error: (function () {
        alert('Oops... There was an error');
      })
    })
  });
});

/* Footer form ====================================================================== */
$(function () {
  $('.footer__form').on('submit', function (e) {
    e.preventDefault();

    const $form = $(this);
    $form.addClass('sending');
    var data = new FormData($form[0]);

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: data,
      contentType: false,
      processData: false,
      success: (function (data) {
        $('.form__succsess').css('display', 'flex');
        $form.removeClass('sending');
        setTimeout(() => {
          $('.form__succsess').css('display', 'none');
        }, 5000);
        dataLayer.push({
          event: 'userEvent',
          eventCategory: 'conversions',
          eventAction: 'formSubmit',
          eventLabel: 'allLeads',
          eventNonInteraction: false,
          firingOptions: 'oncePerEvent'
        });
      }),
      error: (function () {
        alert('Oops... There was an error');
      })
    })
  });
});


function burgerMenu() {
  const burgerBtn = document.querySelector('.header__menu-btn');
  const burgerMenu = document.querySelector('.burger__menu');
  const burgerMenuClose = document.querySelector('.burger__menu-close');
  const overlay = document.querySelector('.burger__overlay');

  burgerBtn.addEventListener('click', () => {
    burgerMenu.style.display = 'block';
    setTimeout(() => {
      burgerMenu.classList.toggle('active');
    }, 0);
    overlay.classList.toggle('active');
    document.body.classList.add('active');
    document.querySelector('html').classList.add('active');
  })

  document.addEventListener('click', e => {
    if (e.target == burgerMenuClose || e.target == overlay) {
      setTimeout(() => {
        burgerMenu.style.display = 'none';
      }, 300);
      burgerMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('active');
      document.querySelector('html').classList.remove('active');
    }
  })
}

burgerMenu();


/* Open popups */
function openPopups() {
  const popups = document.querySelectorAll('.popup');
  const popupClose = document.querySelectorAll('.popup-close');
  const popupBtn = document.querySelectorAll('.popup-button');

  popupBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      popups.forEach(popup => {
        if (btn.dataset.popup == popup.dataset.popup) {
          popup.classList.add('active');
          document.body.classList.add('active');
        }
      })
    })
  })

  popupClose.forEach(closeItem => {
    closeItem.addEventListener('click', e => {
      popups.forEach(popup => {
        popup.classList.remove('active');
        document.body.classList.remove('active');
      })
    })
  })
}

openPopups();


/* Form input validation ============================== */
function formValidInput() {
  const form = document.querySelectorAll('form');

  form.forEach(form => {
    const formInput = form.querySelectorAll('input');

    formInput.forEach(input => {
      if (input.classList.contains('form-input')) {
        input.addEventListener('change', (e) => {
          if (input.classList.contains('input-non-animation')) {
            return
          } else {
            if (!input.value) {
              input.nextElementSibling.classList.remove('form-label-valid');
            } else {
              input.nextElementSibling.classList.add('form-label-valid');
            }
          }
        })
      }
    })
  })
};
formValidInput();


/* Form invalid input ======================= */
function formInvalidInput() {
  const allForms = document.querySelectorAll('form');

  allForms.forEach(form => {
    // const footerFormCheckbox = document.querySelector('.footer__form-input-policy'); IF I HAVE CHECKBOX!!!
    const formInputs = form.querySelectorAll('.form-input');
    const formButton = form.querySelectorAll('.form-button');

    formButton.forEach(button => {
      button.addEventListener('click', () => {
        formInputs.forEach(input => {
          if (!input.value) {
            input.classList.add('invalid-input');
          } else {
            input.classList.remove('invalid-input');
          }

          // if (!footerFormCheckbox.checked) {
          //   footerFormCheckbox.classList.add('invalid-checkbox')
          // } else {
          //   footerFormCheckbox.classList.remove('invalid-checkbox')
          // } IF A HAVE CHECKBOX!!!
        })
      })
    })
  })
};
formInvalidInput();


/* Limit number and email */
const limitNumber = e => {
  const value = e.value;
  e.value = value.replace(/[A-Za-zА-Яа-яЁё]/g, '');
}

const limitEmail = e => {
  const value = e.value;
  e.value = value.replace(/[А-Яа-яЁё]/g, '');
}


// Scroll anchor
function scrollToAnchor() {
  $('a[href*="#"]:not([href="#"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - '50'
        }, 700);

        const burgerMenu = document.querySelector('.burger__menu');
        const overlay = document.querySelector('.burger__overlay');
        setTimeout(() => {
          burgerMenu.style.display = 'none';
        }, 300);
        burgerMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('active');
        document.querySelector('html').classList.remove('active');
        return false;
      }
    }
  });
};
scrollToAnchor();


/* Google map ================================= */
document.addEventListener('DOMContentLoaded', () => {
  function initMap() {
    new google.maps.InfoWindow({ content: "", disableAutoPan: !0 });
    let a = { lat: 25.103353, lng: 55.15073, };
    myIcon = '/images/map-marker.png';
    let b = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: a,
      styles: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{ "color": "#dedede" }, { "lightness": 21 }]
      }, {
        "elementType": "labels.text.stroke",
        "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }]
      }, {
        "elementType": "labels.text.fill",
        "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }]
      }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }]
      }],
    });

    new google.maps.Marker({ position: a, map: b, icon: myIcon });
  }

  window.initMap = initMap;
  let googleMapLoaded = !1;
  jQuery(window).on("scroll", function () {
    if (!1 === googleMapLoaded && jQuery(window).scrollTop() > jQuery("#map").offset().top - jQuery(window).height()) {
      googleMapLoaded = !0;
      let a = document.createElement("script");
      (a.type = "text/javascript"), (a.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBUObrzHB_pcuCRlMbDPaIe385_I5t9WJo&callback=initMap"), document.body.appendChild(a);
    }
  });
})


/* For All Sites ================================== */
$(document).ready(function () {
  let userPower = {};
  $(document).on('input', 'input', function () {
    let name = $(this).attr('name');
    if (typeof userPower[name] !== "undefined") {
      userPower[name] = userPower[name] + 1;
    } else {
      userPower[name] = 1;
    }
  }).on('focus', 'input', function () {
    if (typeof userPower['focus'] !== "undefined") {
      userPower['focus'] = userPower['focus'] + 1;
    } else {
      userPower['focus'] = 1;
    }
  }).on('click', 'button, a', function () {
    if (typeof userPower['click'] !== "undefined") {
      userPower['click'] = userPower['click'] + 1;
    } else {
      userPower['click'] = 1;
    }
  });
  $('form').submit(function () {
    userPoints(userPower);
  });
});

function userPoints(userPower) {
  let user_ses = 0,
    input_score = 0;
  user_ses = user_ses + (Object.keys(userPower).length / 10);

  if (typeof userPower['focus'] !== "undefined" && userPower['focus'] >= (Object.keys(userPower).length - 2)) {
    user_ses = user_ses + 0.2;
  }
  if (typeof userPower['click'] !== "undefined") {
    user_ses = user_ses + 0.1;
  }
  for (const [key, value] of Object.entries(userPower)) {
    if (key != 'focus' && key != 'click') {
      input_score = input_score + value;
    }
  }
  if (typeof userPower['focus'] !== "undefined" && input_score >= (Object.keys(userPower).length - 2)) {
    user_ses = user_ses + 0.2;
  }
  saveCookie('user_score', user_ses);

  return user_ses;
}

function saveCookie(n, v, t = 30) {
  let saveDate = new Date(Date.now() + (60 * 60 * 24 * t * 1000));
  document.cookie = n + "=" + v + "; path=/; expires=" + saveDate.toGMTString();
}

function readCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}