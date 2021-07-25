import React, { Fragment, useState } from 'react';

const RadioBox = ({prices}) => {
    const [value, setValue] = useState(0);
    const handleChange = () => {
        
    }

    return prices.map((p, i) => (
        <div key={i}>
            <div className="form-check">
                <input onChange={handleChange} value={p._id} type="radio" className="mr-2 ml-4" />
                <label className="form-check-label">{p.name}</label>
            </div>
        </div>
    ))
}

export default RadioBox;