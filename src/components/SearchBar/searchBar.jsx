import Container from "../UI/Container/container";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="bg-gradient-to-b from-[#4b438361] to-transparent pt-[16px] pb-[20px] -mb-[12px] sticky top-[60px] z-10">
      {/* <div className="bg-gradient-to-r from-violet-600 to-indigo-600 pt-[16px] pb-[16px]"> */}
      <Container>
        <div className="relative">
          <FiSearch className=" absolute left-[8px] top-[10px] text-[28px] text-[#a5a5a5]" />
          <input
            className="w-[100%] rounded-[8px] h-[48px] pl-[46px] pr-[16px] outline-none border border-[#eee] text-[16px]"
            placeholder="ابحث عن منتج"
          />
        </div>
      </Container>
    </div>
  );
};

export default SearchBar;
