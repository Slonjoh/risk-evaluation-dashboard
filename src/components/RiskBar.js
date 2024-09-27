import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styled from 'styled-components';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

// Styled Components for the chart container and legend
const ChartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: #e6e0f8;
  padding: 20px;
  border-radius: 20px;

  // Responsive adjustments
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 60%;
  }
`;

const BarChart = styled(Bar)`
  .chart-bar:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
  border-radius: 20px;
  padding: 20px;
  flex: 1;

  // Responsive adjustments
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%; // Smaller height for tablets and phones
  }

  @media only screen and (max-width: 480px) {
    width: 50%;
    height: 100%; // Smaller height for phones
    margin-left: -44px;
  }
`;

// Styled component for the vertical legend
const VerticalLegend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  height: 631px;
  padding: 20px;
  border-left: 1px solid #ccc;
  margin-left: -15px;

  // Responsive adjustments
  @media only screen and (max-width: 768px) {
    border-left: 0px solid #ccc;
    margin-left: -30px;
  }

  @media only screen and (max-width: 480px) {
    border-left: 0px solid #ccc;
    margin-left: -53px;
  }
`;

const LegendItem = styled.div`
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #000;
  margin: inherit;
  line-height: 1.5;

  &.high-risk {
    color: #ff0000;
  }

  &.medium-risk {
    color: #ffcd56;
  }

  &.low-risk {
    color: #4bc0c0;
  }

  // Responsive adjustments
  @media only screen and (max-width: 768px) {
    font-size: 12px; // Slightly smaller font for tablets
    text-align: center; // Center align for better aesthetics on smaller screens
  }

  @media only screen and (max-width: 480px) {
    font-size: 11px; // Smaller font for phones
    line-height: 1.2; // Adjust line height to fit better
    text-align: center; // Center align on mobile for a balanced look
    margin: 10px 0; // Add some margin for spacing between items
  }
`;

const RiskBar = ({ data }) => {
  const chartData = {
    labels: ['Market Maturity', 'Market Situation', 'Competitors', 'Competition', 'Customers'],
    datasets: [
      {
        label: 'Risk Levels',
        data: data,
        // Apply different backgroundColor and borderColor based on risk value (score)
        backgroundColor: data.map((score) =>
          score >= 6.6 ? 'rgba(255, 0, 0, 0.8)' : score >= 5 ? 'rgba(255, 205, 86, 0.8)' : 'rgba(75, 192, 192, 0.8)'
        ),
        borderColor: data.map((score) =>
          score >= 6.6 ? 'rgb(255, 0, 0)' : score >= 5 ? 'rgb(255, 205, 86)' : 'rgb(75, 192, 192)'
        ),
        borderWidth: 1,
        borderRadius: 15,
        barPercentage: 0.4, // Adjust bar width
        categoryPercentage: 0.5, // Adjust space between bars
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false, // Allows chart to resize dynamically
    animation: {
      duration: 1000, // 1 second animation duration
      easing: 'easeInOutQuad', // Easing function for smoother animations
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Custom background for tooltips
        borderColor: '#fff', // Tooltip border color
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            // Custom tooltip label
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2); // Show values with 2 decimals
            }
            return label;
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#000',
        font: {
          weight: 'bold',
        },
        formatter: function (value) {
          return value.toFixed(1); // Display numbers with one decimal place
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10, // Set the maximum value of the y-axis to 10
        ticks: {
          stepSize: 1,
          color: '#000000', // Match label color to design
        },
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          display: true,
          color: '#000000',
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <ChartWrapper>
      <BarChart data={chartData} options={options} />
      <VerticalLegend>
        <LegendItem className="high-risk">
          High Risk
          <br />
          <span style={{ fontWeight: 'normal', color: '#000' }}>Strong need for innovation</span>
        </LegendItem>
        <LegendItem className="medium-risk">
          Medium Risk
          <br />
          <span style={{ fontWeight: 'normal', color: '#000' }}>Need for innovation</span>
        </LegendItem>
        <LegendItem className="low-risk">
          Low Risk
          <br />
          <span style={{ fontWeight: 'normal', color: '#000' }}>Low need for innovation</span>
        </LegendItem>
      </VerticalLegend>
    </ChartWrapper>
  );
};

export default RiskBar;
