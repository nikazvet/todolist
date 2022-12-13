import axios from "../http-common";

class TodoDataService{
  getAll() {
    return axios.get("/todos/all");
  }

  get(id) {
    return axios.get(`/todos/${id}`);
  }

  create(data) {
    return axios.post("/todos/add", data);
  }

  update(id, datas) {
    return axios.put(`/todos/${id}`, datas);
  }

  delete(id) {
    return axios.delete(`/todos/${id}`);
  }

  deleteAll() {
    return axios.delete(`/todos`);
  }

  findByText(text) {
    return axios.get(`/todos?text=${text}`);
  }
}

export default new TodoDataService();
