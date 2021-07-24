import React, { useState } from "react";

const Checkbox = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([]);
    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c); // return first index or -1
        const newCheckedCategoryId = [...checked];
        if(currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    }
    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <div className="form-check">
                <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id) === -1} type="checkbox" className="form-check-input" />
                <label className="form-check-label">{c.name}</label>
            </div>
        </li>
    ))
}

export default Checkbox;