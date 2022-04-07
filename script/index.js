const contentElem = document.querySelector(".content");
const heightRange = document.querySelector(".heightRange");
const weightRange = document.querySelector(".weightRange");
const heightSpan = document.querySelector(".heightSpan");
const weightSpan = document.querySelector(".weightSpan");
const resultValueElem = document.querySelector(".resultValue");
const resultInfoElem = document.querySelector(".resultInfo");
const resultImg = document.querySelector(".resultImg");

let weight = 75;
let height = 175;

let dataObject = {
    thin: { bg: "rgba(83, 188, 233, .62)", src: "thin", title: "Under Weight" },
    normal: { bg: "rgba(98, 180, 98, 0.604)", src: "normal", title: "Normal Weigth" },
    fat: { bg: "rgba(211, 199, 93, .62)", src: "fat", title: "Over Weigth" },
    fatC1: { bg: "rgba(251, 176, 59,.62)", src: "fatC1", title: "Obesity Class 1" },
    fatC2: { bg: "rgba(251, 176, 59,.62)", src: "fatC2", title: "Obesity Class 2" },
    fatC3: { bg: "rgba(211, 91, 100,.62)", src: "fatC3", title: "Obesity Class 3" }
}

heightRange.addEventListener("change", heightHandler);
weightRange.addEventListener("change", weightHandler);
window.addEventListener("load", initializeData)


function heightHandler(event) {
    height = +event.target.value;
    setElementData();
}

function weightHandler(event) {
    weight = +event.target.value;
    setElementData();
}

function calculateBMI() {
    // BMI Formula : weight (kg) / height(m) ** 2
    return (weight / ((height / 100) ** 2)).toFixed(2);
}

function setElementData() {

    let bmiResult = calculateBMI();
    heightSpan.innerText = height;
    weightSpan.innerText = weight;
    resultValueElem.innerText = bmiResult;

    let bmiInfo = getBmiInfo(bmiResult);
    contentElem.style.backgroundColor = bmiInfo.bg;
    resultInfoElem.innerText = bmiInfo.title;
    resultImg.style.backgroundImage = `url(../Assets/${bmiInfo.src}.png)`;

    saveInStorage();
}

function getBmiInfo(bmi) {
    if (bmi < 18.5) {

        return dataObject.thin;

    } else if (bmi > 18.5 && bmi < 25) {

        return dataObject.normal;

    } else if (bmi >= 25 && bmi < 30) {

        return dataObject.fat;

    } else if (bmi >= 30 && bmi < 35) {

        return dataObject.fatC1;

    } else if (bmi >= 35 && bmi < 40) {

        return dataObject.fatC2;

    } else if (bmi >= 40) {

        return dataObject.fatC3;
    }
}

function initializeData() {
    getStorageData()
    setElementData();
}

function saveInStorage() {
    localStorage.height = JSON.stringify(height);
    localStorage.weight = JSON.stringify(weight);
}

function getStorageData() {
    if (typeof(Storage)) {

        let storageHeight = localStorage.height;
        let storageWeight = localStorage.weight;

        if (isValidNumber(storageHeight) && isValidNumber(storageWeight)) {

            height = JSON.parse(storageHeight);
            weight = JSON.parse(storageWeight);

        } else {
            height = 171;
            weight = 70;
        }
    }
}

function isValidNumber(num) {
    return !isNaN(num) && !isNaN(parseFloat(num));
}