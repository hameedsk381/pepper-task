import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditFormPage.css'; 

const EditFormPage = () => {
    const { id } = useParams();
    const [formFields, setFormFields] = useState([]);
    const [formTitle, setFormTitle] = useState('');

    useEffect(() => {
        
        const fetchForm = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/forms/${id}`);
                if (!response.ok) {
                    throw new Error('Could not fetch form data');
                }
                const formData = await response.json();
                setFormTitle(formData.title);
                setFormFields(formData.fields);
            } catch (error) {
                console.error('Fetch Error:', error);
            }
        };
        fetchForm();
    }, [id]);

    const addFormField = (fieldType) => {
        setFormFields([...formFields, { type: fieldType, label: '', placeholder: '' }]);
    };

    const deleteFormField = (index) => {
        const updatedFields = formFields.filter((_, idx) => idx !== index);
        setFormFields(updatedFields);
    };
    

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const updatedFormData = { title: formTitle, fields: formFields };

        try {
            const response = await fetch(`http://localhost:3000/api/forms/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFormData)
            });
            if (!response.ok) {
                throw new Error('Form update failed');
            }
            alert('Form updated successfully');
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    const updateField = (index, key, value) => {
        const updatedFields = [...formFields];
        updatedFields[index] = { ...updatedFields[index], [key]: value };
        setFormFields(updatedFields);
    };

    return (
        <div className="edit-form-container">
            <h1>Edit Form: {formTitle}</h1>
            <form onSubmit={handleFormSubmit} className="form-editor">
                <input 
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="form-title-input"
                />
                {formFields.length!== 0 ? formFields.map((field, index) => (
                    <div key={index} className="form-field">
                        <input 
                            type="text"
                            value={field.label}
                            onChange={(e) => updateField(index, 'label', e.target.value)}
                        />
                        <input 
                            type="text"
                            value={field.placeholder}
                            onChange={(e) => updateField(index, 'placeholder', e.target.value)}
                        />
                        <button type="button" className='update-form' onClick={() => deleteFormField(index)}>Delete Field</button>
                    </div>
                )) : <p>no inputs to display</p>}
                <div className="field-buttons">
                    <button type="button" onClick={() => addFormField('text')}>Add Text Field</button>
                    <button type="button" onClick={() => addFormField('email')}>Add Email Field</button>
                    <button type="button" onClick={() => addFormField('password')}>Add Password Field</button>
                </div>
                <button type="submit" className="update-form">Update Form</button>
            </form>
        </div>
    );
};

export default EditFormPage;
