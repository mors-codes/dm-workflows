import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SiteNav } from "@/components/sections/SiteNav";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { MotionProvider } from "@/components/ui/MotionProvider";

export const metadata: Metadata = {
  title: "DM Workflows — Operational Automation for Growing Businesses",
  description:
    "We build backend automation systems for growing businesses: lead follow-up, CRM syncing, document processing, and the operational work eating your team's week.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans">
        <MotionProvider>
          <SiteNav />
          {children}
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}