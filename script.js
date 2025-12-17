let accounts = {};

// Save accounts to localStorage
function saveAccounts() {
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

// Load accounts from localStorage on page load
function loadAccounts() {
    const savedAccounts = localStorage.getItem('accounts');
    if (savedAccounts) {
        accounts = JSON.parse(savedAccounts);
    }
}

// Helper to attach listeners only when element exists
function safeAddListener(id, event, handler) {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, handler);
}

// Update account dropdowns (safe if elements are missing)
function updateAccountDropdowns() {
    const accountSelect = document.getElementById('account-select');
    const accountSelectManage = document.getElementById('account-select-manage');
    if (accountSelect) accountSelect.innerHTML = '<option value="" disabled selected>Select Account</option>';
    if (accountSelectManage) accountSelectManage.innerHTML = '<option value="" disabled selected>Select Account</option>';
    for (const accountName in accounts) {
        const option = document.createElement('option');
        option.value = accountName;
        option.textContent = accountName;
        if (accountSelect) accountSelect.appendChild(option);
        if (accountSelectManage) accountSelectManage.appendChild(option.cloneNode(true));
    }
}

// Handlers (safe read of DOM elements inside)
function handleCreateAccount() {
    const accountNameInput = document.getElementById('account-name');
    const accountName = accountNameInput ? accountNameInput.value.trim() : '';
    if (accountName === '') {
        alert('Please enter a valid account name.');
        return;
    }
    if (accounts[accountName]) {
        alert('Account already exists.');
        return;
    }
    accounts[accountName] = 0;
    alert(`Account "${accountName}" created successfully.`);
    if (accountNameInput) accountNameInput.value = '';
    saveAccounts();
    updateAccountDropdowns();
}

function handleDeposit() {
    const accountSelect = document.getElementById('account-select');
    const amountInput = document.getElementById('amount');
    const accountName = accountSelect ? accountSelect.value : '';
    const amount = amountInput ? parseFloat(amountInput.value) : NaN;
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
    if (amountInput) amountInput.value = '';
    saveAccounts();
    updateAccountDropdowns();
}

function handleWithdraw() {
    const accountSelect = document.getElementById('account-select');
    const amountInput = document.getElementById('amount');
    const accountName = accountSelect ? accountSelect.value : '';
    const amount = amountInput ? parseFloat(amountInput.value) : NaN;
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
    if (amountInput) amountInput.value = '';
    saveAccounts();
    updateAccountDropdowns();
}

function handleCheckBalance() {
    const accountSelect = document.getElementById('account-select');
    const accountName = accountSelect ? accountSelect.value : '';
    if (!accountName) {
        alert('Please select an account.');
        return;
    }
    const balance = accounts[accountName];
    const display = document.getElementById('balance-display');
    if (display) display.textContent = `Balance for "${accountName}": ₹${balance}`;
}

function handleChangeAccountName() {
    const accountSelectManage = document.getElementById('account-select-manage');
    const oldAccountName = accountSelectManage ? accountSelectManage.value : '';
    const newAccountNameInput = document.getElementById('new-account-name');
    const newAccountName = newAccountNameInput ? newAccountNameInput.value.trim() : '';
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
    if (newAccountNameInput) newAccountNameInput.value = '';
    saveAccounts();
    updateAccountDropdowns();
}

function handleDeleteAccount() {
    const accountSelectManage = document.getElementById('account-select-manage');
    const accountName = accountSelectManage ? accountSelectManage.value : '';
    if (!accountName) {
        alert('Please select an account.');
        return;
    }
    if (!confirm(`Are you sure you want to delete the account "${accountName}"?`)) {
        return;
    }
    delete accounts[accountName];
    alert(`Account "${accountName}" deleted successfully.`);
    saveAccounts();
    updateAccountDropdowns();
}

// Attach listeners only where elements exist on the page
safeAddListener('create-account', 'click', handleCreateAccount);
safeAddListener('deposit', 'click', handleDeposit);
safeAddListener('withdraw', 'click', handleWithdraw);
safeAddListener('check-balance', 'click', handleCheckBalance);
safeAddListener('change-account-name', 'click', handleChangeAccountName);
safeAddListener('delete-account', 'click', handleDeleteAccount);

// Load accounts on page load
loadAccounts();

// Update dropdowns on page load
updateAccountDropdowns();