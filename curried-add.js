function curriedAdd() {
    let numbers = [];

    function adder(num) {
        if (typeof num === 'number') {
            numbers.push(num);
            return adder;
        } else {
            return numbers.reduce((acc, curr) => acc + curr, 0);
        }
    }
    return adder;
}

module.exports = { curriedAdd };
