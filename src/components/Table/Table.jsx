import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import "./Table.css";
import EventForm from "../Event/form/EventForm";

const TableComponent = () => {
  const [eventRows, setEventRows] = useState([]);
  const [productRows, setProductRows] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorEvents, setErrorEvents] = useState(null);
  const [errorProducts, setErrorProducts] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEventRows(response.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setErrorEvents("Failed to load events data.");
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProductRows(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setErrorProducts("Failed to load product data.");
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <div className="Table">
      {/* Events Table */}
      <div className="table-header">
        <h3>Upcoming Events</h3>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          className="add-button"
        >
          Add Event
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="events table">
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell align="left">Event Time</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Place</TableCell>
              <TableCell align="left">Speaker</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingEvents ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : errorEvents ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {errorEvents}
                </TableCell>
              </TableRow>
            ) : (
              eventRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.eventName}</TableCell>
                  <TableCell align="left">{row.eventTime}</TableCell>
                  <TableCell align="left">{row.eventDate}</TableCell>
                  <TableCell align="left">{row.eventPlace}</TableCell>
                  <TableCell align="left">{row.speaker}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Product Inventory Table */}
      <h3>Product Inventory</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingProducts ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : errorProducts ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  {errorProducts}
                </TableCell>
              </TableRow>
            ) : (
              productRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.productName}</TableCell>
                  <TableCell align="left">{row.quantity}</TableCell>
                  <TableCell align="left">{row.category}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      
       <EventForm/>
    </div>
    
  );
};

export default TableComponent;




