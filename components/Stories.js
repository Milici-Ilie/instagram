import minifaker from "minifaker"; //🧱🧱[MULTIPLE CONTENTS/GRID]🧱🧱 need it for createing the 'minifaker'
import "minifaker/locales/en"; //🧱🧱[MULTIPLE CONTENTS/GRID]🧱🧱 need it for createing the 'minifaker'
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";
import Story from "./Story";

// 🧱🧱[MULTIPLE CONTENTS/GRID]🧱🧱
export default function Stories() {
  const [storyUsers, setSoryUsers] = useState([]);
  const [currentUser] = useRecoilState(userState);
  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i, //so 'Math.ceil' will create a random selection from 1 to 70 according to Marth.random
    })); //we sent those 'IMG' & 'USERNAME' to 'Story.js'
    setSoryUsers(storyUsers);
    console.log(storyUsers);
  }, []); //🧱🧱[MULTIPLE CONTENTS/GRID]🧱🧱 here we are creating the 'minifaker' avatars
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none">
      {/* To make the Overflow on horizontal to be scrooled and not overflowing, write in Tailwind: 'overflow-x-scroll' */}
      {currentUser && (
        <Story
          img={currentUser?.userImg}
          username={currentUser?.username}
          isUser="true"
        />
      )}
      {storyUsers.map((user) => (
        <Story key={user.id} username={user.username} img={user.img} />
      ))}
    </div> //🧱🧱[MULTIPLE CONTENTS/GRID]🧱🧱 minifaker
  );
}
