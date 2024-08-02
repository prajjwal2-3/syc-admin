// src/components/PropertyForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Paper } from '@mui/material';

const PropertyForm = ({ property, onSave }) => {
  const [formData, setFormData] = useState(property);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/properties/${formData._id}`, formData);
      onSave(response.data);
    } catch (error) {
      console.error('Error updating property', error);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="composition"
            label="Composition"
            value={formData.composition}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="buildInfo"
            label="Build Info"
            value={formData.buildInfo}
            onChange={handleChange}
          />
        </Grid>
        {/* Add other fields as needed */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PropertyForm;
