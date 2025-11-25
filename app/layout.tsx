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
            {/* Splash Screen */}
            <div id="splash-screen" className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 z-50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl flex items-center justify-center p-4">
                  <img 
                    src="/basewalk-icon-200x200.png" 
                    alt="BaseWalk" 
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => {
                      // Fallback to SVG icon if image fails
                      e.currentTarget.style.display = 'none';
                      const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                      if (sibling) {
                        sibling.style.display = 'block';
                      }
                    }}
                  />
                  <div className="hidden w-16 h-16 text-white">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.5L9 9.3c-1.5 1.5-1.5 3.9 0 5.4l.8.8c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0l-.8-.8c-2.3-2.3-2.3-6.1 0-8.4l.8-.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4zm5.6 0c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l.8.8c2.3 2.3 2.3 6.1 0 8.4l-.8.8c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l.8-.8c1.5-1.5 1.5-3.9 0-5.4l-.8-.8c-.4-.4-.4-1 0-1.4z"/>
                    </svg>
                  </div>
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
