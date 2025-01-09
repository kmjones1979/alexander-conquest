"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const sections = [
    {
      id: "section-1",
      backgroundImage: "/bg2a.webp",
      title: "Current State",
      planned: "Q1 2025",
      goals: [
        { text: "AI Token launched on Base", icon: "🚀" },
        { text: "Website launched", icon: "🌐" },
        { text: "Communities established", icon: "🤝" },
      ],
    },
    {
      id: "section-2",
      backgroundImage: "/bg2b.webp",
      title: "Platform Development",
      planned: "Q2-Q3 2025",
      goals: [
        { text: "Conquest NFT to be deployed on Base", icon: "🎨" },
        { text: "Conquest NFT minting open to $ALEXANDER holders", icon: "💰" },
        { text: "AI agent access granted for $ALEXANDER holders", icon: "🤖" },
      ],
    },
    {
      id: "section-3",
      backgroundImage: "/bg2c.webp",
      title: "Long Term Vision",
      planned: "Q4 2026",
      goals: [
        { text: "Learn and earn style campaigns to be added", icon: "🎓" },
        { text: "Automated onchain data reporting for $ALEXANDER holders", icon: "❓" },
        { text: "AI Agent enhancements and improvements", icon: "🤖" },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToRoadmap = () => {
    const roadmapSection = document.getElementById("roadmap");
    if (roadmapSection) {
      roadmapSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: "url(/bg.webp)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Alexander's</h1>
              <h1 className="mb-5 text-5xl font-bold">Crypto Conquest</h1>
              <p className="mb-5">
                Utilizing the power of onchain data, trusted execution environments and smart contracts, Alexander the
                Great will help you grow your empire.
              </p>
              <p className="mb-5">Coming soon to Base.</p>
              <button className="btn btn-primary" onClick={scrollToRoadmap}>
                Roadmap
              </button>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden mt-10" id="roadmap">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {sections.map(section => (
              <div
                key={section.id}
                className="hero min-h-screen"
                style={{
                  backgroundImage: `url(${section.backgroundImage})`,
                }}
              >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                  <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">{section.title}</h1>
                    <h2 className="mb-5 text-2xl font-semibold">{section.planned}</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {section.goals.map((goal, index) => (
                        <div
                          key={index}
                          className="flex items-center p-2 bg-white bg-opacity-10 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
                        >
                          <span className="text-xl mr-2">{goal.icon}</span>
                          <p className="text-base">{goal.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
