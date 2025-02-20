"use client";
import React, { useState, useEffect } from "react";
import Input from "@/components/UI/Input/input";
import { GrLocation } from "react-icons/gr";
import { useAppStore } from "@/lib/store";
import { validateIraqiPhoneNumber } from "@/helper/phoneValidation";
import { jwtDecode } from "jwt-decode";
import { set } from "nprogress";

const Address = () => {
  const {
    userInfo,
    userCheckoutInfo,
    setIsPhoneValidated,
    setUserCheckoutInfo,
    validateAddress,
  } = useAppStore();
  const [address, setAddress] = useState(userInfo?.address || "");
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [name, setName] = useState(userInfo?.name || "");
  const [notes, setNotes] = useState("");

  const [phoneError, setPhoneError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [nameError, setNameError] = useState(null);

  const [handelError, setHandelError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("karada-token");
    if (token) {
      setAddress(userInfo.address || "");
      setPhone(userInfo.phone || "");
      setName(userInfo.name || "");
      const isValid = validateIraqiPhoneNumber(userInfo.phone || "");
      // setPhoneError(isValid ? null : "يرجى إدخال رقم هاتف صالح");
      setIsPhoneValidated(isValid);
    }
    setUserCheckoutInfo({
      address,
      phone,
      name,
      notes: "",
    });
  }, []);

  useEffect(() => {
    setUserCheckoutInfo({
      address,
      phone,
      name,
      notes,
    });
  }, [address, phone, name, notes]);

  useEffect(() => {
    if (validateAddress) {
      setHandelError("يرجى ملء جميع الحقول");
    } else {
      setHandelError(null);
    }
  }, [validateAddress]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    const isValid = validateIraqiPhoneNumber(value);
    // setPhoneError(value.trim() ? null : isValid ? null : "يرجى إدخال رقم هاتف صالح");
    setIsPhoneValidated(isValid);
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    // setAddressError(value.trim() ? null : "يرجى إدخال العنوان");
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    // setNameError(value.trim() ? null : "يرجى إدخال الاسم");
  };

  return (
    <div className="rounded-[8px] border border-[#eee] mt-[22px] bg-white">
      <div className="flex items-center justify-between p-[16px]">
        <div className="flex items-center">
          <GrLocation className="text-[18px]" />
          <p className="mr-[6px]">تفاصيل العنوان</p>
        </div>
        {handelError && <p className="text-red-600 text-sm">{handelError}</p>}
      </div>
      <div className="p-[16px] pt-0">
        <div>
          <Input
            hint="العنوان الكامل"
            value={address}
            onChange={handleAddressChange}
            required
          />
          {addressError && (
            <p className="mt-2 text-red-600 text-sm mr-2">{addressError}</p>
          )}
        </div>

        <div className="h-[12px]"></div>

        <div>
          <Input
            hint="رقم الهاتف"
            value={phone}
            onChange={handlePhoneChange}
            error={phoneError}
            required
          />
          {phoneError && (
            <p className="mt-2 text-red-600 text-sm mr-2">{phoneError}</p>
          )}
        </div>

        <div className="h-[12px]"></div>

        <div>
          <Input
            hint="الاسم الكامل"
            value={name}
            onChange={handleNameChange}
            required
          />
          {nameError && (
            <p className="mt-2 text-red-600 text-sm mr-2">{nameError}</p>
          )}
        </div>

        <div className="h-[12px]"></div>

        <div>
          <Input
            hint="ملاحظات"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
