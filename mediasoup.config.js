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
        mimeType: 'video/VP8',
        clockRate: 90000,
        parameters: {
          'x-google-start-bitrate': 1000,
        },
      },
    ],
    // Use a single transport for all consumers
    webRtcOptions: {
      listenIps: [
        {
          ip: '127.0.0.1', // allows remote connections from anywhere -- change to '0.0.0.0' when you add your public ip
          // announcedIp: '<your_public_ip>', // - run 'curl ifconfig.me'  for publicIp
        },
      ],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
      maxIncomingBitrate: 1500000, // 1.5 Mbps
      initialAvailableOutgoingBitrate: 1000000, // 1 Mbps
    },
  },
};
