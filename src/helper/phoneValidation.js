export function validateIraqiPhoneNumber(phoneNumber) {
  // Remove all non-digit characters for consistent validation
  const sanitizedNumber = phoneNumber.replace(/\D/g, "");
  // Regular expression to validate the phone number with mandatory local prefix
  const iraqiPhoneRegex = /^07\d{9}$/;

  // Test the sanitized number against the regex
  return iraqiPhoneRegex.test(sanitizedNumber);
}
