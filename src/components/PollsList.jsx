import React, { useState } from "react";
import PollDataService from "../services/poll.service";
import { Link } from "react-router-dom";
import Poll from "./PollForm";


const PollList = () => {

  const [state, setState] = useState({
    currentPollId: null,
  })
  const [polls, setPolls] = useState([]);

  function retrievePolls() {
    PollDataService.getAll()
      .then(response => {
        setPolls(response.data.map((item) => <Poll key={item.id} id={item.id} title={item.title} description={item.description} />));
        setState({...state, pollsLoaded: true})
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  if (!state.pollsLoaded) {
    retrievePolls();
  }

  const { currentPollId } = state;

  return (
    <div>
      <div id="polls" className="list row">
        <h4>{polls.length} polls</h4>

        <ul className="list-group">
          {polls.map(poll => (
              <li className="list-group-item" key={poll.props.id} >
                <Link to={`/polls/${poll.props.id}`}>
                  {poll.props.title}
                </Link>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PollList;