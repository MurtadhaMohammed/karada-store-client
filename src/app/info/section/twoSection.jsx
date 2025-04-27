"use client";

import Container from "@/components/UI/Container/container";
import { useAppStore } from "@/lib/store";
import { IoIosArrowBack } from "react-icons/io";

export const TwoSection = ({
  titles = [],
  subtitle = "",
  links = [],
  icons = [],
  hasAccess = true,
}) => {
  const { isLogin } = useAppStore();

  if (!hasAccess && !isLogin) return null;

  return (
    <Container>
      <div className="flex w-full gap-1">
        {titles.map((title, index) => (
          <a
            key={index}
            href={links[index]}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center active:opacity-45 transition-all app-links mt-4"
          >
            <div className="flex items-center justify-center bg-white w-full gap-3 rounded-[16px] px-4 py-4">
              <div>{icons[index]}</div>
              <h3 className="text-[16px] text-center">{title}</h3>
            </div>
          </a>
        ))}
      </div>
    </Container>
  );
};
