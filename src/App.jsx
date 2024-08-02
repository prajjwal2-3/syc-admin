// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Select, MenuItem } from '@mui/material';
import PropertyEditForm from './components/PropertyEditForm';

const App = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await axios.get('http://localhost:5000/properties');
      setProperties(response.data);
    };
    fetchProperties();
  }, []);

  const handlePropertyChange = (e) => {
    const property = properties.find((p) => p._id === e.target.value);
    setSelectedProperty(property);
  };

  return (
    <Container>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Select
        fullWidth
        value={selectedProperty?._id || ''}
        onChange={handlePropertyChange}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select a Property
        </MenuItem>
        {properties.map((property) => (
          <MenuItem key={property._id} value={property._id}>
            {property.address}
          </MenuItem>
        ))}
      </Select>
      {selectedProperty && <PropertyEditForm property={selectedProperty} />}
    </Container>
  );
};

export default App;
