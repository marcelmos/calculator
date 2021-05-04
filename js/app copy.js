const calcDisplay = document.querySelector('.calc-display');
const calcInpDisplay = document.querySelector('.calc-input-display');
const keysWrapper = document.querySelector('.calc-keys');
const charArr = ['+', '-', '*', '/', '%', ',', '.'];
const equation = [];

keysWrapper.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }

    inputValid(event.target.value);
});

document.addEventListener('keypress', (event) => {
    let keyInput = event.key;

    if (Number(keyInput)) {
        inputValid(Number(keyInput), 'press');
    } else {
        for (let i = 0; i < charArr.length; i++) {
            if (keyInput === charArr[i]) {
                return inputValid(keyInput);
            }
        }
    }
});

function inputValid(inputCode) {
    switch (inputCode) {
        case 'C':
            calcDisplay.value = 0;
            calcInpDisplay.value = 0;
            equation.splice(0, equation.length);
            break;

        case '=':
            displayEquation(true);
            break;

        default:
            equation.push(inputCode);
            displayEquation();
            break;
    }
}

function displayEquation(result = false) {
    let tmp = equation.join('');
    tmp = tmp.replaceAll(',', '.');

    if (result) {
        displayResult(tmp, true);
    } else {
        calcInpDisplay.value = tmp;
        displayResult(tmp);
    }
}

function displayResult(show, result = false) {
    let display = 0;
    let foo = eval(show);

    if (result) {
        equation.splice(0, equation.length);
        equation.push(foo);
        display = foo;
        calcInpDisplay.value = display;
    } else {
        calcInpDisplay.value = show;
        display = eval(show);
    }

    calcDisplay.value = display;
}
