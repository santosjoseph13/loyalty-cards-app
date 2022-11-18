const config = {
  DB: {
    LOYALTY_TABLE: process.env.LOYALTY_TABLE,
    LOYALTY_TABLE_PK: process.env.LOYALTY_TABLE_PK,
    REGION: 'ap-southeast-1',
    TTL_SECONDS: 60 * 60 * 24 * 7, // 7 days
  },
};

module.exports = config;
