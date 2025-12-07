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