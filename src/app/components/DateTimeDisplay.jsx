"use client"
import React, { useEffect, useState } from 'react';
function getFormattedDateTime() {
    const date = new Date();
  
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    let formattedDate = date.toLocaleDateString('en-GB', options).toUpperCase();
    formattedDate = formattedDate.replace(',', ''); // Remove the comma
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  
    return `${formattedDate} / ${formattedTime}`;
  }
const DateTimeDisplay = () => {
  const [dateTime, setDateTime] = useState(getFormattedDateTime());


  useEffect(() => {
   
    const timer = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 30000); // Update every minute

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <p className="text-[#000000] text-right absolute top-[6%] right-[4%] font-nanum text-[13px] md:text-[14px] lg:text-[15px] xl:text-[17px]">
      {dateTime} / {"30°C"}
    </p>
  );
};

export default DateTimeDisplay;