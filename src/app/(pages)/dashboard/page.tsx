"use client";

import { IconCategory } from "@/app/assets/svgs/icon-category";
import { IconWallpaper } from "@/app/assets/svgs/icon-wallpaper";
import { useAuthContext } from "@/app/context/auth-context";
import dashboardService from "@/app/services/dashboardService";
import { FC, useEffect, useState, useCallback } from "react";

interface pageProps {}
type Dashboard = {
  category: number;
  wallpapers: number;
};
const Page = async () => {
  const [dashboard, setDashboard] = useState<Dashboard>({
    category: 0,
    wallpapers: 0,
  });
  
  const getData = async (token: string) => {
    const data = await dashboardService.fetchDashboard(token);
    setDashboard({ category: data.categories, wallpapers: data.wallpapers });
    console.log(data);
  };

  useEffect(() => {
    const token = localStorage.getItem('token') ?? "";
    getData(token);
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <div className="bg-primary p-4 rounded">
        <p className="text-lg">Wallpaper</p>
        <div className="flex justify-between">
          <p className="text-3xl font-bold mt-6">{dashboard.wallpapers}</p>
          <IconWallpaper />
        </div>
        <p className="text-gray-500">Total</p>
    </div>
      <div className="bg-primary p-4 rounded">
        <p className="text-lg">Category</p>
        <div className="flex justify-between">
          <p className="text-3xl font-bold mt-6">{dashboard.category}</p>
          <IconCategory />
        </div>
        <p className="text-gray-500">Total</p>
      </div>
    </div>
  );
};
export default Page;
