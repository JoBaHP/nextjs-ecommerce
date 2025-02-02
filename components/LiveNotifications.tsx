'use client';

import { useEffect, useState } from 'react';
import * as Toast from '@radix-ui/react-toast';

const LiveNotifications = ({ slug }: { slug: string }) => {
  const [liveViews, setLiveViews] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

useEffect(() => {
  let previousViews: number | null = null; // Keep track of previous live views

  const fetchLiveViews = async () => {
    try {
      const res = await fetch(`/api/product/views/${slug}`, { method: 'POST' });
      const data = await res.json();

      if (data.liveViews !== undefined && data.liveViews !== previousViews) {
        setLiveViews(data.liveViews);
        setOpen(true);
        previousViews = data.liveViews; // Update previous count
      }
    } catch (error) {
      console.error('Failed to fetch live views:', error);
    }
  };

  fetchLiveViews(); // Fetch on mount
  const interval = setInterval(fetchLiveViews, 10000); // Fetch every 10 seconds

  return () => clearInterval(interval);
}, [slug]); // Remove `liveViews` dependency to avoid unnecessary re-renders


  return (
    <Toast.Provider swipeDirection="right">
      {liveViews !== null && liveViews > 0 && (
        <Toast.Root
          className="bg-black text-white px-4 py-2 rounded-lg shadow-lg"
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title>{liveViews} people are currently viewing this item.</Toast.Title>
        </Toast.Root>
      )}
      <Toast.Viewport className="fixed bottom-4 right-4 w-[300px] flex flex-col gap-2" />
    </Toast.Provider>
  );
};

export default LiveNotifications;
