import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.css';
import apiClient from '../../services/AxiosApi'
import api from '../../utils/apiUrl.json';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import apis from '../../Apis/apis';

export function New() {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    address: '',
    usertype: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.mobile_no) {
      errors.mobile_no = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile_no)) {
      errors.mobile_no = "Invalid mobile number format";
    }

    if (!formData.address) {
      errors.address = "Address is required";
    }

    if (!selectedRole) {
      errors.usertype = "Role is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formDataToSend ={
        ...formData,
        usertype: parseInt(selectedRole, 10),
      };

      const response = await apiClient.post(api.newuser, formDataToSend); // Replace with your API endpoint
      if (response.status === 200) {
        toast.success('Data submitted successfully!');
        setFormData({
          name: '',
          email: '',
          mobile_no: '',
          address: '',
          usertype: '',
        });
        setSelectedRole('');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    const fetchRoles = async (data) => {
      try {
        const response = await apiClient.get(api.getUserType); // Replace with your API endpoint for roles
        setDropdownOptions(response.data);

      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);
  console.log(formData)
  return (
    <>
     <div>
      <div className="home">
        <Sidebar className='nav' style={{}} />
        <div className="homeContainer">
          <Navbar />
          <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
              <Col md={10} lg={6} xs={12}>
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-4 text-center text-uppercase ">
                      User Details
                    </h2>
                    <div className="mb-3">
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Label className="text-center">Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!formErrors.name}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.name}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Label className="text-center">E-mail</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!formErrors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.name}
                          </Form.Control.Feedback>
                        </Form.Group> <Form.Group className="mb-3" controlId="Name">
                          <Form.Label className="text-center">Mobile No.</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Mobile No."
                            name="mobile_no"
                            value={formData.mobile_no}
                            onChange={handleChange}
                            isInvalid={!!formErrors.mobile_no}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.name}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Label className="text-center">Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            isInvalid={!!formErrors.address}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.name}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Usertype">
                          <div className="mb-12">
                            <Form.Label className="text-center">Role</Form.Label>
                            <select
                              className='form-control'
                              name='usertype'
                              value={selectedRole}
                              onChange={handleRoleChange}
                              isInvalid={!!formErrors.usertype}
                            >
                              <option value=''>Select a role</option>
                              {dropdownOptions.map((data) => (
                                <option key={data.users_id} value={data.users_id}>
                                  {data.user_name}
                                </option>
                              ))}
                            </select>
                            <Form.Control.Feedback type="invalid">
                              {formErrors.usertype}
                            </Form.Control.Feedback>
                          </div>
                        </Form.Group>

                        <div id="button" className="d-flex">
                          <Button variant="primary" type="submit" style={{ width: 100 }}>
                            Submit
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      </div>
    </>
  );
}

export default New;
