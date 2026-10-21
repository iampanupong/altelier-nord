// Sample imagery helpers. Both URL shapes must match the remotePatterns in next.config.ts

export const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

export const unsplashCloseUp = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&h=2000&q=80&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=2`;
