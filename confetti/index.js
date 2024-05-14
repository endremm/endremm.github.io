import { tsParticles } from "https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.1.0/+esm";
import { loadAll } from "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.1.0/+esm";

async function setup() {

    // Setup handle for the events from the parent
    window.onmessage = handleParentEvent;

    // Setup the particles
    await loadParticles(configs);
}

async function loadParticles(options) {
    await loadAll(tsParticles);
    await tsParticles.load({ id: "tsparticles", options });
}

const configs = {
    particles: {
        destroy: {
            mode: "split",
            split: {
                count: 1,
                factor: {
                    value: {
                        min: 2,
                        max: 4
                    }
                },
                rate: {
                    value: 100
                },
                particles: {
                    life: {
                        count: 1,
                        duration: {
                            value: {
                                min: 2,
                                max: 3
                            }
                        }
                    },
                    move: {
                        speed: {
                            min: 10,
                            max: 15
                        }
                    }
                }
            }
        },
        number: {
            value: 100
        },
        color: {
            value: [
                "#2A2859",
                "#6FE9FF",
                "#1F42AA",
                "#43F8B6",
                "#C7F6C9",
                "#034B45",
                "#F9C66B",
                "#FF8274",
                "#F8F0DD",
                "#E0ADFF"
            ]
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 1
        },
        size: {
            value: {
                min: 10,
                max: 15
            }
        },
        collisions: {
            enable: true,
            mode: "bounce"
        },
        move: {
            enable: true,
            speed: 3,
            outModes: "bounce"
        }
    },
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "pop"
            }
        }
    },
    background: {
        color: "#000000"
    }
};

// Only used if we are running in context of the game selector
function handleParentEvent(event) {
    let eventData = event.data;
    console.log(eventData)

    switch (eventData.type) {
        case "hit":
            const element = document.elementFromPoint(eventData.data.x, eventData.data.y);
            console.log(element)
            if (element) {
                const clickEvent = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: eventData.data.x,
                    clientY: eventData.data.y
                });
                element.dispatchEvent(clickEvent);
            }
            break;
    }
}

// Start the game
setup();