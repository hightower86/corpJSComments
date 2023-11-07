const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');

const inputHandler = (event) => {
    // determine maximum numger of characters
    maxNumberChars = 150;

    const charsTyped = event.target.value.length;

    // how many characters are left
    const charsLeft = maxNumberChars - charsTyped;

    // update the counter
    counterEl.textContent = charsLeft;
};

textareaEl.addEventListener('input', inputHandler);
