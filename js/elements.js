const GENERATED_PASSWORD_LENGTH = 32; // max 88
const GENERATED_USERNAME_LENGTH = 32; // max 88
const LABEL_WIDTH = '17.5rem';
const INPUT_WIDTH = '28rem';
const PASSWORD_INPUT_WIDTH = '24rem';
const MARGIN = '0.5rem';
const BORDER = '1px solid #aaa';
const BORDER_RADIUS = '5px';

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function setBorder(element) {

    element.style.setProperty('border', BORDER, 'important');
    element.style.setProperty('border-radius', BORDER_RADIUS, 'important');
}

function getParentDomainsChain() {

    const domain = window.location.hostname;
    var subdomains = domain.split('.');
    var parentDomains = [domain];

    for (var i = 1; i < subdomains.length; i++) {
        var parentDomain = subdomains.slice(i).join('.');
        parentDomains.push(parentDomain);
    }

    return parentDomains;
}

function addTitle(parentElement) {

    const title = document.createElement('h2');
    title.innerHTML = 'Password Manager Generator';
    title.style.setProperty('text-align', 'center', 'important');
    title.style.setProperty('font-size', '1.7rem', 'important');

    parentElement.appendChild(title);

    const subtitle = document.createElement('h3');
    subtitle.innerHTML = 'Generate Password';
    subtitle.style.setProperty('text-align', 'center', 'important');
    title.style.setProperty('font-size', '1.5rem', 'important');

    parentElement.appendChild(subtitle);
}

function addLink(parentElement, href, text) {

    const link = document.createElement('a');
    link.href = href;
    link.text = text;
    link.style.setProperty('float', 'right', 'important');

    parentElement.appendChild(link);
}

function addSeparationLine(parentElement) {

    const separationLine = document.createElement('hr');
    separationLine.style.setProperty('border', BORDER, 'important');
    separationLine.style.setProperty('width', INPUT_WIDTH, 'important');
    separationLine.style.setProperty('margin-bottom', MARGIN, 'important');

    parentElement.appendChild(separationLine);
}

function addBR(parentElement) {

    parentElement.appendChild(document.createElement('br'));
}

function createPopover(passwordField) {

    const popover = document.createElement('div');
    popover.id = 'popover-' + (passwordField ? passwordField.id : '');
    popover.style.setProperty('position', 'absolute', 'important');
    popover.style.setProperty('background-color', '#f9f9f9', 'important');
    popover.style.setProperty('border', BORDER, 'important');
    popover.style.setProperty('padding', '8px', 'important');
    popover.style.setProperty('border-radius', '10px', 'important');
    popover.style.setProperty('z-index', '9999', 'important');
    popover.style.setProperty('font-family', 'Roboto, sans-serif', 'important');
    popover.style.setProperty('cursor', 'move', 'important');

    let offsetX = 0
    let offsetY = 0;
    let isDragging = false;

    popover.addEventListener('mousedown', function (e) {
        isDragging = true;
        offsetX = e.clientX - popover.getBoundingClientRect().left;
        offsetY = e.clientY - popover.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            popover.style.setProperty('left', (e.clientX - offsetX) + 'px', 'important');
            popover.style.setProperty('top', (e.clientY - offsetY) + 'px', 'important');
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });

    return popover;
}


function createLabel(parentElement, htmlFor, textContent) {

    const label = document.createElement('Label');
    label.htmlFor = htmlFor;
    label.textContent = textContent;
    label.style.setProperty('font-weight', 'bold', 'important');
    label.style.setProperty('min-width', LABEL_WIDTH, 'important');
    label.style.setProperty('display', 'inline-block', 'important');
    label.style.setProperty('cursor', 'pointer', 'important');
    label.style.setProperty('margin-bottom', MARGIN, 'important');

    parentElement.appendChild(label);

    return label;
}

function createInputText(parentElement, id, placeholder, value, readOnly) {

    const input = document.createElement('input');
    input.id = id;
    input.type = 'text';
    input.placeholder = placeholder;
    input.style.setProperty('width', INPUT_WIDTH, 'important');
    input.style.setProperty('margin-bottom', MARGIN, 'important');
    setBorder(input);

    if (value) {
        input.value = value;
    }

    if (readOnly) {
        input.readOnly = true;
    }

    parentElement.appendChild(input);
    addBR(parentElement);

    return input;
}

