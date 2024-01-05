function positionPopover(popover, passwordField) {

    const rect = passwordField.getBoundingClientRect();
    popover.style.setProperty('top', rect.top + window.scrollY + passwordField.offsetHeight + 20 + 'px', 'important');
    popover.style.setProperty('left', rect.left + 20 + 'px', 'important');
}

function handleFocusOnPasswordField(event) {

    const passwordField = event.target;

    let popover = document.getElementById('popover-' + passwordField.id);

    if (popover) {
        popover.style.setProperty('display', 'block', 'important');
    } else {
        popover = initializePopover(passwordField);
        positionPopover(popover, passwordField);
        document.body.appendChild(popover);
    }
}

// Add event listener to all password fields on the page
function addFocusListenerToPasswordField(field) {

    if (field instanceof Element || field instanceof Document) {

        const passwordFields = field.querySelectorAll('input[type="password"]');
        passwordFields.forEach(field => {
            if ((field.id != 'masterPasswordInput') &&
                (field.id != 'generatedPasswordInput') &&
                (field.id != 'codesCardInput') &&
                (field.id != 'generatedUserNameInput')) {
                field.addEventListener('focus', handleFocusOnPasswordField);
            }
        });
    };
}

// Load when there are changes in the DOM
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            for (let i = 0; i < mutation.addedNodes.length; i++) {
                const newNode = mutation.addedNodes[i];
                addFocusListenerToPasswordField(newNode);
            }
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Load on initial page load
addFocusListenerToPasswordField(document);
