import React, { useState, useEffect } from 'react';
import FormInput from '../common/FormInput.jsx';
import { collection, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../config/firebaseFE';

const initialFormValues = {
  title: 'string',
  description: 'string',
  event: 'string',
  eventDate: 'string',
  videoLength: 'number',
  views: 'number',
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
  url: 'string',
};

export default function AddVideoForm() {
  const [formInput, setFormInput] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const resetInput = () => {
    handleInputChange({
      title: '',
      description: '',
      event: '',
      eventDate: '',
      videoLength: 0,
      views: 0,
      url: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const videosCollection = collection(db, 'videos');
    const newObj = {
      ...formInput,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await addDoc(videosCollection, newObj);
    resetInput();
  };

  return (
    <form
      aria-label="form"
      onSubmit={handleSubmit}
      className='max-w-screen'
    >
      <FormInput
        labelText="url"
        type="url"
        name="url"
        value={formInput.url}
        placeholder="add URL here"
        onChange={handleInputChange}
      />
      <FormInput
        labelText="videoLength"
        type="number"
        name="videoLength"
        value={formInput.videoLength}
        placeholder="add video length here"
        onChange={handleInputChange}
      />
      <FormInput
        labelText="description"
        type="text"
        name="description"
        value={formInput.description}
        placeholder="add description here"
        onChange={handleInputChange}
      />
      <FormInput
        labelText="event"
        type="text"
        name="event"
        value={formInput.event}
        placeholder="add event name here"
        onChange={handleInputChange}
      />
      <FormInput
        labelText="views"
        type="number"
        name="views"
        value={formInput.views}
        placeholder="add number of views here"
        onChange={handleInputChange}
      />
      <FormInput
        labelText="eventDate"
        type="date"
        name="eventDate"
        value={formInput.eventDate}
        placeholder="add event date here"
        onChange={handleInputChange}
      />
      <button type="submit">add video</button>
    </form>
  );
}
