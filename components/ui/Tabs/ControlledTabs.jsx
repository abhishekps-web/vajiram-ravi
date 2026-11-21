'use client';
/* Tabs for a React component that owns the chosen tab: <ControlledTabs items={…} value={id} onChange={id => …} />. The same bar and
   pill as everywhere (Tabs.jsx, tabs-core.js); React renders aria-selected, tabs-core moves the pill and handles the keys. */
import { useEffect, useLayoutEffect, useRef } from 'react';
import Tabs from './Tabs';
import { initTabs } from './tabs-core';

export default function ControlledTabs({ value, onChange, ...props }) {
  const ref = useRef(null);
  const api = useRef(null);
  const change = useRef(onChange);
  change.current = onChange;

  useEffect(() => {
    api.current = initTabs(ref.current, { controlled: true, onSelect: id => change.current(id) });
    return () => { if (api.current) api.current.destroy(); api.current = null; };
  }, []);
  useLayoutEffect(() => { if (api.current) { api.current.place(false); api.current.centre(true); } }, [value]);

  return <Tabs ref={ref} value={value} {...props} />;
}
