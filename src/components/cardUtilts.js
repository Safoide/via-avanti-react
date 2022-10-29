import Payment from 'payment'

function clearNumber(value = '') {
  return value.replace(/\D+/g, '')
}

export function formatCreditCardNumber(value) {
  if (!value) {
    return value
  }

  const issuer = Payment.fns.cardType(value)
  const clearValue = clearNumber(value)
  let nextValue

  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 15)}`
      break
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 14)}`
      break
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        8
      )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`
      break
  }

  return nextValue.trim()
}

export function formatCVC(value, allValues = {}) {
  const clearValue = clearNumber(value)
  let maxLength = 4

  if (allValues.number) {
    const issuer = Payment.fns.cardType(allValues.number)
    maxLength = issuer === 'amex' ? 4 : 3
  }

  return clearValue.slice(0, maxLength)
}

export function formatExpirationDate(value, e) {
  const clearValue = clearNumber(value);

  if (clearValue.slice(0, 1) > 1) return '';
  if (clearValue.slice(0, 2) > 12) return clearValue.slice(0, 1);

  if (clearValue.slice(2, 3) < 2) return clearValue.slice(0, 2);
  if (clearValue.slice(2, 4) < 22) return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 3)}`;

  let actualDate = new Date();
  let actualMonth = actualDate.getMonth();
  let actualYear = actualDate.getFullYear().toString();

  if (parseInt(clearValue.slice(0, 2)) <= actualMonth && parseInt(clearValue.slice(2, 4)) === parseInt(actualYear.slice(2, 4))) {
    e.target.setCustomValidity('incorrecto');
  }

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}