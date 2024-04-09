import { useEffect, useState } from 'react';
import { withRouter } from '../common/with-router.jsx';
import { PollAPI } from "../services/poll.service.jsx";

function PollForm(props) {

  const [selectedPollId, setSelectedPollId] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([{ text: ''}, { text: ''}, { text: ''}, { text: '' }]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedPollId) {
      PollAPI.get(selectedPollId).then((response) => {
        const { title, description } = response.data;
        setTitle(title);
        setDescription(description);

        let options = response.data.options_attributes;
        // Ensure there's at least 4 options
        for (let i = options.length; i < 4; i++) {
          options[i] = { index: i, text: "" };
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

  const handleOptionChange = (index, id, event) => {
    const newOptions = [...options];
    newOptions[index] = { id: id, index: index, text: event.target.value };
    setOptions(newOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const pollData = { title, description, options_attributes: options };

    try {
      if (isEditing) {
        await PollAPI.update(selectedPollId, pollData);
        props.router.navigate(`/polls/${selectedPollId}`);
      } else {
        const created = await PollAPI.create(pollData);
        console.log(created);
        props.router.navigate(`/polls/${created.data.id}`);
      }
    } catch (error) {
      console.error('There was an error saving the poll:', error);
    }
  };

  const handleDeletePoll = async () => {
    if (window.confirm('Are you sure you want to delete this poll?')) {
      try {
        await PollAPI.delete(selectedPollId);
        props.router.navigate('/polls');
        console.log('Poll deleted successfully!');
      } catch (error) {
        console.error('Failed to delete the poll:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10">
          <div className="mt-10 grid grid-cols-12 gap-x-2 gap-y-3 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                <h2 className="text-base font-semibold leading-7 text-gray-900 placeholder">
                  Question
                </h2>
              </label>
              <div className="mt-2 mb-4">
                <input
                  className="text-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded border-0 shadow focus:outline-none focus:ring w-full"
                  id="title"
                  type="text"
                  placeholder='...?'
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </div>
              <p className="text-sm">This poll <a href="https://complete-labs.notion.site/Fullstack-a5fa78b61da44ac89da994fea2b2cbe0#:~:text=have%C2%A0a%C2%A0title%2C-,description,-%2C%C2%A0and%C2%A0a%C2%A0set">requires a description</a></p>
              <div className="mt-2 mb-4">
                <input
                  className="px-3 py-3 text-sm placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded border-0 shadow focus:outline-none focus:ring w-full"
                  id="description"
                  type="text"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
              </div>
            </div>
            <div className="col-span-full">
              <h2 className="text-base my-4 font-semibold leading-7 text-gray-900">Options</h2>
              <div className='grid grid-flow-row auto-rows-auto gap-0'>
                {options.map((option, index) => (
                  <div key={index} className="mt-2 mb-4">
                    <input
                      className="w-full placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded border-1 shadow focus:outline-none focus:ring w-full"
                      type="text"
                      id={`option_${index}`}
                      value={option.text}
                      onChange={(event) => handleOptionChange(index, option.id, event)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='flex'>
          <button className="flex bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">{isEditing ? 'Update Poll' : 'Create Poll'}</button>
          {isEditing && (
            <button className="flex bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={handleDeletePoll}>Delete Poll</button>
          )}
        </div>
      </div>
    </form>
  );
}

export default withRouter(PollForm);