function createInputNumber(parentElement, id, value) {

    const input = document.createElement('input');
    input.id = id;
    input.type = 'number';
    input.value = value;
    input.style.setProperty('width', '3rem', 'important');
    input.style.setProperty('margin-bottom', MARGIN, 'important');
    setBorder(input);

    parentElement.appendChild(input);
    addBR(parentElement);

    return input;
}

function createButton() {

    const button = document.createElement('button');
    button.style.setProperty('cursor', 'pointer', 'important');
    button.style.setProperty('background-color', '#ddd', 'important');
    button.style.setProperty('color', 'black', 'important');
    setBorder(button);

    return button;
}

function createCloseButton(parentElement, isIndex) {

    if (isIndex) {
        return null;
    }

    const closeButton = createButton();
    closeButton.innerHTML = 'X';
    closeButton.name = 'Close';
    closeButton.style.setProperty('float', 'right', 'important');

    parentElement.appendChild(closeButton);
    addBR(parentElement);

    return closeButton;
}

function createCopyButton(parentElement) {

    const copyButton = createButton();
    copyButton.innerHTML = '&#9112;';
    copyButton.style.setProperty('float', 'right', 'important');
    copyButton.style.setProperty('margin-top', '1.8rem', 'important');
    copyButton.style.setProperty('margin-right', '1rem', 'important');

    parentElement.appendChild(copyButton);

    return copyButton;
}

function createDomainInput(parentElement, isIndex, value) {

    createLabel(parentElement, 'domainInput', 'Domain: ');
    addBR(parentElement);

    if (isIndex) {
        return createInputText(parentElement, 'domainInput', 'Domain...');
    }

    const domainInput = document.createElement('select');
    domainInput.id = 'domainInput';
    domainInput.style.setProperty('width', INPUT_WIDTH, 'important');
    domainInput.style.setProperty('margin-bottom', MARGIN, 'important');
    setBorder(domainInput);

    if (value) {
        domainInput.value = value;
    }

    const parentDomainsChain = getParentDomainsChain();
    for (var i = 0; i < parentDomainsChain.length; i++) {
        var option = document.createElement('option');
        option.value = parentDomainsChain[i];
        option.text = parentDomainsChain[i];
        domainInput.appendChild(option);
    }

    parentElement.appendChild(domainInput);
    addBR(parentElement);

    return domainInput;
}

function createUserNameInput(parentElement, userNameField, value) {

    createLabel(parentElement, 'userNameInput', 'User name: ');
    addBR(parentElement);

    let userName = userNameField ? userNameField.value : null;

    if (value) {
        userName = value;
    }

    return createInputText(parentElement, 'userNameInput', 'User name...', userName);
}

function createPasswordInput(parentElement, id, label, readOnly, needLabel) {

    if (needLabel) {
        createLabel(parentElement, id, label + ': ');
        addBR(parentElement);
    }

    const passwordContainer = document.createElement('div');
    passwordContainer.style.setProperty('position', 'relative', 'important');
    passwordContainer.style.setProperty('width', PASSWORD_INPUT_WIDTH, 'important');

    const passwordInput = document.createElement('input');
    passwordInput.id = id;
    passwordInput.type = 'password';
    passwordInput.placeholder = label + '...';
    passwordInput.style.setProperty('width', PASSWORD_INPUT_WIDTH, 'important');
    passwordInput.style.setProperty('margin-bottom', MARGIN, 'important');
    setBorder(passwordInput);
    passwordContainer.appendChild(passwordInput);

    const passwordToggle = document.createElement('span');
    passwordToggle.innerHTML = '&#128274;';
    passwordToggle.style.setProperty('position', 'absolute', 'important');
    passwordToggle.style.setProperty('right', '5px', 'important');
    passwordToggle.style.setProperty('cursor', 'pointer', 'important');
    passwordToggle.addEventListener('click', function (event) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.innerHTML = '&#128275;'; // Open lock icon
        } else {
            passwordInput.type = 'password';
            passwordToggle.innerHTML = '&#128274;'; // Closed lock icon
        }
    });
    passwordContainer.appendChild(passwordToggle);

    if (readOnly) {
        passwordInput.readOnly = true;
    } else {
        if (!isMobileDevice()) {
            const styleElement = document.createElement('style');
            const styleContent = '.keyboardInputInitiator {' +
                ' float: right !important;' +
                ' margin-right: -3.5rem !important;' +
                '}'
            styleElement.textContent = styleContent;
            document.head.appendChild(styleElement);
            VKI_attach(passwordInput);
        }
    }

    parentElement.appendChild(passwordContainer);

    return passwordInput;
}

