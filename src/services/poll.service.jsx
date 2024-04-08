import http from "../http-common";

const Host = "http://localhost:1337";

class PollDataService {
  getAll() {
    return http.get(`${Host}/polls`);
  }

  get(id) {
    return http.get(`${Host}/polls/${id}`);
  }

  create(data) {
    return http.post(`${Host}/polls`, {poll: data});
  }

  update(id, data) {
    return http.put(`${Host}/polls/${id}`, {poll: data});
  }

  delete(id) {
    return http.delete(`${Host}/polls/${id}`);
  }

  deleteAll() {
    return http.delete(`${Host}/polls`);
  }
}

export default new PollDataService();