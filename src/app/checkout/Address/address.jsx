"use client";
import React, { useState, useEffect } from "react";
import Input from "@/components/UI/Input/input";
import { GrLocation } from "react-icons/gr";
import { useAppStore } from "@/lib/store";
import { validateIraqiPhoneNumber } from "@/helper/phoneValidation";

const Address = () => {
  const { userInfo, setUserInfo, setIsPhoneValidated } = useAppStore();
  const [address, setAddress] = useState(userInfo?.address || "");
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [name, setName] = useState(userInfo?.name || "");
  const [notes, setNotes] = useState(userInfo?.notes || "");

  const [phoneError, setPhoneError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [nameError, setNameError] = useState(null);

  useEffect(() => {
    setUserInfo({ address, phone, name, notes });
  }, [address, phone, name, notes, setUserInfo]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);

    const isValid = validateIraqiPhoneNumber(value);
    setPhoneError(isValid ? null : "يرجى إدخال رقم هاتف صالح");
    setIsPhoneValidated(isValid);
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    setAddressError(value.trim() ? null : "يرجى إدخال العنوان");
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(value.trim() ? null : "يرجى إدخال الاسم");
  };

  return (
    <div className="rounded-[8px] border border-[#eee] mt-[22px] bg-white">
      <div className="flex items-center p-[16px]">
        <GrLocation className="text-[18px]" />
        <p className="mr-[6px]">تفاصيل العنوان</p>
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
