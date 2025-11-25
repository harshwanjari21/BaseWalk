export const FITBIT_CONFIG = {
  clientId: process.env.FITBIT_CLIENT_ID || '',
  clientSecret: process.env.FITBIT_CLIENT_SECRET || '',
  redirectUri: process.env.FITBIT_REDIRECT_URI || '',
  authorizationUrl: 'https://www.fitbit.com/oauth2/authorize',
  tokenUrl: 'https://api.fitbit.com/oauth2/token',
  apiBaseUrl: 'https://api.fitbit.com',
  scopes: 'activity',
};

export const SYNC_INTERVAL_HOURS = 3;