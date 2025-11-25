export default function TermsPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose max-w-none">
        <h2>1. Acceptance of Terms</h2>
        <p>By using the Fitbit Steps Tracker app, you agree to these terms of service.</p>
        
        <h2>2. Description of Service</h2>
        <p>Our app connects to your Fitbit account to display your daily step count in a Farcaster mini app format.</p>
        
        <h2>3. Privacy</h2>
        <p>We only access your step data as permitted by Fitbit's API. Your data is encrypted and stored securely.</p>
        
        <h2>4. Data Usage</h2>
        <p>We collect only the necessary step data to provide the service. We do not share your data with third parties.</p>
        
        <h2>5. Contact</h2>
        <p>For questions about these terms, contact us through the app.</p>
      </div>
    </div>
  );
}