"use client";
import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import ModalEditCategory from "@/app/components/modal/modal-edit-category";
import categoryService from "@/app/services/categoryService";
import { CategoryDetail, CategoryResponse } from "@/app/types";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
interface CategoryProps {
  isCreateSuccess: boolean;
}

const LIST_PAGE_SIZE = [10, 20, 30, 50, 100];
const FetchCategory: FC<CategoryProps> = ({ isCreateSuccess }) => {
  const [categories, setCategories] = useState<CategoryDetail[]>([]);
  const [categoryDetail, setCategoryDetail] = useState<CategoryDetail>();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [currentpage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState(0);
  const [listPage, setListPage] = useState<number[]>([]);

  const handleClose = () => setIsOpenEdit(false);

  const handleEdit = (cateItem: CategoryDetail) => {
    setIsOpenEdit(true);
    setCategoryDetail(cateItem);
  };

  const getCategory = async (token: string) => {
    const res = await categoryService.fetchCategory(
      token,
      currentpage,
      pageSize
    );
    const data = await res.data;
    console.log(data);

    const contentCategory = data.data.map((item: CategoryResponse) => ({
      id: item.id,
      name: item.name,
      file_name: item.thumb.file_name,
      path: item.thumb.path,
      chartColor: item.chart_color,
      totalWallpaper: item.total_wallpapers,
      setup: item.use_count,
      download: item.download_count,
    }));
    setTotalPages(Math.ceil(data.total / pageSize));
    setCategories(contentCategory);
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
    const token = localStorage.getItem("token") ?? "";
    getCategory(token);
    generatePageArray();
  }, [updateSuccess, isCreateSuccess]);

  return (
    <>
      <div className="grid grid-cols-4 mt-5 gap-5 overflow-y-auto max-h-[calc(100vh-230px)] pr-4">
        {categories &&
          categories.map((item, index) => (
            <div key={index} className="bg-primary relative rounded w-full p-5">
              <p className="mb-2">{item.name}</p>
              <div
                className="relative w-full h-80 cursor-pointer bg-black flex justify-center"
                onClick={() => handleEdit(item)}
              >
                <img
                  src={item.path}
                  alt="Pic 1"
                  style={{
                    objectFit: "cover",
                    borderRadius: 5,
                    height: "100%",
                  }}
                />
              </div>
              <div className="mt-3 text-gray-500 text-sm">
                Setup: {item.setup}
              </div>
              <div className="mt-3 text-gray-500 text-sm">
                Download: {item.download}
              </div>
              <div className="mt-3 text-gray-500 text-sm">
                Total wallpaper: {item.totalWallpaper}
              </div>
            </div>
          ))}
      </div>
      <div className="flex gap-5 mt-3 justify-end">
        {totalPages !== 0 && (
          <>
            <FormControl>
              <Select
                sx={{
                  backgroundColor: "#3b82f680",
                  height: 40,
                  color: "white",
                }}
                labelId="listPage"
                id="listPage"
                value={currentpage.toString()}
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
                sx={{
                  backgroundColor: "#3b82f680",
                  height: 40,
                  color: "white",
                }}
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
            </FormControl>
          </>
        )}
      </div>
      {isOpenEdit && (
        <ModalEditCategory
          categoryDetail={categoryDetail}
          open={isOpenEdit}
          handleClose={handleClose}
          setUpdateSuccess={setUpdateSuccess}
        />
      )}
    </>
  );
};

export default FetchCategory;
