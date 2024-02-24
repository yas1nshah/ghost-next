function formatAmount(amount: number) {
    if (amount >= 10000000) {
      // Amount is 1 Crore or more
      const crorePart = Math.floor(amount / 10000000);
  
      return `${crorePart} Crores`;
    } else if (amount >= 100000) {
      // Amount is 1 Lakh or more
      const lakhPart = Math.floor(amount / 100000);
  
      return `${lakhPart} Lacs`;
    } else {
      // Amount is less than 1 Lakh
      const formattedAmount = Math.floor(amount); // Remove decimal part
      return `${formattedAmount} Rupees`;
    }
  }
  export default formatAmount