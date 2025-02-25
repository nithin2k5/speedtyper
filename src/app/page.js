"use client";
import { TypingTest } from "@/components/TypingTest";
import "../styles/page.css";

export default function Home() {
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Speed Typing Test</h1>
        <TypingTest />
      </main>
    </div>
  );
}
