import { FC, useEffect, useState } from "react";
import wallpaperService from "../services/wallpaperService";

type PriceType = {
  [key: string]: number;
};
const PriceTypeMapping: PriceType = {
  FREE: 0,
  IAP: 1,
  COIN: 2,
};
const useFetchWallpaper = (categoryId?: number) => {
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchWallpaper = async (token: string) => {
    const res = await wallpaperService.fetchWallpaper(
      token,
      currentPage,
      pageSize,
      categoryId
    );
    
    const data = res.data.map((item: any) => ({
      id: item.id,
      name: item.thumb.file_name,
      setup: 222,
      tag: item.tag,
      downloadCount: item.download_count,
      trendingPriority: item.trending_priority,
      priceType: {
        id: PriceTypeMapping[item.price_type],
        type: item.price_type,
      },
      priorityCategory: item.priority_category,
      priorityNewest: item.priority,
      time: item.created_at,
      thumb: {
        file_name: item.thumb.file_name,
        path: item.thumb.path,
      },
      content_one: {
        file_name: item.content_one.file_name,
        path: item.content_one.path,
      },
      category_id: {
        id: item.category_id.id,
        name: item.category_id.name,
      },
      author: item.author,
      website: item.website,
    }));
    console.log(res);
    
    setWallpapers(data);
    setTotalPages(Math.ceil(res.total / pageSize));
  };
  useEffect(() => {
    const token = localStorage.getItem("token") ?? "";
    fetchWallpaper(token);
    
  }, [currentPage, pageSize]);

  return {
    wallpapers,
    totalPages,
    currentPage,
    pageSize,
    categoryId,
    setTotalPages,
    setPageSize,
    setCurrentPage,
    fetchWallpaper
  };
};

export default useFetchWallpaper;
