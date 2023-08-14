import categoryService from "@/app/services/categoryService";
import wallpaperService from "@/app/services/wallpaperService";
import { ListCategory, Wallpaper } from "@/app/types";
import { Box, Modal, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState,Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  // Define your component props here
  open: boolean;
  wallpaperDetail: Wallpaper | undefined;
  handleClose: () => void;
  setUpdateSuccess: Dispatch<SetStateAction<boolean>>;
};
type PriceType = {
  [key: string]: number;
};
const PriceTypeMapping: PriceType = {
  FREE: 0,
  IAP: 1,
  COIN: 2,
};
const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  width: "calc(100% - 160px)",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ModalEditWallpaper: React.FC<Props> = ({
  open,
  handleClose,
  wallpaperDetail,
  setUpdateSuccess
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({});
console.log(wallpaperDetail);

  const [fileName, setFileName] = useState<any>(null);
  const [thumbName, setThumbName] = useState<any>(null);
  const [categoryList, setCategoryList] = useState<ListCategory[]>([]);
  const [priceTypeMap, setPriceTypeMap] = useState<string | undefined>(
    wallpaperDetail?.priceType.id.toString()
  );
  const [textTagArea, setTextTagArea] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    wallpaperDetail?.category_id.id
  );
  const [checkedPriceType, setCheckedPricetype] = useState<
    number | undefined
  >();
  const [previewImage, setPreviewImage] = useState<string | undefined>( wallpaperDetail?.thumb.path);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("token") ?? "";
    const wordArray = data.tag
      .split(",")
      .map((item: string) => item.trim())
      .filter((item: string) => item != "");
    if (wallpaperDetail) {
      const wallPaperInfor = {
        name: "test",
        category: Number(data.category),
        priceType: Number(data.priceType),
        price: 0,
        priorityNewest: data.priorityNewest,
        priorityCategory: data.priorityCategory,
        priorityTrending: data.priorityTrending,
        author: data.author,
        website: data.website,
        tag: wordArray,
        contentType: Number(data.contentType),
        thumb: data.thumb,
        file: data.file,
      };
      const res = await wallpaperService.updateWallpaper(
        token,
        wallPaperInfor,
        wallpaperDetail.id
      );

      if (res.status === 200) {
        handleClose();
        setUpdateSuccess(true)
        alert("Update success");
      }
    }
  };
  const handleThumbChange = (e: any) => {
    const file = e.target.files[0];
    setThumbName(file.name);
    setPreviewImage(URL.createObjectURL(file));
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFileName(file.name);
  };
  const getListCategory = async () => {
    const token = localStorage.getItem("token") ?? "";
    const listCategory = await categoryService.getCategoryList(token);
    setCategoryList(listCategory);
  };
  useEffect(() => {
    getListCategory();
    setFileName(wallpaperDetail?.content_one.file_name);
    setThumbName(wallpaperDetail?.thumb.file_name);
    if (wallpaperDetail) {
      if (wallpaperDetail.tag && wallpaperDetail.tag !== null) {
        console.log(JSON.parse(wallpaperDetail.tag));
        const parseTag = JSON.parse(wallpaperDetail.tag);
        const joinTag = parseTag.join(", ");
        setTextTagArea(joinTag);
      }
    }
    reset();
    return () => {
      reset();
      setUpdateSuccess(false);
      setCategoryList([]);
    };
  }, [wallpaperDetail]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <div className="text-2xl mb-6 font-bold text-center">
          Edit Wallpaper
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-y-auto max-h-30rem pr-6">
            <div className="flex gap-10">
              <div>
                <p className="mb-6 font-bold">Basic Infor</p>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Category*:
                  </label>

                  <Controller
                    control={control}
                    name="category"
                    defaultValue={selectedCategory}
                    render={({ field }) => (
                      <select
                        id="small"
                        {...field}
                        className="block w-full px-2 py-3 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {categoryList &&
                          categoryList.map((cateItem) => (
                            <option
                              key={cateItem.id + cateItem.name}
                              value={cateItem.id}
                            >
                              {cateItem.name}
                            </option>
                          ))}
                      </select>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <p className="block mb-2 font-medium">Price type*:</p>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <Controller
                        name="priceType"
                        control={control}
                        defaultValue={priceTypeMap}
                        render={({ field }) => (
                          <>
                            <input
                              id="Free"
                              type="radio"
                              {...field}
                              checked={field.value === "0"}
                              value="0"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                            />
                            <label
                              htmlFor="Free"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Free
                            </label>
                          </>
                        )}
                      />
                    </div>
                    <div className="flex items-center mr-4">
                      <Controller
                        name="priceType"
                        control={control}
                        defaultValue={priceTypeMap}
                        render={({ field }) => (
                          <>
                            <input
                              id="IAP"
                              type="radio"
                              {...field}
                              checked={field.value === "1"}
                              value="1"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                            />
                            <label
                              htmlFor="IAP"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              IAP
                            </label>
                          </>
                        )}
                      />
                    </div>
                    <div className="flex items-center mr-4">
                      <Controller
                        name="priceType"
                        control={control}
                        defaultValue={priceTypeMap}
                        render={({ field }) => {
                          console.log(field);

                          return (
                            <>
                              <input
                                id="COIN"
                                type="radio"
                                {...field}
                                checked={field.value === "2"}
                                value="2"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                              />
                              <label
                                htmlFor="COIN"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                COIN
                              </label>
                            </>
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="block mb-3 font-medium">Priority*:</p>
                  <div className="flex gap-4 mb-4">
                    <p className="w-full">For newest:</p>
                    <input
                      type="text"
                      className=" border border-gray-300 rounded-md px-2 py-1"
                      placeholder="Enter newest number"
                      defaultValue={wallpaperDetail?.priorityNewest}
                      {...register("priorityNewest", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div className="flex gap-4 mb-4">
                    <p className="w-full">For category:</p>
                    <input
                      type="number"
                      className=" border border-gray-300 rounded-md px-2 py-1"
                      placeholder="Enter category number"
                      defaultValue={wallpaperDetail?.priorityCategory}
                      {...register("priorityCategory", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div className="flex gap-4 mb-4">
                    <p className="w-full">For trending:</p>
                    <input
                      type="number"
                      className=" border border-gray-300 rounded-md px-2 py-1"
                      placeholder="Enter trending"
                      defaultValue={wallpaperDetail?.trendingPriority}
                      {...register("priorityTrending", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="additional-info">
                <p className="mb-6 font-bold">Additional Infor</p>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Author:
                  </label>
                  <input
                    type="text"
                    id="author"
                    defaultValue={wallpaperDetail?.trendingPriority}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    {...register("author")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Website:
                  </label>
                  <input
                    type="text"
                    id="Website"
                    defaultValue={wallpaperDetail?.website}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    {...register("website")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Publish at:
                  </label>
                  <input
                    type="text"
                    id="publish"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    {...register("publish")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Tag:
                  </label>
                  <textarea
                    id="tag"
                    defaultValue={textTagArea}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    {...register("tag")}
                  />
                </div>
              </div>
              <div className="content w-96">
                <p className="mb-6 font-bold">Content</p>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Type*:
                  </label>
                  <select
                    id="small"
                    className="block w-full px-2 py-3 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("contentType")}
                  >
                    <option value="0">single_image</option>
                    <option value="1">double_image</option>
                  </select>
                </div>
                <div className="mb-4">
                  <div className="mb-4">
                    <label htmlFor="photo" className="block mb-4 font-medium">
                      Content 1*:
                    </label>
                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      className="hidden"
                      {...register("thumb", {
                        onChange: handleFileChange,
                      })}
                    />
                    <label
                      htmlFor="file"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
                    >
                      {fileName ?? "Choose a photo"}
                    </label>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="photo" className="block mb-4 font-medium">
                      Thumbnail 1*:
                    </label>
                    <input
                      type="file"
                      id="thumb"
                      accept="image/*"
                      className="hidden"
                      {...register("file", {
                        onChange: handleThumbChange,
                      })}
                    />
                    <label
                      htmlFor="thumb"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
                    >
                      {thumbName ?? "Choose a photo"}
                    </label>
                  </div>
                  {previewImage && (
                    <div className="mb-6">
                      <div className="relative w-full h-96 bg-gray-200 rounded">
                        <img
                          src={previewImage}
                          alt="preview img"
                          className="object-cover mb-2 w-full h-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="ml-2 text-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalEditWallpaper;
