const Option = (props) => {
    const { edit, onChange } = props;

    return (
        edit ? (
            <li className="list-group-item" key={props.index} >
                <input
                    type="text"
                    className="form-control"
                    id={`option_${props.index}`}
                    value={props.text}
                    onChange={onChange}
                />
            </li>
        ) : (
            <li className="list-group-item" key={props.index} >
                {props.text}
            </li>
        )
    );
}

export default Option;