let a = ""; // first number
let b = ""; // second number
let sign = ""; // знак операции
let sig = "";
let finish = false;
let result = 0;
let box = 0;
let n = 0;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "X", "/"];

// Звук
const zvuk = new Audio();
zvuk.src = "audio/zvuk-kl.mp3";

// экран:

const out = document.querySelector("p");
const ac = document.querySelector(".ac");

ac.addEventListener("click", clearAll);

function clearAll() {
  zvuk.play();
  a = "";
  b = "";
  sign = "";
  result = 0;
  finish = false;
  box = 0;
  n = 0;
  out.innerText = 0;
  ac.innerText = "ac";
}

const but = document.querySelector(".buttons");

but.onclick = (event) => {
  if (
    !event.target.classList.contains("btn") || // Нажата кнопка
    event.target.classList.contains("ac") // Нажата кнопка ac
  ) {
    return;
  }

  const key = event.target.innerText;

  zvuk.play();

  if (n < 8) {
    n += 1;
  } else {
    return;
  }

  if (digit.includes(key)) {
    ac.innerText = "c";

    if (key == ".") {
      if (box === 0 && a !== "" && result === 0) {
      } else if (box === 0 && a === "" && result === 0) {
        a += "0";
      } else if (box === 0 && result !== 0) {
        a = "0";
        result = 0;
        b = "";
      } else {
        return;
      }
      box++;
    }

    if (sign == "" && b === "") {
      a += key;
      out.innerText = a;
    } else if (a !== "" && b !== "" && finish && sign !== "") {
      a = result;
      b = key;
      finish = false;
      out.innerText = b;
    } else if (a !== "" && b !== "" && sign == "") {
      a = key;
      b = "";
      result = 0;
      finish = false;
      out.innerText = a;
    } else {
      b += key;
      out.innerText = b;
    }
  }

  if (action.includes(key)) {
    if (sign !== "" && a !== "") {
      switch (sign) {
        case "+":
          result = Number(a) + Number(b);
          break;
        case "-":
          result = Number(a) - Number(b);
          break;
        case "X":
          result = Number(a) * Number(b);
          break;
        case "/":
          if (b == 0) {
            out.innerText = "Mistake";
            a = "";
            b = "";
            sign = "";
            return;
          }
          result = Number(a) / Number(b);
          break;
      }
      out.innerText = parseFloat(result.toFixed(5));
      a = result;
      b = "";
      sign = key;
      box = 0;
      n = 0;
    } else if (a === "" && b === "") {
      out.innerText = "0";
    } else {
      sign = key;
      switch (result) {
        case 0:
          out.innerText = a;
          break;
        default:
          out.innerText = result;
      }
      box = 0;
      n = 0;
      return;
    }
  }

  if (key == "+/-") {
    if (a !== "" && b == "") {
      a = -a;
      out.innerText = a;
    } else if (a !== "" && b !== "" && result == 0) {
      b = -b;
      out.innerText = b;
    } else if (result !== 0 && sign == "") {
      result = -result;
      out.innerText = result;
    } else if (a !== "" && b !== "" && result !== 0) {
      b = -b;
      out.innerText = b;
    }
    n = 0;
  }

  if (key == "%") {
    if (a !== "" && b == "") {
      a = a / 100;
      out.innerText = a;
    } else if (a !== "" && b !== "" && result == 0) {
      b = b / 100;
      out.innerText = b;
    } else if (result !== 0 && sign == "") {
      result = result / 100;
      out.innerText = result;
    } else if (a !== "" && b !== "" && result !== 0) {
      b = b / 100;
      out.innerText = b;
    }
    n = 0;
  }

  if (key === "=") {
    if (b === "") b = a;

    if (sign !== "") {
      switch (sign) {
        case "+":
          result = Number(a) + Number(b);
          break;
        case "-":
          result = Number(a) - Number(b);
          break;
        case "X":
          result = Number(a) * Number(b);
          break;
        case "/":
          if (b == 0) {
            out.innerText = "Mistake";
            a = "";
            b = "";
            sign = "";
            return;
          }
          result = Number(a) / Number(b);
          break;
      }

      out.innerText = parseFloat(result.toFixed(5));
    }

    if (sign === "" && a === "") {
      out.innerText = 0;
    }
    if (sign === "" && a !== "") {
      out.innerText = a;
    }
    if (result !== 0 && sign === "") {
      switch (sig) {
        case "+":
          result = result + Number(b);
          break;
        case "-":
          result = result - Number(b);
          break;
        case "X":
          result = result * Number(b);
          break;
        case "/":
          result = result / Number(b);
          break;
      }
      out.innerText = parseFloat(result.toFixed(5));
      return;
    }
    sig = sign;
    sign = "";
    finish = true;
    box = 0;
    n = 0;
  }
};
