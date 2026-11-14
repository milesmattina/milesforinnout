import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://milesforinnout.vercel.app"),
  icons: { icon: "/favicon.svg" },
  title: {
    default: "Miles Mattina for In-N-Out Burger",
    template: "%s | Miles Mattina for In-N-Out Burger",
  },
  description:
    "An independent, interactive In-N-Out Burger application by Miles Mattina. The work, the receipts, and a resume to go.",
  twitter: { card: "summary_large_image", images: ["/social-preview.png"] },
  openGraph: {
    title: "Miles Mattina for In-N-Out Burger",
    description:
      "An independent, interactive In-N-Out Burger application by Miles Mattina. The work, the receipts, and a resume to go.",
    type: "website",
    images: [{ url: "/social-preview.png", width: 1200, height: 630, alt: "Miles Mattina for In-N-Out Burger — Who is this guy?" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${montserrat.variable} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
