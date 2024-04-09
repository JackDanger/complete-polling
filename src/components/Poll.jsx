import { useEffect, useState } from 'react';
import { withRouter } from '../common/with-router.jsx';
import PollDataService from "../services/poll.service.jsx";
import { Link } from 'react-router-dom';
import Option from "./Option";

const Poll = (props) => {

  const [pollId, setPollId] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (pollId) {
      PollDataService.get(pollId).then((response) => {
        setTitle(response.data.title || '');
        setDescription(response.data.description || '');
        setOptions(response.data.options_attributes || []);
      });
    }
  }, [pollId]);

  if (!pollId && props.router.params.id) {
    setPollId(props.router.params.id);
  }

  return (
    pollId && (
      <div>
        <Link to={"/polls"}>Back to Polls</Link>
        <div>
          <h2>{title}</h2>
          <small><Link to={`/polls/${pollId}/edit`}>Edit</Link></small>
        </div>
        <div>
          {description}
        </div>
        {(options).map((option, index) => (
          <Option id={option.id} text={option.text} index={index} pollId={pollId} />
        ))}
      </div>
    )
  );
}

export default withRouter(Poll);