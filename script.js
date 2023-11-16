// -- GLOBAL --
const MAX_CHARS = 150;
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api';

const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const listEl = document.querySelector('.list');
const listItemEl = document.createElement('li');
const feedbackListEl = document.querySelector('.feedbacks');
const submitButtonEl = document.querySelector('.submit-btn');
const spinnerEl = document.querySelector('.spinner');
const hashTagsListEl = document.querySelector('.hashtags');

const renderFeedbackItem = (feedbackItem) => {
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
};

const inputHandler = (event) => {
    // determine maximum numger of characters
    maxNumberChars = MAX_CHARS;

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

// -- FORM COMPONENT --

const showVisualIndicator = (className) => {
    formEl.classList.add(className);

    setTimeout(() => {
        formEl.classList.remove(className);
    }, 1800);
};

const submitHandler = (event) => {
    event.preventDefault();

    // get the value of the textarea
    const textareaValue = textareaEl.value;

    // validation
    if (textareaValue.includes('#') && textareaValue.length > 4) {
        showVisualIndicator('form--valid');
    } else {
        showVisualIndicator('form--invalid');
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
        upvoteCount,
        daysAgo,
    };

    renderFeedbackItem(feedbackItem);

    // send feedback to the server
    fetch(`${BASE_API_URL}/feedbacks`, {
        method: 'POST',
        body: JSON.stringify(feedbackItem),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error('Failed to send feedback');
                return;
            }
            console.log('success');
        })
        .catch((err) => console.log(err.message));

    textareaEl.value = '';
    counterEl.textContent = MAX_CHARS;
    // blur submit button
    submitButtonEl.blur();
};

formEl.addEventListener('submit', submitHandler);

// -- FEEDBACK LIST COMPONENT --

feedbackListEl.addEventListener('click', (event) => {
    const clickedEl = event.target;

    // determine if user intended to upvote or expand
    const upvoteIntention = clickedEl.className.includes('upvote');

    if (upvoteIntention) {
        // upvote
        const upvoteBtnEl = clickedEl.closest('.upvote');

        // prevent double click
        upvoteBtnEl.disabled = true;

        // select the update count element within the upvote button
        const upvoteCountEl = upvoteBtnEl.querySelector('.upvote__count');

        // get the current upvote count
        let currentUpvoteCount = Number(upvoteCountEl.textContent);

        // update the upvote count
        upvoteCountEl.textContent = ++currentUpvoteCount;
    } else {
        // expand
        const feedbackEl = clickedEl.closest('.feedback');
        feedbackEl.classList.toggle('feedback--expand');
    }
});

// fetch feedbacks from the server

fetch(`${BASE_API_URL}/feedbacks`)
    .then((resp) => resp.json())
    .then((data) => {
        // remove spinner
        spinnerEl.remove();

        feedbacks = data.feedbacks;

        data.feedbacks.forEach((feedbackItem) =>
            renderFeedbackItem(feedbackItem)
        );
    })
    .catch((err) => {
        feedbackListEl.textContent = `Failed to load feedbacks: Error message: ${err}`;
    });

// -- HASHTAGS COMPONENT --
console.log('first');
const hashListClickHandler = (event) => {
    // get the clicked element
    const clickedEl = event.target;

    // stop function if click happened in list, but outside buttons
    if (clickedEl.className === 'hashtags') return;

    // extract company name
    const companyNameFromHashtag = clickedEl.textContent
        .substring(1)
        .toLowerCase()
        .trim();

    // iterate over each feedback item in the list
    feedbackListEl.childNodes.forEach((childNode) => {
        // stop this iteration if it's a text node
        if (childNode.nodeType === 3) return;

        // extract company name
        const companyNameFromFeedbackItem = childNode
            .querySelector('.feedback__company')
            .textContent.toLowerCase()
            .trim();

        // remove feedback item from list if company names are not equal
        if (companyNameFromHashtag !== companyNameFromFeedbackItem) {
            childNode.remove();
        }
    });
};

hashTagsListEl.addEventListener('click', hashListClickHandler);
