
import posthog from 'posthog-js';

export function initializeAnalytics() {
  if (typeof window === 'undefined') return;
  
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  
  if (!posthogKey) {
    console.warn('PostHog API key not configured - analytics disabled');
    return;
  }
  
  posthog.init(posthogKey, {
    api_host: posthogHost || 'https://app.posthog.com',
    disable_session_recording: process.env.NODE_ENV === 'development',
  });
  
  return posthog;
}
