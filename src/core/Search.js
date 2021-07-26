import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getCategories, getProducts } from './apiCore';
import Card from './Card';

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const {categories, category, search, results, searched} = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setData({...data, categories: data})
            }
        })
    }

    useEffect(() => {
        loadCategories()
    }, []);

    const searchSubmit = (event) => {
        //
    }

    const handleChange = name => event => {
        //
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div className="input-group input-group-lg">
                <div className="input-group-text">
                    <select className="btn mr-2" onChange={handleChange('category')}>
                        <option value="All">Pick Category</option>
                        {categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                    </select>
                </div>
                <input type="search" className="form-control" onChange={handleChange('search')} placeholder="Search by name" />
                <div className="input-group-text" style={{border: 'none'}}>
                    <button className="input-group-text">Search</button>
                </div>
            </div>
        </form>
    )

    return (
        <div className="row">
            <div className="container mb-4 mt-5">{searchForm()}</div>
        </div>
    )
}

export default Search;