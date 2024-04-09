import { useState, useEffect } from 'react';
import { withRouter } from '../common/with-router.jsx';
import PollDataService from "../services/poll.service.jsx";
import { Link } from 'react-router-dom';
import Option from "./Option";

function PollForm({ selectedPollId, onPollUpdated }) {
    const [state, setState] = useState()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['']);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedPollId) {
      PollDataService.get(selectedPollId).then((response) => {
        const { title, description, options } = response.data;
        setTitle(title);
        setDescription(description);
        setOptions(options.map(option => option.text));
        setIsEditing(true);
      });
    }
  }, [selectedPollId]);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  
  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']); 
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const pollData = { title, description, options };

    try {
      if (isEditing) {
        await PollDataService.update(selectedPollId, pollData);
        alert('Poll updated successfully!');
        onPollUpdated(); 
      } else {
        await PollDataService.create(pollData);
        alert('Poll created successfully!');
      }
      // Reset form
      resetForm();
    } catch (error) {
      console.error('There was an error saving the poll:', error);
      alert('Failed to save the poll.');
    }
  };

  const handleDeletePoll = async () => {
    if (window.confirm('Are you sure you want to delete this poll?')) {
      try {
        await PollDataService.delete(selectedPollId);
        alert('Poll deleted successfully!');
        resetForm();
        onPollUpdated(); // Callback to inform parent component about the deletion
      } catch (error) {
        console.error('Failed to delete the poll:', error);
        alert('Failed to delete the poll.');
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setOptions(['']);
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
        <label>Options</label>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              value={option}
              onChange={(event) => handleOptionChange(index, event)}
              required
            />
            {options.length > 1 && (
              <button type="button" onClick={() => handleRemoveOption(index)}>Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddOption}>Add Option</button>
      </div>

      <button type="submit">{isEditing ? 'Update Poll' : 'Create Poll'}</button>
      {isEditing && (
        <button type="button" onClick={handleDeletePoll}>Delete Poll</button>
      )}
    </form>
  );
}

export default PollForm;