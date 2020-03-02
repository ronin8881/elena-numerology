import moment from "moment";

export function calcNumericData(birthDate) {
    const CONST = birthDate.year() >= 2000 ? 19 : -2;
    const birthDateDigits = birthDate
        .format('DDMMYYYY')
        .split('')
        .map((digitStr) => parseInt(digitStr, 10))
        .filter((digit) => digit !== 0);
    const N = [birthDateDigits.reduce((prev, cur) => prev + cur, 0)];
    const r1 = div(N[0], 10);
    const r2 = mod(N[0], 10);
    N.push(r1 + r2);
    const r7 = div(N[1], 10);
    const r8 = mod(N[1], 10);
    N.push(N[0] + CONST);
    const r3 = div(N[2], 10);
    const r4 = mod(N[2], 10);
    N.push(r3 + r4);
    const r5 = div(Math.abs(CONST), 10);
    const r6 = mod(Math.abs(CONST), 10);

    return {
        lastDigit: r7 + r8,
        vector: [...birthDateDigits].concat(
            [r1, r2, r7, r8, r5, r6, r3, r4, div(N[3], 10), mod(N[3], 10)].filter((n) => n !== 0)
        )
    };
}

export function getDestinyY(birthDate) {
    return strToZeroPrefixedArray(
        String(
            parseInt(birthDate.format('DMM'), 10) * birthDate.year()
        )
    );
}

export function getWillY(birthDate) {
    return strToZeroPrefixedArray(
        String(
            parseInt(
                birthDate.format('DDMM').replace(/0/g, '1'),
                10
            ) *
            parseInt(
                String(birthDate.year()).replace(/0/g, '1'),
                10
            )
        )
    );
}

function strToZeroPrefixedArray(digitsStr) {
    digitsStr = digitsStr.length === 7 ? digitsStr : `0${digitsStr}`;
    return digitsStr.split('').map((char) => parseInt(char, 10));
}

export function getGenderDigits(vector) {
    let man = 0;
    let woman = 0;

    vector.forEach((num) => {
        const isManDigit = num % 2 === 0;
        man += +isManDigit;
        woman += +!isManDigit;
    });

    return {man, woman};
}

export function getYValue(x, yVector) {

    const xMin = 0;
    const step = 12;
    const xMax = yVector.length * step;
    let y = NaN;

    if (!isNaN(x) && x >= xMin && x < xMax) {
        const x1Idx = div(x, 12);
        const x1 = x1Idx * step;
        const y1 = yVector[x1Idx];

        const x2Idx = x1Idx + 1;
        const x2 = x2Idx * step;
        const y2 = yVector[x2Idx];

        y = Math.round(100 * (y1 * (x2 - x) + y2 * (x - x1)) / (x2 - x1)) / 100;
    }

    return y;
}

export function div(num, del) {
    return Math.trunc(num / del);
}

export function mod(num, del) {
    return num % del;
}

export function getYearsToday(date) {
    return moment().diff(date, 'years');
}