"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Container from "../UI/Container/container";
import { FiSearch, FiX } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/lib/store";
import { apiCall, IMAGE_URL } from "@/lib/api";
import { IoFilter, IoCloseSharp } from "react-icons/io5";
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { querySearch, setQuerySearch, setQueryString, searchResult } =
    useAppStore();
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
      if (search.length > 0) setShowSuggestions(true);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const { data: suggestions = [], isFetching } = useQuery({
    queryKey: ["product-suggestions", debouncedSearch],
    queryFn: () => {
      return apiCall({
        pathname: `/client/product/search?q=${debouncedSearch}`,
      });
    },
    enabled: isSearch && debouncedSearch.length > 1,
    keepPreviousData: true,
  });

  const { data: categories = [], isFetching: isFetchingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      apiCall({
        pathname: `/client/category/category?limit=1000`,
      }),
    keepPreviousData: true,
  });

  const { data: brands = [], isFetching: isFetchingBrands } = useQuery({
    queryKey: ["brands"],
    queryFn: () =>
      apiCall({
        pathname: `/client/brand/all-brands?limit=1000`,
      }),
    keepPreviousData: true,
  });
  const submitSearch = () => {
    setQuerySearch(search);
    setShowSuggestions(false);
    // setIsSearch(false);
  };

  const handleKeyDown = ({ key }) => {
    if (key === "Enter" && search?.length > 2) submitSearch();
  };

  const handleFilter = (el) => {
    if (el.key === "all") setFilters(["all"]);
    else setFilters([el.key]);
  };

  const handleCategorySelect = (categoryId) => {
    setFilters((prevFilters) => {
      const isSelected = prevFilters.includes(`category_id=${categoryId}`);
      const newFilters = prevFilters.filter(
        (key) =>
          key !== "all" &&
          !key.startsWith("category_id=") &&
          !key.startsWith("brand_id=")
      );
      return isSelected
        ? newFilters
        : [...newFilters, `category_id=${categoryId}`];
    });
  };

  const handleBrandSelect = (brandId) => {
    setFilters((prevFilters) => {
      const newFilters = prevFilters.filter(
        (key) => key !== "all" && !key.startsWith("brand_id=")
      );
      return [...newFilters, `brand_id=${brandId}`];
    });
  };

  const activeTagStyle =
    "bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] border border-[#eee]";
  const unactiveTagStyle = "border border-[#eee] bg-[#fff]";
  const closeSuggestions = () => {
    setShowSuggestions(false);
  };
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

              {isSearch &&
                showSuggestions &&
                suggestions?.products?.length > 0 && (
                  <div className="absolute bg-white border border-gray-200 w-full mt-2 rounded-[8px] shadow-lg z-50">
                    {isFetching ? (
                      <div className="p-2 text-gray-500">جاري التحميل...</div>
                    ) : (
                      <div>
                       <div className="p-2  flex justify-between">
                        <div className="text-gray-500">قائمة المقترحات:</div>
                       <div onClick={closeSuggestions} className="">
                          <IoCloseSharp size={22} />
                        </div>
                       </div>

                        {suggestions.products?.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <Link key={item.id} href={`/product/${item.id}`}>
                              <div
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => setSearch(item.name)}
                              >
                                {item.name}
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              {isSearch &&
                showSuggestions &&
                search.length > 2 &&
                suggestions?.products?.length === 0 &&
                !isFetching && (
                  <div className="absolute bg-white border border-gray-200 w-full mt-2 rounded-[8px] shadow-lg z-50 flex justify-between items-center">
                    <div className="p-2 text-gray-500">لا توجد اقتراحات</div>
                    <div onClick={closeSuggestions} className="ml-2">
                      <IoCloseSharp size={22}/>
                    </div>
                  </div>
                )}
            </div>

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
                  <span className="font-bold mr-1">{searchResult}</span>
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
                  onClick={() => closeModal("filterModal")}
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
                {categories?.categories?.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] border border-[#eee] bg-[#fff] whitespace-nowrap cursor-pointer transition-all active:opacity-50 ${
                      filters?.find(
                        (key) => key === `category_id=${category.id}`
                      )
                        ? activeTagStyle
                        : unactiveTagStyle
                    }`}
                  >
                    {category.title}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-[16px]">
              <p>البراندات</p>
              <div className="grid md:grid-cols-5 grid-cols-4 gap-3 mt-2 justify-center">
                {brands?.records?.map((brand) => (
                  <div
                    key={brand.id}
                    onClick={() => handleBrandSelect(brand.id)}
                    className={`aspect-1 overflow-hidden shadow-brand-custom relative rounded-lg bg-[#f6f6f6] cursor-pointer ${
                      filters?.find((key) => key === `brand_id=${brand.id}`)
                        ? "border-2 border-indigo-600"
                        : "border border-transparent"
                    }`}
                  >
                    <img
                      src={`${IMAGE_URL}/${brand.img}`}
                      alt={brand.name}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
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
