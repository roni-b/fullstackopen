import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";
import { apiBaseUrl } from "../constants";

export const getAll = () => {
  return axios
    .get<DiaryEntry[]>(apiBaseUrl)
    .then(response => response.data);
};

export const createEntry = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(apiBaseUrl, object)
    .then(response => response.data);
};