import type { Metadata } from "next";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
          <body className="font-sans antialiased">
            {children}
          </body>
        </html>
      );
}

export const metadata: Metadata = {
        title: "BaseWalk - Fitbit Steps Tracker",
        description: "Track your daily steps from your Fitbit device in Farcaster. OAuth secure, auto-sync every 3 hours.",
        other: { 
            "fc:frame": "vNext"
        }
    };
