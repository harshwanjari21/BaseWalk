// Wrapper component for Farcaster integration
'use client';

interface FarcasterWrapperProps {
  children: React.ReactNode;
}

export default function FarcasterWrapper({ children }: FarcasterWrapperProps) {
  return (
    <div className="farcaster-wrapper">
      {children}
    </div>
  );
}