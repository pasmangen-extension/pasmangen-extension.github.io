const NUM_COLUMNS = 4;
const NUM_ROWS = 10;

function getValueOf(id) {

    return document.getElementById(id).value.toLowerCase();
}

function getHash() {

    const birthplace      = getValueOf('birthplace');
    const childhoodFriend = getValueOf('childhoodFriend');
    const schoolName      = getValueOf('schoolName');
    const cardName        = getValueOf('cardName');
    
    const data1 = birthplace + childhoodFriend + schoolName + cardName;
    const data2 = schoolName + cardName + birthplace + childhoodFriend;
    const hash  = generateHashFromText(data1) + generateHashFromText(data2);
    
    return hash;
};

function generateCodesCard() {
    
    const cardName = getValueOf('cardName') || 'Password Manager Generator';

    let codesCard = '';
    codesCard += '<table>';

    codesCard += '<th colspan="'+(NUM_COLUMNS*2)+'">'+cardName.toUpperCase()+'</th>';
    
    const hash = getHash();
    
    let cel = 1;
    for ( let row = 0; row < NUM_ROWS; row++) {
        codesCard += '<tr>';
            for ( let col = 0; col < NUM_COLUMNS; col++) {
                codesCard += '<td class="cel"><strong>'+cel+'</strong></td>';
                const init = (cel-1)*4;
                const subHash = hash.substr(init, 4);
                codesCard += '<td>'+subHash+'</td>';
                cel++;
            }
        codesCard += '</tr>';
    }
    
    codesCard += '</table>';

    const codesCardSeed = document.getElementById('codesCardSeed');
    codesCardSeed.style.display = 'none';

    const codesCardTable = document.getElementById('codesCardTable');
    codesCardTable.innerHTML = codesCard;
    codesCardTable.style.display = 'block';
    window.print();
};