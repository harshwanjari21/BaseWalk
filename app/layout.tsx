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
            {/* Load Farcaster SDK - Updated for better compatibility */}
            <script>
              window.farcasterSdkLoaded = false;
            </script>
            <script
              src="https://unpkg.com/@farcaster/miniapp-sdk@0.2.1/dist/farcaster.js"
              onLoad="window.farcasterSdkLoaded = true;"
            />
          </head>
          <body className="font-sans antialiased">
            {/* Splash Screen */}
            <div id="splash-screen" className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 z-50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl flex items-center justify-center p-4">
                  <img 
                    src="/basewalk-icon-200x200.png" 
                    alt="BaseWalk" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">BaseWalk</h1>
                <p className="text-gray-600 mb-6">Fitbit Step Tracker</p>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            </div>
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
