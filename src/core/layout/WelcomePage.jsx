import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../layout.scss";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const WelcomePage = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async(engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);
  
  return (
    <div className="welcome-page">
      {init && (
        <Particles
          id="welcome-particles"
          options={{
            background: { color: { value: "transparent" } },
            particles: {
              number: { value: 100 },
              size: { value: 15 },
              move: { enable: true, speed: 1 },
              shape: {
                type: "image",
                options: {
                  image: [,
                    { src: "/src/core/images/burgerr.png", width: 32, height: 32 },
                    { src: "/src/core/images/cheese.png", width: 32, height: 32 },
                    { src: "/src/core/images/chickenLeg.png", width: 32, height: 32 },
                    { src: "/src/core/images/hotdog.png", width: 32, height: 32 },
                    { src: "/src/core/images/sandvitch.png", width: 32, height: 32 },
                  ]
                }
              },
              opacity: { value: 0.2 },
            },
          }}
        />
      )}
      <div className="welcome-main">
        <div className="content">
        <h4>Delicious food is just a few clicks away!</h4>
        <p>
          Order your favorite meals quickly and easily, straight from your phone or computer.
          Enjoy fast delivery and an effortless online experience. 
        </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
