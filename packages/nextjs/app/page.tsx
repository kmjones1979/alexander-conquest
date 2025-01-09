"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";

const RoadmapSection = ({ section }) => (
  <div
    className="hero min-h-screen w-full bg-cover bg-center"
    style={{
      backgroundImage: `url(${section.backgroundImage})`,
    }}
  >
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md p-6">
        <h1 className="mb-5 text-4xl md:text-5xl font-bold">{section.title}</h1>
        <h2 className="mb-5 text-2xl font-semibold">{section.planned}</h2>
        <div className="flex flex-col gap-4">
          {section.goals.map((goal, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-white bg-opacity-10 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              <span className="text-2xl mr-2">{goal.icon}</span>
              <p className="text-base">{goal.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const sections = [
    {
      id: "section-1",
      backgroundImage: "/bg2a.webp",
      title: "Current State",
      planned: "Q1 2025",
      goals: [
        { text: "AI Token launched on Base", icon: "🚀" },
        { text: "Website and communities launched", icon: "🌐" },
        {
          text: "$ALEXANDER treasury buyback schedule established (20% of fees collected from CreatorBid)",
          icon: "💰",
        },
      ],
    },
    {
      id: "section-2",
      backgroundImage: "/bg2b.webp",
      title: "AI Platform Established",
      planned: "Q2-Q3 2025",
      goals: [
        { text: "Staking enabled for $ALEXANDER token", icon: "🎨" },
        {
          text: "Conquest NFT to be deployed on Base and minting open to $ALEXANDER stakers (required stake TBD)",
          icon: "🔒",
        },
        { text: "AI agent access granted for $ALEXANDER stakers (required stake TBD)", icon: "🤖" },
      ],
    },
    {
      id: "section-3",
      backgroundImage: "/bg2c.webp",
      title: "Long Term Vision",
      planned: "Q4 2025 and beyond",
      goals: [
        { text: "Learn and earn style campaigns to be added", icon: "🎓" },
        { text: "AI Agent enhancements and improvements", icon: "🤖" },
        { text: "Automated AI data reporting for $ALEXANDER holders", icon: "🔎" },
      ],
    },
  ];

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log("Current Index:", currentIndex);
  console.log("Sections:", sections);

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
              <h1 className="mb-5 text-7xl font-bold font-kingston">Alexander's</h1>
              <h1 className="mb-5 text-7xl font-bold font-kingston">Crypto Conquest</h1>
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

        <div className="relative overflow-hidden mt-10 mb-10" id="roadmap">
          <RoadmapSection section={sections[currentIndex]} />

          {/* Navigation Buttons at the Bottom */}
          <div className="absolute bottom-5 left-0 right-0 flex justify-center mx-4 p-4">
            {" "}
            {/* Positioned at the bottom */}
            <button className="btn btn-secondary p-4 m-4" onClick={handlePrevious} disabled={currentIndex === 0}>
              <ArrowLeftIcon className="w-4 h-4" />
              Previous
            </button>
            <button
              className="btn btn-secondary p-4 m-4"
              onClick={handleNext}
              disabled={currentIndex === sections.length - 1}
            >
              Next
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: "url(/bg3.webp)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Build your Empire!</h1>
              <p className="">
                "Those who have the courage to conquer it are made free and those who are conquered by it are made to
                suffer until they have the courage to defeat it, or death takes them"
              </p>
              <p className="mb-5">-- Alexander the Great</p>
              <button className="btn btn-primary p-3 m-2  ">
                <a href="https://creator.bid/agents/677eb480841c8e1f169f1cb3" target="_blank">
                  $ALEXANDER
                </a>
              </button>
              <button className="btn btn-primary p-3 m-2">
                <a href="https://t.me/AlexanderTGAIChat" target="_blank">
                  Join Telegram
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
