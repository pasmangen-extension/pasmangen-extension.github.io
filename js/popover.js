function updateFields(updateFieldsObject) {

    const passwordSeed = {
        'domainSeed': updateFieldsObject.domainInput.value,
        'userNameSeed': updateFieldsObject.userNameInput.value,
        'masterPasswordSeed': updateFieldsObject.masterPasswordInput.value,
        'codesCardSeed': updateFieldsObject.codesCardInput.value,
        'passwordLength': updateFieldsObject.generatedPasswordLengthInput.value,
        'hasOthers': updateFieldsObject.specialCheckBox.checked,
        'hasNumber': updateFieldsObject.numberCheckBox.checked,
        'hasUpper': updateFieldsObject.upperCheckBox.checked,
        'hasLower': updateFieldsObject.lowerCheckBox.checked
    }
    const newPassword = generatePasswordFromSeeds(passwordSeed)

    updateFieldsObject.generatedPasswordInput.value = newPassword;

    if (updateFieldsObject.userNameField) {
        updateFieldsObject.userNameField.value = updateFieldsObject.userNameInput.value;
    }

    if (updateFieldsObject.passwordField) {
        updateFieldsObject.passwordField.value = newPassword;
    }

    const codesCardCellLabel = generateCodesCardCellLabel(
        updateFieldsObject.domainInput.value,
        updateFieldsObject.userNameInput.value,
        updateFieldsObject.codesCardLengthInput.value);

    updateFieldsObject.codesCardLabel.textContent = codesCardCellLabel;

    if (updateFieldsObject.generatedUserNameCheckBox.checked) {

        const generateUserName = generateUserNameFromSeeds(
            updateFieldsObject.domainInput.value,
            updateFieldsObject.userNameInput.value,
            updateFieldsObject.generatedUserNameLengthInput.value);

        updateFieldsObject.generatedUserNameInput.value = generateUserName;

        if (updateFieldsObject.userNameField) {
            updateFieldsObject.userNameField.value = generateUserName;
        }
    }
}

// Function to find previous input of the pasword field (normaly the user name field)
function previousInput(passwordField) {

    const inputsFields = document.querySelectorAll('input');

    // Find the previous input field relative to the password field
    for (let index = 0; index < inputsFields.length; index++) {

        const element = inputsFields[index];

        if (element === passwordField) {

            // Return the field of the previous input field, if it exists
            return inputsFields[index - 1] ? inputsFields[index - 1] : null;
        }
    }

    return null;
}

function closePopover(popover, closeObject) {

    popover.style.display = 'none';

    console.log(closeObject);

    setObjectToLocalStorage(window.location.hostname, closeObject);
}

function copyText(textToCopy) {

    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy);
    } else {
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = textToCopy;
        tempInput.select();
        document.execCommand('copy', false);
        tempInput.remove();
    }
}

function initializePopover(passwordField) {

    const isIndex = passwordField ? false : true;
    const userNameField = previousInput(passwordField);
    const popover = createPopover();
    const closeButton = createCloseButton(popover, isIndex);

    addTitle(popover);

    const localStorage = getObjectFromLocalStorage(window.location.hostname);

    const domainInput = createDomainInput(popover, isIndex,
        localStorage ? localStorage.domainInput : null);
    const userNameInput = createUserNameInput(popover, userNameField,
        localStorage ? localStorage.userNameInput : null);
    const masterPasswordInput = createPasswordInput(popover, 'Master');
    const generatedPasswordCopyButton = createCopyButton(popover);
    const generatedPasswordInput = createPasswordInput(popover, 'Generated');

    addLink(popover, './help/', 'Help');
    const optionsContainer = createOptionsContainer(popover,
        localStorage ? localStorage.optionsContainer : null);

    addSeparationLine(optionsContainer);

    const generatedPasswordLengthInput = createGeneratedPasswordLengthInput(optionsContainer,
        localStorage ? localStorage.passwordLengthInput : null);
    const upperCheckBox = createPasswordChekBox(optionsContainer, 'Upper',
        localStorage ? localStorage.upperCheckBox : null);
    const lowerCheckBox = createPasswordChekBox(optionsContainer, 'Lower',
        localStorage ? localStorage.lowerCheckBox : null);
    const specialCheckBox = createPasswordChekBox(optionsContainer, 'Special',
        localStorage ? localStorage.specialCheckBox : null);
    const numberCheckBox = createPasswordChekBox(optionsContainer, 'Number',
        localStorage ? localStorage.numberCheckBox : null);

    addSeparationLine(optionsContainer);

    const codesCardCellLabel = generateCodesCardCellLabel(domainInput.value, userNameInput.value);
    const codesCardLabel = createCodesCardLabel(optionsContainer, codesCardCellLabel);
    const codesCardInput = createCodesCardInput(optionsContainer);
    addLink(optionsContainer, './card/', 'Generate Codes Card');
    addBR(optionsContainer);

    addSeparationLine(optionsContainer);

    const generatedUserNameCheckBox = createGeneratedUserNameChekBox(optionsContainer,
        localStorage ? localStorage.generatedUserNameCheckBox : null);
    const generatedUserNameCopyButton = createCopyButton(optionsContainer);
    const generatedUserNameLengthInput = createGeneratedUserNameLengthInput(optionsContainer,
        localStorage ? localStorage.generatedUserNameLengthInput : null);
    const generatedUserNameInput = createGeneratedUserNameInput(optionsContainer);

    const updateFieldsObject = {
        'userNameField': userNameField,
        'passwordField': passwordField,
        'domainInput': domainInput,
        'userNameInput': userNameInput,
        'masterPasswordInput': masterPasswordInput,
        'generatedPasswordInput': generatedPasswordInput,
        'generatedPasswordLengthInput': generatedPasswordLengthInput,
        'specialCheckBox': specialCheckBox,
        'numberCheckBox': numberCheckBox,
        'upperCheckBox': upperCheckBox,
        'lowerCheckBox': lowerCheckBox,
        'codesCardLabel': codesCardLabel,
        'codesCardInput': codesCardInput,
        'generatedUserNameCheckBox': generatedUserNameCheckBox,
        'generatedUserNameLengthInput': generatedUserNameLengthInput,
        'generatedUserNameInput': generatedUserNameInput,
    };

    if (closeButton) {
        closeButton.addEventListener('click', function () {

            const closeObject = {
                'domainInput': domainInput.value,
                'userNameInput': userNameInput.value,
                'optionsContainer': optionsContainer.dataset.opened,
                'generatedPasswordLengthInput': generatedPasswordLengthInput.value,
                'specialCheckBox': specialCheckBox.checked,
                'numberCheckBox': numberCheckBox.checked,
                'upperCheckBox': upperCheckBox.checked,
                'lowerCheckBox': lowerCheckBox.checked,
                'generatedUserNameCheckBox': generatedUserNameCheckBox.checked,
                'generatedUserNameLengthInput': generatedUserNameLengthInput.value,
            };
            
            closePopover(popover, closeObject)
        });
    }

    generatedPasswordCopyButton.addEventListener('click', function () {
        copyText(generatedPasswordInput.value);
    });

    generatedUserNameCopyButton.addEventListener('click', function () {
        copyText(generatedUserNameInput.value);
    });

    if (userNameField) {
        userNameField.addEventListener('input', function (event) {
            userNameInput.value = userNameField.value;
        });
    }

    domainInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    userNameInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    masterPasswordInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    generatedPasswordLengthInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    specialCheckBox.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    numberCheckBox.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    lowerCheckBox.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    upperCheckBox.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    codesCardInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    generatedUserNameCheckBox.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    generatedUserNameLengthInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });

    return popover;
}