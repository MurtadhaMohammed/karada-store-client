"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import Container from "../UI/Container/container";
import { FiSearch, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/lib/store";
import { apiCall, IMAGE_URL } from "@/lib/api";
import { IoFilter, IoCloseSharp } from "react-icons/io5";
import Ripples from "react-ripples";
import {
  BottomSheetModal,
  useBottomSheetModal,
} from "../UI/BottomSheetModal/bottomSheetModal";
import Image from "next/image";

const filtersTags = [
  { key: "all", label: "الكل" },
  { key: "discount", label: "تخفيض" },
  { key: "min", label: "اقل سعر" },
  { key: "max", label: "اعلى سعر" },
];

const SearchBar = ({ disabled = false }) => {
  const inputRef = useRef(null);
  const [isSearch, setIsSearch] = useState(false);

  // ✅ Active filters
  const [priceMode, setPriceMode] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);

  // 🕓 Temporary filters (used inside modal)
  const [tempPriceMode, setTempPriceMode] = useState("");
  const [tempCategoryIds, setTempCategoryIds] = useState([]);
  const [tempBrandIds, setTempBrandIds] = useState([]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { querySearch, setQuerySearch, setQueryString, searchResult } =
    useAppStore();
  const pathname = usePathname();
  const { closeModal } = useBottomSheetModal();

  useEffect(() => {
    if (pathname === "/products/search/all") setIsSearch(true);
  }, [pathname]);

  useEffect(() => {
    if (isSearch && inputRef.current) inputRef.current.focus();
  }, [isSearch]);

  // debounce
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      if (search.length > 0) setShowSuggestions(true);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  // Build query string for API
  const builtQueryString = useMemo(() => {
    const params = [];
    if (priceMode) params.push(`price=${priceMode}`);
    if (selectedBrandIds.length)
      params.push(`brandIds=${selectedBrandIds.join(",")}`);
    if (selectedCategoryIds.length)
      params.push(`categoryIds=${selectedCategoryIds.join(",")}`);
    return params.length ? `&${params.join("&")}` : "";
  }, [priceMode, selectedBrandIds, selectedCategoryIds]);

  useEffect(() => {
    setQueryString(builtQueryString);
  }, [builtQueryString, setQueryString]);

  // suggestions
  const { data: suggestions = [], isFetching } = useQuery({
    queryKey: [
      "product-suggestions",
      debouncedSearch,
      priceMode,
      selectedBrandIds,
      selectedCategoryIds,
    ],
    queryFn: () => {
      const params = new URLSearchParams({ q: debouncedSearch, limit: "6" });
      if (priceMode) params.set("price", priceMode);
      if (selectedBrandIds.length)
        params.set("brandIds", selectedBrandIds.join(","));
      if (selectedCategoryIds.length)
        params.set("categoryIds", selectedCategoryIds.join(","));
      return apiCall({ pathname: `/app/product/search?${params.toString()}` });
    },
    enabled: isSearch && debouncedSearch.length > 1,
    keepPreviousData: true,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiCall({ pathname: `/app/category/all` }),
    enabled: isSearch,
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: () => apiCall({ pathname: `/app/brand/all` }),
    enabled: isSearch,
  });

  const submitSearch = () => {
    setQuerySearch(search);
    setShowSuggestions(false);
  };

  const handleKeyDown = ({ key }) => {
    if (key === "Enter" && search?.length > 2) submitSearch();
  };

  // modal temporary handlers
  const handleTempFilter = (el) => {
    if (el.key === "all") setTempPriceMode("");
    else setTempPriceMode(el.key);
  };

  const handleTempCategorySelect = (id) => {
    setTempCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleTempBrandSelect = (id) => {
    setTempBrandIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Confirm and apply filters
  const handleConfirmFilters = () => {
    setPriceMode(tempPriceMode);
    setSelectedBrandIds(tempBrandIds);
    setSelectedCategoryIds(tempCategoryIds);
    closeModal("filterModal");
  };

  const handleOpenModal = () => {
    setTempPriceMode(priceMode);
    setTempBrandIds([...selectedBrandIds]);
    setTempCategoryIds([...selectedCategoryIds]);
  };

  const activeTagStyle =
    "bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] border border-[#eee]";
  const unactiveTagStyle = "border border-[#eee] bg-[#fff]";
  const closeSuggestions = () => setShowSuggestions(false);

  return (
    <div className={isSearch ? "sticky top-[60px] sm:top-0 z-20" : ""}>
      <Link
        href={disabled ? "" : "/products/search/all"}
        onClick={handleOpenModal}
      >
        <div className="bg-gradient-to-b from-[#f0eeff] to-transparent md:pt-[24px] md:pb-[24px] pt-[16px] pb-[16px] -mb-[12px] z-20">
          <Container>
            <div className="relative">
              {querySearch && !isSearch ? (
                <FiX
                  onClick={() => {
                    setQuerySearch("");
                    setSearch("");
                    setIsSearch(true);
                  }}
                  className="absolute left-[12px] top-[12px] text-[22px] text-gray-700 opacity-50"
                />
              ) : (
                <FiSearch
                  onClick={() => {
                    if (!isSearch) return;
                    submitSearch();
                  }}
                  className="absolute left-[12px] top-[12px] text-[22px] text-gray-700 opacity-50"
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
                suggestions?.items?.length > 0 && (
                  <div className="absolute bg-white border border-gray-200 w-full mt-2 pt-4 pb-4 rounded-[8px] shadow-lg z-50">
                    {isFetching ? (
                      <div className="pr-4 text-gray-500">جاري التحميل...</div>
                    ) : (
                      <div>
                        <div className="absolute -bottom-[100px] flex justify-center p-6 w-full">
                          <div
                            onClick={closeSuggestions}
                            className="w-[58px] h-[58px] rounded-full bg-[#eee] flex items-center justify-center shadow-lg active:opacity-50"
                          >
                            <IoCloseSharp size={32} />
                          </div>
                        </div>
                        {suggestions.items?.map((item) => (
                          <div key={item.id}>
                            <Link href={`/product/${item.id}`}>
                              <div
                                className="w-full flex items-center p-4 pt-1 pb-1 hover:bg-gray-100 cursor-pointer"
                                onClick={() => setSearch(item.name)}
                              >
                                <div className="pure-skeleton !w-[40px] h-[40px] rounded-md overflow-hidden relative">
                                  <Image
                                    src={item?.thumbnail || ""}
                                    width={40}
                                    height={40}
                                    alt={item?.name || "product"}
                                  />
                                </div>
                                <div className="flex-1 pr-4">
                                  <p className="text-[14px]">{item?.name}</p>
                                  <p className="text-[12px] text-[#a5a5a5]">
                                    {item?.shortDescription || "..."}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
            </div>

            {isSearch && (
              <div className="flex items-center justify-between mt-4 pl-1 pr-1">
                <Link
                  href={pathname + "?filterModal=true"}
                  onClick={handleOpenModal}
                >
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
                  onClick={handleConfirmFilters}
                  className="flex items-center justify-center h-[56px] rounded-[16px] bg-gradient-to-r text-violet-600 p-6 border-2 border-violet-600"
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
            {/* Filters */}
            <div className="flex gap-2 flex-wrap mt-[16px]">
              {filtersTags.map((el) => {
                const isActive =
                  (el.key === "all" && tempPriceMode === "") ||
                  el.key === tempPriceMode;
                return (
                  <div
                    key={el.key}
                    onClick={() => handleTempFilter(el)}
                    className={`h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] ${
                      isActive ? activeTagStyle : unactiveTagStyle
                    } cursor-pointer`}
                  >
                    {el.label}
                  </div>
                );
              })}
            </div>

            {/* Categories */}
            <div className="mt-[16px]">
              <p>الاقسام</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {categories?.map((category) => {
                  const active = tempCategoryIds.includes(category.id);
                  return (
                    <div
                      key={category.id}
                      onClick={() => handleTempCategorySelect(category.id)}
                      className={`h-[32px] pl-[16px] pr-[16px] rounded-[8px] flex items-center text-[14px] ${
                        active ? activeTagStyle : unactiveTagStyle
                      } cursor-pointer`}
                    >
                      {category.title}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Brands */}
            <div className="mt-[16px]">
              <p>البراندات</p>
              <div className="grid md:grid-cols-5 grid-cols-4 gap-3 mt-2">
                {brands?.map((brand) => {
                  const active = tempBrandIds.includes(brand.id);
                  return (
                    <div
                      key={brand.id}
                      onClick={() => handleTempBrandSelect(brand.id)}
                      className={`aspect-1 overflow-hidden shadow-brand-custom relative rounded-lg cursor-pointer ${
                        active
                          ? "border-2 border-indigo-600"
                          : "border border-transparent"
                      }`}
                    >
                      <Image
                        src={brand.img || ""}
                        alt={brand.name}
                        fill
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </Container>
      </BottomSheetModal>
    </div>
  );
};

export default SearchBar;
