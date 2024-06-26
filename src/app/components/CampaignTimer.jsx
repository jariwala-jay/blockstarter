import React, { useEffect, useState } from 'react';
import Campaign from "../../../ethereum/campaign";
import Divider from '@mui/material/Divider';

const CampaignTimer = ({ address }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const fetchCampaignStatus = async () => {
      const campaign = Campaign(address);
      const otherDetails = await campaign.methods.getOtherDetails().call();
      const timeInSeconds = BigInt(await campaign.methods.getTimeLeft().call());

      setIsClosed(otherDetails[3]); 
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

    fetchCampaignStatus();

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

  if (isClosed || (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0)) {
    return (
      <div className="flex justify-center bg-red-600 text-white p-4 rounded-lg">
        <div className="text-center">
          <div className="text-xl font-bold">Campaign Closed</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-[#f36128] text-white p-4 rounded-lg space-x-4">
      <div className="text-center">
        <div className="text-xl font-bold">{timeLeft.days}</div>
        <div>Days</div>
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div className="text-center">
        <div className="text-xl font-bold">{timeLeft.hours}</div>
        <div>Hours</div>
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div className="text-center">
        <div className="text-xl font-bold">{timeLeft.minutes}</div>
        <div>Minutes</div>
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div className="text-center">
        <div className="text-xl font-bold">{timeLeft.seconds}</div>
        <div>Seconds</div>
      </div>
    </div>
  );
};

export default CampaignTimer;
