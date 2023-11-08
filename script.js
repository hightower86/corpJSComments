const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const listEl = document.querySelector('.list');
const listItemEl = document.createElement('li');

const inputHandler = (event) => {
    // determine maximum numger of characters
    maxNumberChars = 150;

    const charsTyped = event.target.value.length;

    // how many characters are left
    const charsLeft = maxNumberChars - charsTyped;

    // update the counter
    counterEl.textContent = charsLeft;

    // reset validation
    if (formEl.classList.contains('form--invalid')) {
        formEl.classList.remove('form--invalid');
    }
};

textareaEl.addEventListener('input', inputHandler);

// -- SUBMIT COMPONENT --

const submitHandler = (event) => {
    event.preventDefault();

    // get the value of the textarea
    const textareaValue = textareaEl.value;

    // validation
    if (textareaValue.includes('#') && textareaValue.length > 4) {
        formEl.classList.add('form--valid');

        setTimeout(() => {
            formEl.classList.remove('form--valid');
        }, 1800);
    } else {
        formEl.classList.add('form--invalid');
        setTimeout(() => formEl.classList.remove('form--invalid'), 1800);
        // focus on the textarea
        textareaEl.focus();

        return;
    }

    // create a new list item
    listItemEl.textContent = textareaValue;

    // append the list item to the list
    console.log(textareaValue);
    // reset the form
};

formEl.addEventListener('submit', submitHandler);
