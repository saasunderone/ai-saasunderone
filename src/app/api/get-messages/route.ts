
import { NextResponse } from "next/server";
import { db } from "../../../../prisma/db";


export const POST = async (req: Request) => {
  const { chatId } = await req.json();
//   const _messages = await db
//     .select()
//     .from(messages)
//     .where(eq(messages.chatId, chatId));


    const _messages = await db.message.findMany({
        where: {
            chatId
        },
        });
        console.log(_messages);
  return NextResponse.json(_messages);
};