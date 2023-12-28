import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ViewFormPage.css';
import Loader from '../components/Loader';

const ViewFormPage = () => {
    const { id } = useParams();
    const [form, setForm] = useState({ title: '', fields: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/forms/${id}`);
                if (!response.ok) {
                    throw new Error('Could not fetch form data');
                }
                const formData = await response.json();
                setForm(formData);
                setIsLoading(false);
            } catch (error) {
                console.error('Fetch Error:', error);
            }
        };

        fetchForm();
    }, [id]);

    if (isLoading) {
        return <Loader/>; 
    }

    return (
        <div className="view-form-container">
            <h1>{form.title}</h1>
            <form className="form-display">
                {form.fields.length!==0 ?form.fields.map((field, index) => (
                    <div key={index} className="form-field">
                        <label>{field.label}</label>
                        <input type={field.type} placeholder={field.placeholder} readOnly />
                    </div>
                )):<p>no inputs to display</p>}
               <button type="submit" className="submit-form">Submit Form</button>
            </form>
        </div>
    );
};

export default ViewFormPage;
