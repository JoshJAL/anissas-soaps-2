export function createDollarAmount(amount: string): string {
  if (amount.includes('$')) {
    amount = amount.replaceAll('$', '');
  }
  if (amount.includes(',')) {
    amount = amount.replaceAll(',', '');
  }
  if (amount.includes('.')) {
    const dollars = amount.split('.')[0];
    const cents = amount.split('.')[1];
    if (cents.length === 1) {
      amount = `${dollars}.${cents}0`;
    }
    if (cents.length === 2) {
      amount = `${dollars}.${cents}`;
    }
    const numberAmount = parseFloat(amount);
    amount = `${numberAmount.toFixed(2)}`;
    amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `$${amount}`;
  } else {
    amount = `${amount}.00`;
    amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `$${amount}`;
  }
}
