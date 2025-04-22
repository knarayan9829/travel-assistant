import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './Form.css';

const Form = ({ onComplete }) => {
  const { setUserData } = useContext(UserContext);
  const [form, setForm] = useState({
    name: '',
    age: '',
    destination: '',
    dates: '',
    companions: '',
    budget: '',
    interests: '',
    accessibility: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(form);
    onComplete();
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {/* Name */}
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
      </div>

      {/* Age + Destination */}
      <div className="form-row two-cols">
        <div className="form-field small">
          <label htmlFor="age">Age</label>
          <input name="age" value={form.age} onChange={handleChange} required />
        </div>
        <div className="form-field large">
          <label htmlFor="destination">Destination</label>
          <input name="destination" value={form.destination} onChange={handleChange} required />
        </div>
      </div>

      {/* Dates */}
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="dates">Dates</label>
          <input name="dates" value={form.dates} onChange={handleChange} required />
        </div>
      </div>

      {/* Companions */}
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="companions">Companions</label>
          <input name="companions" value={form.companions} onChange={handleChange} required />
        </div>
      </div>

      {/* Interests */}
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="interests">Interests</label>
          <input name="interests" value={form.interests} onChange={handleChange} required />
        </div>
      </div>

      {/* Accessibility */}
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="accessibility">Accessibility</label>
          <input name="accessibility" value={form.accessibility} onChange={handleChange} required />
        </div>
      </div>

      {/* Budget + Button */}
      <div className="form-row two-cols">
        <div className="form-field large">
          <label htmlFor="budget">Budget</label>
          <input name="budget" value={form.budget} onChange={handleChange} required />
        </div>
        <div className="form-field small">
          <label>&nbsp;</label>
          <button type="submit" className="submit-button">Start Now</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
