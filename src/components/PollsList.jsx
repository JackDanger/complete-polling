import React, { useEffect, useState } from "react";
import { PollAPI, VoteAPI } from "../services/poll.service.jsx";
import { Link } from "react-router-dom";
import Poll from "./PollForm";
import { visitEachChild } from "typescript";


const PollList = () => {

  const [polls, setPolls] = useState([]);
  const [votes, setVotes] = useState({});

  useEffect(() => {
    PollAPI.getAll()
      .then(response => {
        setPolls(response.data.map((item) => <Poll key={item.id} id={item.id} title={item.title} description={item.description} />));
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  useEffect((polls) => {
    VoteAPI.getAll()
      .then(response => {
        setVotes(response.data.reduce((acc, item) => { acc[item.poll_id] = item.option_id; return acc }, {}));
      })
      .catch(e => {
        console.log(e);
      });
  }, [polls]);


  return (
    <div>
      <div id="polls" className="list row">
        <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight ">{polls.length} Polls</h1>
        <p className="mt-2 text-lg text-slate-700">Give us your personal data to feed our new AI bosses. They are so hungry.</p>

        <div className="mt-10 relative">
          <ul className="col-span-full">
            {polls.map(poll => (
              <Link key={poll.props.id} vote={votes[poll.props.id]} to={`/polls/${poll.props.id}`}>
                <li className={`hover:list-disc rounded-sm border-solid py-1 outline-slate-100 text-lg ${votes[poll.props.id] && 'text-slate-300'}`} >
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