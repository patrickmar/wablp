import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { 
  Search, 
  MoreVertical, 
  Paperclip, 
  Send, 
  Smile, 
  Phone, 
  Video, 
  Info,
  Filter,
  Archive,
  Star,
  Trash2
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const conversations = [
  {
    id: 1,
    company: "GreenHarvest Ltd",
    contact: "Kwame Asante",
    avatar: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    lastMessage: "Thank you for the detailed proposal. We'd like to schedule a call to discuss further.",
    time: "2h",
    unread: 2,
    online: true,
    sector: "Agriculture"
  },
  {
    id: 2,
    company: "AfricaBuild Corp",
    contact: "Fatou Diallo",
    avatar: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    lastMessage: "The construction timeline looks good. When can we start?",
    time: "4h",
    unread: 0,
    online: false,
    sector: "Construction"
  },
  {
    id: 3,
    company: "WestPay Financial",
    contact: "Ibrahim Sall",
    avatar: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    lastMessage: "We're interested in integrating your payment solutions with our platform.",
    time: "1d",
    unread: 1,
    online: true,
    sector: "Fintech"
  },
  {
    id: 4,
    company: "EcoEnergy Solutions",
    contact: "Aisha Traore",
    avatar: "https://images.unsplash.com/photo-1497436072909-f5e4be5b12ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    lastMessage: "Perfect! Let's move forward with the solar panel installation project.",
    time: "2d",
    unread: 0,
    online: false,
    sector: "Renewable Energy"
  },
  {
    id: 5,
    company: "Maritime Logistics Ltd",
    contact: "Joseph Kone",
    avatar: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    lastMessage: "Can you handle the IT infrastructure for our new warehouse management system?",
    time: "3d",
    unread: 0,
    online: true,
    sector: "Logistics"
  }
];

const chatMessages = [
  {
    id: 1,
    sender: "other",
    content: "Hi TechNova! I saw your profile and I'm very impressed with your IT solutions portfolio.",
    time: "10:30 AM",
    senderName: "Kwame Asante"
  },
  {
    id: 2,
    sender: "me",
    content: "Thank you, Kwame! I'd be happy to discuss how we can help GreenHarvest with your technology needs.",
    time: "10:32 AM",
    senderName: "You"
  },
  {
    id: 3,
    sender: "other",
    content: "We're looking to modernize our supply chain management system. We currently use manual processes and need to digitize everything.",
    time: "10:35 AM",
    senderName: "Kwame Asante"
  },
  {
    id: 4,
    sender: "me",
    content: "That sounds like a perfect fit for our expertise. We've implemented similar systems for several agricultural companies in West Africa. Would you like me to send you some case studies?",
    time: "10:38 AM",
    senderName: "You"
  },
  {
    id: 5,
    sender: "other",
    content: "Yes, that would be great! Also, what's your timeline for a project like this?",
    time: "10:40 AM",
    senderName: "Kwame Asante"
  },
  {
    id: 6,
    sender: "me",
    content: "I'll send the case studies over shortly. For a supply chain management system, we typically estimate 3-4 months for full implementation, including training and support.",
    time: "10:42 AM",
    senderName: "You"
  },
  {
    id: 7,
    sender: "other",
    content: "Thank you for the detailed proposal. We'd like to schedule a call to discuss further.",
    time: "2:15 PM",
    senderName: "Kwame Asante"
  }
];

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter(conv =>
    conv.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      console.log("Sending:", message);
      setMessage("");
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#333333]">Messages</h2>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#F5F6FA] border-0 focus:ring-2 focus:ring-[#004C97]"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 hover:bg-[#F5F6FA] cursor-pointer transition-colors border-b border-gray-50 ${
                selectedConversation.id === conversation.id ? 'bg-[#004C97] bg-opacity-5 border-l-4 border-l-[#004C97]' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback className="bg-[#D4AF37] text-[#333333]">
                      {conversation.company.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-[#333333] text-sm truncate">{conversation.company}</h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-[#6B7280]">{conversation.time}</span>
                      {conversation.unread > 0 && (
                        <Badge className="bg-[#D4AF37] text-[#333333] text-xs h-5 w-5 p-0 flex items-center justify-center">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-[#6B7280] mb-1">{conversation.contact}</p>
                  <p className="text-sm text-[#6B7280] truncate">{conversation.lastMessage}</p>
                  <Badge variant="outline" className="text-xs mt-2 text-[#004C97] border-[#004C97]">
                    {conversation.sector}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-6 border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedConversation.avatar} />
                  <AvatarFallback className="bg-[#D4AF37] text-[#333333]">
                    {selectedConversation.company.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                {selectedConversation.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-[#333333]">{selectedConversation.company}</h3>
                <p className="text-sm text-[#6B7280]">
                  {selectedConversation.contact} • {selectedConversation.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-[#004C97]">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-[#004C97]">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-[#004C97]">
                <Info className="w-4 h-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Star className="w-4 h-4 mr-2" />
                    Star Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="w-4 h-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Conversation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F5F6FA]">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    msg.sender === 'me'
                      ? 'bg-[#004C97] text-white'
                      : 'bg-white text-[#333333] shadow-sm'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
                <p className={`text-xs text-[#6B7280] mt-1 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-gray-100 bg-white">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-[#6B7280]">
              <Paperclip className="w-5 h-5" />
            </Button>
            
            <div className="flex-1 relative">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="min-h-[44px] max-h-32 resize-none border-0 bg-[#F5F6FA] focus:ring-2 focus:ring-[#004C97] rounded-lg"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            
            <Button variant="ghost" size="sm" className="text-[#6B7280]">
              <Smile className="w-5 h-5" />
            </Button>
            
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-[#004C97] text-white hover:bg-[#003a75] disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}