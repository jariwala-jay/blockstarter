"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const InfiniteCards = () =>{
  return (
    <div className="h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Blockstarter has revolutionized the way we launch new products. The support from backers has been incredible, allowing us to bring our vision to life faster than we ever imagined.",
    name: "Emily Rogers",
    title: "Founder, EcoTech Innovations",
  },
  {
    quote:
      "Thanks to Blockstarter, our community-driven project gained the funding it needed to get off the ground. The platform made it easy to connect with supporters who truly believe in our mission.",
    name: "Michael Thompson",
    title: "CEO, GreenFuture",
  },
  {
    quote:
      "Launching our campaign on Blockstarter was a game-changer. The user-friendly interface and supportive community helped us exceed our funding goals in no time.",
    name: "Sarah Mitchell",
    title: "Co-Founder, Solar Solutions",
  },
  {
    quote:
      "Blockstarter is more than just a crowdfunding platform. It's a vibrant community of innovators and supporters working together to make dreams a reality.",
    name: "David Kim",
    title: "Project Manager, Tech For Good",
  },
  {
    quote:
      "Our experience with Blockstarter has been nothing short of amazing. The exposure and backing we received have set us on a path to success we could never have achieved alone.",
    name: "Aisha Khan",
    title: "Creative Director, Artistry Unlimited",
  },
];

export default InfiniteCards;