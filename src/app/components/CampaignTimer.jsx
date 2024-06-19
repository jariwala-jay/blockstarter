import React, { useEffect, useState } from 'react';
import Campaign from "../../../ethereum/campaign";

const CampaignTimer = ({ address }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const fetchTimeLeft = async () => {
      const campaign = Campaign(address);
      const timeInSeconds = BigInt(await campaign.methods.getTimeLeft().call());
      convertTime(timeInSeconds);
    };

    const convertTime = (timeInSeconds) => {
      let seconds = Number(timeInSeconds);
      const days = Math.floor(seconds / (3600 * 24));
      seconds -= days * 3600 * 24;
      const hours = Math.floor(seconds / 3600);
      seconds -= hours * 3600;
      const minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      setTimeLeft({ days, hours, minutes, seconds });
    };

    fetchTimeLeft();

    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        const { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { days, hours, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { days, hours: hours - 1, minutes: 59, seconds: 59 };
        } else if (days > 0) {
          return { days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [address]);

  return (
    <div className="flex justify-center bg-[#f36128] text-white p-4 rounded-lg space-x-4">
      <div className="text-center">
        <div className="text-xl font-bold">{timeLeft.days}</div>
        <div>Days</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold">{timeLeft.hours}</div>
        <div>Hours</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold">{timeLeft.minutes}</div>
        <div>Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold">{timeLeft.seconds}</div>
        <div>Seconds</div>
      </div>
    </div>
  );
};

export default CampaignTimer;
