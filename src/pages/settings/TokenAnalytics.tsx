import React from 'react';

interface TokenAnalyticsProps {
  apiKey: string;
}

const TokenAnalytics: React.FC<TokenAnalyticsProps> = ({ apiKey }) => {
  if (!apiKey) {
    return <div>No API Key entered, token analytics unavailable.</div>;
  }

  // Mock token data, replace with actual API call
  const mockTokenData = {
    usage: 15000,
    limit: 50000,
    remaining: 35000,
  };

  return (
    <div className="mt-4">
      <h4>Token Usage Analytics</h4>
      <p>Usage: {mockTokenData.usage} tokens</p>
      <p>Limit: {mockTokenData.limit} tokens</p>
      <p>Remaining: {mockTokenData.remaining} tokens</p>
    </div>
  );
};

export { TokenAnalytics };
