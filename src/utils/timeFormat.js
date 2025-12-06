
export function convert24to12(time){
    if(!time) return "5:31 AM";

    let [hour, minutes] = time?.split(":");
    hour = parseInt(hour);

    const ampm = hour >= 12  ? "PM" : "AM";
    hour = hour % 12 || 12;

    return `${hour}:${minutes} ${ampm}`;
}