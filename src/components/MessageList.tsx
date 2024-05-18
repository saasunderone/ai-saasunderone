import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import React from "react";
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { CodeBlock } from '@/components/ui/CodeBlock'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { ChatMessage } from "./ChatMessage";


type Props = {
  isLoading: boolean;
  messages: Message[];
};

// const MessageList = ({ messages, isLoading }: Props) => {
//   if (isLoading) {
//     return (
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-screen">
//         <Loader2 className="w-6 h-6 animate-spin" />
//       </div>
//     );
//   }
//   if (!messages) return <></>;
//   return (
//     <div className="flex flex-col gap-2 px-4 h-screen bg-black">
//       {messages.map((message) => ( 
        
       
//           <ChatMessage message={message} />
         
   
//       ))}
//     </div>
//   );
// };

// export default MessageList;


import { Separator } from '@/components/ui/separator'


export interface ChatList {
  messages: Message[]
}

export default function MessageList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  )
}