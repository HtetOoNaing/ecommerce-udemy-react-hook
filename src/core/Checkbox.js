import React, { useState } from "react";

const Checkbox = ({categories}) => {
    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <div className="form-check">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label">{c.name}</label>
            </div>
        </li>
    ))
}

export default Checkbox;