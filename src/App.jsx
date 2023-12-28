import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateFormPage from './pages/CreateFormPage';
import EditFormPage from './pages/EditFormPage';
import ViewFormPage from './pages/ViewFormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form/create" element={<CreateFormPage />} />
        <Route path="/form/:id/edit" element={<EditFormPage />} />
        <Route path="/form/:id" element={<ViewFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
