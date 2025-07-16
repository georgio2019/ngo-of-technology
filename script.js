const rewards = [
  "iPhone",
  "Better Luck Next Time",
  "AirPods",
  "Better Luck Next Time",
  "Apple Watch",
  "Better Luck Next Time",
  "Better Luck Next Time",
  "Better Luck Next Time",
  "Better Luck Next Time"
];

const colors = [
  "#FFD700",
  "#ccc",
  "#76d7c4",
  "#ccc",
  "#ff9f43",
  "#ccc",
  "#ccc",
  "#ccc",
  "#ccc"
];

const slices = document.getElementById("slices");
const result = document.getElementById("result");

// Draw the wheel slices and emojis
for (let i = 0; i < 9; i++) {
  const angle = 360 / 9;
  const rotate = i * angle;

  const x1 = 150 * Math.cos((2 * Math.PI * i) / 9);
  const y1 = 150 * Math.sin((2 * Math.PI * i) / 9);
  const x2 = 150 * Math.cos((2 * Math.PI * (i + 1)) / 9);
  const y2 = 150 * Math.sin((2 * Math.PI * (i + 1)) / 9);
  const d = `M0,0 L${x1},${y1} A150,150 0 0,1 ${x2},${y2} Z`;

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  path.setAttribute("fill", colors[i]);
  slices.appendChild(path);

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", "0");
  line.setAttribute("y1", "0");
  line.setAttribute("x2", x1);
  line.setAttribute("y2", y1);
  line.setAttribute("stroke", "#000");
  line.setAttribute("stroke-width", "2");
  slices.appendChild(line);

  const centerAngle = (rotate + angle / 2) * (Math.PI / 180);
  const r = 100;
  const cx = r * Math.cos(centerAngle);
  const cy = r * Math.sin(centerAngle);

  const iconText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  iconText.setAttribute("x", cx);
  iconText.setAttribute("y", cy + 10);
  iconText.setAttribute("text-anchor", "middle");
  iconText.setAttribute("font-size", "30");
  iconText.setAttribute("font-family", "Arial, sans-serif");

  if (rewards[i] === "iPhone") {
    iconText.textContent = "📱";
  } else if (rewards[i] === "AirPods") {
    iconText.textContent = "🎧";
  } else if (rewards[i] === "Apple Watch") {
    iconText.textContent = "⌚";
  } else {
    iconText.textContent = "❌";
  }

  slices.appendChild(iconText);
}

const finalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
finalLine.setAttribute("x1", "0");
finalLine.setAttribute("y1", "0");
finalLine.setAttribute("x2", "150");
finalLine.setAttribute("y2", "0");
finalLine.setAttribute("stroke", "#000");
finalLine.setAttribute("stroke-width", "2");
slices.appendChild(finalLine);

let currentRotation = 0;
let adsWatched = 0;
let sharesDone = 0;

const adsCountSpan = document.getElementById("adsCount");
const shareCountSpan = document.getElementById("shareCount");
const spinBtn = document.getElementById("spin");

// Disable spin button initially
spinBtn.disabled = true;

// Enable spin button only if tasks done
function updateSpinAccess() {
  spinBtn.disabled = !(adsWatched >= 5 && sharesDone >= 3);
}

document.getElementById("watchAdBtn").addEventListener("click", () => {
  if (adsWatched < 5) {
    adsWatched++;
    adsCountSpan.textContent = adsWatched;
    updateSpinAccess();
    alert(`Ad watched #${adsWatched}`);
  } else {
    alert("You already watched 5 ads.");
  }
});

document.getElementById("shareBtn").addEventListener("click", () => {
  if (sharesDone < 3) {
    sharesDone++;
    shareCountSpan.textContent = sharesDone;
    updateSpinAccess();
    alert(`Shared successfully (${sharesDone}/3)`);
  } else {
    alert("You already shared 3 times.");
  }
});

spinBtn.addEventListener("click", () => {
  result.textContent = "";

  spinBtn.disabled = true; // Prevent multiple spins

  const spinDeg = 360 * 5 + Math.floor(Math.random() * 360);
  currentRotation += spinDeg;
  document.getElementById("wheel").style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    const sliceDeg = 360 / 9;
    const normalizedRotation = currentRotation % 360;
    const landingAngle = 360 - (normalizedRotation % 360);
    const index = Math.floor(landingAngle / sliceDeg) % 9;

    const prize = rewards[index];
    if (prize === "iPhone") {
      result.textContent = "🎉 Congratulations! You won an iPhone 📱";
    } else if (prize === "AirPods") {
      result.textContent = "🎉 You won AirPods 🎧";
    } else if (prize === "Apple Watch") {
      result.textContent = "🎉 You won an Apple Watch ⌚";
    } else {
      result.textContent = "❌ Better luck next time!";
    }

    // Reset tasks after spin
    adsWatched = 0;
    sharesDone = 0;
    adsCountSpan.textContent = "0";
    shareCountSpan.textContent = "0";

    alert("Tasks reset! Please watch 5 ads and share 3 times to spin again.");

    updateSpinAccess();
  }, 5000); // Spin duration matches animation time
});
