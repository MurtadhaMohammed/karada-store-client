"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Container from "../UI/Container/container";
import { FiSearch, FiX } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/lib/store";
import { apiCall } from "@/lib/api";
import { IoFilter } from "react-icons/io5";
import Ripples from "react-ripples";
import {
  BottomSheetModal,
  useBottomSheetModal,
} from "../UI/BottomSheetModal/bottomSheetModal";

const filtersTags = [
  {
    key: "all",
    label: "الكل",
  },
  {
    key: "discount",
    label: "تخفيض",
  },
  {
    key: "price",
    label: "اقل سعر",
  },
  {
    key: "hprice",
    label: "اعلى سعر",
  },
];

const SearchBar = () => {
  const inputRef = useRef(null);
  const [isSearch, setIsSearch] = useState(false);
  const [filters, setFilters] = useState(["all"]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { querySearch, setQuerySearch, setQueryString } = useAppStore();
  const pathname = usePathname();
  const { closeModal } = useBottomSheetModal();

  useEffect(() => {
    if (pathname === "/products/search/all") setIsSearch(true);
  }, []);

  useEffect(() => {
    if (isSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearch]);

  useEffect(() => {
    const _queryString = filters
      .filter((key) => key !== "all")
      .map((key) => `&${key}=true`)
      .join("");
    setQueryString(_queryString);
  }, [filters]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const { data: suggestions = [], isFetching } = useQuery({
    queryKey: ["product-suggestions", debouncedSearch],
    queryFn: () =>
      apiCall({
        pathname: `/client/product/search?q=${debouncedSearch}`,
      }),
    enabled: isSearch && debouncedSearch.length > 1,
    keepPreviousData: true,
  });

  const submitSearch = () => {
    setQuerySearch(search);
    setIsSearch(false);
  };

  const handleKeyDown = ({ key }) => {
    if (key === "Enter" && search?.length > 2) submitSearch();
  };

  const handleFilter = (el) => {
    if (el.key === "all") setFilters(["all"]);
    else if (filters.find((key) => key === el.key)) {
      const newList = filters.filter((key) => key !== el.key);
      setFilters(newList.length === 0 ? ["all"] : newList);
    } else {
      setFilters([...filters.filter((key) => key !== "all"), el.key]);
    }
  };

  const activeTagStyle =
    "bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] border border-[#eee]";
  const unactiveTagStyle = "border border-[#eee] bg-[#fff]";

  return (
    <div>
      <Link href={"/products/search/all"}>
        <div className="bg-gradient-to-b from-[#f0eeff] to-transparent md:pt-[24px] md:pb-[24px] pt-[16px] pb-[16px] -mb-[12px] z-10">
          <Container>
            <div className="relative">
              {querySearch && !isSearch ? (
                <FiX
                  onClick={() => {
                    setQuerySearch("");
                    setSearch("");
                    setIsSearch(true);
                  }}
                  className="absolute left-[12px] top-[12px] text-[22px] text-gray-700 opacity-50 transition-all active:opacity-30"
                />
              ) : (
                <FiSearch
                  onClick={() => {
                    if (!isSearch) return;
                    submitSearch();
                  }}
                  className="absolute left-[12px] top-[12px] text-[22px] text-gray-700 opacity-50 transition-all active:opacity-30"
                />
              )}

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                ref={inputRef}
                onKeyDown={handleKeyDown}
                readOnly={!isSearch}
                className="w-[100%] rounded-[8px] h-[48px] pl-[46px] pr-[16px] outline-none border border-[#eee] text-[18px]"
                placeholder="ابحث عن منتج"
              />

              {isSearch && suggestions?.products?.length > 0 && (
                <div className="absolute bg-white border border-gray-200 w-full mt-2 rounded-[8px] shadow-lg z-50">
                  {isFetching ? (
                    <div className="p-2 text-gray-500">جاري التحميل...</div>
                  ) : (
                    suggestions.products?.map((item) => (
                      <Link key={item.id} href={`/product/${item.id}`}>
                        <div
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setSearch(item.name)}
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}

              {isSearch &&
                search.length > 2 &&
                suggestions?.products?.length === 0 &&
                !isFetching && (
                  <div className="absolute bg-white border border-gray-200 w-full mt-2 rounded-[8px] shadow-lg z-50">
                    <div className="p-2 text-gray-500">لا توجد اقتراحات</div>
                  </div>
                )}
            </div>

            {/* {isSearch && (
            <div className="flex gap-2 flex-wrap mt-[16px]">
              {filtersTags?.map((el) => (
                <div
                  key={el.key}
                  onClick={() => handleFilter(el)}
                  className={`h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] ${
                    filters?.find((key) => key === el.key)
                      ? activeTagStyle
                      : unactiveTagStyle
                  } transition-all active:opacity-50`}
                >
                  {el?.label}
                </div>
              ))}
            </div>
          )} */}

            {isSearch && (
              <div className="flex items-center justify-between mt-4 pl-1 pr-1">
                <Link href={pathname + "?filterModal=true"}>
                  <button className="flex gap-2 items-center text-[16px] text-[#0000ff]">
                    <IoFilter />
                    <span>تصفية</span>
                  </button>
                </Link>
                <p className="text-[#a5a5a5] text-[16px]">
                  نتائج البحث
                  <span className="font-bold mr-1">1232</span>
                </p>
              </div>
            )}
          </Container>
        </div>
      </Link>
      <BottomSheetModal
        title={
          <Container>
            <b>تصفية النتائج</b>
          </Container>
        }
        detent={"content-height"}
        name="filterModal"
        onClose={closeModal}
        footer={
          <Container>
            <div
              className="active:scale-[0.96] transition-all shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mb-[20px]"
              style={{
                display: "inline-flex",
                borderRadius: 16,
                overflow: "hidden",
                width: "100%",
              }}
            >
              <Ripples className="!grid w-full">
                <button
                  onClick={() => onFinish({ number: "78672..." })}
                  className="flex items-center justify-center  h-[56px] rounded-[16px]  bg-gradient-to-r text-violet-600   p-6 border-2 border-violet-600"
                >
                  <span className="ml-[8px] font-bold text-[18px]">
                    تأكيد البحث
                  </span>
                </button>
              </Ripples>
            </div>
          </Container>
        }
      >
        <Container>
          <section className="mb-6">
            <div className="flex gap-2 flex-wrap mt-[16px]">
              {filtersTags?.map((el) => (
                <div
                  key={el.key}
                  onClick={() => handleFilter(el)}
                  className={`h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] ${
                    filters?.find((key) => key === el.key)
                      ? activeTagStyle
                      : unactiveTagStyle
                  } transition-all active:opacity-50`}
                >
                  {el?.label}
                </div>
              ))}
            </div>

            <div className="mt-[16px]">
              <p>الاقسام</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  حاسبات
                </div>
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  موبايلات
                </div>
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  بطيخ
                </div>
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  بصل
                </div>
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  ماعرف ايش
                </div>
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  حاسبات
                </div>
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  موبايلات
                </div>
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  بطيخ
                </div>
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  بصل
                </div>
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  ماعرف ايش
                </div>
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  حاسبات
                </div>
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  موبايلات
                </div>
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  بطيخ
                </div>
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  بصل
                </div>
                <div className="h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap">
                  ماعرف ايش
                </div>
              </div>
            </div>
            <div className="mt-[16px]">
              <p>البراندات</p>
              <div className="grid md:grid-cols-5 grid-cols-4  gap-3 mt-2 justify-center">
                {[...new Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-1 overflow-hidden shadow-brand-custom relative rounded-lg bg-[#f6f6f6] border border-transparent ${
                      i === 0 ? "brand-active" : ""
                    } `}
                  ></div>
                ))}
              </div>
            </div>
          </section>
        </Container>
      </BottomSheetModal>
    </div>
  );
};

export default SearchBar;
