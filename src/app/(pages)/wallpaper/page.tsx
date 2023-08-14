"use client";
import { FC, useEffect, useState } from "react";
import FilterWallpaper from "./features/filter-wallpaper";
import FetchWallpaper from "./features/fetch-wallpaper";
import useFetchWallpaper from "@/app/hooks/useFetchWallpaper";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [categoryId, setCategoryId] = useState<number>();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const {
    wallpapers,
    totalPages,
    currentPage,
    pageSize,
    setTotalPages,
    setPageSize,
    setCurrentPage,
    fetchWallpaper,
  } = useFetchWallpaper(categoryId);
  const updateCategoryId = (id: number) => {
    setCategoryId(id);
  };
  useEffect(() => {
    const token = localStorage.getItem("token") ?? "";
    fetchWallpaper(token);
  }, [categoryId,updateSuccess]);
  return (
    <div>
      <FilterWallpaper
        updateCategoryId={updateCategoryId}
        fetchWallpaper={fetchWallpaper}
      />
      <FetchWallpaper
        wallpapers={wallpapers}
        pageSize={pageSize}
        totalPages={totalPages}
        currentPage={currentPage}
        setTotalPages={setTotalPages}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        setUpdateSuccess={setUpdateSuccess}
      />
    </div>
  );
};

export default Page;
