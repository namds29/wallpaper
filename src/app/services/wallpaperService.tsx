import axios from "axios";

type Wallpaper = {
  name: string;
  category: number;
  priceType: number;
  price: number;
  priorityNewest: number;
  priorityCategory: number;
  priorityTrending: number;
  author: string;
  website: string;
  tag: string;
  contentType: number;
  thumb: File[];
  file: File[];
};
async function fetchWallpaper(
  token: string,
  page: number,
  per_page: number,
  category_id?: number
) {
  let config = {
    method: "get",
    url: process.env.NEXT_PUBLIC_API_URL + "wallpapers",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
      per_page: per_page,
      ...(category_id && { category_id: category_id }),
    },
  };

  const res = await axios.request(config);
  return res.data;
}

const createWallpaper = async (token: string, wallpaper: Wallpaper) => {
  const formData = new FormData();

  formData.append("name", wallpaper.name);
  formData.append("category", wallpaper.category.toString());
  formData.append("priceType", wallpaper.priceType.toString());
  formData.append("price", wallpaper.price.toString());
  formData.append("priorityNewest", wallpaper.priorityNewest.toString());
  formData.append("priorityCategory", wallpaper.priorityCategory.toString());
  formData.append("priorityTrending", wallpaper.priorityTrending.toString());
  formData.append("author", wallpaper.author);
  formData.append("website", wallpaper.website);
  const tags = wallpaper.tag;
  formData.append("tag", JSON.stringify(tags));
  formData.append("contentType", wallpaper.contentType.toString());
  console.log(typeof formData.get("tag"));
  for (let i = 0; i < wallpaper.thumb.length; i++) {
    formData.append("thumb", wallpaper.thumb[i]);
  }
  for (let i = 0; i < wallpaper.file.length; i++) {
    formData.append("file", wallpaper.file[i]);
  }

  let config = {
    method: "post",
    url: process.env.NEXT_PUBLIC_API_URL + "wallpapers",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };
  const res = await axios.request(config);
  return res;
};
const updateWallpaper = async (
  token: string,
  wallpaper: Wallpaper,
  id: number
) => {
  const formData = new FormData();

  formData.append("name", wallpaper.name);
  formData.append("category", wallpaper.category.toString());
  formData.append("priceType", wallpaper.priceType.toString());
  formData.append("price", wallpaper.price.toString());
  formData.append("priorityNewest", wallpaper.priorityNewest.toString());
  formData.append("priorityCategory", wallpaper.priorityCategory.toString());
  formData.append("priorityTrending", wallpaper.priorityTrending.toString());
  formData.append("author", wallpaper.author);
  formData.append("website", wallpaper.website);
  const tags = wallpaper.tag;

  formData.append("tag", JSON.stringify(tags));

  formData.append("contentType", wallpaper.contentType.toString());

  for (let i = 0; i < wallpaper.thumb.length; i++) {
    formData.append("thumb", wallpaper.thumb[i]);
  }
  for (let i = 0; i < wallpaper.file.length; i++) {
    formData.append("file", wallpaper.file[i]);
  }

  let config = {
    method: "put",
    url: process.env.NEXT_PUBLIC_API_URL + "wallpapers/" + id,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };
  const res = await axios.request(config);
  return res;
};

export default { fetchWallpaper, createWallpaper, updateWallpaper };
