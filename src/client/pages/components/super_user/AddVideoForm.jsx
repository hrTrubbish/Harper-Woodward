import React, { useState, useEffect } from 'react';
import FormInput from '../common/FormInput.jsx';
import { collection, doc, addDoc, serverTimestamp } from 'firebase/firestore';
// import { db } from '../../../../config/firebaseFE';
import { post } from '../../../api/firestore-services';

const initialFormValues = {
  title: '',
  description: '',
  event: '',
  eventDate: '',
  videoLength: '',
  views: '',
  createdAt: '',
  updatedAt: '',
  url: '',
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
    const payload = {
      ...formInput,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const res = await post(payload, 'videos');
    if (res.success) {
      setFormInput(initialFormValues);
      resetInput();
    }
  };

  return (
    <div className="w-1/3">
      <form
        aria-label="form"
        onSubmit={handleSubmit}
      >
        <FormInput
          labelText="title"
          type="text"
          name="title"
          value={formInput.title}
          placeholder="add video title here"
          onChange={handleInputChange}
        />
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
    </div>
  );
}
