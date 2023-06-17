const index = {
    min: 1.2,
    low: 1.375,
    medium: 1.55,
    high: 1.725,
    max: 1.9,
};

const formula = {
    forWeight: 10,
    forHeight: 6.25,
    forAge: 5,
    forMale: 5,
    forFemale: 161,
}

let parameters = {}

const form = document.querySelector('.form');
const inputGroups = form.querySelectorAll('.inputs-group input');
const buttonResult = form.querySelector('.form__submit-button');
const buttonReset = form.querySelector('.form__reset-button');

const counterResult = document.querySelector('.counter__result');

inputGroups.forEach((input) => {
    input.addEventListener('input', () => {
        checkInputHaveValue() ? buttonReset.disabled = false : buttonReset.disabled = true;

        checkAllInputsHaveValue() ? buttonResult.disabled = false : buttonResult.disabled = true;
    })
})

function checkInputHaveValue() {
    let checkInputs = [];

    inputGroups.forEach((input) => {
        if (input.value !== '') {
            checkInputs.push(input.value);
        }
    })

    return checkInputs.length >= 1 ? true : false;
}

function checkAllInputsHaveValue() {
    let allCheckInputs = [];

    inputGroups.forEach((input) => {
        if (input.value !== '') {
            allCheckInputs.push(input.value);
        }
    })

    return allCheckInputs.length === 3 ? true : false;
}

function getParameters() {
    const gender = document.querySelector('.switcher input:checked').value;
    const age = form.querySelector('#age').value;
    const height = form.querySelector('#height').value;
    const weight = form.querySelector('#weight').value;
    const heading = document.querySelector('.radios-group input:checked').value;

    return parameters = {
        gender,
        age,
        height,
        weight,
        heading,
    }
}

function calculateCalories(parameters) {
    let N = (formula.forWeight * parameters.weight) + (formula.forHeight * parameters.height) - (formula.forAge * parameters.age);
    let normal;

    switch (parameters.gender) {
        case 'male':
            N += formula.forMale;
            break;
        case 'female':
            N += formula.forFemale;
            break;
    }

    switch (parameters.heading) {
        case 'min':
            normal = N * index.min
            break;
        case 'low':
            normal = N * index.low
            break;
        case 'medium':
            normal = N * index.medium
            break;
        case 'high':
            normal = N * index.high
            break;
        case 'max':
            normal = N * index.max
            break;
    }

    let percents = (normal / 100) * 15;

    let weightNormal = (normal).toFixed(0);
    let weightGain = (normal + percents).toFixed(0);
    let weightLoss = (normal - percents).toFixed(0);

    return {
        weightNormal,
        weightGain,
        weightLoss
    }
}

function showResults(result) {
    const caloriesNorm = counterResult.querySelector('#calories-norm');
    const caloriesMin = counterResult.querySelector('#calories-minimal');
    const caloriesMax = counterResult.querySelector('#calories-maximal');

    function insertingResults() {
        caloriesNorm.textContent = result.weightNormal;
        caloriesMin.textContent = result.weightLoss;
        caloriesMax.textContent = result.weightGain;
    }

    if (!counterResult.classList.contains('counter__result--hidden')) {
        insertingResults();
    } else {
        insertingResults();
        counterResult.classList.remove('counter__result--hidden')
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let calories = calculateCalories(getParameters());

    buttonResult.blur();
    showResults(calories);
    counterResult.scrollIntoView()
})

form.addEventListener('reset', () => {
    counterResult.classList.add('counter__result--hidden');
    buttonResult.disabled = true;
    buttonReset.disabled = true;
    window.scroll(0, 0)
})
