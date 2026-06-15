'use client';

import { Search, Send } from 'lucide-react';
import { useState } from 'react';

type Message = {
  id: string;
  sender: string;
  text: string;
  time: string;
};

const dummyMessages: Message[] = [
  {
    id: '1',
    sender: 'Maria Santos',
    text: 'Hey, na-check mo na yung task?',
    time: '2m ago',
  },
  {
    id: '2',
    sender: 'Juan Dela Cruz',
    text: 'Okay na yung update sa dashboard.',
    time: '10m ago',
  },
];

export default function Page() {
  const [selected, setSelected] = useState(dummyMessages[0]);
  const [input, setInput] = useState('');

  return (
    <div className="bg-background grid h-screen grid-cols-12 gap-4 p-6">
      {/* LEFT SIDEBAR (CHAT LIST) */}
      <div className="bg-card col-span-4 flex flex-col rounded-2xl border">
        {/* HEADER */}
        <div className="border-b p-4">
          <h1 className="text-xl font-bold">Messages</h1>

          <div className="bg-muted mt-3 flex items-center gap-2 rounded-xl px-3 py-2">
            <Search className="text-muted-foreground h-4 w-4" />
            <input
              placeholder="Search..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* CHAT LIST */}
        <div className="flex-1 overflow-y-auto">
          {dummyMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => setSelected(msg)}
              className={`hover:bg-muted/50 cursor-pointer border-b p-4 transition ${
                selected.id === msg.id ? 'bg-muted' : ''
              }`}
            >
              <p className="font-medium">{msg.sender}</p>
              <p className="text-muted-foreground truncate text-sm">
                {msg.text}
              </p>
              <span className="text-muted-foreground text-xs">{msg.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT CHAT BOX */}
      <div className="bg-card col-span-8 flex flex-col rounded-2xl border">
        {/* CHAT HEADER */}
        <div className="border-b p-4">
          <h2 className="font-semibold">{selected.sender}</h2>
          <p className="text-muted-foreground text-xs">Active now</p>
        </div>

        {/* MESSAGES AREA */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          <div className="bg-muted w-fit rounded-xl p-3">{selected.text}</div>
        </div>

        {/* INPUT */}
        <div className="flex gap-2 border-t p-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-xl border px-3 py-2 text-sm"
          />

          <button className="bg-primary text-primary-foreground flex items-center gap-2 rounded-xl px-4">
            <Send className="h-4 w-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
