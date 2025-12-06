export function getNextPrayerTime(prayers) {
  const now = new Date();
  const fajr = toDate(prayers.Fajr);
  const dhuhr = toDate(prayers.Dhuhr);
  const asr = toDate(prayers.Asr);
  const maghrib = toDate(prayers.Maghrib);
  const isha = toDate(prayers.Isha);

  if (now < fajr) return { name: "Fajr", time: prayers.Fajr, date: fajr };
  if (now < dhuhr) return { name: "Dhuhr", time: prayers.Dhuhr, date: dhuhr };
  if (now < asr) return { name: "Asr", time: prayers.Asr, date: asr };
  if (now < maghrib) return { name: "Maghrib", time: prayers.Maghrib, date: maghrib };
  if (now < isha) return { name: "Isha", time: prayers.Isha, date: isha };

    const nextFajr = new Date(fajr);
  nextFajr.setDate(nextFajr.getDate() + 1);

  return { name: "Fajr", time: prayers.Fajr, date: nextFajr };
}

function toDate(time) {
    if(!time) return null;
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}


export function getRemainingTime(nextDate) {
  const now = new Date();
  let diff = nextDate - now;

  if (diff < 0) diff = 0;

  const totalMinutes = Math.floor(diff / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}

