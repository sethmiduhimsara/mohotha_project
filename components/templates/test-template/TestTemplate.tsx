"use client";

import Link from "next/link";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export default function TestTemplate() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Section className="flex min-h-screen items-center justify-center py-24">
        <div className="max-w-2xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
            Test Template
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">
            Template <span className="text-primary italic">Preview</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-sm md:text-base leading-relaxed text-foreground/70">
            This is a separate template folder and route for testing layout,
            navigation, and deployment structure before you build the final
            invitation.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* <Button href="/wedding-invitation" variant="primary">
              Open Wedding Invitation
            </Button> */}
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}