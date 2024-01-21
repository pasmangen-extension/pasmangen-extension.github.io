const NUMBER_CODES_CARD_CELLS = 40;

function generateHashFromText(text) {

    const shaobject = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
    shaobject.update(text);
    return shaobject.getHash('B64');
}

function generatePasswordFromSeeds(passwordSeed) {

    const data = passwordSeed.domainSeed.toLowerCase()
        + passwordSeed.userNameSeed.toLowerCase()
        + passwordSeed.masterPasswordSeed
        + passwordSeed.codesCardSeed;
    const hash = generateHashFromText(data);

    return normalizePassword(hash, passwordSeed);
}

function replaceSpecialCharacters(password, specialCharacters) {

    let i = 0;
    const alphabet = specialCharacters;
    return password.replace(/[^a-zA-Z0-9]/g, function () {
        if (i >= alphabet.length) {
            i = 0;
        }
        return alphabet.charAt(i++);
    });
}

function removeSpecialCharacters(password) {

    let i = 0;
    const alphabet = 'aA0bB1cC2dD3eE4fF5gG6hH7iI8jJ9kKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ';
    return password.replace(/[^a-zA-Z0-9]/g, function () {
        if (i >= alphabet.length) {
            i = 0;
        }
        return alphabet.charAt(i++);
    });
}

function removeNumbers(password) {

    let i = 0;
    const alphabet = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ';
    return password.replace(/[0-9]/g, function () {
        if (i >= alphabet.length) {
            i = 0;
        }
        return alphabet.charAt(i++);
    });
}

function removeLetters(password) {

    let i = 0;
    return password.replace(/[a-zA-Z]/g, function () {
        return '' + (i++);
    });
}

function removeNumbersAndLetters(password, specialCharacters) {

    let i = 0;
    const alphabet = specialCharacters;
    return password.replace(/[a-zA-Z0-9]/g, function () {
        if (i >= alphabet.length) {
            i = 0;
        }
        return alphabet.charAt(i++);
    });
}

function normalizePassword(password, passwordSeed) {

    const passwordLength = passwordSeed.passwordLength;
    const specialCharacters = passwordSeed.specialCharacters;

    const hasSpecial = passwordSeed.hasSpecial;
    const hasNumber = passwordSeed.hasNumber;
    const hasUpper = passwordSeed.hasUpper;
    const hasLower = passwordSeed.hasLower;

    const normal = /^[a-zA-Z0-9]+$/;
    const number = /[0-9]/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;

    let newPassword = replaceSpecialCharacters(password, specialCharacters);  

    const testPassword = newPassword.slice(0, passwordLength - 4);

    if (hasSpecial) {
        if (normal.test(testPassword)) {
            newPassword = specialCharacters.charAt(0) + newPassword;
        }
    } else {
        newPassword = removeSpecialCharacters(newPassword);
    }

    if ((!hasLower) && (!hasUpper)) {
        if (hasNumber) {
            newPassword = removeLetters(newPassword);
        }
        return newPassword.slice(0, passwordLength);
    }

    if (hasNumber) {
        if (!number.test(testPassword)) {
            newPassword = '0' + newPassword;
        }
    } else {
        newPassword = removeNumbers(newPassword);
    }

    if (hasLower) {
        if (!lower.test(newPassword)) {
            newPassword = 'm' + newPassword;
        }
    } else {
        newPassword = newPassword.toUpperCase();
    }

    if (hasUpper) {
        if (!upper.test(newPassword)) {
            newPassword = 'P' + newPassword;
        }
    } else {
        newPassword = newPassword.toLowerCase();
    }

    return newPassword.slice(0, passwordLength);
}

function generateCodesCardCell(domain, userName) {

    const text = '' + domain.toLowerCase() + userName.toLowerCase();

    let sumCharCode = 0;
    for (let i = 0; i < text.length; i++) {
        sumCharCode += text.charCodeAt(i);
    }
    return sumCharCode % NUMBER_CODES_CARD_CELLS;
}

function generateCodesCardCellLabel(domain, userName, numberCodesCardCells) {

    const codesCardCell = generateCodesCardCell(domain, userName, numberCodesCardCells);
    return 'Code of card cell [' + codesCardCell + ']';
}

function generateUserNameFromSeeds(domainSeed, userNameSeed, generatedUserNameLength) {

    const data = domainSeed.toLowerCase() + userNameSeed.toLowerCase();
    const hash = (domainSeed ? domainSeed + '-' : '') +
        (userNameSeed ? userNameSeed + '-' : '') +
        generateHashFromText(data);

    return normalizeUserName(hash, generatedUserNameLength);
}

function normalizeUserName(hash, generatedUserNameLength) {

    let userName = hash.replace(/[^a-zA-Z0-9-]/g, function () {
        return '';
    });

    userName = userName.toLowerCase();

    return userName.slice(0, generatedUserNameLength);
}

function getObjectFromLocalStorage(objectName) {

    let object = localStorage.getItem(objectName);
    if (object) {
        object = JSON.parse(object);
    }
    return object;
};

function setObjectToLocalStorage(objectName, object) {

    localStorage.setItem(objectName, JSON.stringify(object));
};