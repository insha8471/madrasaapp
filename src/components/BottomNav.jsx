import { BookOpenTextIcon, HouseSimpleIcon, ListHeartIcon, MosqueIcon, SquaresFourIcon } from "@phosphor-icons/react";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-200 flex justify-around items-center py-4">
      <div className="flex flex-col items-center text-purple-500">
        <span><HouseSimpleIcon size={25}/></span>
        <p className="text-md font-bold">Home</p>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <span><BookOpenTextIcon size={25}/></span>
        <p className="text-md font-bold">Quran</p>
      </div>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 text-white">
        <SquaresFourIcon size={25} />
      </div>

      <div className="flex flex-col items-center text-gray-400">
        <span><MosqueIcon size={25}/></span>
        <p className="text-md font-bold">Maktab</p>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <span><ListHeartIcon size={25}/></span>
        <p className="text-md font-bold">Dua</p>
      </div>
    </div>
  );
};

export default BottomNav;
