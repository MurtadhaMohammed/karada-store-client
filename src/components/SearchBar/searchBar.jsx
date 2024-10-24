import Container from "../UI/Container/container";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="bg-gradient-to-b from-[#f0eeff] to-transparent pt-[16px] pb-[20px] -mb-[12px] z-10 md:hidden">
      {/* <div className="bg-gradient-to-r from-violet-600 to-indigo-600 pt-[16px] pb-[16px]"> */}
      <Container>
        <div className="relative">
          <FiSearch className=" absolute left-[12px] top-[12px] text-[22px] text-gray-700 opacity-50" />
          <input
            className="w-[100%] rounded-[8px] h-[48px] pl-[46px] pr-[16px] outline-none border border-[#eee] text-[18px]"
            placeholder="ابحث عن منتج"
          />
        </div>
      </Container>
    </div>
  );
};

export default SearchBar;
