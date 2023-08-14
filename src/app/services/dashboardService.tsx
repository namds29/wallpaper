
import axios from "axios";

type UpdateCategory = {
  id: number;
  name: string;
  chartColor: string;
  file: File[];
};

async function fetchDashboard(token: string) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: process.env.NEXT_PUBLIC_API_URL + "dashboard",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.request(config);
  return res.data;
}
const updateWallpaper = async (token: string, category: UpdateCategory) => {
  let data = new FormData();
  data.append("name", category.name);
  data.append("chartColor", category.chartColor);
  data.append("id", category.id.toString());
  data.append("file", category.file[0]);

  let config = {
    method: "post",
    url: process.env.NEXT_PUBLIC_API_URL + "updateCategory",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  const res = await axios.request(config);
  return res;
};
export default { fetchDashboard };
