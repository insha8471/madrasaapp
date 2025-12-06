const PrayerCard = ({name, time, Icon, isActive}) => {
    return (
        <div className={` ${isActive ? "text-white" : "text-slate-300"}`}>
            <Icon className="mx-auto" size={25}/>
            <div className="text-center text-sm font-bold pt-2">
                <p className="font-medium">{name}</p>
                <p className="font-sm">{time}</p>
            </div>
        </div>
    )
}

export default PrayerCard;