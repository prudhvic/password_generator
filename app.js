let strength = document.getElementById("strength");
let generate_btn = document.getElementById("generate-btn");
let passwordBox = document.getElementById("password");
let upperInput = document.getElementById("upper");
let lowerInput = document.getElementById("lower");
let numberInput = document.getElementById("number");
let symbolInput = document.getElementById("symbol");
let rangeInput = document.getElementById("password_range");
let lengthEle = document.getElementById("length");
let length = 6;
lengthEle.innerText = length;
rangeInput.value = length;
let password;
rangeInput.addEventListener("input", (e) => {
  length = +e.target.value;
  lengthEle.innerText = length.toString();
  generatePassword();
});
let inputs = [upperInput, lowerInput, numberInput, symbolInput];
let sets = {
  symbols: [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "()",
    "_",
    "-",
    "+",
    "/",
    "=",
    "{",
    "[",
    "}",
    "]",
    "|",
    "\\",
    ":",
    ";",
    "<",
    ">",
    ".",
    "?",
  ],
  numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  uppers: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ],
  lowers: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ].map((chr) => chr.toLowerCase()),
  checks: [],
  includeChars: [],
};
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    if (e.target.checked) {
      sets.checks.push(e.target.name);
    } else {
      sets.checks = sets.checks.filter((check) => check != e.target.name);
    }
  });
});

function displayPassword(password) {
  passwordBox.innerText = password;
}

function generatePassword() {
  console.log(sets.checks);
  sets.includeChars = [];
  if (sets.checks.length <= 0) return;
  password = "";
  for (let check of sets.checks) {
    sets.includeChars = [...sets.includeChars, ...sets[check]];
  }
  [...new Array(length).fill(0)].forEach((_) => {
    password +=
      sets["includeChars"][
        Math.floor(Math.random() * sets["includeChars"].length)
      ];
  });
  console.log(password);
  displayPassword(password);
  checkStrength(password);
}
generate_btn.addEventListener("click", generatePassword);
let copy_btn = document.getElementById("copy_btn");
let msg_copied = document.querySelector(".msg_copied");
copy_btn.addEventListener("click", () => {
  window.navigator.clipboard.writeText(password);
  msg_copied.style.display = "block";
  setTimeout(() => {
    msg_copied.style.display = "none";
  }, 1000);
});
function checkStrength(password) {
  if (password.length < 10) {
    strength.innerText = "Low 👇";
  } else if (password.length >= 10 && password.length < 20) {
    strength.innerText = "Medium 👌";
  } else if (password.length >= 20 && password.length < 30) {
    strength.innerText = "strong 👍";
  } else {
    strength.innerText = "very strong 💪";
  }
}
