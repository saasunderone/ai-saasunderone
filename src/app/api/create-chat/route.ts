import getCurrentUser from "@/lib/User";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { NextResponse } from "next/server";
import { db } from "../../../../prisma/db";

// /api/create-chat
export async function POST(req: Request, res: Response) {
  const userId = await getCurrentUser().then((user) => user?.id);
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log(file_key, file_name);
    await loadS3IntoPinecone(file_key);
    // const chat_id = await db
    //   .insert(chats)
    //   .values({
    //     fileKey: file_key,
    //     pdfName: file_name,
    //     pdfUrl: getS3Url(file_key),
    //     userId,
    //   })
    //   .returning({
    //     insertedId: chats.id,
    //   });

      const chat_id = await db.chat.create({
        data: {
          fileKey: file_key,
          pdfName: file_name,
          pdfUrl: getS3Url(file_key),
          userId,
        },
      });

    return NextResponse.json(
      {
        chat_id: chat_id?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}