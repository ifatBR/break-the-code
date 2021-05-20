'use strict';
let str = calculateStr();
const duplicates = findDuplicates(str);
const strDuplicate = duplicates;

const elmLength = document.querySelector('.length');
elmLength.innerHTML = str.length;

const elm = document.querySelector('.digit-string');
elm.innerHTML = str;

calculateMissed();

function calculateStr() {
    //Basic logics:
    //The string is made of repeating strings of consecutive numbers between 1-9.
    //Between each two digits there's a number made of 3 digits:
    //1-xxx-2-xxx-3-xxx-4-xxx...-9-xxx-1-xxx-2....

    //Second layer of logic:
    //The function contains a set of conditions to avoid patterns which cause duplication.
    //--------------------------------------------------------------------------------
    let str = '';

    for (var i = 0; i < 1000; i++) {
        let numStr = i + '';
        if (i < 10) numStr = '00' + i;
        else if (i < 100) numStr = '0' + i;

        for (var currDigit = 0; currDigit < 10; currDigit++) {
            const currDigitStr = currDigit + '';
            const nums = numStr.split('');
            const digit0 = parseInt(nums[0]);
            const digit1 = parseInt(nums[1]);
            const digit2 = parseInt(nums[2]);

            //we want to 'push' all bigger digits to the end of the string
            if (digit0 > currDigit || digit0 > digit2 || digit0 > digit1) continue;

            //if num starts with currDigit, we want to drop the digit and add just the num
            if (nums[0] === currDigitStr) {
                //unless it's a palindrome.
                if (nums[0] === nums[2]) {
                    //to avoid 020-2-020/343-4-343... we convert it to 0-2-020/3-4-242...:
                    str += currDigitStr;
                    //If they create together 1111/2222/3333... we want both digit & num
                    //Else - we don't need the num
                    if (numStr[0] !== numStr[1]) continue;
                }
            } else if (nums[0] === nums[2]) {
                //With palindromes- the middle digit of num can't be larger than currDigit
                //To avoid: 020-3-020-4
                //and:      030-2-030-3-030
                //which both contain 0302 & 0203
                if (digit1 > currDigit) continue;
                str += currDigitStr;
            } else str += currDigitStr;

            //9 is a unique digit, no num will follow it. The rotation just starts again.
            if (currDigitStr !== '9') str += numStr;
        }
    }
    //'000'- because we have to complete the 'missing' round after the last '9'
    str += '000';
    return str;
}

//Below are helper functions that return:
// 1. Numbers missing from the string.
// 1. Duplicated Numbers.

function calculateMissed() {
    let strMissed = '';
    for (var k = 0; k < 10000; k++) {
        let searchFor = k;
        if (k < 10) searchFor = '000' + k;
        else if (k < 100) searchFor = '00' + k;
        else if (k < 1000) searchFor = '0' + k;

        if (!str.includes(searchFor)) strMissed += searchFor + '-';
    }

    if (!strMissed.length) strMissed = 'None';
    const elm = document.querySelector('.stringy-missed');
    elm.innerHTML = strMissed;
}

function findDuplicates(str) {
    let strDuplicate = '';
    for (var k = 0; k < 10000; k++) {
        if (k % 100 === 0) strDuplicate += '<p>';
        let idx = 0;
        let searchFor = k;

        if (k < 10) searchFor = '000' + k;
        else if (k < 100) searchFor = '00' + k;
        else if (k < 1000) searchFor = '0' + k;

        idx = str.indexOf(searchFor, idx);

        if (idx > -1) {
            idx = str.indexOf(searchFor, idx + 1);
            if (idx > -1) {
                strDuplicate += '<p class="dups">' + str.substring(idx, idx + 4) + '-' + '</p>';
            }
        }
        if (k % 100 === 0) strDuplicate += '</p>';
    }

    const elmRepeat = document.querySelector('.stringy-repeat');
    elmRepeat.innerHTML = strDuplicate;
}
