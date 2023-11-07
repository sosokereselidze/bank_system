const accountSelector = document.getElementById('accountSelector');
const balanceElement = document.getElementById('balance');
const depositButton = document.getElementById('depositBtn');
const withdrawButton = document.getElementById('withdrawBtn');
const exitButton = document.getElementById('exitBtn');
const createAccountButton = document.getElementById('createAccountBtn'); 

let accounts = [{ balance: 0 }];

function updateBalance(accountIndex) {
  balanceElement.textContent = accounts[accountIndex].balance;
}

function updateAccountSelector() {
  accountSelector.innerHTML = '';
  for (let i = 0; i < accounts.length; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `Account ${i + 1}`;
    accountSelector.appendChild(option);
  }
}

updateAccountSelector();

accountSelector.addEventListener('change', function () {
  const selectedAccount = accountSelector.value;
  updateBalance(selectedAccount);
});

depositButton.addEventListener('click', function () {
  const selectedAccount = accountSelector.value;
  const depositInput = prompt(`Enter the deposit amount for Account ${selectedAccount + 1}:`);
  if (depositInput === null) {
    return;
  }

  const depositAmount = parseFloat(depositInput);
  if (!isNaN(depositAmount) && depositAmount > 0) {
    accounts[selectedAccount].balance += depositAmount;
    updateBalance(selectedAccount);
  } else {
    alert('Please enter a valid deposit amount.');
  }
});

withdrawButton.addEventListener('click', function () {
  const selectedAccount = accountSelector.value;
  const withdrawInput = prompt(`Enter the withdrawal amount for Account ${selectedAccount + 1}:`);
  if (withdrawInput === null) {
    return;
  }

  const withdrawAmount = parseFloat(withdrawInput);
  if (!isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= accounts[selectedAccount].balance) {
    accounts[selectedAccount].balance -= withdrawAmount;
    updateBalance(selectedAccount);
  } else {
    alert('Please enter a valid withdrawal amount.');
  }
});

exitButton.addEventListener('click', function () {
  const selectedAccount = accountSelector.value;
  if (accounts[selectedAccount].balance === 0) {
    alert(`Account ${parseInt(selectedAccount) + 1} has already exited.`);
  } else {
    accounts[selectedAccount].balance = 0;
    updateBalance(selectedAccount);
  }
});

function createAccount() {
  accounts.push({ balance: 0 });
  updateAccountSelector();
  const newAccountIndex = accounts.length - 1;
  updateBalance(newAccountIndex); 
  accountSelector.value = newAccountIndex;
}

createAccountButton.addEventListener('click', function () {
  createAccount();
});

updateBalance(0);