const knowMoreBtn = document.getElementById("knowMoreBtn");
let knowMoreInterval;

function showKnowMore() {
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 80;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    knowMoreBtn.style.left = `${x}px`;
    knowMoreBtn.style.top = `${y}px`;
    knowMoreBtn.style.bottom = 'auto';
    knowMoreBtn.style.right = 'auto';

    knowMoreBtn.classList.add("show");

    setTimeout(() => {
        knowMoreBtn.classList.remove("show");
    }, 2000);
}

function startKnowMoreLoop() {
    if (!knowMoreInterval) {
        knowMoreInterval = setInterval(showKnowMore, 13000);
    }
}

document.getElementById("start-button").addEventListener("click", () => {
    const trumpGif = document.getElementById("trump-gif");
    const trumpAudio = new Audio("/assets/MAGA.mp3");

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("background-overlay").style.opacity = 0.6;

    document.querySelectorAll('.countdown-number').forEach(el => {
        el.classList.add('animated-gradient');
    });

    const leftCurtain = document.querySelector(".curtain.left");
    const rightCurtain = document.querySelector(".curtain.right");
    document.getElementById("curtains").style.display = "block";
    setTimeout(() => {
        leftCurtain.classList.add("open-left");
        rightCurtain.classList.add("open-right");
    }, 100);

    const bgMusic = document.getElementById("bg-music");
    bgMusic.volume = 0.5;
    bgMusic.play().catch((error) => {
        console.warn("Audio playback failed:", error);
    });

    setTimeout(() => {
        document.getElementById("content").style.display = "block";
    }, 2000);

    function startFireworks() {
        const colors = ['#ff0000', '#ffffff', '#0000ff'];
        function launchFirework() {
            for (let i = 0; i < 5; i++) {
                confetti({
                    particleCount: 50,
                    angle: 60 + Math.random() * 60,
                    spread: 100,
                    origin: {
                        x: Math.random(),
                        y: Math.random() * 0.5
                    },
                    colors: colors
                });
            }
        }
        setInterval(launchFirework, 1500);
    }

    function burstConfetti() {
        confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#ffffff', '#0000ff']
        });
    }

    setTimeout(() => {
        burstConfetti();
        startFireworks();
    }, 3000);

    // Trump GIF click handler with fade logic
    trumpGif.addEventListener("click", () => {
        trumpAudio.currentTime = 0;

        // Fade out background music
        const fadeOut = setInterval(() => {
            if (bgMusic.volume > 0.05) {
                bgMusic.volume -= 0.05;
            } else {
                clearInterval(fadeOut);
                bgMusic.volume = 0;
            }
        }, 50);

        // Play Trump audio
        trumpAudio.play().catch((e) => console.warn("Trump audio failed:", e));

        // When Trump audio ends, fade music back in
        trumpAudio.onended = () => {
            const fadeIn = setInterval(() => {
                if (bgMusic.volume < 0.45) {
                    bgMusic.volume += 0.05;
                } else {
                    clearInterval(fadeIn);
                    bgMusic.volume = 0.5;
                }
            }, 50);
        };
    });

    function updateFlightStatus() {
        const countdownDate = new Date("Aug 19, 2025 00:00:00").getTime();
        const now = new Date().getTime();
        const distance = countdownDate - now;
        const flightStatus = document.getElementById("flightStatus");

        if (distance <= 0) {
            flightStatus.innerText = "✈️ Departed";
        } else if (distance <= 86400000) {
            flightStatus.innerText = "🟥 Boarding Soon!";
        } else if (distance <= 604800000) {
            flightStatus.innerText = "🟠 Packing Bags...";
        } else {
            flightStatus.innerText = "🟢 ON TIME";
        }
    }

    updateFlightStatus();
    setInterval(updateFlightStatus, 60000);
    startKnowMoreLoop();
});

const countdown = document.getElementById("countdown");
function updateCountdown() {
    const targetDate = new Date("2025-08-19T00:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();
