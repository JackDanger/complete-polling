import { useState } from 'react';
import { withRouter } from '../common/with-router.jsx';
import PollDataService from "../services/poll.service.jsx";
import { Link } from 'react-router-dom';
import Option from "./Option";

const Poll = (props) => {

  const [state, setState] = useState(props);

  function onChangeTitle(e) {
    const title = e.target.value;

    setState({
      ...state,
      title: title
    });
  }

  function onChangeDescription(e) {
    const description = e.target.value;

    setState({
      ...state,
      description: description,
    });
  };
  function onChangeOption(index) {
    return (optionData) => {
      state.options[index] = optionData;
    }
  }

  function getPoll(id) {
    PollDataService.get(id)
      .then(response => {
        setState({ ...response.data })
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function updatePoll() {
    PollDataService.update(state.id, state)
      .then(response => {
        console.log(response.data);
        setState({
          ...state,
          message: "The poll was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  function deletePoll() {
    PollDataService.delete(state.id)
      .then(response => {
        console.log(response.data);
        props.router.navigate('/polls');
      })
      .catch(e => {
        console.log(e);
      });
  }

  if (!state.id && props.router.params.id) {
    getPoll(props.router.params.id);
  }

  return (
    props.edit ? (
      <div className="edit-form">
        <h4>Poll</h4>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={state.title}
              onChange={onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={state.description}
              onChange={onChangeDescription}
            />
          </div>
          <div>
            {(props.options).map((option, index) => (
              <Option index={index} edit={true} onChange={onChangeOption(index)} text={option.text} />
            ))}
          </div>
        </form>
        <button
          className="badge badge-danger mr-2"
          onClick={deletePoll}
        >
          Delete
        </button>

        <button
          type="submit"
          className="badge badge-success"
          onClick={updatePoll}
        >
          Update
        </button>
      </div>
    ) : (
      <div>
        <Link to={"/polls"}>Back to Polls</Link>
        <div>
          <h2>{props.title}</h2>
        </div>
        <div>
          {props.description}
        </div>
        {(props.options).map((props, index) => (
          <Option pollId={props.id} {...props.options} />
        ))}
      </div>
    )
  );
}

export default withRouter(Poll);