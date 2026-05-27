import { useEffect, useState } from "react";
import { ConfiguratorPage } from "./components/configurator/ConfiguratorPage";
import { HomePage } from "./components/home/HomePage";
import { CookieBanner } from "./components/shared/CookieBanner";
import { loadGoogleAnalytics, trackEvent } from "./utils/analytics";
import { getStoredValue, setStoredValue } from "./utils/storage";

const PACKAGE_SLUGS = {
  starter: "basic",
  business: "advanced",
  premium: "premium",
};

const SLUG_PACKAGES = Object.fromEntries(Object.entries(PACKAGE_SLUGS).map(([key, slug]) => [slug, key]));
const BASE_URL = import.meta.env.BASE_URL || "/";

function withBase(path = "") {
  const base = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
  return `${base}${path.replace(/^\//, "")}`;
}

function getPlanHref(packageKey = "starter") {
  return withBase(`plan/${PACKAGE_SLUGS[packageKey] || PACKAGE_SLUGS.starter}`);
}

function getRouteFromLocation() {
  const basePath = new URL(BASE_URL, window.location.origin).pathname.replace(/\/$/, "");
  const pathname = window.location.pathname;
  const relativePath = basePath && pathname.startsWith(basePath) ? pathname.slice(basePath.length) || "/" : pathname;
  const segments = relativePath.split("/").filter(Boolean);

  if (segments[0] === "plan") {
    return {
      view: "configurator",
      initialPackageKey: SLUG_PACKAGES[segments[1]] || "starter",
    };
  }

  return { view: "home", initialPackageKey: "" };
}

export  function App() {
  const [route, setRoute] = useState(getRouteFromLocation);
  const [analyticsConsent, setAnalyticsConsent] = useState(() => getStoredValue("qw_analytics_consent", "unset"));

  useEffect(() => {
    if (analyticsConsent === "accepted") {
      loadGoogleAnalytics();
      trackEvent("analytics_consent_accepted");
    }
  }, [analyticsConsent]);

  useEffect(() => {
    const syncRoute = () => setRoute(getRouteFromLocation());
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  useEffect(() => {
    const description =
      route.view === "configurator"
        ? "Start a NaarWeb website plan from €199 and configure the package, features, timeline and project details."
        : "NaarWeb creates clear website plans and small business websites starting from €199.";

    document.title =
      route.view === "configurator"
        ? "Start a Website Plan from €199 | NaarWeb"
        : "NaarWeb | Website Plans for Small Businesses";
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [route.view]);

  const navigate = (nextRoute, href) => {
    window.history.pushState({}, "", href);
    setRoute(nextRoute);
  };

  const openConfigurator = (packageKey = "starter") => {
    const selectedPackage = packageKey || "starter";
    navigate({ view: "configurator", initialPackageKey: selectedPackage }, getPlanHref(selectedPackage));
  };

  const backHome = () => {
    navigate({ view: "home", initialPackageKey: "" }, withBase());
  };

  const acceptAnalytics = () => {
    setStoredValue("qw_analytics_consent", "accepted");
    setAnalyticsConsent("accepted");
  };

  const declineAnalytics = () => {
    setStoredValue("qw_analytics_consent", "declined");
    setAnalyticsConsent("declined");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-main)]">
      {route.view === "home" ? (
        <HomePage onStart={openConfigurator} getPlanHref={getPlanHref} />
      ) : (
        <ConfiguratorPage key={route.initialPackageKey || "starter"} initialPackageKey={route.initialPackageKey || "starter"} onBackHome={backHome} />
      )}
      {analyticsConsent === "unset" && <CookieBanner onAccept={acceptAnalytics} onDecline={declineAnalytics} />}
    </div>
  );
}

export default App;
