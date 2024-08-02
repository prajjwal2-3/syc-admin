// src/components/PropertyTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const PropertyTable = ({ onSelectProperty }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Composition</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property._id}>
              <TableCell>{property.id}</TableCell>
              <TableCell>{property.address}</TableCell>
              <TableCell>{property.composition}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => onSelectProperty(property)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PropertyTable;
