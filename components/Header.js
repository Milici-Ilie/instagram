import Image from "next/image";
import { useEffect } from "react";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline"; //🔎🔎[SEARCH BAR & TCSS]🔎🔎 importing the icons
import { HomeIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil"; //💨💨[UPLOADING IMG's]💨💨
import { modalState } from "../atom/modalAtom"; //💨💨[UPLOADING IMG's]💨💨
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; //🚦🚥[SIGN IN]🚦🚥 'signOut' configuration from firebase
import { doc, getDoc } from "firebase/firestore";
import { userState } from "../atom/userAtom";
import { db } from "../firebase";

//🎧🎧[HEADER COMPONENT]🎧🎧

export default function Header() {
  const [open, setOpen] = useRecoilState(modalState); //💨💨[UPLOADING IMG's]💨💨
  const [currentUser, setCurrentUser] = useRecoilState(userState); //🚦🚥[SIGN IN]🚦🚥 here we are initialized the User LOG IN account
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUser = async () => {
          console.log(user);
          const docRef = doc(
            db,
            "users",
            user.auth.currentUser.providerData[0].uid
          );
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data());
          }
        };
        fetchUser();
      }
    });
  }, []);

  function onSignOut() {
    signOut(auth);
    setCurrentUser(null);
  }
  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30">
      {/* 🍢🍢[STICKY HEADER]🍢🍢 we need to wrap all the Header content inside of a <div>...</div>, the 'div' from above 👆 🍢🍢[STICKY HEADER]🍢🍢 */}
      <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        {/* Left */}
        <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
          <Image
            src="http://www.jennexplores.com/wp-content/uploads/2015/09/Instagram_logo_black.png"
            layout="fill" //🎧🎧[HEADER COMPONENT]🎧🎧 we need also to write the 'layout='fill'' ==== the 'className=...' from bellow it's the Tailwind that make the IMG to fit the cointaer, also above in the <div> ... here ...</div> we also apply some styles with TCSS and also for different screens, mediaqueries
            className="object-contain"
            onClick={() => router.push("/")}
          />
          {/* 🎧🎧[HEADER COMPONENT]🎧🎧 we dirrectly coppyed the IMG adress, but to make this work we need also to add the link security for this image inside of 'next.config.js', you will now what link because the NextJs will allert you with the message that contains that link */}
        </div>
        <div className="cursor-pointer h-24 w-10 relative  lg:hidden">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/800px-Instagram_logo_2016.svg.png"
            layout="fill"
            className="object-contain"
            onClick={() => router.push("/")} //🎧🎧[HEADER COMPONENT]🎧🎧 the same thing like the IMG from above 👆 also note that the both IMG's has connection onClick when they are clicked ❗❗❗❗ NOTE -> this logo will replace the original one only when the screeen is smaller, on big screen the image/logo from above will be displayed
          />
        </div>
        {/* Middle */}

        <div className="relative mt-1">
          <div className="absolute top-2 left-2">
            <SearchIcon className="h-5 text-gray-500" />
          </div>
          {/* 🔎🔎[SEARCH BAR & TCSS]🔎🔎  */}
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
          />
        </div>
        {/* 🔎🔎[SEARCH BAR & TCSS]🔎🔎 */}

        {/* Right */}

        <div className="flex space-x-4 items-center">
          <HomeIcon
            onClick={() => router.push("/")}
            className="hidden md:inline-flex  h-6 cursor-pointer hover:scale-125 transition-tranform duration-200 ease-out"
          />
          {currentUser ? (
            <>
              {/* 🏠🏠[HOME ICON, PROFILE & MENU]🏠🏠 🏠🏠[HOME ICON, PROFILE & MENU]🏠🏠 */}
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="h-6 cursor-pointer hover:scale-125 transition-tranform duration-200 ease-out"
              />
              <img
                onClick={onSignOut} //SIGN OUT Button, check the imported 'SignIn' and 'SignOut' 👆
                src={currentUser?.userImg} //🚦🚥[SIGN IN]🚦🚥 instead of hard coding the IMG we need to do this dynamic
                alt="user-image"
                className="h-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            // 🚦🚥[SIGN IN]🚦🚥 if the User exist/LOG IN usccessed we show the IMG profile from above 👆 that is wrapped in the <>...</> fragments. {currentUser ? (etc etc)} 🚦🚥[SIGN IN]🚦🚥 also down 👇 we created the <button>...</button> responsible for LOG in
            // 🏠🏠[HOME ICON, PROFILE & MENU]🏠🏠
            <button onClick={() => router.push("/auth/signin")}>Sign in</button> //🚦🚥[SIGN IN]🚦🚥 also here we need to implement the Sign In
          )}
        </div>
      </div>
    </div>
  );
}
