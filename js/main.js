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

function normalizePassword(password, passwordSeed) {

    passwordLength = passwordSeed.passwordLength;
    hasOthers = passwordSeed.hasOthers;
    hasNumber = passwordSeed.hasNumber;
    hasUpper = passwordSeed.hasUpper;
    hasLower = passwordSeed.hasLower;

    var newPassword = password.slice(0, passwordLength);

    const normal = /^[a-zA-Z0-9]+$/;
    const number = /[0-9]/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;

    var append = ''

    if ((!hasOthers) && (!hasNumber) && (!hasUpper) && (!hasLower)) {
        return newPassword;
    }

    if (hasOthers) {
        if (normal.test(newPassword)) {
            append = append + '.';
        }
    } else {
        var i = 0;
        var alphabet = 'aA0bB1cC2dD3eE4fF5gG6hH7iI8jJ9kKlLmMnNoOpPqQrRsStT';
        newPassword = newPassword.replace(/[^a-zA-Z0-9]/g, function () {
            return alphabet.charAt(i++);
        });
    }

    if (hasNumber) {
        if (!number.test(newPassword)) {
            append = append + '0';
        }
    } else {
        var i = 0;
        var alphabet = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStT';
        newPassword = newPassword.replace(/[0-9]/g, function () {
            return alphabet.charAt(i++);
        });
    }

    if (hasUpper) {
        if (!upper.test(newPassword)) {
            append = append + 'M';
        }
    } else {
        newPassword = newPassword.toLowerCase();
    }

    if (hasLower) {
        if (!lower.test(newPassword)) {
            append = append + 'p';
        }
    } else {
        newPassword = newPassword.toUpperCase();
    }

    if ((!hasLower) && (!hasUpper)) {
        var i = 0;
        var alphabet = '091827364509182736450918273645';
        newPassword = newPassword.replace(/[a-zA-Z]/g, function () {
            return alphabet.charAt(i++);
        });
    }

    if ((!hasLower) && (!hasUpper) && (!hasNumber)) {
        var i = 0;
        var alphabet = '!@#$%-_+=\|;:,.!@#$%-_+=\|;:,.';
        newPassword = newPassword.replace(/[a-zA-Z0-9]/g, function () {
            return alphabet.charAt(i++);
        });
    }

    if (append) {
        newPassword = append + newPassword;
        return newPassword.slice(0, passwordLength);
    }

    return newPassword;
}

function generateCodesCardCell(domain, userName, numberCodesCardCells) {

    const text = '' + domain.toLowerCase() + userName.toLowerCase();

    let sumCharCode = 0;
    for (var i = 0; i < text.length; i++) {
        sumCharCode += text.charCodeAt(i);
    }
    return sumCharCode % numberCodesCardCells;
}

function generateCodesCardCellLabel(domain, userName, numberCodesCardCells) {

    const codesCardCell = generateCodesCardCell(domain, userName, numberCodesCardCells);
    return 'Code of card cell [' + codesCardCell + ']:';
}

function generateUserNameFromSeeds(domainSeed, userNameSeed, generatedUserNameLength) {

    const data = domainSeed.toLowerCase() + userNameSeed.toLowerCase();
    const hash = generateHashFromText(data);

    return normalizeUserName(hash, generatedUserNameLength);
}

function normalizeUserName(hash, generatedUserNameLength) {

    let userName = hash.replace(/[^a-zA-Z0-9]/g, function () {
        return '';
    });

    userName = 'p' + userName.toLowerCase();

    return userName.slice(0, generatedUserNameLength);
}


function getObjectFromLocalStorage(objectName) {

    var object = localStorage.getItem(objectName);
    if (object) {
        object = JSON.parse(object);
    }
    return object;
};

function setObjectToLocalStorage(objectName, object) {

    localStorage.setItem(objectName, JSON.stringify(object));
};