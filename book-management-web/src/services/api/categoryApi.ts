import { AxiosResponse } from "axios";
import BookModel from "../../types/models/BookModel";
import queryString from "query-string";
import axiosPublicClient from "../axios/axiosPublicClient";
import NewCategoryFormData from "../../types/form/NewCategoryFormData";
import { API_URLS } from "../../constants/api_url";
import CategoryModel from "../../types/models/CategoryModel";
import PaginationModel from "../../types/models/PaginationModel";

const categoryApi = {
  getAllCategorys: () => {
    const url = API_URLS.CATEGORY + "/getall";
    return axiosPublicClient.get(url);
  },

  getCategory: (param: PaginationModel) => {
    const url = API_URLS.CATEGORY + "/getbyfilter/";

    return axiosPublicClient.get(url);
  },

  addNewCategory: (newCategory: NewCategoryFormData) => {
    const url = API_URLS.CATEGORY + "/add";

    return axiosPublicClient.post(url, newCategory);
  },

  getById: (id: string): Promise<AxiosResponse<CategoryModel>> => {
    const url = API_URLS.CATEGORY + "/getbyid/" + id;

    return axiosPublicClient.get(url);
  },

  updateCategory: (id: string, newCategory: NewCategoryFormData) => {
    const url = API_URLS.CATEGORY + "/update/" + id;

    const config = {
      params: {
        id: id,
      },
    };

    return axiosPublicClient.put(url, newCategory, config);
  },

  deleteCategory: (id: string): Promise<AxiosResponse<CategoryModel[]>> => {
    const url = API_URLS.CATEGORY + "/delete/" + id;

    const config = {
      params: {
        id: id,
      },
    };

    return axiosPublicClient.delete(url, config);
  },

  getCategoryForMain: (): Promise<AxiosResponse<CategoryModel[]>> => {
    const url = API_URLS.CATEGORY + "/main";

    return axiosPublicClient.get(url);
  },
};

export default categoryApi;
