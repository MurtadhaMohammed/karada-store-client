import React, { useState, useRef, useEffect } from 'react';

const OtpInputs = ({ numInputs = 6, onChange }) => {
  const [otp, setOtp] = useState(new Array(numInputs).fill(''));
  const inputsRef = useRef([]);

  useEffect(() => {
    // Focus the first input when the component mounts
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [numInputs]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Restrict to numbers only

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (onChange) {
      onChange(newOtp.join(''));
    }

    // Move focus to the next input field to the right
    if (value && index < numInputs - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // If backspace is pressed and the current input is empty, move focus to the left
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .slice(0, numInputs)
      .split('');

    const newOtp = otp.map((_, i) => pastedData[i] || '');
    setOtp(newOtp);

    if (onChange) {
      onChange(newOtp.join(''));
    }

    // Focus the last non-empty input field
    const lastFilledIndex = newOtp.findIndex((val) => !val);
    inputsRef.current[lastFilledIndex !== -1 ? lastFilledIndex : 0].focus();
    console.log(newOtp)
  };

  return (
    <div
      className="flex justify-center items-center gap-2 dtr"
      onPaste={handlePaste}
    >
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OtpInputs;