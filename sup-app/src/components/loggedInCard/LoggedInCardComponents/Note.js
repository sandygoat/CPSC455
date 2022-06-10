import { useState } from "react";
import "./Note.css"

// https://www.w3schools.com/react/react_forms.asp

function Note() {
    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${name}`);
    }

    return (
        <form>
            <label>Your Note:&nbsp;
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>&nbsp;
            <button onClick={handleSubmit}> Edit </button>
        </form>
    )
}

export default Note;