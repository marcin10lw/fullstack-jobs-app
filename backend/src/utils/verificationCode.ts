export const getVerificationCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const getVerificationCodeExpirationDate = () =>
  new Date(Date.now() + 30 * 60 * 1000);
