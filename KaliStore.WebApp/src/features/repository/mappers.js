export const mappers = {
  objToArray: x => {
    if(!Array.isArray(x)){
      return [x];
    }
    return x;
  },
  
  amountToPrice: x => {
    return {
      amount: x,
      currency: 'BGN'
    }
  }
};
