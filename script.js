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
  "ሰላም ሃይደር አህመዲን አሊ እና ሁስና ሙሂቡ ኑሪ፣ በነሐሴ 24 ቀን 2018 ዓ.ም. (August 30, 2026) በሚካሄደው የሰርጋችሁ ስነስራአት ላይ መገኘቴን በደስታ አረጋግጣለሁ። ከእናንተ ጋር ይህን ልዩ ቀን ለማክበር በመገኘቴ ደስተኛ ነኝ። ለሁለታችሁም የተባረከና የደስታ የጋብቻ ሕይወት እመኛለሁ። ❤️"
);
document.getElementById("rsvpButton").href =
  `https://wa.me/${rsvpPhone}?text=${rsvpText}`;

document.getElementById("shareBtn").addEventListener("click", async () => {
  const shareData = {
    title: "Hayder & Husna — Wedding Invitation",
   text: "የተከበራችሁ ወዳጅ ዘመዶቻችን፣ የሃይደር አህመዲን አሊ እና የሁስና ሙሂቡ ኑሪ የሰርግ ስነስራአት ላይ እንድትገኙ በአክብሮት ተጋብዛችኋል። በነሐሴ 24 ቀን 2018 ዓ.ም. (August 30, 2026) ከእኛ ጋር ደስታችንን እንድትጋሩ እንጋብዛችኋለን። ከኒካህ ሥነ-ሥርዓቱ በኋላ በቦኒ ኢንተርናሽናል ሆቴል የእራት ግብዣ ተዘጋጅቷል። መገኘታችሁ ደስታችንን ይሞላል! ♡",
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
  // Boni International Hotel coordinates
  const destination = "7.6713028,36.839189";

  // Check whether the browser supports location
  if (!navigator.geolocation) {
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

      window.open(mapsUrl, "_blank");
    },

    function () {
      // If location permission is denied
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


const envelope = document.getElementById("envelope");

let envelopeTimeout;

envelope.addEventListener("mouseenter", () => {
  clearTimeout(envelopeTimeout);

  envelope.classList.add("letter-open");

  // Automatically close after 3 seconds
  envelopeTimeout = setTimeout(() => {
    envelope.classList.remove("letter-open");
  }, 3000);
});

envelope.addEventListener("mouseleave", () => {
  clearTimeout(envelopeTimeout);

  // Small delay before closing
  envelopeTimeout = setTimeout(() => {
    envelope.classList.remove("letter-open");
  }, 700);
});

envelope.addEventListener("click", () => {
  clearTimeout(envelopeTimeout);

  envelope.classList.toggle("letter-open");

  if (envelope.classList.contains("letter-open")) {
    envelopeTimeout = setTimeout(() => {
      envelope.classList.remove("letter-open");
    }, 3000);
  }
});
