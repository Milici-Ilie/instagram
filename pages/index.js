import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import UploadModal from "../components/UploadModal";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Instagram App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}

      <Header />

      {/* Feed */}

      <Feed />

      {/* Modal */}
      {/* 💨💨[UPLOADING IMG's]💨💨 */}

      <UploadModal />
    </div>
  );
}
