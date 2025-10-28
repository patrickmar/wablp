import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { X, Minus, Maximize2 } from "lucide-react";

type ChatBoxProps = {
  open: boolean;
  onClose: () => void;
  userId: number;
  peerId: number;
  peerName: string;
  peerPhoto?: string | null;
  status: string;
  onNewMessage?: () => void; // 🔔 notify parent when new msg arrives
};

type Message = {
  id?: number;
  chat_id?: number;
  sender?: number;
  sender_id?: number;
  client?: number;
  text: string;
  timestamp: string;
};

export default function ChatBox({
  open,
  onClose,
  userId,
  peerId,
  peerName,
  peerPhoto,
  status,
  onNewMessage,
}: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // ✅ Always scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Fetch messages with cancellation support
  const fetchMessages = async (controller?: AbortController) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/messages`,
        {
          params: { sender: userId, client: peerId },
          signal: controller?.signal,
        }
      );

      // 🔔 Detect new messages
      if (messages.length && res.data.length > messages.length) {
        if (isMinimized || !open) {
          onNewMessage?.();
        }
      }

      setMessages(res.data);
      scrollToBottom();
    } catch (err: any) {
      if (err.name === "CanceledError") {
        console.log("🟡 Request canceled:", err.message);
      } else {
        console.error("❌ Error fetching messages:", err);
      }
    }
  };

  // ✅ Auto-refresh messages every 5s, cancel overlapping requests
  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    let isMounted = true;

    const loadMessages = async () => {
      if (!isMounted) return;
      await fetchMessages(controller);
    };

    loadMessages();

    const interval = setInterval(() => {
      const newController = new AbortController();
      fetchMessages(newController);
    }, 5000);

    return () => {
      isMounted = false;
      controller.abort();
      clearInterval(interval);
    };
  }, [open, userId, peerId]);

  // ✅ Send message and update UI instantly
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes/messages/send`, {
        sender: userId,
        client: peerId,
        text: newMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: userId,
          client: peerId,
          text: newMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewMessage("");
      scrollToBottom();
    } catch (err) {
      console.error("❌ Error sending message", err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white shadow-xl rounded-lg flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar className="w-10 h-10">
            <AvatarImage src={peerPhoto || "/placeholder.png"} />
            <AvatarFallback>{peerName?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">{peerName}</span>
            <span className="text-xs text-gray-500">
              {status === "Online" ? "online" : "last seen a while ago"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Minimize / Expand */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized((prev) => !prev)}
            className="rounded-full hover:bg-gray-200"
          >
            {isMinimized ? (
              <Maximize2 className="h-5 w-5 text-gray-600" />
            ) : (
              <Minus className="h-5 w-5 text-gray-600" />
            )}
          </Button>

          {/* Close */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-gray-200"
          >
            <X className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Expanded Mode */}
      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 h-[400px] overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, index) => {
              const sender =
                msg.sender?.toString() || msg.sender_id?.toString() || "";
              const isMine = sender === userId.toString();
              return (
                <div
                  key={msg.id ?? msg.chat_id ?? `${index}-${msg.timestamp}`}
                  className={`p-2 rounded-md text-sm max-w-[70%] ${
                    isMine
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-200 text-black mr-auto"
                  }`}
                >
                  {msg.text}
                </div>
              );
            })}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input */}
          <div className="border-t p-2 flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button className="bg-sky-500 text-white" onClick={sendMessage}>
              Send
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

