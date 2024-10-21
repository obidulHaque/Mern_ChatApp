import React from "react";
import Sidebar from "./sidebar/Sidebar";
import MessageContainer from "./message/MessageContainer";

export default function Home() {
  return (
    <>
      <div className=" h-screen  flex justify-center items-center">
        <div className="flex flex-row sm:h-[450px] md:h-[550px] lg:w-[80vw] w-[100vw] h-screen rounded-lg overflow-hidden bg-transparent  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 lg:px-16 px-0">
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </>
  );
}
