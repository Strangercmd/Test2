const accounts = {};

// Create Account
document.getElementById('create-account').addEventListener('click', () => {
    const accountName = document.getElementById('account-name').value.trim();
    if (accountName === '') {
        alert('Please enter a valid account name.');
        return;
    }
    if (accounts[accountName]) {
        alert('Account already exists.');
        return;
    }
    accounts[accountName] = 0;
    const accountSelect = document.getElementById('account-select');
    const option = document.createElement('option');
    option.value = accountName;
    option.textContent = accountName;
    accountSelect.appendChild(option);
    alert(`Account "${accountName}" created successfully.`);
    document.getElementById('account-name').value = '';
    updateAccountDropdowns();
});

// Deposit Money
document.getElementById('deposit').addEventListener('click', () => {
    const accountName = document.getElementById('account-select').value;
    const amount = parseFloat(document.getElementById('amount').value);
    if (!accountName) {
        alert('Please select an account.');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    accounts[accountName] += amount;
    alert(`Deposited ₹${amount} to "${accountName}".`);
    document.getElementById('amount').value = '';
});

// Withdraw Money
document.getElementById('withdraw').addEventListener('click', () => {
    const accountName = document.getElementById('account-select').value;
    const amount = parseFloat(document.getElementById('amount').value);
    if (!accountName) {
        alert('Please select an account.');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    if (accounts[accountName] < amount) {
        alert('Insufficient balance.');
        return;
    }
    accounts[accountName] -= amount;
    alert(`Withdrew ₹${amount} from "${accountName}".`);
    document.getElementById('amount').value = '';
});

// Check Balance
document.getElementById('check-balance').addEventListener('click', () => {
    const accountName = document.getElementById('account-select').value;
    if (!accountName) {
        alert('Please select an account.');
        return;
    }
    const balance = accounts[accountName];
    document.getElementById('balance-display').textContent = `Balance for "${accountName}": ₹${balance}`;
});

// Update account dropdowns
function updateAccountDropdowns() {
    const accountSelect = document.getElementById('account-select');
    const accountSelectManage = document.getElementById('account-select-manage');
    accountSelect.innerHTML = '<option value="" disabled selected>Select Account</option>';
    accountSelectManage.innerHTML = '<option value="" disabled selected>Select Account</option>';
    for (const accountName in accounts) {
        const option = document.createElement('option');
        option.value = accountName;
        option.textContent = accountName;
        accountSelect.appendChild(option);
        accountSelectManage.appendChild(option.cloneNode(true));
    }
}

// Change Account Name
document.getElementById('change-account-name').addEventListener('click', () => {
    const oldAccountName = document.getElementById('account-select-manage').value;
    const newAccountName = document.getElementById('new-account-name').value.trim();
    if (!oldAccountName) {
        alert('Please select an account.');
        return;
    }
    if (newAccountName === '') {
        alert('Please enter a valid new account name.');
        return;
    }
    if (accounts[newAccountName]) {
        alert('An account with the new name already exists.');
        return;
    }
    accounts[newAccountName] = accounts[oldAccountName];
    delete accounts[oldAccountName];
    alert(`Account name changed from "${oldAccountName}" to "${newAccountName}".`);
    document.getElementById('new-account-name').value = '';
    updateAccountDropdowns();
});

// Delete Account
document.getElementById('delete-account').addEventListener('click', () => {
    const accountName = document.getElementById('account-select-manage').value;
    if (!accountName) {
        alert('Please select an account.');
        return;
    }
    if (!confirm(`Are you sure you want to delete the account "${accountName}"?`)) {
        return;
    }
    delete accounts[accountName];
    alert(`Account "${accountName}" deleted successfully.`);
    updateAccountDropdowns();
});

// Update dropdowns on page load
updateAccountDropdowns();