const DEFAULT_SPECIAL_CHARACTERS = '_-#$&¿?¡!@';
const GENERATED_PASSWORD_LENGTH = 15; // max 88
const GENERATED_USERNAME_LENGTH = 30; // max 88
const LABEL_WIDTH = '17.5rem';
const INPUT_WIDTH = '30rem';
const PASSWORD_INPUT_WIDTH = '26rem';
const SPECIAL_INPUT_WIDTH = '10rem';
const MARGIN = '0.1rem';
const MARGIN_BOTTOM = '0.5rem';
const PADDING = '0.5rem';
const BORDER = '1px solid #aaa';
const BORDER_RADIUS = '5px';

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function setCommon(element) {

    element.style.setProperty('padding', PADDING, 'important');
    element.style.setProperty('margin', MARGIN, 'important');
    element.style.setProperty('margin-bottom', MARGIN_BOTTOM, 'important');
    element.style.setProperty('border', BORDER, 'important');
    element.style.setProperty('border-radius', BORDER_RADIUS, 'important');
}

function getParentDomainsChain() {

    const domain = window.location.hostname;
    const subdomains = domain.split('.');
    const parentDomains = [domain];

    for (let i = 1; i < subdomains.length; i++) {
        let parentDomain = subdomains.slice(i).join('.');
        parentDomains.push(parentDomain);
    }

    return parentDomains;
}

function addTitle(parentElement) {

    const title = document.createElement('h2');
    title.innerHTML = 'Password Manager Generator';
    title.style.setProperty('text-align', 'center', 'important');
    title.style.setProperty('font-size', '1.5rem', 'important');

    parentElement.appendChild(title);
}

function addSubTitle(parentElement) {

    const subtitle = document.createElement('h3');
    subtitle.innerHTML = 'Generate Password';
    subtitle.style.setProperty('text-align', 'center', 'important');
    subtitle.style.setProperty('font-size', '1.3rem', 'important');

    parentElement.appendChild(subtitle);
}

function addLink(parentElement, href, text) {

    const link = document.createElement('a');
    link.href = href;
    link.text = text;
    link.style.setProperty('float', 'right', 'important');
    link.style.setProperty('color', '#0d77d1', 'important');
    link.style.setProperty('text-decoration-line', 'underline', 'important');

    parentElement.appendChild(link);
}

function addSeparationLine(parentElement) {

    addBR(parentElement);

    const separationLine = document.createElement('hr');
    separationLine.style.setProperty('border', BORDER, 'important');
    separationLine.style.setProperty('width', INPUT_WIDTH, 'important');
    separationLine.style.setProperty('margin-bottom', MARGIN_BOTTOM, 'important');

    parentElement.appendChild(separationLine);
}

function addBR(parentElement) {

    const br = document.createElement('br');
    parentElement.appendChild(br);
}