function createOptionsContainer(parentElement, opened) {

    const optionsButton = createButton();
    optionsButton.style.setProperty('margin-bottom', MARGIN, 'important');

    parentElement.appendChild(optionsButton);
    addBR(parentElement);

    const optionsContainer = document.createElement('div');

    if (opened) {
        optionsButton.innerHTML = 'Less options...';
        optionsContainer.style.setProperty('display', 'block', 'important');
    } else {
        optionsButton.innerHTML = 'More options...';
        optionsContainer.style.setProperty('display', 'none', 'important');
    }

    parentElement.appendChild(optionsContainer);

    optionsButton.addEventListener('click', function () {
        if (optionsContainer.style.display === 'block') {
            optionsButton.innerHTML = 'More options...';
            optionsContainer.style.setProperty('display', 'none', 'important');
        } else {
            optionsButton.innerHTML = 'Less options...';
            optionsContainer.style.setProperty('display', 'block', 'important');
        }
    });

    return optionsContainer;
}

function createGeneratedPasswordLengthInput(parentElement, generatedPasswordLength) {

    createLabel(parentElement, 'generatedPasswordLengthInput', 'Generated password length: ');

    if (!generatedPasswordLength) {
        generatedPasswordLength = GENERATED_PASSWORD_LENGTH;
    }

    return createInputNumber(parentElement, 'generatedPasswordLengthInput', generatedPasswordLength);
}

function createChekBox(parentElement, id, label, checked) {

    createLabel(parentElement, id, label);

    const checkBox = document.createElement('input');
    checkBox.id = id;
    checkBox.type = 'CheckBox';
    checkBox.checked = checked;
    checkBox.style.setProperty('margin-bottom', MARGIN, 'important');
    checkBox.style.setProperty('cursor', 'pointer', 'important');
    setBorder(checkBox);

    parentElement.appendChild(checkBox);
    addBR(parentElement);

    return checkBox;
}

function createPasswordChekBox(parentElement, checkBoxName, checked) {

    if (!checked) {
        checked = true;
    }

    return createChekBox(parentElement, checkBoxName + 'CheckBox', checkBoxName + ' characters: ', checked);
}

function createCodesCardLabel(parentElement, codesCardCellLabel) {

    const label = createLabel(parentElement, 'codesCardInput', codesCardCellLabel + ':');
    label.style.setProperty('min-width', '', 'important');
    return label;
}

function createGeneratedUserNameChekBox(parentElement, checked) {

    if (!checked) {
        checked = false;
    }

    return createChekBox(parentElement,
        'generatedUserNameCheckBox', 'Generate user name:', checked);
}

function createGeneratedUserNameLengthInput(parentElement, generatedUserNameLength) {

    createLabel(parentElement, 'generatedUserNameLengthInput', 'Generated user name length: ');

    if (!generatedUserNameLength) {
        generatedUserNameLength = GENERATED_USERNAME_LENGTH;
    }

    return createInputNumber(parentElement, 'generatedUserNameLengthInput', generatedUserNameLength);
}

function createGeneratedUserNameInput(parentElement) {

    const input = createInputText(parentElement, 'generatedUserNameInput', 'Generated user name...', '', true);
    input.style.setProperty('width', PASSWORD_INPUT_WIDTH, 'important');
    return input;
}