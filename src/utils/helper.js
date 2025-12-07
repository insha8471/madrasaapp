import { CloudMoonIcon, CloudSunIcon, MoonStarsIcon, SunHorizonIcon, SunIcon } from "@phosphor-icons/react";

export function prayerTimingFormat(timings) {
    return {
        Fajr: timings?.Fajr,
        Dhuhr: timings?.Dhuhr,
        Asr: timings?.Asr,
        Maghrib: timings?.Maghrib,
        Isha : timings?.Isha
    }
}

export const prayerColors = {
    Fajr: "from-[#447fe7] to-[#d1bbfe]",
    Dhuhr: "from-[#ea8525] to-[#fede8c]",
    Asr: "from-[#157a67] to-[#b6e6ab]",
    Maghrib: "from-[#ff9453] to-[#ff88a7]",
    Isha: "from-[#ff9452] to-[#ff88a8]",
};

   export const iconMap = {
        Fajr: CloudMoonIcon,
        Dhuhr: SunIcon,
        Asr: CloudSunIcon,
        Maghrib: SunHorizonIcon,
        Isha: MoonStarsIcon,
    };



export const getProgress = (timings, currentPrayer, nextPrayer) => {
  if (!timings || !currentPrayer || !nextPrayer) return 0;

  const start = parseTime(timings[currentPrayer]);
  const end = parseTime(timings[nextPrayer]);

  if (!start || !end) return 0;

  const now = new Date();

  // handle next prayer being after midnight
  if (end < start) end.setDate(end.getDate() + 1);

  const total = end - start;        // total duration between prayers
  const passed = now - start;       // time already passed

  const progress = passed / total;

  return Math.min(1, Math.max(0, progress));   // clamp 0–1
};

export const parseTime = (time) => {
  if (!time || typeof time !== "string" || !time.includes(":")) return null;
  const [h, m] = time.split(":");
  const d = new Date();
  d.setHours(h);
  d.setMinutes(m);
  d.setSeconds(0);
  return d;
};