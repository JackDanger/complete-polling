import React, { useState } from "react";
import { PollAPI } from "../services/poll.service.jsx";
import { Link } from "react-router-dom";
import Poll from "./PollForm";


const PollList = () => {

  const [state, setState] = useState({
    currentPollId: null,
  })
  const [polls, setPolls] = useState([]);

  function retrievePolls() {
    PollAPI.getAll()
      .then(response => {
        setPolls(response.data.map((item) => <Poll key={item.id} id={item.id} title={item.title} description={item.description} />));
        setState({ ...state, pollsLoaded: true })
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
        <h1 class="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">{polls.length} Polls</h1>
        <p class="mt-2 text-lg text-slate-700 dark:text-slate-400">Give us your personal data to feed our new AI bosses. They are so hungry.</p>

        <div className="mt-10 relative">
          <ul className="hover:list-disc col-span-full">
            {polls.map(poll => (
              <Link to={`/polls/${poll.props.id}`}>
                <li className="rounded-sm border-solid py-1 outline-slate-100 text-lg" key={poll.props.id} >
                  &raquo; {poll.props.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PollList;