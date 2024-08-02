// src/components/PropertyEditForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';

const PropertyEditForm = ({ property }) => {
  const [formData, setFormData] = useState(property);

  useEffect(() => {
    setFormData(property);
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFinancialChange = (e, key) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      financials: {
        ...formData.financials,
        [key]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/properties/${formData._id}`, formData);
      alert('Property updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update property');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Edit Property</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Composition"
              name="composition"
              value={formData.composition}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Build Info"
              name="buildInfo"
              value={formData.buildInfo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Purchase Price"
              name="purchasePrice"
              value={formData.financials.purchasePrice}
              onChange={(e) => handleFinancialChange(e, 'purchasePrice')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Sale Price"
              name="salePrice"
              value={formData.financials.salePrice}
              onChange={(e) => handleFinancialChange(e, 'salePrice')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Unlevered IRR EM"
              name="unleveredIRREM"
              value={formData.financials.unleveredIRREM}
              onChange={(e) => handleFinancialChange(e, 'unleveredIRREM')}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PropertyEditForm;
