import minifaker from "minifaker";
import "minifaker/locales/en";
import { useEffect, useState } from "react";

// 🍭🍭[SUGGESTION FOR YOU]🍭🍭 creatin the Suggestion section === here also we use 'minifaker', for more details about this check the previous lessons about 'minifakers'
export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]); //🍭🍭[SUGGESTION FOR YOU]🍭🍭 here will be added the suggestion peoples
  useEffect(() => {
    const suggestions = minifaker.array(5, (i) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      jobTitle: minifaker.jobTitle(),
      id: i,
    })); //🍭🍭[SUGGESTION FOR YOU]🍭🍭 creating the 'minifaker' profiles list === we are displaying the name, that should be in english 'en' and also the job title of those peoples. The 'id' will be equal to index (i) === also in these array will be displayed only 5 minifaker profiles .... here we are getting only the data from the 'minifaker', to display those info's check the 'return' from bellow
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="font-bold text-gray-400">Suggestion for you</h3>
        <button className="text-gray-600 font-semibold">See all</button>
      </div>
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            className="h-10 rounded-full border p-[2px]"
            src={`https://i.pravatar.cc/150?img=${Math.ceil(
              Math.random() * 70
            )}`}
            alt=""
          />
          {/* 🍭🍭[SUGGESTION FOR YOU]🍭🍭 here is the IMG of minifaker profiles and also check the <div> ... </div> from bellow 👇 */}
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{suggestion.username}</h2>
            <h3 className="text-sm text-gray-400 truncate w-[230px]">
              {suggestion.jobTitle}
            </h3>
          </div>
          <button className="font-semibold text-blue-400 text-sm">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}
