"use client";
import React, { useState } from "react";
import Input from "@/components/UI/Input/input";
import { GrLocation } from "react-icons/gr";
import { useAppStore } from "@/lib/store";

const Address = () => {
  const { userInfo, setUserInfo } = useAppStore();

  const [address, setAddress] = useState(userInfo?.address || "");
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [name, setName] = useState(userInfo?.name || "");
  const [notes, setNotes] = useState("");

  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    setUserInfo({ ...userInfo, address: newAddress });
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
  };

  return (
    <div className="rounded-[8px] border border-[#eee] mt-[22px]">
      <div className="flex items-center p-[16px]">
        <GrLocation className="text-[18px]" />
        <p className="mr-[6px]">تفاصيل العنوان</p>
      </div>
      <div className="p-[16px] pt-0">
        <Input
          hint="العنوان الكامل"
          value={address}
          onChange={handleAddressChange}
        />
        <div className="h-[12px]"></div>
        <Input hint="رقم الهاتف" value={phone} onChange={handlePhoneChange} />
        <div className="h-[12px]"></div>
        <Input hint="الاسم الكامل" value={name} onChange={handleNameChange} />
        <div className="h-[12px]"></div>
        <Input hint="ملاحظات" value={notes} onChange={handleNotesChange} />
      </div>
    </div>
  );
};

export default Address;
