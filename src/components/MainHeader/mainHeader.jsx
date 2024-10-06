import Image from "next/image";
import Container from "../UI/Container/container";
import { IoMenu } from "react-icons/io5";

import IconButton from "../UI/IconButton/iconButton";

const MainHeader = () => {
  return (
    <header className="shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b border-b-[#f0f0f0] sticky top-0 bg-white z-10">
      <Container>
        <div className="flex items-center justify-between h-[60px]">
          <IconButton icon={<IoMenu />} />
          <Image src={"/logo.png"} width={40} height={30} />
        </div>
      </Container>
    </header>
  );
};

export default MainHeader;
