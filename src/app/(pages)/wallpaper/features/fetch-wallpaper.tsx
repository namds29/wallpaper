"use client";

import { FC, use, useEffect, useState, Dispatch, SetStateAction } from "react";

import { Wallpaper } from "@/app/types";
import ModalEditWallpaper from "@/app/components/modal/modal-edit-wallpaper";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface FetchWallpaperProps {
  wallpapers: any[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  setTotalPages: (totalPages: number) => void;
  setPageSize: (pageSize: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setUpdateSuccess: Dispatch<SetStateAction<boolean>>;
}

const LIST_PAGE_SIZE = [10, 20, 30, 50, 100];
const FetchWallpaper: FC<FetchWallpaperProps> = ({
  wallpapers,
  totalPages,
  currentPage,
  pageSize,
  setPageSize,
  setCurrentPage,
  setUpdateSuccess
}) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [wallpaperDetail, setWallpaperDetail] = useState<Wallpaper>();
  const [listPage, setListPage] = useState<number[]>([]);

  const handleClose = () => setIsOpenEdit(false);
  const handleEdit = (wallpaper: Wallpaper) => {
    setIsOpenEdit(true);
    setWallpaperDetail(wallpaper);
  };

  const handlePaging = (event: SelectChangeEvent) => {
    setCurrentPage(Number(event.target.value));
  };
  const handlePagingItem = (event: SelectChangeEvent) => {
    setPageSize(Number(event.target.value));
  };
  const generatePageArray = () => {
    const pageArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pageArray.push(i);
    }
    setListPage(pageArray);
  };
  useEffect(() => {
    generatePageArray();
  }, [totalPages]);

  return (
    <>
      <div className="grid grid-cols-4 mt-5 gap-5 overflow-y-auto max-h-[calc(100vh-200px-130px)] pr-4">
        {wallpapers &&
          wallpapers.map((item, index) => (
            <div key={index} className="bg-primary rounded w-full p-5 relative">
              <div
                className="relative w-full h-72 cursor-pointer"
                onClick={() => handleEdit(item)}
              >
                <img
                  src={item.thumb.path}
                  alt="Pic 1"
                  style={{
                    objectFit: "cover",
                    borderRadius: 5,
                    height: "100%",
                  }}
                />
              </div>
              <div className="flex justify-between mt-4 mb-2">
                <p className="whitespace-nowrap overflow-hidden overflow-ellipsis w-24">
                  {item.name}
                </p>
              </div>
              <div className="mt-3 text-gray-500 text-sm">
                Download: {item.downloadCount}
              </div>
              <div className="mt-3 text-gray-500 text-sm">
                Price Type: {item.priceType.type}
              </div>
              <div className="mt-3 text-gray-500 text-sm">
                Trending Priortiy: {item.trendingPriority}
              </div>
              <div className="mt-3 text-gray-500 text-sm">
                Category Priority: {item.priorityCategory}
              </div>
              <div className="mt-3 text-red-500 text-sm">
                Newest Priortiy: {item.priorityNewest}
              </div>
              <div className="mt-3 text-red-500 text-sm">Time: {item.time}</div>
            </div>
          ))}
      </div>
      <div className="flex gap-5 mt-3 justify-end">
        {totalPages !== 0 && <> <FormControl>
          <Select
            sx={{ backgroundColor: "#3b82f680", height: 40, color: "white" }}
            labelId="listPage"
            id="listPage"
            value={currentPage.toString()}
            onChange={handlePaging}
          >
            {listPage &&
              listPage.map((item, index) => (
                <MenuItem key={index} value={item}>
                  Page {item}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            sx={{ backgroundColor: "#3b82f680", height: 40, color: "white" }}
            labelId="pageSize"
            id="pageSize"
            value={pageSize.toString()}
            onChange={handlePagingItem}
          >
            {LIST_PAGE_SIZE.map((item, index) => (
              <MenuItem key={"item" + index} value={item}>
                {item} items
              </MenuItem>
            ))}
          </Select>
        </FormControl></>}
       
      </div>
      {isOpenEdit && (
        <ModalEditWallpaper
          setUpdateSuccess={setUpdateSuccess}
          handleClose={handleClose}
          open={isOpenEdit}
          wallpaperDetail={wallpaperDetail}
        />
      )}
    </>
  );
};

export default FetchWallpaper;
