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
      (err) => {
        set({ error: err.message, loading: false });
      }
    );
  }
}));

export default useLocationStore;
