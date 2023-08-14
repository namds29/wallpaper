import categoryService from "@/app/services/categoryService";
import { Box, Modal, Typography } from "@mui/material";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

type CategoryDetail = {
  id: number;
  name: string;
  setup: number;
  chartColor: string;
  download: number;
  priority: number;
  totalWallpaper: number;
  file_name: string;
  path: string;
};
type Props = {
  // Define your component props here
  open: boolean;
  handleClose: () => void;
  categoryDetail: CategoryDetail | undefined;
  setUpdateSuccess: Dispatch<SetStateAction<boolean>>;
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ModalEditCategory: React.FC<Props> = ({
  open,
  handleClose,
  categoryDetail,
  setUpdateSuccess,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  console.log(categoryDetail);
  
  const [fileName, setFileName] = useState<string | undefined | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(categoryDetail?.path);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("token") ?? "";
    if (categoryDetail) {
      const categoryUpdate = {
        id: categoryDetail.id,
        name: data.name,
        chartColor: data.chartColor,
        file: data.photo,
      };
      console.log(categoryUpdate);
      const res = await categoryService.updateCategory(
        token,
        categoryUpdate,
        categoryUpdate.id
      );
      if (res.status === 200) {
        handleClose();
        setUpdateSuccess(true);
        alert("Update success");
      }
    }
  };

  const handlePhotoChange = (e: any) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setPreviewImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    setFileName(categoryDetail?.file_name);
    setPreviewImage(categoryDetail?.path);
    reset();
    return () => {
      setUpdateSuccess(false);
    };
  }, [categoryDetail]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <div className="text-2xl mb-6 font-bold text-center">Edit Category</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              defaultValue={categoryDetail?.name}
              {...register("name")}
            />
          </div>
          <div className="mb-4 flex justify-between">
            <div>
              <label htmlFor="chartColor" className="block mb-1 font-medium">
                Chart Color:
              </label>
              <input
                type="color"
                defaultValue={categoryDetail?.chartColor}
                className="border border-solid border-gray-300"
                {...register("chartColor")}
              />
            </div>
            <div>
              <label htmlFor="count" className="block mb-1 font-medium">
                Count:
              </label>
              <p className="text-blue-600">{categoryDetail?.totalWallpaper} wallpapers</p>
            </div>
          </div>
          <div className="mb-4 justify-between">
            <label htmlFor="analytics" className="block mb-1 font-medium">
              Analytics:
            </label>
            <div className="flex justify-between">
              <p>{categoryDetail?.setup} setup</p>
              <p>{categoryDetail?.download} download</p>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="block mb-1 font-medium">
              Photo*:
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              className="absolute hidden"
              {...register("photo", { onChange: handlePhotoChange })}
            />
            <label htmlFor="photo" className="border border-gray-300 rounded-md px-3 py-2 cursor-pointer overflow-hidden whitespace-nowrap overflow-ellipsis">
              {fileName ?? "Choose a photo"}
            </label>
          </div>
          {previewImage && (
            <div className="mb-6">
              <p className="font-medium">Preview:</p>
              <div className="relative w-full h-96 bg-gray-200 rounded flex justify-center">
                <img 
                  src={previewImage}
                  alt="Selected"
                  className="object-cover mb-2 absolute h-full"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end">
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

export default ModalEditCategory;
