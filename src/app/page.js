'use client'; // This is required for components that need client-side rendering like chart

import { useEffect, useState } from 'react';
import RiskBar from '../components/RiskBar';

// Mock function to mimic fetching data from an API
const fetchMockRiskData = () => {
  return new Promise((resolve) => {
    // Simulate a network delay
    setTimeout(() => {
      // Sample JSON data mimicking API response
      const sampleData = [
        { category: 'Market Maturity', score: 6.6 },
        { category: 'Market Situation', score: 6.3 },
        { category: 'Competitors', score: 5.7 },
        { category: 'Competition', score: 4.0 },
        { category: 'Customers', score: 5.3 },
      ];
      resolve(sampleData);
    }, 1000); // Simulate a 1-second delay
  });
};

export default function Home() {
  const [riskData, setRiskData] = useState([]);

  useEffect(() => {
    // Fetch mock data when the component mounts
    fetchMockRiskData().then((data) => {
      // Extract only the scores for the RiskBar component
      const scores = data.map((item) => item.score);
      setRiskData(scores);
    });
  }, []);

  return (
    <div>
      <h1>Risk Evaluation Dashboard</h1>
      {riskData.length > 0 ? (
        <RiskBar data={riskData} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

