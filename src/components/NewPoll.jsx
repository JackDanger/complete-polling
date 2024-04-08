import Poll from "./Poll";

const NewPoll = () => {
    const poll = {
        title: "",
        description: "",
        options: ["", "", "", ""]
    }
    return (
        <div>
            <h1>Create a poll</h1>
            <Poll edit={true} {...poll} />
        </div>
    );
}
export default NewPoll;