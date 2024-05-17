

import { redirect } from "next/navigation";
import React from "react";
import { db } from "../../../../prisma/db";
import getCurrentUser from "@/lib/User";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import ChatComponent from "@/components/ChatComponent";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const  userId  = await getCurrentUser().then((user) => user.id);
  if (!userId) {
    return redirect("/sign-in");
  }
//   const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
const _chats = await db.chat.findMany({
    where: {
        userId: userId
    },
});

//   if (!_chats) {
//     return redirect("/");
//   }
//   if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
//     return redirect("/");
//   }

//   const currentChat =  _chats.id === parseInt(chatId)
// const currentChat = _chats.find((chat) => chat.id === chatId);
const currentChat = await db.chat.findUnique({
    where: {
        id: chatId,
    },
  });

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={true} />
        </div>
        {/* pdf viewer */}
        <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <ChatComponent chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
