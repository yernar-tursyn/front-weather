import React, { useEffect, useState } from "react";

import img1 from "../../assets/images/bitmap.png";
import img2 from "../../assets/images/bitmap-sun.png";
import img3 from "../../assets/images/bitmap-cloud.png";
import img4 from "../../assets/images/bitmap-cloudySun.png";

import logo from "../../assets/images/partially-cloudy.png";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const WELCOME_LOCAL_KEY = "first_meet_weather_app";

const slides = [
  {
    title: "Detailed Hourly Forecast",
    description: "Get in-depth weather information.",
    image: img1,
  },
  {
    title: "Real-Time Weather Map",
    description: "Watch the progress of the precipitation to stay informed.",
    image: img2,
  },
  {
    title: "Weather Around the World",
    description: "Add any location you want and swipe easily to change.",
    image: img3,
  },
  {
    title: "Detailed Hourly Forecast",
    description: "Get in-depth weather information.",
    image: img4,
  },
];

export const Welcome = () => {
  const navigate = useNavigate();
  const isFirstTime = !localStorage.getItem(WELCOME_LOCAL_KEY);
  const [loader, setLoader] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartApp = () => {
    // localStorage.setItem(WELCOME_LOCAL_KEY, true);
    navigate("/start");
  };

  const handleStep = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      handleStartApp();
    }
  };

  if (loader) return <LoaderScreen setLoader={setLoader} />;

  if (!isFirstTime) handleStartApp();

  return (
    <Step
      {...slides[step]}
      handleSkipWelcome={handleStartApp}
      handleStep={handleStep}
      step={step}
    />
  );
};

const Step = ({ title, description, image, handleSkipWelcome, handleStep, step }) => {
  const progress = ((step + 1) / slides.length) * 100;

  return (
    <div className="bg-gradient-to-r from-[#484b5b] to-[#2c2d35] overflow-hidden h-screen flex flex-col justify-center items-center">
      <div className="w-full flex justify-center text-white mt-5 mr-8 mx-auto">
        <div className="mr-8">
          <button className="text-white block fixed right-10" onClick={handleSkipWelcome}>
            Skip
          </button>
        </div>
        <img src={image} alt={title} className="flex justify-center items-center w-80 h-80" />
      </div>

      <div className="bg-white w-[110%] rounded-t-full h-[500px] mt-auto flex flex-col items-center">
        <div className="flex flex-col gap-5 h-full text-center justify-center w-[230px]">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-[rgba(139,149,162,1)] text-sm">{description}</p>
          <div onClick={handleStep} className="flex justify-center items-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 flex items-center justify-center z-50 cursor-pointer">
                <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.6668 21L21.0001 14L15.6668 7" stroke="#D8D8D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 14H21" stroke="#D8D8D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "double 4px transparent",
                  borderRadius: "50%",
                  backgroundImage: `linear-gradient(white, white), conic-gradient(#ff007f ${progress}%, transparent ${progress}%)`,
                  backgroundOrigin: "border-box",
                  backgroundClip: "content-box, border-box",
                  transition: 'background 0.5s ease-in-out',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoaderScreen = ({ setLoader }) => (
  <div
    className="flex flex-col items-center justify-center h-screen bg-gray-100"
    onClick={() => {
      setLoader(false);
    }}
  >
    <img src={logo} alt="Weather Logo" className="w-40 h-auto mb-4" />
    <div className="text-center">
      <h1 className="text-black-900 text-5xl">Weather</h1>
      <p className="text-gray-500 text-xl">Forecast</p>
    </div>
  </div>
);

export default Welcome;