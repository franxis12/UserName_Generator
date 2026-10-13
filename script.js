const adjectives = [
  "Cosmic",
  "Quiet",
  "Golden",
  "Lunar",
  "Brave",
  "Velvet",
  "Wild",
  "Silver",
  "Neon",
  "Clever",
  "Misty",
  "Electric",
];
const nouns = [
  "Voyager",
  "Fox",
  "Orbit",
  "Otter",
  "Echo",
  "Panda",
  "Comet",
  "Sparrow",
  "Pixel",
  "Wanderer",
  "Wave",
  "Atlas",
];
const pick = (items) => items[Math.floor(Math.random() * items.length)];
const clean = (value) =>
  value
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "");
const display = document.getElementById("usernameResult");
const status = document.getElementById("status");
const list = document.getElementById("suggestedUsers");
const clear = document.getElementById("clear");
let history = [];
async function copyUsername(value) {
  try {
    await navigator.clipboard.writeText(value);
    status.textContent = "Copied. Go make it yours!";
  } catch {
    status.textContent =
      "Could not copy. Select the username and copy it manually.";
  }
}
function renderHistory() {
  list.replaceChildren();
  if (!history.length) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "Your latest ideas will appear here. Keep exploring.";
    list.append(empty);
  }
  history.forEach((name) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = name;
    button.setAttribute("aria-label", `Copy ${name}`);
    const icon = document.createElement("span");
    icon.textContent = "Copy ↗";
    button.append(icon);
    button.addEventListener("click", () => copyUsername(name));
    item.append(button);
    list.append(item);
  });
  clear.disabled = !history.length;
}
document.getElementById("generator").addEventListener("submit", (event) => {
  event.preventDefault();
  const adjective = clean(document.getElementById("adjective").value);
  const noun = clean(document.getElementById("noun").value);
  const number = document.getElementById("number").value;
  const separator = document.getElementById("separator").value;
  const parts = [adjective || pick(adjectives), noun || pick(nouns)];
  if (number !== "") parts.push(number);
  else parts.push(String(Math.floor(Math.random() * 100)).padStart(2, "0"));
  const name = parts.join(separator);
  display.textContent = name;
  status.textContent = "";
  history = [name, ...history.filter((item) => item !== name)].slice(0, 8);
  renderHistory();
});
document
  .getElementById("copy")
  .addEventListener("click", () => copyUsername(display.textContent));
clear.addEventListener("click", () => {
  history = [];
  renderHistory();
  status.textContent = "Shortlist cleared.";
});
