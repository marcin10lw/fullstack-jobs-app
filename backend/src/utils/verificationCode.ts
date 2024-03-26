export const getVerificationCodeData = () => {
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const verificationCodeExpiresAt = new Date(Date.now() + 30 * 60 * 1000);

  return { verificationCode, verificationCodeExpiresAt };
};
