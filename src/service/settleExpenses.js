export const settleExpenses = allReceipts => {
  const totalSpent = allReceipts.reduce((previousValue, { amount }) => (previousValue += amount), 0);
  const amountPerPerson = totalSpent / allReceipts.length;
  const settleTransactions = allReceipts.map(({ name }) => ({ name, transactions: [] }));

  allReceipts.forEach(payer => {
    let amountOwed = amountPerPerson - payer.amount;
    if (amountOwed <= 0) {
      return;
    }
    allReceipts.forEach(receiver => {
      const amountReceived = receiver.amount - amountPerPerson;
      if (amountOwed <= 0 || amountReceived <= 0) {
        return;
      }
      const settleAmount = amountOwed <= amountReceived ? amountOwed : amountOwed - amountReceived;
      amountOwed -= settleAmount;
      receiver.amount -= settleAmount;
      settleTransactions
        .find(({ name: payerName }) => payer.name === payerName)
        ?.transactions.push({
          receiverName: receiver.name,
          settleAmount: settleAmount,
        });
    });
    console.log(payer.name, amountOwed);
  });

  return settleTransactions;
};
