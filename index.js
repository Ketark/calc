// test
const role = document.querySelector(".role");

const calculation = document.querySelector(".calculation");

const done = document.querySelector(".done");

function calc(text) {
  let sign = text.slice(1).match(/\+|-|x|\/|%/);
  if (sign === null) {
    return text;
  }
  const arr = text.split(/\+|-|x|\/|%/);
  if (text[0] === "-") {
    arr.shift();
    arr[0] = -arr[0];
  }
  if (sign[0] === "+") {
    text = Number(arr[0]) + Number(arr[1]);
  } else if (sign[0] === "-") {
    text = Number(arr[0]) - Number(arr[1]);
  } else if (sign[0] === "/") {
    text = Number(arr[0]) / Number(arr[1]);
  } else if (sign[0] === "x") {
    text = Number(arr[0]) * Number(arr[1]);
  } else if (sign[0] === "%") {
    text = Number(arr[0]) % Number(arr[1]);
  }
  return text;
}

document.addEventListener("keyup", (e) => {
  calculation.value = calculation.value.replace(/[^0-9]/g, "");
});

role.addEventListener("click", (e) => {
  if (e.target.classList.contains("cleanAll")) {
    calculation.value = 0;
  }
  if (e.target.classList.contains("clean")) {
    if (calculation.value.length > 1) {
      calculation.value = calculation.value.slice(
        0,
        calculation.value.length - 1
      );
    } else {
      calculation.value = 0;
    }
  }
  if (e.target.classList.contains("number")) {
    if (calculation.value === "0") {
      calculation.value = e.target.innerText;
    } else {
      calculation.value += e.target.innerText;
    }
  }
  if (e.target.classList.contains("operator")) {
    if (calculation.value.slice(1).search(/\+|-|x|\/|%/) === -1) {
      calculation.value += e.target.innerText;
    } else {
      if (
        calculation.value.search(/\+|-|x|\/|%/) !==
        calculation.value.length - 1
      ) {
        calculation.value = calc(calculation.value);
      } else {
        calculation.value = calculation.value.slice(
          0,
          calculation.value.length - 1
        );
        calculation.value += e.target.innerText;
      }
    }
  }
  if (e.target.classList.contains("point")) {
    let arr;
    if (calculation.value[0] === "-") {
      arr = calculation.value.slice(1).split(/\+|-|x|\/|%/);
    } else {
      arr = calculation.value.split(/\+|-|x|\/|%/);
    }
    console.log(arr);
    if (
      (arr.length === 1 && !arr[0].includes(".")) ||
      (arr.length === 2 && !arr[1].includes(".") && arr[1])
    ) {
      calculation.value += e.target.innerText;
    }
  }
  if (e.target.classList.contains("done")) {
    calculation.value = calc(calculation.value);
  }
});
