"use client";

import Container from "@/components/UI/Container/container";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export const ThreeSection = ({
  titles = [],
  subtitle = "",
  links = [],
  icons = [],
  hasAccess = true,
}) => {
  const router = useRouter();
  const { isLogin } = useAppStore();

  if (!hasAccess && !isLogin) return null;

  return (
    <Container>
      <div className="grid grid-cols-3 gap-4 mt-[12px]">
        {titles.map((title, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center gap-3 bg-white h-[90px] rounded-[16px] p-4 w-full transition-all active:opacity-50"
            onClick={() => {
              if (links[index]) {
                router.push(links[index]);
              }
            }}
          >
            <div>{icons[index]}</div>
            <h3 className="text-[14px] text-center font-semibold">{title}</h3>
          </button>
        ))}
      </div>
    </Container>
  );
};
