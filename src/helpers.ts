export const validatePhone = (number: string) => {
    const regex = /[a-zA-Z]/g;
    if (number) {
      if (number.length < 7 || number.length > 25 || regex.test(number)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  