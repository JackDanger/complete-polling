import { useState, useEffect } from 'react';
import PollDataService from "../services/poll.service.jsx";
import Option from "./Option.jsx";
import { withRouter } from '../common/with-router.jsx';

function PollForm(props) {

  const [selectedPollId, setSelectedPollId] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedPollId) {
      PollDataService.get(selectedPollId).then((response) => {
        const { title, description } = response.data;
        setTitle(title);
        setDescription(description);

        let options = response.data.options_attributes;
        // Ensure there's at least 4 options
        for (let i = options.length; i < 4; i++) {
          options[i] = {text: ""};
        };
        setOptions(options);

        setIsEditing(true);
      });
    }
  }, [selectedPollId]);

  if (!selectedPollId && props.router.params.id) {
    setSelectedPollId(props.router.params.id);
  }

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = { text: event.target.value };
    setOptions(newOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const pollData = { title, description, options_attributes: options };

    try {
      if (isEditing) {
        await PollDataService.update(selectedPollId, pollData);
      } else {
        await PollDataService.create(pollData);
      }
      // Reset form
      resetForm();
    } catch (error) {
      console.error('There was an error saving the poll:', error);
    }
  };

  const handleDeletePoll = async () => {
    if (window.confirm('Are you sure you want to delete this poll?')) {
      try {
        await PollDataService.delete(selectedPollId);
        props.router.navigate('/polls');
        console.log('Poll deleted successfully!');
        resetForm();
      } catch (error) {
        console.error('Failed to delete the poll:', error);
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setOptions([{ text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </div>

      <div>
        {options.map((option, index) => (
          <Option edit={true} key={index} index={index} text={option.text} onChange={(event) => handleOptionChange(index, event)} />
        ))}
      </div>

      <button type="submit">{isEditing ? 'Update Poll' : 'Create Poll'}</button>
      {isEditing && (
        <button type="button" onClick={handleDeletePoll}>Delete Poll</button>
      )}
    </form>
  );
}

export default withRouter(PollForm);