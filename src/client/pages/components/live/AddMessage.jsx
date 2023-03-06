import React, { useState } from 'react';
import FormInput from '../common/FormInput.jsx';

const initialFormInput = {
  name: 'Brooks Garth',
  body: '',
};

export default function AddMessage({ handleMessage }) {
  const [formInput, setFormInput] = useState(initialFormInput);

  const clearForm = () => {
    setFormInput(initialFormInput);
  };

  const handleInputChange = () => {
    setFormInput({
      ...formInput,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleMessage(formInput);
        clearForm();
      }}
    >
      <div>
        <FormInput
          type="text"
          name="body"
          value={formInput.body}
          placeholder="Message here"
          onChange={handleInputChange}
        />
        <input type="submit" value="Post"></input>
      </div>
    </form>
  );
}
