import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import {
  getStreams,
  getFeatured,
} from '../../../redux/global';
import { FormInput, FormTextarea } from '../common';
import {
  createOrUpdate,
  post,
  remove,
  update,
} from '../../../api/firestore-services';

const initialForm = {
  eventName: '',
  description: '',
  startTime: '',
  date: '',
  endTime: '',
  maxAttendees: '',
  pricing: '',
};

export default function ScheduleStreams() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);
  const { streams, featuredStream } = useSelector(
    (state) => state.global,
  );
  const [formMode, setFormMode] = useState('Add');
  const [currStreamId, setCurrStreamId] = useState('');

  const dateConverter = (date) => {
    if (!date) return 'Date not available';
    const newDate = DateTime.fromISO(date);
    return newDate.toFormat('yyyy • MM • dd');
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const formHandler = async (e) => {
    e.preventDefault();

    const { maxAttendees, pricing, ...fields } = form;
    const payload = {
      maxAttendees: Number(maxAttendees),
      pricing: Number(pricing),
      ...fields,
      attendees: 0,
    };

    let res;
    if (formMode === 'Add') {
      payload.isAvailable = true;
      res = await post(payload, 'schedules');
    } else if (formMode === 'Update') {
      res = await update(
        currStreamId,
        payload,
        'schedules',
      );
    }
    if (res.success) {
      payload.isAvailable = form.isAvailable;
      setForm(initialForm);
      dispatch(getStreams());
      setFormMode('Add');
    }
  };

  const onSelectStream = (currStream) => {
    setFormMode('Update');
    setForm({
      eventName: currStream?.eventName,
      description: currStream?.description,
      startTime: currStream?.startTime,
      date: currStream?.date,
      endTime: currStream?.endTime,
      maxAttendees: currStream?.maxAttendees,
      pricing: currStream?.pricing,
      isAvailable: currStream?.isAvailable,
    });
    setCurrStreamId(currStream?.id);
  };

  const onRemoveStream = async (id) => {
    const res = await remove(id, 'schedules');
    if (res.success) {
      dispatch(getStreams());
    }
  };

  const setFeaturedStream = async () => {
    createOrUpdate('featured', {
      streamId: currStreamId,
    });
    dispatch(getFeatured());
  };

  useEffect(() => {
    Promise.all([
      dispatch(getStreams()),
      dispatch(getFeatured()),
    ]);
  }, []);

  const scheduleDisplay = (params) =>
    `${params?.eventName} (${dateConverter(
      params?.date,
    )} - ${params?.maxAttendees} Attendees): ${
      params?.isAvailable ? 'Open' : 'Closed'
    } `;

  return (
    <div className="md:max-w-3xl">
      {/* Streams section */}
      {streams?.length > 0 && <div>Current streams</div>}
      <ul className="divide-y divide-gray-200 text-sm mb-6">
        {streams.map((event) => (
          <li key={event?.id} className="flex py-2">
            <div className="w-full flex justify-between">
              <div className="flex gap-2 items-center">
                <p>{scheduleDisplay(event)}</p>
                {event?.id === featuredStream && (
                  <div className="border px-2 rounded-md">
                    Featured
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onSelectStream(event)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveStream(event?.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* Forms section */}
      <div className="mb-2 flex justify-between">
        <p>Add your next stream</p>
        {formMode === 'Update' && (
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => {
              setFormMode('Add');
              setCurrStreamId('');
              setForm(initialForm);
            }}
          >
            Add new
          </button>
        )}
      </div>
      <form aria-label="form" onSubmit={formHandler}>
        {formMode === 'Update' && (
          <div className="flex items-start justify-between">
            <div>
              <p>Currently displaying</p>
              <select
                value={form.isAvailable ? 'yes' : 'no'}
                className="w-20"
                onChange={(e) =>
                  setForm({
                    ...form,
                    isAvailable: e.target.value === 'yes',
                  })
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <button
              type="button"
              onClick={setFeaturedStream}
            >
              Set as featured
            </button>
          </div>
        )}
        <FormInput
          labelText="Event"
          type="text"
          name="eventName"
          value={form.eventName}
          placeholder="Enter event name"
          onChange={handleInput}
        />
        <FormTextarea
          labelText="Description"
          name="description"
          value={form.description}
          placeholder="Describe livestream event"
          onChange={handleInput}
        />
        <FormInput
          labelText="Date"
          type="date"
          name="date"
          value={form.date}
          placeholder="Enter date"
          onChange={handleInput}
        />
        <div className="flex gap-2 justify-end">
          <div className="w-1/4">
            <FormInput
              labelText="Start time"
              type="time"
              name="startTime"
              value={form.startTime}
              placeholder="Enter start time"
              onChange={handleInput}
            />
          </div>
          <div className="w-1/4">
            <FormInput
              labelText="End time"
              type="time"
              name="endTime"
              value={form.endTime}
              placeholder="Enter end time"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <div className="w-1/4">
            <FormInput
              labelText="Max attendees"
              type="number"
              name="maxAttendees"
              value={form.maxAttendees}
              placeholder="Capacity"
              onChange={handleInput}
            />
          </div>
          <div className="w-1/4">
            <FormInput
              labelText="Pricing"
              type="number"
              name="pricing"
              value={form.pricing}
              placeholder="Enter price"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <input
            type="submit"
            value={formMode}
            className="cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
