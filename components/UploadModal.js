import { useRecoilState } from "recoil"; //💨💨[UPLOADING IMG's]💨💨
import { modalState } from "../atom/modalAtom"; //💨💨[UPLOADING IMG's]💨💨
import Modal from "react-modal"; //💨💨[UPLOADING IMG's]💨💨 here we create the Modal in the React
import { CameraIcon } from "@heroicons/react/outline"; //💨💨[UPLOADING IMG's]💨💨 icon for the camera when we open the Window Modal
import { useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { userState } from "../atom/userAtom";

// 💨💨[UPLOADING IMG's]💨💨
export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState); //💨💨[UPLOADING IMG's]💨💨 we need this for our ModalWindow React to open and close
  const [selectedFile, setSelectedFile] = useState(null); //💨💨[UPLOADING IMG's]💨💨 here we want to use this to show what IMG the user want to upload, first is 'null' than will be 'true' when the IMG is uploaded
  const [loading, setLoading] = useState(false);
  const [currentUser] = useRecoilState(userState);
  async function uploadPost() {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      caption: captionRef.current.value,
      username: currentUser?.username,
      profileImg: currentUser.userImg,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  }

  function addImageToPost(event) {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    } //💨💨[UPLOADING IMG's]💨💨  this is need it also to see the IMG when the user uploade it from the computer to see what img is uploading

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
    // 💨💨[UPLOADING IMG's]💨💨 this is also need it to upload and see the IMG that is uploaded
  }
  const filePickerRef = useRef(null); //💨💨[UPLOADING IMG's]💨💨 also we need this to upload IMG's
  const captionRef = useRef(null);
  return (
    <div>
      {/* 💨💨[UPLOADING IMG's]💨💨 here we are creating the ModalWindow with React. NOTE that the code from bellow you can copy from the site 'react-modal -npm' */}
      {open && (
        <Modal
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
          isOpen={open}
          onRequestClose={() => {
            setOpen(false);
            setSelectedFile(null);
          }}
          // here we are closing the selected IMG when we click on the IMG that we already selected and we want to choose another IMG, also we reset the IMG if the user is closing the WINDOW MODAL, when the MODAL will be oppen again the modal will be empty, only the camera ICON for uploading IMG's
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            {selectedFile ? (
              <img
                onClick={() => setSelectedFile(null)}
                src={selectedFile}
                alt=""
                className="w-full max-h-[250px] object-cover cursor-pointer"
              />
            ) : (
              <CameraIcon
                onClick={() => filePickerRef.current.click()}
                className="cursor-pointer h-14 bg-red-200 p-2 rounded-full border-2 text-red-500"
              />
              // 💨💨[UPLOADING IMG's]💨💨 Camera Icon & opening the folder for uploading IMG's when clicking the camera IMG icon
            )}

            <input
              type="file"
              hidden
              ref={filePickerRef}
              onChange={addImageToPost}
            />
            <input
              type="text"
              maxLength="150"
              placeholder="Please enter your caption..."
              className="m-4 border-none text-center w-full focus:ring-0"
              ref={captionRef}
            />
            {/* 💨💨[UPLOADING IMG's]💨💨 this is the input bellow the camera ICON that upload IMG's. Here we add a text/comment to our post */}
            <button
              disabled={!selectedFile || loading}
              onClick={uploadPost}
              className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              Upload Post
            </button>
            {/* 💨💨[UPLOADING IMG's]💨💨 here we are creating also a 'disable mode' for the button when there are no IMG's or text included */}
          </div>
        </Modal>
      )}
    </div>
  );
}
