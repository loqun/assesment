import React, { useState, useEffect } from 'react';

export default function Home() {
  // State to handle dynamic content
  const [isClicked, setIsClicked] = useState(false);
  const [message, setMessage] = useState("Welcome to Our Sleek Homepage");

  // Effect to change the message when isClicked is true
  useEffect(() => {
    if (isClicked) {
      setMessage("Thanks for clicking the button!");
    } else {
      setMessage("Welcome to Our Sleek Homepage");
    }
  }, [isClicked]);

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex flex-col justify-center items-center text-white">
      <header className="text-center mb-10">
        <h1
          className="text-5xl font-extrabold leading-tight text-shadow"
          style={{
            overflow: 'hidden',
            borderRight: '0.15em solid white',
            whiteSpace: 'nowrap',
            width: '0',
            animation: 'typing 3s steps(40) 1s forwards, blink 0.75s step-end infinite',
          }}
        >
          {message}
        </h1>
        <p className="text-lg mt-3 font-medium">Crafted with React and Tailwind CSS</p>
      </header>

      <main className="text-center space-y-10">
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold">A Beautiful, Responsive Design</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-200">
            We’ve designed this page to look great on all devices, from mobile to desktop. Stay productive and stylish.
          </p>
        </section>

        <section className="flex justify-center space-x-6">
          <button
            onClick={() => setIsClicked(!isClicked)}
            className="px-6 py-3 bg-white text-indigo-600 rounded-xl shadow-lg text-lg hover:bg-indigo-600 hover:text-white transition"
          >
            {isClicked ? "Clicked!" : "Get Started"}
          </button>
          <button className="px-6 py-3 bg-transparent border-2 border-white rounded-xl text-white text-lg hover:bg-white hover:text-indigo-600 transition">
            Learn More
          </button>
        </section>
      </main>

      <footer className="mt-16">
        <p className="text-sm">Built with ❤️ by Your Company</p>
      </footer>

      <style>
        {`
          @keyframes typing {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }

          @keyframes blink {
            50% {
              border-color: transparent;
            }
          }
        `}
      </style>
    </div>
  );
}
