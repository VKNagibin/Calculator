const elements = document.querySelectorAll('.grid-item');
const numbers = document.querySelectorAll('.number');
const result = document.querySelector('.result');
const operators = document.querySelectorAll('.operator');
const signChange = document.querySelector('.sign-change');
const deleteBtn = document.querySelector('.delete');
const clearBtn = document.querySelector('.clear');
const switchState = document.querySelector('.switch__state');
const switch_ = document.querySelector('.switch');

let dotsCounter = 0;   // The variable lets no repeat dots     
let currentNumber = 0; // The variable for the sign changing function
let isOn = true; // Switch on/off

   // This button lets to alter a program mode (dark mode/ light mode)
switch_.addEventListener('click', e => {

    if (isOn) {
        switchState.style.left = '50%';
    } else {
        switchState.style.left = '0';
    }
    
    toggleClass(document.querySelector('.grid-container'), 'grid-container_dark-mode');
    toggleClass(document.querySelector('.switch'), 'switch_dark');
    toggleClass(document.querySelector('.equal'), "equal_dark");

    [...operators, signChange, clearBtn, result]
        .forEach(elem => {
            toggleClass(elem, 'dark-mode');
        }); 
   
    [...operators, 
        signChange,
        clearBtn,
        deleteBtn,
        document.querySelector('.header')]
            .forEach(elem => {
                toggleClass(elem, 'dark-mode-bg');
            }); 
    
    [...numbers, document.querySelector('.dot')]
        .forEach(elem => {
            toggleClass(elem, 'number_dark-mode');
        })
    
    isOn = !isOn;
})


                // Handler for all click cases

const resultHandler = (result, elem) => {
    if (result.innerText.length == 1 && result.innerText == '0' || result.innerText == '-0') {
        switch(true) {
            case (elem.classList.contains('number')) : 
                result.innerText = elem.innerText;
                break;
            case (elem.classList.contains('sign-change')) : 
                signChangerFunc(result);
                break;
            case (elem.classList.contains('equal') || elem.classList.contains('clear')) :
                result.innerText = elem.classList.contains('clear') ? '0' : result.innerText;
                dotsCounter = 0;
                currentNumber = 0;
                break;
            case (elem.classList.contains('operator')) : 
                result.innerText += elem.id;
                dotsCounter = 0;
                break;
            case (elem.classList.contains('dot')) : 
                result.innerText += elem.id;
                dotsCounter++;
                break;
            case (elem.classList.contains('sign-change')) : 
                break;
        }   
    } else {
        switch(true) {
            case (elem.classList.contains('dot')) :
                if (dotsCounter == 0) {
                    result.innerText = result.innerText + elem.id;
                    dotsCounter++;
                }
                break;
            case (elem.classList.contains('sign-change')) : 
                signChangerFunc(result);
                break;
            case (elem.classList.contains('number')) : 
                result.innerText += elem.innerText;
                break;
            case (elem.classList.contains('equal')) :
                result.innerText = result.innerText.replace(/\-{2}/g, '+');
                result.innerText = /[0-9]/.test(+result.innerText[result.innerText.length - 1]) ?
                    eval(result.innerText) : result.innerText;
                    currentNumber = 0
                break;
            case (elem.classList.contains('clear')) :
                result.innerText = '0';
                currentNumber = 0;
                break;
            case (elem.classList.contains('operator')) : 
                operatorsHandler(result, elem);
                break;
            case (elem.classList.contains('delete')) : 
                result.innerText = result.innerText.length === 1 ?  0 :
                result.innerText.substr(0, result.innerText.length - 1);
                break;
        }
    }
}

    // This function prevent repeating an arithmetic signs

const operatorsHandler = (result, elem) => {
    if (!parseInt (result.innerText[result.innerText.length - 1]) && parseInt (result.innerText[result.innerText.length - 1]) !== 0) {
        let arr = result.innerText.split("");
        arr.pop();
        arr.push(elem.id);
        result.innerText = arr.join("");
    } else {
        result.innerText += elem.id;
    }
    currentNumber = result.innerText.length;
    dotsCounter = 0;
}


    // This function uses for changing sign (+-)

const signChangerFunc = (result) => {
    if (/[^\-]/.test(result.innerText[currentNumber])) {
        let arr = result.innerText.split('');
        arr.splice(currentNumber, 0, '-');
        result.innerText = arr.join('');
    } 
    else if (/[\(-]/.test(result.innerText[currentNumber])) {
        let arr = result.innerText.split('');
        arr.splice(currentNumber, 1);
        result.innerText = arr.join('');
    }
}


//    Function for adding classes

const toggleClass = (elem, class_) => {
    elem.classList.toggle(`${class_}`);
};


    // Main Handler

elements.forEach(elem => {
    elem.addEventListener('click', e => {
        resultHandler(result, elem);

        if( result.innerText.length > 10) {
            result.style.overflowX = 'scroll';
        }
        
    });
});

 