import React, { useState, useEffect } from 'react';
import {
  collection, doc, addDoc, serverTimestamp,
} from 'firebase/firestore';
import FormInput from '../common/FormInput.jsx';
import FormTextarea from '../common/FormTextarea.jsx';
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
    <div className="md:max-w-xl">
      <form
        aria-label="form"
        onSubmit={handleSubmit}
      >
        <FormInput
          labelText="Title"
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
        <FormTextarea
          labelText="Description"
          type="text"
          name="description"
          value={formInput.description}
          placeholder="add description here"
          onChange={handleInputChange}
        />
        <FormInput
          labelText="Event Name"
          type="text"
          name="event"
          value={formInput.event}
          placeholder="add event name here"
          onChange={handleInputChange}
        />
        <FormInput
          labelText="Event Date"
          type="date"
          name="eventDate"
          value={formInput.eventDate}
          placeholder="add event date here"
          onChange={handleInputChange}
        />
        <div className="flex flex-wrap gap-2">
          <FormInput
            labelText="views"
            type="number"
            name="views"
            value={formInput.views}
            placeholder="add number of views here"
            onChange={handleInputChange}
          />
          <div className="flex-grow">
            <FormInput
              labelText="Video Length"
              type="number"
              name="videoLength"
              value={formInput.videoLength}
              placeholder="add video length here"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit">Add video</button>
      </form>
    </div>
  );
}
