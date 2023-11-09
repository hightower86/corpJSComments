const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const listEl = document.querySelector('.list');
const listItemEl = document.createElement('li');
const feedbackListEl = document.querySelector('.feedbacks');
const submitButtonEl = document.querySelector('.submit-btn');

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

    // we have text, now extract other info from it
    const hashtag = textareaValue.split(' ').find((word) => word.includes('#'));
    const company = hashtag.substring(1);
    const badgeLetter = company.substring(0, 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;

    const feedbackItem = {
        company,
        text: textareaValue,
        badgeLetter,
        upvoteCount: upvoteCount,
        daysAgo,
    };

    // new feedback item HTML
    const feedbackItemHTML = `
      <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${feedbackItem.upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${feedbackItem.company}</p>
                <p class="feedback__text">${feedbackItem.text}</p>
            </div>
            <p class="feedback__date">${
                feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`
            }</p>
        </li>
    `;

    // insert new feedback item in list
    feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);
    textareaEl.value = '';
    // blur submit button
    submitButtonEl.blur();
};

formEl.addEventListener('submit', submitHandler);
