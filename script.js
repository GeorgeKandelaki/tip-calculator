"use strict";

const billInput = document.querySelector(".input-bill");
const peopleInput = document.querySelector(".input-people");
const customTip = document.querySelector(".custom-tip");
const tips = document.querySelector(".tip-buttons");
const resetBtn = document.querySelector(".reset");
const inputs = document.querySelectorAll(".input");

const calcTipPerson = function (bill, tip, people) {
    return (
        Math.floor(
            (Math.abs(bill) / Math.abs(people)) * (Math.abs(tip) / 100) * 100
        ) / 100
    );
};

const calcTotal = function (tip, bill, people) {
    return (
        Math.ceil((Math.abs(bill) / Math.abs(people) + Math.abs(tip)) * 100) /
        100
    );
};

const fillAmountInputs = function (tip, total) {
    document.querySelector(".price-tip").textContent = `$${tip}`;
    document.querySelector(".price-total").textContent = `$${total}`;
};

const errorState = function (type, errorText, errorColor) {
    document.querySelector(`.error-${type}`).textContent = errorText;
    document.querySelector(`.input-${type}`).style.outline = errorColor;
};

const enableBtn = function (percent, type) {
    resetBtn.style.opacity = percent;
    resetBtn.classList[type]("hover-disabled");
};

let tip;
let total;

tips.addEventListener("click", function (e) {
    const button = e.target;

    tip = calcTipPerson(billInput.value, button.value, peopleInput.value);
    total = calcTotal(tip, billInput.value, peopleInput.value);

    inputs.forEach((input) => {
        const type = input.getAttribute("name");
        if (input.value === "") {
            errorState(type, "Can't be zero", "2px solid lightcoral");
        } else {
            if (button.classList.contains("btn")) fillAmountInputs(tip, total);
            errorState(type, undefined, "none");
        }
    });

    if (tip > 0 || total > 0) enableBtn("100%", "remove");
});

customTip.addEventListener("input", function (e) {
    tip = calcTipPerson(billInput.value, customTip.value, peopleInput.value);
    total = calcTotal(tip, billInput.value, peopleInput.value);

    if (customTip.value > 120) return false;
    else fillAmountInputs(tip, total);
    // .click();
    // if (e.key === "Enter")
});

resetBtn.addEventListener("click", function () {
    fillAmountInputs("0.00", "0.00");
    peopleInput.value = "";
    billInput.value = "";
    customTip.value = "";
    enableBtn("20%", "add");
});
