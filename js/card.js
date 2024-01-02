const NUM_COLUMNS = 4;
const NUM_ROWS = 10;

function getValueOf(id) {

    return document.getElementById(id).value.toLowerCase();
}

function getHash() {

    const birthplace = getValueOf('birthplace');
    const childhoodFriend = getValueOf('childhoodFriend');
    const schoolName = getValueOf('schoolName');
    const cardName = getValueOf('cardName');

    const data1 = birthplace + childhoodFriend + schoolName + cardName;
    const data2 = schoolName + cardName + birthplace + childhoodFriend;
    const hash = generateHashFromText(data1) + generateHashFromText(data2);

    return hash;
}

function generateCodesCard() {

    const cardName = getValueOf('cardName') || 'Password Manager Generator';

    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headerCell = document.createElement('th');
    headerCell.colSpan = NUM_COLUMNS * 2
    headerCell.textContent = cardName.toUpperCase();
    headerRow.appendChild(headerCell);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const hash = getHash();

    const tbody = document.createElement('tbody');

    let cell = 1;
    for (let row = 0; row < NUM_ROWS; row++) {

        const tr = document.createElement('tr');
        
        for (let col = 0; col < NUM_COLUMNS; col++) {

            const th = document.createElement('th');
            th.textContent = cell;
            tr.appendChild(th);

            const td = document.createElement('td');
            const init = (cell - 1) * 4;
            const subHash = hash.substr(init, 4);
            td.textContent = subHash;
            tr.appendChild(td);

            cell++;
        }

        tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    const codesCardSeed = document.getElementById('codesCardSeed');
    codesCardSeed.style.display = 'none';

    const codesCardTable = document.getElementById('codesCardTable');
    codesCardTable.style.display = 'block';
    codesCardTable.appendChild(table);

    window.print();
}