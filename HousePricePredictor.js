// HousePricePredictor.js
import React, { useState } from 'react';
import './HousePricePredictor.css'; // Import the CSS file

const HousePricePredictor = () => {
  const [formData, setFormData] = useState({
    city: '',
    province: '',
    latitude: '',
    longitude: '',
    lease_term: '',
    type: '',
    beds: '',
    baths: '',
    sq_feet: '',
    furnishing: 'Unfurnished',
    smoking: '',
    pets: false,
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/predict_house_price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setPrediction(data.predicted_price);
    } catch (err) {
      console.error('Error fetching prediction:', err);
    }
  };

  return (
    <div className="predictor-container">
      
      <form onSubmit={handleSubmit} className="predictor-form">
      <h2> House Price Predictor</h2>
        {Object.entries(formData).map(([key, value]) => {
          if (key === 'furnishing') {
            return (
              <div key={key} className="form-group">
                <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <select
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="form-group input"
                >
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Partially Furnished">Partially Furnished</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                </select>
              </div>
            );
          } else if (key === 'pets') {
            return (
              <div key={key} className="form-group pet-checkbox">
                <label htmlFor={key}>I have a pet</label>
                <p/>
                <input type="checkbox" name={key} checked={value} onChange={handleChange} />
              </div>
            );
          } else {
            return (
              <div key={key} className="form-group">
                <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type={key === 'pets' ? 'checkbox' : 'text'}
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required={key !== 'pets'}
                  className="form-group input"
                />
              </div>
            );
          }
        })}
        <button type="submit" className="predict-button">
          Predict Price
        </button>
      </form>
      {prediction !== null && (
        <div className="prediction-result">
          Predicted Rent: ${prediction.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default HousePricePredictor;
