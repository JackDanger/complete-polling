import React, { useState } from "react";
import PollDataService from "../services/poll.service";
import { Link } from "react-router-dom";
import Poll from "./Poll";


const PollList = () => {

  const [state, setState] = useState({
    currentPollId: null,
  })
  const [polls, setPolls] = useState([]);

  function retrievePolls() {
    PollDataService.getAll()
      .then(response => {
        setPolls(response.data.map((item) => <Poll key={item.id} id={item.id} title={item.title} description={item.description} />));
        setState({ ...state, pollsLoaded: true })
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function refreshList() {
    retrievePolls();
    setState({
      ...state,
      currentPoll: null,
    });
  }

  function setCurrentPollId(id) {
    setState({
      ...state,
      currentPollId: id,
    });
  }

  if (!state.pollsLoaded) {
    retrievePolls();
  }

  const { currentPollId } = state;

  return (
    <div>
      <div className="list row">
        <h4>{polls.length} polls</h4>

        <ul className="list-group">
          {polls.map(poll => (
            <li
              className={
                "list-group-item " + poll.props.id + " " +
                (currentPollId && poll.props.id === currentPollId ? "active" : "")
              }
              onClick={() => setCurrentPollId(poll.props.id)}
              key={poll.props.id}
            >
              {currentPollId && poll.props.id === currentPollId ? (
                <>
                  <Poll key={poll.id} edit={true} {...poll.props} />
                </>
              ) : (
                <a>{poll.props.title}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PollList;