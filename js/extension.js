function positionPopover(popover, passwordField) {

    const rect = passwordField.getBoundingClientRect();
    popover.style.setProperty('top', rect.top + window.scrollY + passwordField.offsetHeight + 20 + 'px', 'important');
    popover.style.setProperty('left', rect.left + 20 + 'px', 'important');
}

function handleFocusOnPasswordField(event) {

    const passwordField = event.target;

    const prefix = 'pasmangen'

    const pasmangenElements = document.querySelectorAll('[id^="' + prefix + '"]');

    for (let index = 0; index < pasmangenElements.length; index++) {
        pasmangenElements[index].style.setProperty('display', 'none', 'important');
    }

    let popover = document.getElementById(prefix + '-' + passwordField.id);

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

        const iframes = document.querySelectorAll('iframe');

        if (SHOW_IFRAME_MESSAGE && iframes && iframes.length > 0) {

            SHOW_IFRAME_MESSAGE = false;

            const popover = createPopover();
            const closeButton = createCloseButton(popover);

            addTitle(popover);

            const paragraph1 = document.createElement('p');
            paragraph1.innerHTML = "PMG doesn't work with iframes. You can open the iframe directly:";        
            popover.appendChild(paragraph1);

            const link1 = document.createElement('a');
            link1.href = iframes[0].src;
            link1.text = iframes[0].src;
            popover.appendChild(link1);

            const paragraph2 = document.createElement('p');
            paragraph2.innerHTML = "Or you can generate your password from PMG home:";        
            popover.appendChild(paragraph2);

            const link2 = document.createElement('a');
            link2.href = 'https://pasmangen-extension.github.io/';
            link2.text = 'https://pasmangen-extension.github.io/';
            popover.appendChild(link2);

            popover.style.width = '30rem';
            popover.style.left = '50%';
            popover.style.transform = 'translateX(-50%)';
            popover.style.top = '50%';
            popover.style.transform = 'translateY(-50%)';

            document.body.appendChild(popover);

            closeButton.addEventListener('click', function () {
                popover.style.setProperty('display', 'none', 'important');
            });
        }

    };
}

let SHOW_IFRAME_MESSAGE = true;

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
