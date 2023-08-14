import axios from "axios";
// import FormData from "form-data";
type UpdateCategory = {
  id: number;
  name: string;
  chartColor: string;
  file: File[];
};
type CreateCategory = {
  name: string;
  chartColor: string;
  file: File[];
};
const fetchCategory = async (token: string,page:number, per_page:number) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: process.env.NEXT_PUBLIC_API_URL + "categories",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
      per_page: per_page
    }
  };

  const res = await axios.request(config);
  return res;
};

const updateCategory = async (
  token: string,
  category: UpdateCategory,
  id: number
) => {
  let data = new FormData();
  data.append("name", category.name);
  data.append("chartColor", category.chartColor);
  data.append("id", category.id.toString());
  data.append("file", category.file[0]);

  let config = {
    method: "put",
    url: process.env.NEXT_PUBLIC_API_URL + "categories/" + id,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  const res = await axios.request(config);
  return res;
};
const createCategory = async (token: string, category: CreateCategory) => {
  let formData = new FormData();
  formData.append("name", category.name);
  formData.append("chartColor", category.chartColor);
  formData.append("file", category.file[0]);

  let config = {
    method: "post",
    url: process.env.NEXT_PUBLIC_API_URL + "categories",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };
  const res = await axios.request(config);
  return res;
};
const getCategoryList = async (token: string) => {
  let config = {
    method: "get",
    url: process.env.NEXT_PUBLIC_API_URL + "categories/list",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.request(config);
  return res.data;
};
export default {
  fetchCategory,
  updateCategory,
  createCategory,
  getCategoryList,
};
