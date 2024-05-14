function isPalindrome(str) {
    let reverse = [];
    let strLC = str.toLowerCase();
    for (let letter of strLC) {
        reverse.unshift(letter);
    }
    return strLC === reverse.join('');
}