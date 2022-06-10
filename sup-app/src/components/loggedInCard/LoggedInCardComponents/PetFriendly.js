import * as React from 'react';
import Checkbox from "./Checkbox";

// https://www.robinwieruch.de/react-checkbox/

const PetFriendly = () => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <div>
            <Checkbox
                label="PetFriendly?"
                value={checked}
                onChange={handleChange}
            />

            {/*<p>Is "My Value" checked? {checked.toString()}</p>*/}
        </div>
    );
};

export default PetFriendly;