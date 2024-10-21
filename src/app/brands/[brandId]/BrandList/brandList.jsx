"use client";
import DefaultCard from "@/components/DefaultCard/defaultCard";
import Motion from "@/components/Motion/motion";
import Container from "@/components/UI/Container/container";

const BrandIdList = ({ list }) => {
  console.log(list, "list");
  return (
    <div className="pt-[16px]">
      <Motion>
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-x-auto no-scrollbar">
            {list.map((el, i) => (
              <DefaultCard isGrid key={i} item={el} />
            ))}
          </div>
        </Container>
      </Motion>
    </div>
  );
};

export default BrandIdList;
