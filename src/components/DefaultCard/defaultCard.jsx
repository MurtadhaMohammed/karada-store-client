import Image from "next/image";

const DefaultCard = ({ item }) => {
  return (
    <div
      className={`flex-none rounded-xl flex flex-col  border border-[#eee] relative overflow-hidden bg-white active:scale-[0.96] transition-all`}
      style={{ width: 210, height: 310 }}
    >
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={item?.image}
          width={120}
          height={120}
          // objectFit="contain"
        />
      </div>
      <div className="p-4 border-t border-t-[#eee]">
        <h2 className="font-semih2old text-black text-[18px] font-semibold  whitespace-nowrap overflow-hidden text-ellipsis">
          {item?.name}
        </h2>
        <p className="text-gray-600 text-[16px] mt-[2px] whitespace-nowrap overflow-hidden text-ellipsis">
          {item?.description}
        </p>
        <a className="block mt-[8px] underline text-[#4b4383]">كرادة ستور</a>
        <h4 className="mt-[8px] text-[20px] font-extrabold">
          {Number(item?.price).toLocaleString("en")}{" "}
          <span className="text-[12px]">IQD</span>
        </h4>
      </div>
    </div>
  );
};

export default DefaultCard;
