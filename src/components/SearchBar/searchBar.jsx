"use client";
import Link from "next/link";
import Container from "../UI/Container/container";
import { FiSearch, FiX } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import IconButton from "../UI/IconButton/iconButton";
import { useAppStore } from "@/lib/store";

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
    key: "rate",
    label: "اعلى تقييماً",
  },
];

const SearchBar = ({ isSearch = false }) => {
  const inputRef = useRef(null);
  const [historyList, setHistoryList] = useState([]);
  const [filters, setFilters] = useState(["all"]);
  const [search, setSearch] = useState("");
  const { querySearch, setQuerySearch, setQueryString } = useAppStore();

  useEffect(() => {
    if (isSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearch]);

  const addToHistory = (historyItem) => {
    if (typeof window !== "undefined") {
      let newHistory = [historyItem, ...historyList];
      if (newHistory.length > 4) newHistory.pop();
      setHistoryList(newHistory);
      localStorage.setItem("karada-history", JSON.stringify(newHistory));
    }
  };

  const updateHistory = (newHistory) => {
    if (typeof window !== "undefined") {
      setHistoryList(newHistory);
      localStorage.setItem("karada-history", JSON.stringify(newHistory));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let hsitory = localStorage.getItem("karada-history");
      if (hsitory) setHistoryList(JSON.parse(hsitory));
    }
  }, []);

  useEffect(() => {
    const _queryString = filters
      .filter((key) => key !== "all")
      .map((key) => `&${key}=true`)
      .join("");
    setQueryString(_queryString);
  }, [filters]);

  const submitSearch = () => {
    setQuerySearch(search);
    addToHistory(search);
  };

  const handleKeyDown = ({ key }) => {
    if (key === "Enter" && search?.length > 2) submitSearch();
  };

  const handleFilter = (el) => {
    if (el.key === "all") setFilters(["all"]);
    else if (filters.find((key) => key === el.key)) {
      let newList = filters?.filter((key) => key !== el?.key);
      setFilters(newList?.length === 0 ? ["all"] : newList);
    } else setFilters([...filters?.filter((key) => key !== "all"), el?.key]);
  };

  const isHistory = isSearch && historyList.length !== 0 && !querySearch;

  const activeTagStyle =
    "bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] border border-[#eee]";
  const unactiveTagStyle = "border border-[#eee] bg-[#fff]";

  return (
    <Link href={"/search"}>
      <div className="bg-gradient-to-b from-[#f0eeff] to-transparent pt-[16px] pb-[16px] -mb-[12px] z-10 md:hidden">
        <Container>
          <div className="relative">
            {querySearch && isSearch ? (
              <FiX
                onClick={() => {
                  setQuerySearch("");
                  setSearch("");
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
              className={`w-[100%] rounded-[8px] ${
                isHistory ? "rounded-b-none border-b-[0px]" : ""
              } h-[48px] pl-[46px] pr-[16px] outline-none border border-[#eee] text-[18px]`}
              placeholder="ابحث عن منتج"
            />
          </div>

          {isHistory && (
            <div
              className={`rounded-[8px] rounded-t-none border border-[#eee] border-t-[0px] bg-[#fff]`}
            >
              {historyList?.map((el, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSearch(el);
                    setQuerySearch(el);
                  }}
                  className="flex items-center justify-between pr-[16px] p-[12px] border-t border-t-[#eee] transition-all active:opacity-50"
                >
                  <p className="text-[14px]">{el}</p>
                  <IconButton
                    onClick={() =>
                      updateHistory(historyList.filter((h) => h !== el))
                    }
                    className={"p-[2px]"}
                    icon={<FiX className="text-[18px]" />}
                  />
                </div>
              ))}
            </div>
          )}

          {isSearch && (
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
          )}
        </Container>
      </div>
    </Link>
  );
};

export default SearchBar;
