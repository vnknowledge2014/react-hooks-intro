import React, { useState, useEffect } from "react";
const App = () => {
  const initialLocationState = {
    latitude: null,
    longtitude: null,
    speed: null
  };

  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  const [{ latitude, longtitude, speed }, setLocation] = useState(
    initialLocationState
  );

  let mounted = true;

  useEffect(() => {
    document.title = `You have clicked ${count} times`;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    navigator.geolocation.getCurrentPosition(handleGeolocation);
    const watchID = navigator.geolocation.watchPosition(handleGeolocation);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      navigator.geolocation.clearWatch(watchID);
      mounted = false;
    };
  }, [count]);

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const toggleLight = () => {
    setIsOn(prevIsOn => !prevIsOn);
  };

  const handleMouseMove = e => {
    setMousePosition({
      x: e.pageX,
      y: e.pageY
    });
  };

  const handleOnline = () => {
    setStatus(true);
  };

  const handleOffline = () => {
    setStatus(false);
  };

  const handleGeolocation = e => {
    if (mounted) {
      setLocation({
        latitude: e.coords.latitude,
        longtitude: e.coords.longtitude,
        speed: e.coords.speed
      });
    }
  };

  return (
    <>
      <h2>Counter</h2>
      <div className="App">
        <button onClick={incrementCount}>I was {count} times</button>
      </div>

      <h2>Toggle Light</h2>
      <img
        style={{
          width: "50px",
          height: "50xp"
        }}
        alt="light switch"
        src={
          isOn
            ? "http://icon.now.sh/highlight/fd0"
            : "http://icon.now.sh/highlight/aaa"
        }
        onClick={toggleLight}
      />

      <h2>Mouse Position</h2>
      <p>{`X: ${mousePosition.x} - Y: ${mousePosition.y}`}</p>

      <br />

      <h2>Network Status</h2>
      <p>
        You are <strong>{status ? "online" : "offline"}</strong>
      </p>

      <br />

      <h2>Geolocation</h2>
      <p>Latitude is {latitude}</p>
      <p>Longtitude is {longtitude}</p>
      <p>Your speed is {speed ? speed : "0"}</p>
    </>
  );
};

export default App;
