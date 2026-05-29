const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

export function loadGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return;
  if (window.gtag) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    cookie_domain: "auto",
    cookie_update: true,
    cookie_expires: 63072000,
  });
}

export function trackEvent(eventName, params = {}) {
  // Never send names, emails, phone numbers, or private notes to analytics.
  if (window.gtag) {
    window.gtag("event", eventName, params);
  }
}
