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

  const handleFinancialChange = (e, field, index = null) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      const updatedFinancials = { ...prevData.financials };
  
      if (index !== null) {
        updatedFinancials[field][index] = value;
      } else {
        updatedFinancials[field] = value;
      }
  
      return {
        ...prevData,
        financials: updatedFinancials,
      };
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://syc-admin-backend.vercel.app/properties/${formData._id}`, formData);
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
              label="Number of Shares"
              name="shares"
              value={formData.financials.shares}
              onChange={(e) => handleFinancialChange(e, 'shares')}
            />
          </Grid>
          <Grid item xs={12} className='p-2 '>
          <p>
          Price per share: 
          {(formData.financials.purchasePrice/formData.financials.shares).toFixed()}
          </p>
          </Grid>
          <Grid item xs={12}>
          <TextField
            fullWidth
            label="Exit Yield"
            name="exitYield"
            value={formData.financials.exitYield}
            onChange={(e) => handleFinancialChange(e, 'exitYield')}
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
          {formData.financials.rentalIncome.map((income, index) => (
          <Grid item xs={6} md={4} key={index}>
            <TextField
              fullWidth
              label={`Rental Income ${index + 1}`}
              name={`rentalIncome-${index}`}
              value={income}
              onChange={(e) => handleFinancialChange(e, 'rentalIncome', index)}
            />
          </Grid>
        ))}

        {formData.financials.unleveredCFs.map((cf, index) => (
          <Grid item xs={6} md={4} key={index}>
            <TextField
              fullWidth
              label={`Unlevered CF ${index + 1}`}
              name={`unleveredCFs-${index}`}
              value={cf}
              onChange={(e) => handleFinancialChange(e, 'unleveredCFs', index)}
            />
          </Grid>
        ))}

        {formData.financials.yieldOnCost.map((yieldCost, index) => (
          <Grid item xs={6} md={4} key={index}>
            <TextField
              fullWidth
              label={`Yield on Cost ${index + 1}`}
              name={`yieldOnCost-${index}`}
              value={yieldCost}
              onChange={(e) => handleFinancialChange(e, 'yieldOnCost', index)}
            />
          </Grid>
        ))}
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
