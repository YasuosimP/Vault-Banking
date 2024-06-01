'use client'
import { useState } from "react";
import { Loader2 } from "lucide-react";
import HeaderBox from "@/components/HeaderBox";
import {Input} from "@/components/ui/input"; // Assuming this is the path for your shadcn/ui Input component

const messages = [
  { id: 1, name: "Mohamed Rabeh", status: "Dernière transaction : 80 DT", time: "12m", message: "😊😊😊😊😊" },
  { id: 2, name: "Moncef Ayechi", status: "Dernière transaction : 100 DT", time: "24m", message: "Aussi, n'oublie pas d'acheter un cadeau..." },
  { id: 3, name: "Amin Mhiri", status: "Dernière transaction : 30 DT", time: "1h", message: "N'oublie pas d'acheter des courses" },
  { id: 4, name: "Nacer Adhoum", status: "Dernière transaction : 20 DT", time: "5h", message: "As-tu 20 DT ?" },
];

const dummyConversation = [
  { id: 1, sender: "Mohamed Rabeh", content: "Bonjour, comment ça va ?" },
  { id: 2, sender: "You", content: "Ça va bien, merci ! Et toi ?" },
  { id: 3, sender: "Mohamed Rabeh", content: "Je vais bien aussi, merci." },
  { id: 4, sender: "Mohamed Rabeh", content: "Avez-vous terminé le projet ?" },
  { id: 5, sender: "You", content: "Oui, je l'ai envoyé hier." },
];

const initialAmount = 110;

const MessageComponent = () => {
  const [currentMessage, setCurrentMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [amountLeft, setAmountLeft] = useState(initialAmount);
  const [placeholder, setPlaceholder] = useState("");
  const [banknotesColor, setBanknotesColor] = useState("black");

  const handleSelectMessage = (message:any) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentMessage(message);
      setIsLoading(false);
    }, 1000); // Simulate loading time
  };

  const handleBanknotesClick = () => {
    setBanknotesColor("green");
    setPlaceholder(`Vous avez ${amountLeft} DT restants`);
  };

  const handleInputChange = (e:any) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setAmountLeft(initialAmount - value);
      setPlaceholder(`Vous avez ${initialAmount - value} DT restants`);
    } else {
      setPlaceholder(`Vous avez ${amountLeft} DT restants`);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r border-gray-200 p-4">
        <HeaderBox 
          title="Messages"
          subtext="Envoyez de l'argent en un clic a vos proches."
        />
        <input
          type="text"
          placeholder="Recherche de messages..."
          className="w-full p-2 mb-4 border rounded"
        />
        <ul className="space-y-2">
          {messages.map((message) => (
            <li
              key={message.id}
              className="p-2 cursor-pointer hover:bg-gray-100 rounded"
              onClick={() => handleSelectMessage(message)}
            >
              <div className="flex justify-between">
                <span className="message-name">{message.name}</span>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <div className="message-preview">{message.message}</div>
              <div className="message-status">{message.status}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 p-4 flex flex-col">
        {isLoading ? (
          <div className="flex justify-center items-center flex-grow">
            <Loader2 size={32} className="animate-spin" />
          </div>
        ) : currentMessage ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold">{currentMessage.name}</h3>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-500">en ligne</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 mb-4"></div>
            <div className="flex-grow overflow-y-auto space-y-4">
              {dummyConversation.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-2 rounded-lg ${message.sender === "You" ? "bg-red-500 text-white" : "bg-gray-100"}`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center">
              <img
                src="/icons/banknotes.svg"
                alt="Banknotes"
                className="w-6 h-6 mr-2 cursor-pointer"
                style={{ color: banknotesColor }}
                onClick={handleBanknotesClick}
                
              />
              <div className="flex-grow relative">
                <Input
                  placeholder={placeholder || "Écris un message..."}
                  className="w-full p-2 border rounded pl-10"
                  onChange={handleInputChange}
                  style={{ color: 'green' }}
                />
                <img
                  src="/icons/send-arrow.svg"
                  alt="Send"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center flex-grow text-gray-500">Sélectionnez un message pour commencer</div>
        )}
      </div>
    </div>
  );
};

export default MessageComponent;
