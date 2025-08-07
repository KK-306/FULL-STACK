 let balance = 0;
    const balanceDisplay = document.getElementById('balance');

    function deposit() {
      const amount = parseFloat(prompt("Enter deposit amount:"));
      if (!isNaN(amount) && amount > 0) {
        balance += amount;
        updateBalance();
      } else {
        alert("Please enter a valid amount.");
      }
    }

    function withdraw() {
      const amount = parseFloat(prompt("Enter withdraw amount:"));
      if (!isNaN(amount) && amount > 0) {
        if (amount <= balance) {
          balance -= amount;
          updateBalance();
        } else {
          alert("Insufficient funds!");
        }
      } else {
        alert("Please enter a valid amount.");
      }
    }

    function updateBalance() {
      balanceDisplay.textContent = `Balance: $${balance.toFixed(2)}`;
    }
 
     const themeRadios = document.querySelectorAll('input[name="theme"]');
        themeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'dark') {
                    document.body.classList.add('dark-theme');
                } else {
                    document.body.classList.remove('dark-theme');
                }
            });
        });