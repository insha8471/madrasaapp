import { MapPinLineIcon } from "@phosphor-icons/react";
import madrasaLogo from "../assets/madrasaLogo.svg";
import { useEffect } from "react";
import useLocationStore from "../store/locationStore";

const Navbar = () => {

    const city = useLocationStore((state) => state.city);
    const country = useLocationStore((state) => state.country);
    const loading = useLocationStore((state) => state.loading);
    const fetchLocation = useLocationStore((state) => state.fetchLocation);

    useEffect(() => {
        fetchLocation();
    },[])

    const handleLocationClick = () => {
        fetchLocation();
    }

    return (
        <div className="w-full px-4 py-3 bg-white shadow-md">
            <div className="flex justify-between">
                {/* logo */}
                <img src={madrasaLogo} alt="madrasa logo" className='h-10' />

                {/*  user location */}
                <div className="flex flex-col items-end font-poppins cursor-pointer" onClick={handleLocationClick}>
                    <p className="text-black-500 text-md md:text-md font-bold">{city ? "Your Location" : "Select Location"}</p>
                    <h3 className="text-purple-500 text-sm flex items-center gap-1"> <span><MapPinLineIcon size={15} weight="fill"/></span> { loading ? "Refreshing Location" : `${city}, ${country}` || "Get accurate namaz time" } </h3>
                </div>

            </div>
        </div>
    )
}

export default Navbar;