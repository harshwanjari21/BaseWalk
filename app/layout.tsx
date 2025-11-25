import type { Metadata } from "next";
import "./globals.css";
import { ResponseLogger } from "@/components/response-logger";
import { ReadyNotifier } from "@/components/ready-notifier";
import FarcasterWrapper from "@/components/FarcasterWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
          <body
            className="font-sans antialiased"
          >
            {/* Do not remove this component, we use it to notify the parent that the mini-app is ready */}
            <ReadyNotifier />
            
      <FarcasterWrapper>
        {children}
      </FarcasterWrapper>
      
            <ResponseLogger />
          </body>
        </html>
      );
}

export const metadata: Metadata = {
        title: "Fitbit Step Sync",
        description: "Connect your Fitbit to track steps via OAuth. Sync data every 3 hours and view step count on a simple React frontend. Manage data with MySQL. Get hosting and setup guidance.",
        other: { "fc:frame": JSON.stringify({"version":"next","imageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/thumbnail_eeccf9d0-5aeb-4849-bc21-e7a1efe60fda-D7L9qrmEvXcCJ9P44voI46ZAIY1w78","button":{"title":"Open with Ohara","action":{"type":"launch_frame","name":"Fitbit Step Sync","url":"https://income-shout-016.app.ohara.ai","splashImageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/farcaster/splash_images/splash_image1.svg","splashBackgroundColor":"#ffffff"}}})
        }
    };
