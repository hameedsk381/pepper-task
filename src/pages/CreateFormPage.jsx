import React, { useState } from 'react';
import './CreateFormPage.css'; 
import Loader from '../components/Loader';


const CreateFormPage = () => {
    const [formFields, setFormFields] = useState([]);
    const [formTitle, setFormTitle] = useState('');
    const [loading,setLoading] = useState(false);
    const [err,setErr] = useState('');
    const addFormField = (fieldType) => {
        if (formFields.length >= 20) {
            alert('Maximum of 20 input fields allowed.');
            return;
        }
        setFormFields([...formFields, { type: fieldType, label: '', placeholder: '' }]);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        const formData = { title: formTitle, fields: formFields };
    
        try {
            const response = await fetch('http://localhost:3000/api/forms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const result = await response.json();
    
            if (!response.ok) {
                if (response.status === 409 && result.message.includes("20 forms limit")) {
                    alert('Maximum limit of 20 forms reached.');
                } else {
                    throw new Error(result.message || 'Form submission failed');
                }
            } else {
                alert('Form is successfully created!');
                setFormTitle('');
                setFormFields([]);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
            setErr(true)
        } finally {
            setLoading(false);
        }
    };
    
    
    

    const updateField = (index, key, value) => {
        const newFields = [...formFields];
        newFields[index][key] = value;
        setFormFields(newFields);
    };
    
if(err){
    return <p>Something went wrong </p>
}
if(loading){
    return <Loader/>

}
    return (
        <div className="create-form-container">
            <h1>Create a New Form</h1>
            <input 
                type="text"
                placeholder="Form Title"
                value={formTitle}
                onChange={(event) => setFormTitle(event.target.value)}
                className="form-title-input"
            />
            <div className="field-buttons">
                <button type="button" onClick={() => addFormField('text')}>Add Text Field</button>
                <button type="button" onClick={() => addFormField('email')}>Add Email Field</button>
                <button type="button" onClick={() => addFormField('password')}>Add Password Field</button>
            </div>
            <form onSubmit={handleFormSubmit} className="form-builder">
                {formFields.map((field, index) => (
                    <div key={index} className="form-field">
                        <input 
                            type="text"
                            placeholder={`Label for ${field.type} field`}
                            value={field.label}
                            onChange={(event) => updateField(index, 'label', event.target.value)}
                        />
                        <input 
                            type="text"
                            placeholder={`Placeholder for ${field.type} field`}
                            value={field.placeholder}
                            onChange={(event) => updateField(index, 'placeholder', event.target.value)}
                        />
                    </div>
                ))}
                <button type="submit" className="submit-form">Save Form</button>
            </form>
        </div>
    );
};

export default CreateFormPage;
