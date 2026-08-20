// =====================================================
// WEDDING COUNTDOWN
// August 30, 2026 — 6:00 PM Ethiopia / East Africa Time
// =====================================================

const weddingDate = new Date("2026-08-30T18:00:00+03:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate.getTime() - now.getTime();

  const countdown = document.getElementById("countdown");

  if (!countdown) return;

  if (diff <= 0) {
    countdown.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:35px;
        font-size:28px;
        text-align:center;
      ">
        Today is the special day! ♡
      </div>
    `;

    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (daysElement) {
    daysElement.textContent = String(days).padStart(2, "0");
  }

  if (hoursElement) {
    hoursElement.textContent = String(hours).padStart(2, "0");
  }

  if (minutesElement) {
    minutesElement.textContent = String(minutes).padStart(2, "0");
  }

  if (secondsElement) {
    secondsElement.textContent = String(seconds).padStart(2, "0");
  }
}

// Run immediately
updateCountdown();

// Update every second
setInterval(updateCountdown, 1000);


// =====================================================
// TELEGRAM RSVP
// Telegram Username: @Hi_Dear
// =====================================================

const telegramUsername = "Hi_Dear";

const telegramText = encodeURIComponent(
  "Hello Hayder Ahmedin Ali & Husna Muhibu Nuri, " +
  "I would like to confirm my attendance for your wedding on August 30, 2026."
);

const rsvpButton = document.getElementById("rsvpButton");

if (rsvpButton) {
  rsvpButton.href =
    `https://t.me/${telegramUsername}?text=${telegramText}`;
}


// =====================================================
// SHARE INVITATION
// =====================================================

const shareButton = document.getElementById("shareBtn");

if (shareButton) {

  shareButton.addEventListener("click", async () => {

    const shareData = {
      title: "Hayder & Husna — Wedding Invitation",

      text:
  "Dear family and friends, " +
  "you are warmly invited to attend the wedding ceremony of " +
  "Hayder Ahmedin Ali & Husna Muhibu Nuri. " +
  "The wedding will take place on August 30, 2026. " +
  "We invite you to join us and share in our happiness. " +
  "After the Nikah ceremony, a dinner reception will be held at Boni International Hotel. " +
  "Your presence will make our celebration even more special! ♡",

      url: window.location.href
    };


    // ---------------------------------------------
    // Mobile / Modern Browser Share
    // ---------------------------------------------

    if (navigator.share) {

      try {

        await navigator.share(shareData);

      } catch (error) {

        // User cancelled share
        console.log("Share cancelled.");

      }

      return;
    }


    // ---------------------------------------------
    // Clipboard Fallback
    // ---------------------------------------------

    try {

      await navigator.clipboard.writeText(window.location.href);

      shareButton.textContent = "Link Copied ✓";

      setTimeout(() => {

        shareButton.textContent = "Share Invitation";

      }, 2200);

    } catch (error) {

      alert(
        "Copy this page URL from your browser to share the invitation."
      );

    }

  });

}


// =====================================================
// GOOGLE MAPS DIRECTIONS
// Boni International Hotel
// =====================================================

function getDirections() {

  // Boni International Hotel coordinates
  const destination = "7.6713028,36.839189";


  // ---------------------------------------------
  // Browser does not support Geolocation
  // ---------------------------------------------

  if (!navigator.geolocation) {

    const mapsUrl =
      `https://www.google.com/maps/dir/?api=1` +
      `&destination=${encodeURIComponent(destination)}` +
      `&travelmode=driving`;

    window.open(mapsUrl, "_blank");

    return;
  }


  // ---------------------------------------------
  // Get Current Location
  // ---------------------------------------------

  navigator.geolocation.getCurrentPosition(

    function (position) {

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const origin = `${latitude},${longitude}`;


      const mapsUrl =
        `https://www.google.com/maps/dir/?api=1` +
        `&origin=${encodeURIComponent(origin)}` +
        `&destination=${encodeURIComponent(destination)}` +
        `&travelmode=driving`;


      window.open(mapsUrl, "_blank");

    },


    // ---------------------------------------------
    // Location Permission Denied / Error
    // ---------------------------------------------

    function () {

      const mapsUrl =
        `https://www.google.com/maps/dir/?api=1` +
        `&destination=${encodeURIComponent(destination)}` +
        `&travelmode=driving`;

      window.open(mapsUrl, "_blank");

    },


    // ---------------------------------------------
    // Location Settings
    // ---------------------------------------------

    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    }

  );

}


// =====================================================
// ENVELOPE / LETTER ANIMATION
// =====================================================

const envelope = document.getElementById("envelope");

let envelopeTimeout;


// Make sure envelope exists
if (envelope) {


  // ===================================================
  // MOUSE ENTER
  // ===================================================

  envelope.addEventListener("mouseenter", () => {

    clearTimeout(envelopeTimeout);

    envelope.classList.add("letter-open");


    // Automatically close after 3 seconds

    envelopeTimeout = setTimeout(() => {

      envelope.classList.remove("letter-open");

    }, 3000);

  });


  // ===================================================
  // MOUSE LEAVE
  // ===================================================

  envelope.addEventListener("mouseleave", () => {

    clearTimeout(envelopeTimeout);


    // Small delay before closing

    envelopeTimeout = setTimeout(() => {

      envelope.classList.remove("letter-open");

    }, 700);

  });


  // ===================================================
  // CLICK
  // ===================================================

  envelope.addEventListener("click", () => {

    clearTimeout(envelopeTimeout);


    envelope.classList.toggle("letter-open");


    // If opened, automatically close after 3 seconds

    if (envelope.classList.contains("letter-open")) {

      envelopeTimeout = setTimeout(() => {

        envelope.classList.remove("letter-open");

      }, 3000);

    }

  });

}
