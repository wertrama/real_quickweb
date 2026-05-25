import { useEffect, useState } from "react";
import { ConfiguratorPage } from "./components/configurator/ConfiguratorPage";
import { HomePage } from "./components/home/HomePage";
import { CookieBanner } from "./components/shared/CookieBanner";
import { loadGoogleAnalytics, trackEvent } from "./utils/analytics";
import { getStoredValue, setStoredValue } from "./utils/storage";

export function App() {
  const [view, setView] = useState("home");
  const [initialPackageKey, setInitialPackageKey] = useState("");
  const [analyticsConsent, setAnalyticsConsent] = useState(() => getStoredValue("qw_analytics_consent", "unset"));

  useEffect(() => {
    if (analyticsConsent === "accepted") {
      loadGoogleAnalytics();
      trackEvent("analytics_consent_accepted");
    }
  }, [analyticsConsent]);

  const openConfigurator = (packageKey = "") => {
    setInitialPackageKey(packageKey);
    setView("configurator");
  };

  const backHome = () => {
    setView("home");
    setInitialPackageKey("");
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
      {view === "home" ? (
        <HomePage onStart={openConfigurator} />
      ) : (
        <ConfiguratorPage key={initialPackageKey || "recommendation-flow"} initialPackageKey={initialPackageKey} onBackHome={backHome} />
      )}
      {analyticsConsent === "unset" && <CookieBanner onAccept={acceptAnalytics} onDecline={declineAnalytics} />}
    </div>
  );
}

export default App;
