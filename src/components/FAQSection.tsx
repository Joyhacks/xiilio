import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { HelpCircle, ArrowRight } from "lucide-react";

export function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="relative py-16 bg-muted/30">
      <div className="absolute inset-0 circuit-pattern opacity-10" />

      <div className="relative container mx-auto px-6">
        <div
          ref={ref}
          className={cn(
            "max-w-2xl mx-auto transition-all duration-700 ease-out",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          <Link
            to="/faq"
            className="group block glass-card rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <HelpCircle className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl md:text-3xl font-bold">
                  Frequently Asked <span className="text-gradient">Questions</span>
                </h2>
              </div>
              <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-muted-foreground">
              Everything you need to know about getting started with your AI agent team.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
