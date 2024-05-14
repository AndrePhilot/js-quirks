function createAccount(pin, amount=0) {
    let balance = amount;
    let accountPin = pin;

    return {
        checkBalance(pin) {
            if (pin !== accountPin) return "Invalid PIN.";
            return `$${balance}`;
        },
        deposit(pin, deposit) {
            if (pin !== accountPin) return "Invalid PIN.";
            balance += deposit;
            return `Succesfully deposited $${deposit}. Current balance: $${balance}.`;
        },
        withdraw(pin, amount) {
            if (pin !== accountPin) return "Invalid PIN.";
            if (amount > balance) return "Withdrawal amount exceeds account balance. Transaction cancelled.";
            balance -= amount;
            return `Succesfully withdrew $${amount}. Current balance: $${balance}.`;
        },
        changePin(oldPIN, newPIN) {
            if (oldPIN !== accountPin) return "Invalid PIN.";
            accountPin = newPIN;
            return "PIN successfully changed!";
        }
    }
}

module.exports = { createAccount };
