import React from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

export default function ParticlesPage() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    return (
        <div style={{ position: "relative", zIndex: -1, width: "100%", height: "100vh", background: "#1a1a2e" }}>
            {init && (
                <Particles
                    id="test-particles"
                    options={{
                        background: { color: { value: "transparent" } },
                        particles: {
                            number: { value: 50 },
                            color: { value: "#c9a84c" },
                            opacity: { value: 0.1 },
                            size: { value: { min: 1, max: 4 } },
                            move: { enable: true, speed: 1 },
                        },
                    }}
                />
            )}
            <h1 style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "#e8d5a3" }}>
                Particles Test
            </h1>
        </div>
    );
}