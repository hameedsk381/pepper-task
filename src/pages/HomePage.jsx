import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Loader from '../components/Loader';

const HomePage = () => {
    const [forms, setForms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/forms');
                if (!response.ok) {
                    throw new Error('Could not fetch forms');
                }
                const formsData = await response.json();
                setForms(formsData);
            } catch (error) {
                console.error('Fetch Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchForms();
    }, []);

    const handleDelete = async (formId) => {
        if (!window.confirm('Are you sure you want to delete this form?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/forms/${formId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Could not delete the form');
            }
            setForms(forms.filter(form => form._id !== formId));
        } catch (error) {
            console.error('Delete Errors:', error);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="home-container">
            <h1>Form Builder App</h1>
            <Link to="/form/create" className="create-form-link">Create New Form</Link>
            <div className="form-list">
                {forms.length!==0?forms.map(form => (
                    <div key={form._id} className="form-item">
                        <h2>{form.title}</h2>
                        <div className="form-actions">
                            <Link to={`/form/${form._id}`}>View</Link>
                            <Link to={`/form/${form._id}/edit`}>Edit</Link>
                            <button className='delete' onClick={() => handleDelete(form._id)}>Delete</button>
                        </div>
                    </div>
                )):<p>No forms to display</p>}
            </div>
        </div>
    );
};

export default HomePage;
