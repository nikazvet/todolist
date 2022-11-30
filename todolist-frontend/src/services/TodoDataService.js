import http from "../http-common";
import axios from "axios";

class TodoDataService{
  getAll() {
    return http.get("/todos/all");
  }

  get(id) {
    return http.get(`/todos/${id}`);
  }

  create(data) {
    return http.post("/todos/add", data, { headers: {"content-type": "application/json; charset=utf-8"}});
  }

  update(id, datas) {
    return http.put(`/todos/${id}`, datas);
  }

  delete(id) {
    return http.delete(`/todos/${id}`);
  }

  deleteAll() {
    return http.delete(`/todos`);
  }

  findByText(text) {
    return http.get(`/todos?text=${text}`);
  }
}

export default new TodoDataService();
