const calcDisplay = document.querySelector('.calc-display');
const calcInpDisplay = document.querySelector('.calc-input-display');
const keysWrapper = document.querySelector('.calc-keys');
const charArr = ['+', '-', '*', '/', '%', ',', '.'];
const equation = [];
const tmpNumb = [];

// DIGITAL KEYPAD INPUT
keysWrapper.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }

    inputValid(event.target.value);
});

// KEYBOARD INPUT
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
    if(Number(inputCode) || inputCode == '0' || inputCode === ',' || inputCode === '.'){
        tmpNumb.push(inputCode);
        displayEquation(tmpNumb);
    }else{

        switch(inputCode){
            case 'C':
                return clear();
                break;

            case '+/-':
                tmpNumb.unshift('(-');
                tmpNumb.push(')');
                equation.push(tmpNumb.join(''));
                break;

            case '=':
                equation.push(tmpNumb.join(''));
                displayEquation(null, result = true);
                break;

            default:
                equation.push(tmpNumb.join(''));
                equation.push(inputCode);
                break;
        }

        tmpNumb.splice(0, tmpNumb.length);
        displayEquation();
    }
}

function clear(){
    calcDisplay.value = 0;
    calcInpDisplay.value = 0;
    equation.splice(0, equation.length);
    tmpNumb.splice(0, tmpNumb.length);
}

function displayEquation(tmpValue = null, result = false) {
    let boo = 0;

    if(tmpValue !== null){
        boo = tmpValue.join('');
    }else{
        boo = equation.join('');
    }

    boo = boo.replaceAll(',', '.');

    if (result) {
        displayResult(boo, true);
    } else {
        calcInpDisplay.value = boo;
        displayResult(boo);
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
