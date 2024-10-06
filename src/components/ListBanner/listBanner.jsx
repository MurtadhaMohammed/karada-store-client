import CreatviceCard from "../CreativeCard/creativeCard";
import DefaultCard from "../DefaultCard/defaultCard";
import Button from "../UI/Button/button";
import Container from "../UI/Container/container";

import { IoIosArrowBack } from "react-icons/io";

const ListBanner = ({ title, list, isCreative = false }) => {
  return (
    <div className="pt-[16px] ">
      <Container>
        <div className="flex items-center justify-between">
          <h3 className="text-md font-semih2old text-black font-semibold mr-1">
            {title}
          </h3>
          <Button
            size="sm"
            icon={<IoIosArrowBack className="text-[#717171] text-[18px]" />}
          >
            <p className="text-[#717171] -mt-[2px]">عرض المزيد</p>
          </Button>
        </div>
      </Container>
      <Container noPadding>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pl-[16px] pr-[16px] pb-[16px] pt-3">
          {list.map((el, i) =>
            isCreative ? (
              <CreatviceCard key={i} index={i} item={el} />
            ) : (
              <DefaultCard key={i} item={el} />
            )
          )}
        </div>
      </Container>
    </div>
  );
};

export default ListBanner;
