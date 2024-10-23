"use client";
import React, { useState } from "react";
import Input from "@/components/UI/Input/input";
import { GrLocation } from "react-icons/gr";
import { useAppStore } from "@/lib/store";

const Address = () => {
  const { getUserInfo } = useAppStore();
  const user = getUserInfo();

  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [name, setName] = useState(user?.name || "");
  const [notes, setNotes] = useState("");

  return (
    <div className="rounded-[8px] border border-[#eee] mt-[20px]">
      <div className="flex items-center p-[16px]">
        <GrLocation className="text-[18px]" />
        <p className="mr-[6px]">تفاصيل العنوان</p>
      </div>
      <div className="p-[16px] pt-0">
        <Input
          hint="العنوان الكامل"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="h-[12px]"></div>
        <Input
          hint="رقم الهاتف"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="h-[12px]"></div>
        <Input
          hint="الاسم الكامل"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="h-[12px]"></div>
        <Input
          hint="ملاحظات"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Address;
