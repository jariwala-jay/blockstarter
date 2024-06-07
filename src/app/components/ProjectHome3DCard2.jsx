"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

const ProjectHome3DCard = () => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-auto rounded-xl p-4 sm:p-6 border">
        <CardItem
          translateZ="50"
          className="text-lg sm:text-xl font-bold text-neutral-600 dark:text-white"
        >
          HopperAI
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Artificial Intelligence As Service based on ethereum blockchain.
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="/l2.png"
            height="500"
            width="1000"
            className="h-40 sm:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 sm:mt-20 space-y-4 sm:space-y-0">
          <CardItem
            translateZ={20}
            as={Link}
            href="/campaigns"
            className="px-4 py-2 rounded-xl text-xs font-normal text-[#808080]"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Contribute
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ProjectHome3DCard;
