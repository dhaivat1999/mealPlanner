import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
export default function Home() {
  const [bgColor, setBgColor] = useState("#ff80b5");
  const colors = [
    "#590d22",
    "#800f2f",
    "#a4133c",
    "#c9184a",
    "#a4133c",
    "#800f2f",
    "#590d22",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [colors]);

  useEffect(() => {
    const transitionTimer = setTimeout(() => {
      setBgColor(colors[index]);
    }, 500); // Adjust the transition time here
    return () => clearTimeout(transitionTimer);
  }, [index, colors]);

  const transitionStyle = {
    transition: "background-color 0.5s ease",
  };
  return (
    <div
      className="bg-custom-900 h-screen"
      style={{ backgroundColor: bgColor, ...transitionStyle }}
    >
      <div className="relative isolate px-6 pt-14 ">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>{" "}
        </div>
        <Fade duration={1200} left>
          <div className="mx-auto max-w-2xl pt-32 sm:pt-48 lg:pt-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-custom-100 sm:text-6xl">
                Welcome to your personal Meal Planner
              </h1>
              <p className="mt-6 text-lg leading-8 text-custom-200">
                Find the perfect recipe for you, decide the number of calories
                that you wish to consume in a day and based on that seelct the
                number of meals by which you wish to divide those calories and
                prepare your meals accordingly.
              </p>
            </div>
          </div>
        </Fade>
        <div class="text-center pt-8">
          <Fade duration={1200} right>
            <div class="mt-10 flex items-center justify-center gap-x-8">
              <a
                href="/search"
                class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Let's Eat
              </a>
            </div>
          </Fade>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>{" "}
        </div>
      </div>
    </div>
  );
}
