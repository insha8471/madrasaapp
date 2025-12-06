const PrayerCardHeader = ({Icon,name ,  remainingTime, weekday}) => {
    return (
        <div>
            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2 text-white">
                    <span ><Icon size={25} /></span>
                    <p className="text-xl font-bold">{name}</p>
                </div>
                    <p className="font-bold px-3 py-0.5 bg-black/28 rounded-full text-white">{weekday}</p>
                </div>
            <p className="font-medium text-white">Next prayer in {" "}
                {remainingTime ? `${remainingTime.hours}h ${remainingTime.minutes}m` : "—"}</p>
        </div>
    )
}

export default PrayerCardHeader;