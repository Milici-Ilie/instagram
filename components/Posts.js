import { useEffect, useState } from "react"; //🧨🧨[DISPLAYING FIREBASE DATA]🧨🧨
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"; //🧨🧨[DISPLAYING FIREBASE DATA]🧨🧨
import { db } from "../firebase"; //🧨🧨[DISPLAYING FIREBASE DATA]🧨🧨

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    ); //🧨🧨[DISPLAYING FIREBASE DATA]🧨🧨 we need this variable/const with [posts, setPosts], at the beggining the page will be empty in the 'useState' ([]), than we will add/store info/data/img's with the 'useEffect' and 'onSnapshot'
    return unsubscribe;
  }, [db]);
  return (
    // 💽💽[ANOTHER COMPONENT]💽💽
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
        // 🧨🧨[DISPLAYING FIREBASE DATA]🧨🧨 now we added the 'data' before the 'username' and 'userImg' and 'img' and 'caption' and all of them.......
        // 💽💽[ANOTHER COMPONENT]💽💽 we will take those PROPS from 'Post.js' file to beneffit of the data
      ))}
    </div>
  );
}
