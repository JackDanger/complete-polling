import http from "../http-common";

const Host = "http://localhost:1337";

class Poll {
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
}
class Vote {
  create(data) {
    return http.post(`${Host}/polls/${data.pollId}/vote`, {option_id: data.optionId});
  }
  get(pollId) {
    return http.get(`${Host}/polls/${pollId}/vote`);
  }
}

export const PollAPI = new Poll();
export const VoteAPI = new Vote();