export type CategoryResponse = {
    id: number;
    name: string;
    use_count: number;
    chart_color: string;
    download_count: number;
    thumb: {
      file_name: string;
      path: string;
    };
    total_wallpapers: number;
  };
 export type ListCategory = {
    id: number,
    name: string
  } 
 export type CategoryDetail = {
    file_name:string,
    path: string;
    id: number;
    name: string;
    setup: number;
    chartColor: string;
    download: number;
    priority: number;
    totalWallpaper: number;
  };

export type Wallpaper = {
    id: number,
    thumb: {
      file_name: string;
      path: string;
    };
    content_one: {
      file_name: string;
      path: string;
    },
    category_id: {
      id: number,
      name: string
    }
    name: string;
    // setup: number;
    tag: string;
    downloadCount: number;
    trendingPriority: number;
    priority: number,
    priceType: {
      id: number,
      type: string
    };
    priorityCategory: number,
    priorityNewest: number;
    time: string,
    author: string,
    website: string,
  };