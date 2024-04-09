import { useEffect, useState } from 'react';
import { withRouter } from '../common/with-router.jsx';
import { PollAPI, VoteAPI } from "../services/poll.service.jsx";
import { Link } from 'react-router-dom';

const Poll = (props) => {

  const [pollId, setPollId] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([]);
  const [vote, setVote] = useState('');

  useEffect(() => {
    if (pollId) {
      PollAPI.get(pollId).then((response) => {
        setTitle(response.data.title || '');
        setDescription(response.data.description || '');
        setOptions(response.data.options_attributes || []);
      });
    }
  }, [pollId]);

  useEffect(() => {
    VoteAPI.get(pollId).then((response) => {
      const vote = response.data.vote;
      if (vote) {
        setVote(response.data.vote.option_id);
      }
    });
  }, [pollId]);

  if (!pollId && props.router.params.id) {
    setPollId(props.router.params.id);
  }

  const submitVote = (optionId, event) => {
    if (!event) return;
    setVote(optionId);
    VoteAPI.create({ pollId, optionId }).then(() => {
      props.router.navigate(`/polls/${pollId}`);
    });
  }

  return (
    pollId && (
      <div className="space-y-12" >
        <Link to={"/polls"} className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight ">&laquo; Back to Polls</Link>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <div className="text-lg">
                {title}
                <span className='ml-2 text-sm'>
                  [<Link to={`/polls/${pollId}/edit`}>edit poll</Link>]
                </span>
              </div>
              <div className="mt-2 mb-4">
                {description}
              </div>
            </div>
            <div className="col-span-full">
              <ul className='list-group'>
                {options.map((option, index) => (
                  <li className="py-1 text-lg" key={index}>
                    <input id={`option_${option.id}`} type="radio" name="option" value={option.id} checked={vote == option.id} onChange={(event) => submitVote(option.id, event)} />
                    <label htmlFor={`option_${option.id}`} className='m-3'>{option.text}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default withRouter(Poll);