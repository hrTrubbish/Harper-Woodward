require('dotenv').config();

module.exports = {
  worker: {
    rtcMinPort: 10000,
    rtcMaxPort: 10009,
    logLevel: 'warn',
    logTags: [
      'info',
      'ice',
      'dtls',
      'rtp',
      'srtp',
      'rtcp',
      'rtx',
      'bwe',
      'score',
      'simulcast',
      'svc',
      'sctp',
    ],
  },
  router: {
    mediaCodecs: [
      {
        kind: 'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2,
      },
      {
        kind: 'video',
        mimeType: 'video/H264',
        clockRate: 90000,
        parameters:
          {
            'packetization-mode': 1,
            'profile-level-id': '640032',
            'level-asymmetry-allowed': 1,
            'max-bitrate': 6000000,
          },
      },
    ],
  },
  // Use a single transport for all consumers
  webRtcOptions: {
    listenIps: [
      {
        ip: '127.0.0.1', // allows remote connections from anywhere -- change to '0.0.0.0' when you add your public ip
        // announcedIp: <your_public_ip>, // - run 'curl ifconfig.me'  for publicIp
      },
    ],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
  },
};
