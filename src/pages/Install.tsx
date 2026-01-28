import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { Download, Smartphone, Share, Plus, CheckCircle2, ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Install() {
  const navigate = useNavigate();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  const handleInstall = async () => {
    const success = await install();
    if (success) {
      // Show success state - already handled by isInstalled
    }
  };

  // If already installed, show success message
  if (isInstalled) {
    return (
      <>
        <SEO
          title="Install App"
          description="Install 24Twelve on your device for instant access to your AI team from your home screen."
          canonical="/install"
          noindex
        />
        <div className="min-h-screen bg-background">
          <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Already Installed!</h1>
            <p className="text-muted-foreground">
              24Twelve is already installed on your device. You can find it on your home screen.
            </p>
            <Button onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Install App"
        description="Install 24Twelve on your device for instant access to your AI team. Works offline, loads instantly, no app store required."
        keywords="install 24Twelve, PWA, progressive web app, mobile app, home screen app"
        canonical="/install"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center shadow-lg">
              <Smartphone className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Install 24Twelve</h1>
            <p className="text-muted-foreground">
              Get instant access to your AI team right from your home screen. Works offline and loads instantly.
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-muted/30 rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-lg">Why install?</h2>
            <ul className="space-y-3">
              {[
                "Instant access from your home screen",
                "Faster loading times",
                "Works offline",
                "No app store required",
                "Always up to date",
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Install Actions */}
          {isInstallable ? (
            <Button onClick={handleInstall} size="lg" className="w-full gap-2">
              <Download className="w-5 h-5" />
              Install Now
            </Button>
          ) : isIOS ? (
            <div className="bg-muted/30 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Share className="w-5 h-5" />
                Install on iPhone/iPad
              </h2>
              <ol className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>
                    Tap the <strong>Share</strong> button{" "}
                    <Share className="w-4 h-4 inline-block" /> in Safari's toolbar
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>
                    Scroll down and tap{" "}
                    <strong className="inline-flex items-center gap-1">
                      <Plus className="w-4 h-4" /> Add to Home Screen
                    </strong>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>
                    Tap <strong>Add</strong> in the top right corner
                  </span>
                </li>
              </ol>
            </div>
          ) : (
            <div className="bg-muted/30 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Download className="w-5 h-5" />
                Install on Android
              </h2>
              <ol className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>
                    Tap the <strong>menu</strong> (⋮) in Chrome's toolbar
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>
                    Tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>
                    Confirm by tapping <strong>Install</strong>
                  </span>
                </li>
              </ol>
            </div>
          )}

          {/* Back button */}
          <Button variant="outline" onClick={() => navigate("/")} className="w-full gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
