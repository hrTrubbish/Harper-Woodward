import { DateTime } from 'luxon';

const convertToUTC = (timeInput) => {
  const timeValue = timeInput.value;

  const today = DateTime.local();
  const selectedTime = DateTime.fromFormat(timeValue, 'HH:mm:ss');

  const combined = today.set({
    hour: selectedTime.hour,
    minute: selectedTime.minute,
    second: selectedTime.second,
    millisecond: selectedTime.millisecond,
  }).toUTC();

  const timestamp = combined.toMillis();
  return timestamp;
};

export { convertToUTC };
