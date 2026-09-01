import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proxima Digital | ERPNext & Business Consulting",
  description: "ERPNext implementation, ERP consultation, and business consulting by Proxima Digital and Mr. Adil Usman.",
  openGraph: {
    title: "Proxima Digital",
    description: "ERPNext implementation and business consulting that turns complexity into clarity.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Proxima Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proxima Digital",
    description: "ERPNext implementation and business consulting that turns complexity into clarity.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
