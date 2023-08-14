'use client'

import React, { FC, useState } from 'react';
import FetchCategory from "./features/fetch-category";
import ModalCreateCategory from '@/app/components/modal/modal-create-category';

interface pageProps {}

const Category: FC<pageProps> = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  return (
    <div>
      <div className="grid place-items-end mt-1">
        <button className="rounded px-4 py-3 bg-blue-500" onClick={handleOpen}>
          + Add category
        </button>
      </div>
      <FetchCategory isCreateSuccess={isCreateSuccess} />
      <ModalCreateCategory setIsCreateSuccess={setIsCreateSuccess} open={open} handleClose={handleClose} />
    </div>
  );
};

export default Category;
