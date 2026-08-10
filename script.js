// Wedding date: August 30, 2026 at 6:00 PM (Ethiopia / East Africa Time)
const weddingDate = new Date("2026-08-30T18:00:00+03:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML =
      '<div style="grid-column:1/-1;padding:35px;font-size:28px">Today is the special day! ♡</div>';
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Replace this number with the family's WhatsApp number in international format.
// Example: 2519XXXXXXXX (do not include +, spaces, or leading 0).
const rsvpPhone = "251945052858";
const rsvpText = encodeURIComponent(
  "Hello Hayder Ahmedin Ali & Husna Muhibu Nuri, I would like to confirm my attendance for your wedding on August 30, 2026."
);
document.getElementById("rsvpButton").href =
  `https://wa.me/${rsvpPhone}?text=${rsvpText}`;

document.getElementById("shareBtn").addEventListener("click", async () => {
  const shareData = {
    title: "Hayder & Husna — Wedding Invitation",
    text: "You are invited to celebrate the wedding of Hayder Ahmedin Ali & Husna Muhibu Nuri on August 30, 2026.",
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (_) {}
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href);
      document.getElementById("shareBtn").textContent = "Link Copied ✓";
      setTimeout(() => document.getElementById("shareBtn").textContent = "Share Invitation", 2200);
    } catch (_) {
      alert("Copy this page URL from your browser to share the invitation.");
    }
  }
});

function getDirections() {
  const destination = "7.685848,36.839799";

  // Check whether the browser supports location
  if (!navigator.geolocation) {
    // Fallback: let Google Maps determine current location
    const mapsUrl =
      `https://www.google.com/maps/dir/?api=1` +
      `&destination=${encodeURIComponent(destination)}` +
      `&travelmode=driving`;

    window.open(mapsUrl, "_blank");
    return;
  }

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

      // Open Google Maps
      window.open(mapsUrl, "_blank");
    },

    function (error) {

      // If user denies location permission,
      // Google Maps can still ask for location itself.
      const mapsUrl =
        `https://www.google.com/maps/dir/?api=1` +
        `&destination=${encodeURIComponent(destination)}` +
        `&travelmode=driving`;

      window.open(mapsUrl, "_blank");
    },

    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    }
  );
}
