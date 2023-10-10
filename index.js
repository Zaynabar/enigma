function charToIndex(c) {
    return c.charCodeAt(0)-65;
}

function indexToChar(i) {
    return String.fromCharCode(i + 65);
}

const operation = readline();
let pseudoRandomNumber = parseInt(readline());

const rotors = Array.from({length : 3}, () => readline().split('').map(charToIndex))

const invertedRotors = rotors
    .map(rotor =>
        rotor.reduce( (inverted, c, i) => {
            inverted[c] = i;
            return inverted;
        }, [])
    )
    .reverse();

let message = readline();

if (operation === 'ENCODE') {
    message = message.split('')
                    .map(char => {
                        const index = charToIndex(char);
                        return indexToChar(rotors.reduce((c, rotor) => rotor[c], (index + pseudoRandomNumber++) % 26));
                    })
                    .join('');
} else {
    message = message.split('')
                    .map(charToIndex)
                    .map(c => invertedRotors.reduce( (c, rotor) => rotor[c], c))
                    .map(c => (c - pseudoRandomNumber++ + 26 * 3) % 26)
                    .map(indexToChar)
                    .join('');
}

console.log(message);
