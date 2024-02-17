import React, { useEffect, useState } from "react";
import Moment from "react-moment"; //🌠🌠[DATA FROM FIREBASE]🌠🌠
import { db } from "../firebase"; //🧯🧯[ADDING COMMENTS TO FIREBASE]🧯🧯
import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"; //🧯🧯[ADDING COMMENTS TO FIREBASE]🧯🧯
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";

// 💽💽[ANOTHER COMPONENT]💽💽
export default function Post({ img, userImg, caption, username, id }) {
  // 💽💽[ANOTHER COMPONENT]💽💽 here we are desctructuring the PROPS for 'Posts.js' file to send the info's
  const [comment, setComment] = useState(""); //🧯🧯[ADDING COMMENTS TO FIREBASE]🧯🧯
  const [comments, setComments] = useState([]); //🌠🌠[DATA FROM FIREBASE]🌠🌠 we need this 'useState' to take info's from Firebase
  const [likes, setLikes] = useState([]); //💡💡[LIKE FUNCTIONALITY]💡💡 getting the likes
  const [hasLiked, setHasLiked] = useState(false); //💡💡[LIKE FUNCTIONALITY]💡💡
  const [currentUser] = useRecoilState(userState);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, id]); //🌠🌠[DATA FROM FIREBASE]🌠🌠 also is need it this 'useEffect' to display the data from Firebase database
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);
  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes]); //💡💡[LIKE FUNCTIONALITY]💡💡 to like and dislike
  async function likePost() {
    // 💡💡[LIKE FUNCTIONALITY]💡💡 👇
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", currentUser?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", currentUser?.uid), {
        username: currentUser?.username,
      });
    }
  }
  // 💡💡[LIKE FUNCTIONALITY]💡💡
  async function sendComment(event) {
    event.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: currentUser?.username,
      userImage: currentUser?.userImg,
      timestamp: serverTimestamp(),
    }); //🧯🧯[ADDING COMMENTS TO FIREBASE]🧯🧯
  }
  return (
    <div className="bg-white my-7 border rounded-md">
      {/* Post Header */}

      <div className="flex items-center p-5">
        <img
          className="h-12 rounded-full object-cover border p-1 mr-3"
          src={userImg}
          alt={username}
        />
        <p className="font-bold flex-1">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* here we are creating the Header Components wich contains the IMG user and the ... 3 dots for more info's */}

      {/* Post Image */}

      <img className="object-cover w-full" src={img} alt="" />
      {/* the 'img' from 'src={img}' we are getting as a PROPS from the above funtion 👆 */}

      {/* Post Buttons  */}
      {/* 💡💡[LIKE FUNCTIONALITY]💡💡 👇 */}
      {currentUser && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="text-red-400 btn"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <ChatIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* this is how you create the buttons from the Header components */}

      {/* Post comments */}
      {/* 💠💠[INPUT BOX/ COMMENTS]💠💠 */}

      <p className="p-5 truncate">
        {/* truncate=lower name/title/etc. If the name osberlook after josmm */}
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </p>
      {/* 🌠🌠[DATA FROM FIREBASE]🌠🌠 👇 */}
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
          {comments.map((comment) => (
            <div
              key={comment.data().id}
              className="flex items-center space-x-2 mb-2"
            >
              <img
                className="h-7  rounded-full object-cover"
                src={comment.data().userImage}
                alt="user-image"
              />
              <p className="font-semibold">{comment.data().username}</p>
              <p className="flex-1 truncate">{comment.data().comment}</p>
              <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
      )}
      {/* 🌠🌠[DATA FROM FIREBASE]🌠🌠 👆 'fromNow' will take the time from the moment the user enter a pic or a comment */}

      {/* 💠💠[INPUT BOX/ COMMENTS]💠💠 👇 */}
      {/* Post input box */}
      {currentUser && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)} //🧯🧯[ADDING COMMENTS TO FIREBASE]🧯🧯 getting the info from the input field
            className="border-none flex-1 focus:ring-0"
            type="text"
            placeholder="Enter your comment..."
          />
          <button
            type="submit"
            onClick={sendComment} //🧯🧯[ADDING COMMENTS TO FIREBASE]🧯🧯
            disabled={!comment.trim()} //🧯🧯[ADDING COMMENTS TO FIREBASE]🧯🧯 here we are disabling the button when there are no comments. we prevent a comment to be blank, for exemple multiplce SPACES and no comment, we write '.trim()'
            className="text-blue-400 font-bold disabled:text-blue-200"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
