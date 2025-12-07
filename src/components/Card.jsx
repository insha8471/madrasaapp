import PrayerCard from "./PrayerCard";
import useLocationStore from "../store/locationStore";
import usePrayerStore from "../store/prayerStore";
import { useEffect, useState } from "react";
import PrayerCardHeader from "./PrayerCardHeader";
import { convert24to12 } from "../utils/timeFormat";
import { getNextPrayerTime, getRemainingTime } from "../utils/getNextPrayerTime";
import { iconMap, prayerColors, prayerTimingFormat } from "../utils/helper";

const Card = () => {
    const {city, country} = useLocationStore();
    const {timings, fetchPrayerTimes, weekday} = usePrayerStore();

    //use to load the city and country
    useEffect(() => {
        if(city && country) {
            fetchPrayerTimes(city, country);
        }
    },[city, country])

    // prayer time
    const data = prayerTimingFormat(timings);

    // this function is used to get the next prayer data
    const nextPrayer = getNextPrayerTime(data);
    const [remaining, setRemaining] = useState(getRemainingTime(nextPrayer?.date));

    // it update the remaining timeb
    useEffect(() => {
        if (!nextPrayer) return;

        setRemaining(getRemainingTime(nextPrayer.date)); 

        const interval = setInterval(() => {
            setRemaining(getRemainingTime(nextPrayer.date));
        }, 60 * 1000); // every 1 minute

        return () => clearInterval(interval);
    }, [timings]);

     // it determine active prayer
     const prayersOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
     const now = new Date();

    //  it Parse into hours and minute
    const parseTime = (time) => {
        const [h, m] = time.split(":").map(Number);
        const d = new Date();
        d.setHours(h, m, 0, 0);
        return d;
    };

    if(!timings) return;

    // Determine current (active) prayer
    let currentPrayer = "Fajr"; // default
    for (let i = 0; i < prayersOrder.length; i++) {
        const p = prayersOrder[i];
        const prayerTime = parseTime(timings[p]);
        const nextPrayerTime = parseTime(timings[prayersOrder[(i + 1) % prayersOrder.length]]);
        if (now >= prayerTime && now < nextPrayerTime) {
            currentPrayer = p;
            break;
        }
        
        if (i === prayersOrder.length - 1 && now >= prayerTime) {
            currentPrayer = "Isha";
        }
    }


    return (
        <div className="p-2">
        <div className={`mt-4 p-6 rounded-xl border border-purple-300 hover:shadow-lg transiton w-full lg:w-100 
        bg-gradient-to-b ${prayerColors[currentPrayer]} h-80`}>
            <div>
                <div>
                    <PrayerCardHeader Icon={iconMap[nextPrayer?.name]} name={nextPrayer?.name} remainingTime={remaining} weekday={weekday} />
                </div>

                <div className="flex mx-auto items-center justify-between mt-2 p-2 gap-1">
                    {prayersOrder.map((p) => (
                        <PrayerCard 
                            key={p}
                            name={p} 
                            time={convert24to12(timings[p])} 
                            Icon={iconMap[p]} 
                            isActive={p === currentPrayer} // highlight current prayer
                        />
                    ))}
                </div>
            </div>
            
        </div>
        </div>
    )
}

export default Card;