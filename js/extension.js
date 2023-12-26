function positionPopover(popover, passwordField) {

    const rect = passwordField.getBoundingClientRect();
    popover.style.top = rect.top + window.scrollY + passwordField.offsetHeight + 10 + 'px';
    popover.style.left = rect.left + 'px';
}

function handleFocusOnPasswordField(event) {

    const passwordField = event.target;

    // Check if popover has already been created for this password field
    if (passwordField.dataset.popoverCreated) {
        const popover = document.getElementById('popover');
        popover.style.display = 'block';
        return;
    }

    const popover = initializePopover(passwordField);
    positionPopover(popover, passwordField);
    document.body.appendChild(popover);

    // Mark the password field to indicate that the popover has been created
    passwordField.dataset.popoverCreated = true;
}

// Add event listener to all password fields on the page
function addFocusListenerToPasswordField(field) {

    if (field instanceof Element || field instanceof Document) {

        const passwordFields = field.querySelectorAll('input[type="password"]');
        passwordFields.forEach(field => {
            if ((field.id != 'MasterPasswordInput') &&
                (field.id != 'GeneratedPasswordInput')) {
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
