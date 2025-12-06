import { DownloadIcon } from "@phosphor-icons/react";
import { create } from "zustand";

const usePrayerStore = create((set) => ({
  timings: null,
  weekday: null,
  loading: false,
  error: null,

  fetchPrayerTimes: async (city, country) => {
    set({ loading: true, error: null }); 

    try {
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=1`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch prayer times");
      }

      const data = await res.json();

      // If API returns an error message inside JSON
      if (!data || data.code !== 200) {
        throw new Error(data.data || "Invalid API response");
      }
      set({ timings: data.data.timings, weekday: data?.data?.date?.gregorian?.weekday?.en,  loading: false });
    } catch (err) {
      console.error("Error fetching prayer times:", err.message);

      set({
        error: err.message || "Something went wrong",
        loading: false,
      });
    }
  },
}));

export default usePrayerStore;
