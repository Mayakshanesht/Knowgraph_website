import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Download, Globe, Smartphone, ShieldCheck } from "lucide-react";

const API = "https://knowgraph-api.greenlifeai.workers.dev/v1/media/app";

export default function GetApp() {
  return (
    <Layout>
      <section className="relative pt-28 md:pt-36 pb-16 hero-gradient overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Get the App
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Learn in reels — on Android today, in any browser right now.
          </p>
        </div>
      </section>

      <Section className="py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl bg-card border border-border shadow-card">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">Android</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Direct download, signed by us. Your phone may ask you to allow
              installs from the browser — that's normal for apps installed
              outside the Play Store.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <a href={`${API}/knowgraph-arm64-v8a.apk`}>
                  <Download className="w-4 h-4 mr-2" /> Download APK (most phones)
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full">
                <a href={`${API}/knowgraph-armeabi-v7a.apk`}>
                  Older phones (32-bit)
                </a>
              </Button>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <a className="underline" href={`${API}/checksums.txt`}>
                  Verify your download (SHA-256)
                </a>
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border text-sm text-muted-foreground space-y-1">
              <p>📦 Play Store — coming soon</p>
              <p>🍎 iOS — coming soon</p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border shadow-card">
            <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-teal" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">
              Use in your browser
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              The full app — feed, courses, AI tutor, knowledge graph — with
              nothing to install. Works on any device.
            </p>
            <Button asChild variant="outline" className="w-full">
              <a href="/app/">Open the Web App</a>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
