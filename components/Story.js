import { PlusIcon } from "@heroicons/react/solid"; //👩‍🏫👩‍🏫[DYNAMIC PROFILE DATA]👩‍🏫👩‍🏫 ICON that will be displayed on the Profile ICON

// 🧱🧱[MULTIPLE CONTENTS/GRID]🧱🧱
export default function Story({ img, username, isUser }) {
  // 'img' 'username' 'isUser' are imported from 'Stories.js' file
  //👩‍🏫👩‍🏫[DYNAMIC PROFILE DATA]👩‍🏫👩‍🏫 also the 'isUser'
  return (
    <div className="relative group cursor-pointer">
      {/* ❗ First we need to add a class 'group' (in our case) to a box/container parent that incapsulate other elements. Than we must specifie the hover to be applyed to all those ellements 'group-hover:scale-110' */}
      <img
        className="h-14 rounded-full p-[1.5px] border-red-500 border-2 group-hover:scale-110 transition-transform duration-200 ease-out"
        src={img}
        alt={username}
      />
      {/* 👩‍🏫👩‍🏫[DYNAMIC PROFILE DATA]👩‍🏫👩‍🏫 here we are creating the 'PlusIcon' that will be displayed on the Pofile User IMG */}
      {isUser && <PlusIcon className="h-6 absolute top-4 left-4 text-white" />}
      <p className="text-xs w-14 truncate">{username}</p>
    </div>
  );
}
