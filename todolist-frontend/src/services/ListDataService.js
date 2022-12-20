import axios from "../http-common";

class ListDataService{
  getAll() {
    return axios.get("/lists/all");
  }

  get(id) {
    return axios.get(`/lists/${id}`);
  }

  create(data) {
    return axios.post("/lists/add", data);
  }

  update(id, datas) {
    return axios.put(`/lists/${id}`, datas);
  }

  delete(id) {
    return axios.delete(`/lists/${id}`);
  }

  deleteAll() {
    return axios.delete(`/lists`);
  }
}

export default new ListDataService();
