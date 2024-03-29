import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

// 🧱🧱[MULTIPLE CONTENTS/GRID]🧱🧱
export default function Feed() {
  const [currentUser] = useRecoilState(userState);
  return (
    // 🎓🎓[GRID]🎓🎓 here we are creating the GRID that contains 3 collumns at the begging and at small screens remain only 1 collumn created with 2 small collumns that represent the IMG's and principal content in our case
    <main
      className={`grid ${
        currentUser
          ? "grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto"
          : "grid-cols-1 md:grid-cols-2 md:max-w-3xl mx-auto"
      }  `} //👩‍🏫👩‍🏫[DYNAMIC PROFILE DATA]👩‍🏫👩‍🏫 here we create the new aspect of the page if the 'user' is not LOGED IN, if the 'user' is LOG OUT the miniprofile side bar from right must gone, if not than all the page will be restructured, because there will be one collumn dissppear or appear
    >
      <section className="md:col-span-2">
        {/* Stories */}
        <Stories />

        {/* Posts */}
        <Posts />
      </section>

      {/* 🎓🎓[GRID]🎓🎓 .. 👇 .. 🎓🎓[GRID]🎓🎓 */}
      <section className="hidden md:inline-grid md:col-span-1">
        <div className="fixed w-[380px]">
          {/* 🎓🎓[GRID]🎓🎓 here we are creating the FIXED part even if we scroll down and also check the 'MiniProfile.js' file from bellow 👇 */}
          {/* Mini Profile */}

          <MiniProfile />
          {/* Suggestions */}

          <Suggestions />
        </div>
      </section>
    </main>
  );
}
