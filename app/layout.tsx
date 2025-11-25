import type { Metadata } from "next";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
          <head>
            {/* Load Farcaster SDK */}
            <script
              async
              src="https://esm.sh/@farcaster/miniapp-sdk@0.2.1/dist/farcaster.js"
            />
          </head>
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
