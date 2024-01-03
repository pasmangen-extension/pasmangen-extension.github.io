const GENERATED_PASSWORD_LENGTH = 32; // max 88
const GENERATED_USERNAME_LENGTH = 32; // max 88
const LABEL_WIDTH = '17.5rem';
const INPUT_WIDTH = '28rem';
const PASSWORD_INPUT_WIDTH = '25rem';
const VIRTUAL_KEYBOARD_MARGIN = '-3.5rem';
const NUMBER_INPUT_WIDTH = '3rem';
const MARGIN = '0.5rem';

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
    title.style.textAlign = 'center';

    parentElement.appendChild(title);

    const subtitle = document.createElement('h3');
    subtitle.innerHTML = 'Generate Password';
    subtitle.style.textAlign = 'center';

    parentElement.appendChild(subtitle);
}

function addLink(parentElement, href, text) {

    const link = document.createElement('a');
    link.href = href;
    link.text = text;
    link.style.float = 'right';

    parentElement.appendChild(link);
}

function addSeparationLine(parentElement) {

    const separationLine = document.createElement('hr');
    separationLine.style.border = '1px solid #ccc';
    separationLine.style.width = INPUT_WIDTH;
    separationLine.style.marginBottom = MARGIN;

    parentElement.appendChild(separationLine);
}

function addBR(parentElement) {

    parentElement.appendChild(document.createElement('br'));
}

function createPopover() {

    const popover = document.createElement('div');
    popover.id = 'popover'
    popover.style.position = 'absolute';
    popover.style.backgroundColor = '#f9f9f9';
    popover.style.border = '1px solid #ccc';
    popover.style.padding = '8px';
    popover.style.borderRadius = '10px';
    popover.style.zIndex = '9999';
    popover.style.fontFamily = 'Roboto, sans-serif';

    return popover;
}


function createLabel(parentElement, htmlFor, textContent) {

    const label = document.createElement('Label');
    label.htmlFor = htmlFor;
    label.style.fontWeight = 'bold';
    label.style.minWidth = LABEL_WIDTH;
    label.style.display = 'inline-block';
    label.style.cursor = 'pointer';
    label.style.marginBottom = MARGIN;
    label.textContent = textContent;

    parentElement.appendChild(label);

    return label;
}

function createInputText(parentElement, id, placeholder, value, readOnly) {

    const input = document.createElement('input');
    input.id = id;
    input.type = 'text';
    input.placeholder = placeholder;
    input.style.width = INPUT_WIDTH;
    input.style.marginBottom = MARGIN;

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
    input.style.width = NUMBER_INPUT_WIDTH;
    input.style.marginBottom = MARGIN;

    parentElement.appendChild(input);
    addBR(parentElement);

    return input;
}

function createCloseButton(parentElement, isIndex) {

    if (isIndex) {
        return null;
    }

    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'X';
    closeButton.style.cursor = 'pointer';
    closeButton.style.float = 'right';

    parentElement.appendChild(closeButton);
    addBR(parentElement);

    return closeButton;
}

function createCopyButton(parentElement) {

    const copyButton = document.createElement('button');
    copyButton.innerHTML = '&#9112;';
    copyButton.style.cursor = 'pointer';
    copyButton.style.float = 'right';
    copyButton.style.marginTop = '1.8rem';
    //copyButton.style.marginRight = '0.5rem';

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
    domainInput.style.width = INPUT_WIDTH;
    domainInput.style.marginBottom = MARGIN;

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
    passwordContainer.style.position = 'relative';
    passwordContainer.style.width = PASSWORD_INPUT_WIDTH;

    const passwordInput = document.createElement('input');
    passwordInput.id = id;
    passwordInput.type = 'password';
    passwordInput.style.width = PASSWORD_INPUT_WIDTH;
    passwordInput.style.marginBottom = MARGIN;
    passwordInput.placeholder = label + '...';
    passwordContainer.appendChild(passwordInput);

    const passwordToggle = document.createElement('span');
    passwordToggle.innerHTML = '&#128274;';
    passwordToggle.style.position = 'absolute';
    passwordToggle.style.right = '5px';
    passwordToggle.style.cursor = 'pointer';
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
        if (isMobileDevice()) {
            //passwordContainer.style.width = INPUT_WIDTH;
            //passwordInput.style.width = INPUT_WIDTH;
        } else {
            const styleElement = document.createElement('style');
            const styleContent = '.keyboardInputInitiator {' +
                ' float: right;' +
                ' margin-right: ' + VIRTUAL_KEYBOARD_MARGIN + ' !important;}'
            styleElement.textContent = styleContent;
            document.head.appendChild(styleElement);
            VKI_attach(passwordInput);
        }
    }

    parentElement.appendChild(passwordContainer);

    return passwordInput;
}

function createOptionsContainer(parentElement, opened) {

    const optionsButton = document.createElement('button');
    optionsButton.style.cursor = 'pointer';
    optionsButton.style.marginBottom = MARGIN;

    parentElement.appendChild(optionsButton);
    addBR(parentElement);

    const optionsContainer = document.createElement('div');

    if (opened) {
        optionsButton.innerHTML = 'Less options...';
        optionsContainer.style.display = 'block';
        optionsContainer.dataset.opened = true;
    } else {
        optionsButton.innerHTML = 'More options...';
        optionsContainer.style.display = 'none';
        optionsContainer.dataset.opened = false;
    }

    parentElement.appendChild(optionsContainer);

    optionsButton.addEventListener('click', function () {
        if (optionsContainer.style.display === 'block') {
            optionsButton.innerHTML = 'More options...';
            optionsContainer.style.display = 'none';
            optionsContainer.dataset.opened = false;
        } else {
            optionsButton.innerHTML = 'Less options...';
            optionsContainer.style.display = 'block';
            optionsContainer.dataset.opened = true;
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
    checkBox.style.marginBottom = MARGIN;
    checkBox.style.cursor = 'pointer';

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

    label = createLabel(parentElement, 'codesCardInput', codesCardCellLabel + ':');
    label.style.minWidth = '';
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
    input.style.width = PASSWORD_INPUT_WIDTH;
    return input;
}