function createPopover(passwordField) {

    const popover = document.createElement('div');
    let id = 'pasmangen-';
    const timestamp = new Date().getTime();
    if (passwordField) {
        if (!passwordField.id) {
            passwordField.id = '' + timestamp;
        }
        id += '' + passwordField.id;
    } else {
        id += '' + timestamp;
    }
    popover.id = id;
    popover.style.setProperty('position', 'absolute', 'important');
    popover.style.setProperty('background-color', '#f9f9f9', 'important');
    popover.style.setProperty('border', BORDER, 'important');
    popover.style.setProperty('padding', '8px', 'important');
    popover.style.setProperty('border-radius', '10px', 'important');
    popover.style.setProperty('z-index', '99999', 'important');
    popover.style.setProperty('font-family', 'Roboto, sans-serif', 'important');
    popover.style.setProperty('cursor', 'move', 'important');
    popover.style.setProperty('text-align', 'left', 'important');

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

function createLabel(parentElement, htmlFor, textContent, minWidth) {

    addBR(parentElement);

    const label = document.createElement('Label');
    label.htmlFor = htmlFor;
    label.textContent = textContent;
    label.style.setProperty('font-weight', 'bold', 'important');
    label.style.setProperty('display', 'inline-block', 'important');
    label.style.setProperty('cursor', 'pointer', 'important');
    label.style.setProperty('margin-bottom', MARGIN_BOTTOM, 'important');

    if (minWidth) {
        label.style.setProperty('min-width', minWidth, 'important');
    } else {
        label.style.setProperty('width', INPUT_WIDTH, 'important');
    }

    parentElement.appendChild(label);

    return label;
}

function createInputText(parentElement, id, placeholder, value, readOnly) {

    const input = document.createElement('input');
    input.id = id;
    input.type = 'text';
    input.placeholder = placeholder;
    setCommon(input);
    input.style.setProperty('width', INPUT_WIDTH, 'important');
    input.style.setProperty('margin-bottom', MARGIN_BOTTOM, 'important');

    if (value) {
        input.value = value;
    }

    if (readOnly) {
        input.readOnly = true;
    }

    parentElement.appendChild(input);

    return input;
}

function createInputNumber(parentElement, id, value) {

    const input = document.createElement('input');
    input.id = id;
    input.type = 'number';
    input.value = value;
    setCommon(input);
    input.style.setProperty('width', '4rem', 'important');
    input.style.setProperty('margin-bottom', MARGIN_BOTTOM, 'important');
    input.style.setProperty('appearance', 'auto', 'important');

    parentElement.appendChild(input);

    return input;
}

function createButton() {

    const button = document.createElement('button');
    setCommon(button);
    button.style.setProperty('cursor', 'pointer', 'important');
    button.style.setProperty('background-color', '#ddd', 'important');
    button.style.setProperty('color', 'black', 'important');

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
    closeButton.style.setProperty('widht', '2rem', 'important');
    closeButton.style.setProperty('height', '2rem', 'important');

    parentElement.appendChild(closeButton);

    return closeButton;
}

function createCopyButton(parentElement) {

    const copyButton = createButton();
    copyButton.innerHTML = '&#9112;';
    copyButton.style.setProperty('float', 'right', 'important');
    copyButton.style.setProperty('margin-top', '0rem', 'important');
    copyButton.style.setProperty('margin-right', '1.6rem', 'important');

    parentElement.appendChild(copyButton);

    return copyButton;
}

function createDomainInput(parentElement, isIndex, value) {

    createLabel(parentElement, 'domainInput', 'Domain: ');
    addBR(parentElement);

    if (isIndex) {
        return createInputText(parentElement, 'domainInput', 'Domain...');
    }

    const input = document.createElement('select');
    input.id = 'domainInput';
    setCommon(input);
    input.style.setProperty('width', INPUT_WIDTH, 'important');

    if (value) {
        input.value = value;
    }

    const parentDomainsChain = getParentDomainsChain();
    for (let i = 0; i < parentDomainsChain.length; i++) {
        const option = document.createElement('option');
        option.value = parentDomainsChain[i];
        option.text = parentDomainsChain[i];
        input.appendChild(option);
    }

    parentElement.appendChild(input);

    return input;
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

function createSpecialCharactersInput(parentElement, value) {

    if (!value) {
        value = DEFAULT_SPECIAL_CHARACTERS;
    }

    const input = createInputText(parentElement, 'specialCharactersInput', 'Special characters...', value);
    input.style.setProperty('width', SPECIAL_INPUT_WIDTH, 'important');

    return input;
}

function createPasswordInput(parentElement, id, label, readOnly, needLabel) {

    if (needLabel) {
        createLabel(parentElement, id, label + ': ');
        addBR(parentElement);
    }

    const passwordContainer = document.createElement('div');
    passwordContainer.style.setProperty('position', 'relative', 'important');
    passwordContainer.style.setProperty('display', 'inline-block', 'important');
    passwordContainer.style.setProperty('width', PASSWORD_INPUT_WIDTH, 'important');

    const input = document.createElement('input');
    input.id = id;
    input.type = 'password';
    input.placeholder = label + '...';
    setCommon(input);
    input.style.setProperty('width', PASSWORD_INPUT_WIDTH, 'important');
    passwordContainer.appendChild(input);

    const passwordToggle = document.createElement('span');
    passwordToggle.innerHTML = '&#128274;';
    passwordToggle.style.setProperty('position', 'absolute', 'important');
    passwordToggle.style.setProperty('right', '0.5rem', 'important');
    passwordToggle.style.setProperty('margin-top', MARGIN_BOTTOM, 'important');
    passwordToggle.style.setProperty('cursor', 'pointer', 'important');
    passwordToggle.addEventListener('click', function (event) {
        if (input.type === 'password') {
            input.type = 'text';
            passwordToggle.innerHTML = '&#128275;'; // Open lock icon
        } else {
            input.type = 'password';
            passwordToggle.innerHTML = '&#128274;'; // Closed lock icon
        }
    });
    passwordContainer.appendChild(passwordToggle);

    if (readOnly) {
        input.readOnly = true;
    } else {
        if (!isMobileDevice()) {
            const styleElement = document.createElement('style');
            const styleContent = '.keyboardInputInitiator {' +
                ' float: right !important;' +
                ' margin-right: -4rem !important;' +
                ' margin-top: 0.5rem !important;' +
                '}'
            styleElement.textContent = styleContent;
            document.head.appendChild(styleElement);
            VKI_attach(input);
        }
    }

    parentElement.appendChild(passwordContainer);

    return input;
}

function createOptionsContainer(parentElement, opened) {

    addBR(parentElement);

    const optionsButton = createButton();
    optionsButton.style.setProperty('margin-bottom', MARGIN_BOTTOM, 'important');

    parentElement.appendChild(optionsButton);

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

    createLabel(parentElement, 'generatedPasswordLengthInput', 
        'Generated password length: ', LABEL_WIDTH);

    if (!generatedPasswordLength) {
        generatedPasswordLength = GENERATED_PASSWORD_LENGTH;
    }

    return createInputNumber(parentElement, 'generatedPasswordLengthInput', 
        generatedPasswordLength);
}

function createChekBox(parentElement, id, label, checked) {

    createLabel(parentElement, id, label, LABEL_WIDTH);

    const input = document.createElement('input');
    input.id = id;
    input.type = 'CheckBox';
    input.checked = checked;
    setCommon(input);
    input.style.setProperty('cursor', 'pointer', 'important');
    input.style.setProperty('appearance', 'checkbox', 'important');
    input.style.setProperty('width', '1.5rem', 'important');
    input.style.setProperty('margin-top', '1rem', 'important');

    parentElement.appendChild(input);

    return input;
}

function createPasswordChekBox(parentElement, checkBoxName, checked) {

    if (!checked) {
        checked = true;
    }

    return createChekBox(parentElement, checkBoxName + 'CheckBox', checkBoxName + ' characters: ', checked);
}

function createCodesCardLabel(parentElement, codesCardCellLabel) {

    const label = createLabel(parentElement, 'codesCardInput', 
        codesCardCellLabel + ':', LABEL_WIDTH);
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

    createLabel(parentElement, 'generatedUserNameLengthInput', 
        'Generated user name length: ', LABEL_WIDTH);

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