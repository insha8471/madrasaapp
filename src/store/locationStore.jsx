import { create } from "zustand";
import axios from "axios";

const useLocationStore = create((set) => ({
  city: "",
  country: "",
  coords: null,
  loading: false,
  error: null,

  fetchLocation: () => {
    set({ loading: true, error: null });

    // gpt
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const res = await axios.get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client`,
            {
              params: {
                latitude: lat,
                longitude: lon,
                localityLanguage: "en"
              }
            }
          );

          set({
            city: res.data.city || res.data.locality || "",
            country: res.data.countryName || "",
            coords: { lat, lon },
            loading: false
          });

        } catch (err) {
          set({ error: err.message, loading: false });
        }
      },

      // fallback method
      async (err) => {
        console.warn("GPS FAILED, falling back to IP lookup…");

        try {
          await useLocationStore.getState().fetchIPLocation();
        } catch (e) {
          set({ error: e.message, loading: false });
        }
      }
    );
  },

  // ip fallback if user denied the access...
  fetchIPLocation: async () => {
    try {
      const res = await axios.get("https://ipapi.co/json/");

      const city = res.data.city || "";
      const country = res.data.country_name || "";
      const lat = res.data.latitude;
      const lon = res.data.longitude;

      set({
        city,
        country,
        coords: { lat, lon },
        loading: false,
        error: null
      });
    } catch (err) {
      set({
        error: "IP location lookup failed",
        loading: false
      });
    }
  }
}));

export default useLocationStore;
