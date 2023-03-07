const usersSchema = {
  username: 'string',
  password: 'string',
  email: 'string',
  role: 'string',
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
};

const tourDatesSchema = {
  venue: 'string',
  location: 'string',
  date: 'timestamp',
  pricing: [
    {
      tierName: 'string',
      price: 'number',
      quantity: 'number',
    },
  ],
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
};

const schedulesSchema = {
  title: 'string',
  description: 'string',
  startTime: 'timestamp',
  endTime: 'timestamp',
  timezone: 'string',
  attendees: 'number',
  maxAttendees: 'number',
  pricing: 'number',
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
};

const superUserStatisticsSchema = {
  totalVideos: 'number',
  totalViews: 'number',
  averageViews: 'number',
  highestViewed: 'number',
  videoId: 'reference',
  totalAttendees: 'number',
  averageAttendees: 'number',
  highestAttendees: 'number',
  streamId: 'reference',
  earnings: 'number',
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
};

const transactionsSchema = {
  userId: 'reference',
  amount: 'number',
  streamId: 'reference',
  tourId: 'reference',
  paymentType: 'string',
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
};

const videosSchema = {
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
