const Option = (props) => {
    const { edit, onChange } = props;

    return (
        edit ? (
            <input
                type="text"
                className="form-control"
                id={`option_${props.index}`}
                key={props.index}
                value={props.text}
                onChange={onChange}
            />
        ) : (
            <li className="list-group-item" key={props.index} >
                {props.text}
            </li>
        )
    );
}

export default Option;