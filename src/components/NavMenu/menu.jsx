import React, { useState,useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControl from '@mui/material/FormControl';
import { Form } from 'react-bootstrap';
import { HtmlEdit } from '../../components/content/HtmlContent/HtmlContent';
import './Menu.scss';
import apiClient from '../../services/AxiosApi';

export const Menu = (props) => {
  // Options for the dropdown
  const options = [
    {
      id: 2,
      name: 'File',
    },
    {
      id: 3,
      name: 'Link',
    },
    {
      id: 4,
      name: 'HTML',
    },
  ];

  // Initialize state for selected option and form data
  const [selectedOption, setSelectedOption] = useState('');
  const [datamenu, setdatamenu] = useState({
    id:1,
    menuName: '',
    contentType: '',
    uploadFile: '',
    uploadLink: '',
    uploadHtml: '',
  });

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedOption(event.target.value)
    setdatamenu((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle option selection changes
  // const handleOptionChange = (event) => {
  //   debugger
  //   setSelectedOption(event.target.value);
  // };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend ={
        ...datamenu,
        contentType: parseInt(selectedOption, 10),
      };
      const response = await apiClient.post('/demo', formDataToSend,{ headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to handle file uploads
      },});

      if (response.status === 200) {
        toast.success('Data submitted successfully!');
        // Clear form fields and selected option on success
        setdatamenu({
          menuName: '',
          contentType: '',
          uploadFile: '',
          uploadLink: '',
          uploadHtml: '',
        });
        setSelectedOption('');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Something went wrong');
    }
  };
  console.log(datamenu)
  return (
    <div className='MainMenuOption'>
      <Container>
        <form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label className='text-center' style={{ color: 'white' }}>
              Name
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Name'
              name='menuName'
              value={datamenu.menuName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='ContentType'>
            <div className='mb-12'>
              <Form.Label className='text-center' style={{ color: 'white' }}>
                Content Type
              </Form.Label>
              <div>
                <select
                  className='form-control'
                  name='contentType'
                  value={selectedOption}
                  onChange={handleChange}>
                  <option value=''>Select a content type</option>
                  {options.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>

                {selectedOption === '2' && (
                  <div>
                    <input
                      type='file'
                       name='uploadFile'
                      value={datamenu.uploadFile}
                      onChange={handleChange}
                    />
                  </div>
                )}
                {selectedOption === '3' && (
                  <div>
                    <input
                      type='text'
                      name='uploadLink'
                      value={datamenu.uploadLink}
                      onChange={handleChange}
                    />
                  </div>
                )}
                {selectedOption === '4' && (
                  <div>
                    <HtmlEdit
                      name='uploadHtml'
                      value={datamenu.uploadHtml}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </div> 
          </Form.Group>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </Container>
    </div>
  );
};
