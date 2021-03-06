import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getCategories, list } from './apiCore';
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

    const searchData = () => {
        if(search) {
            list({search: search || undefined, category: category}).then(response => {
                if(response.error) {
                    console.log(response.error);
                } else {
                    setData({...data, results: response, searched: true})
                }
            })
        }
    }

    const searchSubmit = (event) => {
        event.preventDefault();
        searchData();
    }

    const handleChange = name => event => {
        setData({...data, [name]: event.target.value, searched: false})
    }

    const searchMessage = (searched, results) => {
        if(searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if(searched && results.length < 1) {
            return `No product found`;
        }
    }

    const searchProducts = (results = []) => {
        return (
            <div>
                <h2 className="mb-4">{searchMessage(searched, results)}</h2>
                <div className="row">
                    {results.map((product, i) => (<Card key={i} product={product} />) )}
                </div>
            </div>
        )
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div className="input-group input-group-lg">
                <div className="input-group-text">
                    <select className="btn mr-2" onChange={handleChange('category')}>
                        <option value="All">All</option>
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
            <div className="container-fluid mb-4 mt-5">{searchProducts(results)}</div>
        </div>
    )
}

export default Search;