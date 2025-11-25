export default function PrivacyPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <h2>Information We Collect</h2>
        <p>We collect only your daily step count data from your Fitbit device through Fitbit's official API.</p>
        
        <h2>How We Use Your Information</h2>
        <p>Your step data is used solely to display your daily step count within the Farcaster mini app interface.</p>
        
        <h2>Data Security</h2>
        <p>All authentication tokens are encrypted using AES-256 encryption. Your data is stored securely in our cloud database.</p>
        
        <h2>Data Sharing</h2>
        <p>We do not share, sell, or distribute your personal data to any third parties.</p>
        
        <h2>Data Retention</h2>
        <p>We retain your step data only as long as you use our service. You can request data deletion at any time.</p>
        
        <h2>Your Rights</h2>
        <p>You can revoke access to your Fitbit data at any time through your Fitbit account settings.</p>
        
        <h2>Contact Us</h2>
        <p>For privacy-related questions, contact us through the app.</p>
      </div>
    </div>
  );
}