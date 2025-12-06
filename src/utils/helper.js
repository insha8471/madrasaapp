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
    Fajr: "from-blue-500 to-purple-300",
    Dhuhr: "from-orange-500 to-yellow-300",
    Asr: "from-teal-700 to-green-300",
    Maghrib: "from-orange-400 to-pink-300",
    Isha: "from-violet-900 to-violet-500",
};

   export const iconMap = {
        Fajr: CloudMoonIcon,
        Dhuhr: SunIcon,
        Asr: CloudSunIcon,
        Maghrib: SunHorizonIcon,
        Isha: MoonStarsIcon,
    };