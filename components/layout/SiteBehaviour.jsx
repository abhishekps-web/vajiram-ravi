'use client';

import { useEffect } from 'react';

// Starts the page's behaviours (lib/behaviour.js) once React has hydrated the server-rendered sections. They build and
// animate the DOM imperatively, so they must not run before hydration (their changes would read as mismatches), and they
// are loaded with a dynamic import so none of their browser-only code is evaluated on the server.
export default function SiteBehaviour() {
  useEffect(() => {
    import('@/lib/behaviour').then(m => m.start());
  }, []);
  return null;
}
