"use client";

import ModalCreateWallpaper from "@/app/components/modal/modal-create-wallpaper";
import useFetchWallpaper from "@/app/hooks/useFetchWallpaper";
import categoryService from "@/app/services/categoryService";
import { ListCategory } from "@/app/types";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useEffect, useState } from "react";

interface FilterWallpaperProps {
  updateCategoryId: (id: number) => void;
  fetchWallpaper: (token: string) => Promise<void>;
}

const FilterWallpaper: FC<FilterWallpaperProps> = ({
  updateCategoryId,
  fetchWallpaper,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categoryList, getCategoryList] = useState<ListCategory[]>([]);
  const [categoryName, setCategoryName] = useState<string>("Category");

  const getListCategory = async () => {
    const token = localStorage.getItem("token") ?? "";
    const listCategory = await categoryService.getCategoryList(token);
    getCategoryList(listCategory);
  };
  
  const handleOpenModal = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleChange = (event: SelectChangeEvent) => {
    setCategoryName(event.target.value)
    updateCategoryId(Number(event.target.value));
  };
  useEffect(() => {
    getListCategory();
  }, []);
  return (
    <>
      <div className="w-full bg-primary rounded p-4">
        <div className="flex">
          <div className="w-2/3">Filter:</div>
        </div>

        <div className="grid grid-cols-3 mt-3 gap-5">
          <FormControl fullWidth>
            <Select
              sx={{ backgroundColor: "white", height: 40 }}
              labelId="category"
              id="category"
              value={categoryName}
              onChange={handleChange}
            >
              <MenuItem value="Category" disabled>
                <em>Category</em>
              </MenuItem>
              {categoryList &&
                categoryList.map((item, index) => (
                  <MenuItem key={item.name} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

        </div>
        <div className="grid place-items-end mt-5">
          <button
            className="rounded px-3 py-2 text-sm bg-blue-500"
            onClick={handleOpenModal}
          >
            + Add new picture
          </button>
        </div>
      </div>
      {isOpen && (
        <ModalCreateWallpaper open={isOpen} handleClose={handleClose} />
      )}
    </>
  );
};

export default FilterWallpaper;
