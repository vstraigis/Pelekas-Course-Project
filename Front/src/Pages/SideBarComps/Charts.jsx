import React, { useEffect, useState } from 'react';
import '../css/Charts.css';
import 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(ArcElement, Tooltip, Legend);

const TotalTripsChart = ({ userId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/trips`, {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const data = await response.json();

        const labels = [];
        const counts = [];
        const colors = [];

        data.forEach((trip, index) => {
          labels.push(trip.name);
          counts.push(1); // Use the trip id as the count
          colors.push(getRandomColor());
        });

        setChartData({
          labels: labels,
          datasets: [
            {
              data: counts,
              backgroundColor: colors,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching trips data:', error);
      }
    };

    fetchData();
  }, [userId]);

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return chartData ? (
    <Pie
      data={{
        labels: chartData.labels,
        datasets: chartData.datasets,
      }}
      options={{
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                return chartData.labels[context.dataIndex];
              },
            },
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  ) : (
    <p>Loading chart...</p>
  );
};

const VisitedLakesChart = ({ userId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/visitedLakes`, {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const data = await response.json();

        const labels = [];
        const counts = [];
        const colors = [];

        data.forEach((lake, index) => {
          labels.push(lake.name);
          counts.push(1);
          colors.push(getRandomColor());
        });
        

        setChartData({
          labels: labels, // add labels array
          datasets: [
            {
              data: counts,
              backgroundColor: colors,
            },
          ],

        });
      } catch (error) {
        console.error('Error fetching visited lakes data:', error);
      }
    };

    fetchData();
  }, [userId]);


  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return chartData ? (
    <Pie
      data={{
        labels: chartData.labels,
        datasets: chartData.datasets,
      }}
      options={{
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                return chartData.labels[context.dataIndex];
              },
            },
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  ) : (
    <p>Loading chart...</p>
  );

};

const LicensesChart = ({ userId }) => {
  const [licenseCount, setLicenseCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/licenses`, {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const data = await response.json();
        setLicenseCount(data.length);
      } catch (error) {
        console.error('Error fetching licenses data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className='countcont'>
      <h3>Total Licenses:</h3>
      <p className='licensecount'>{licenseCount}</p>
    </div>
  );
};

const Charts = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch("http://localhost:5000/dashboard/", {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const { user } = await response.json();
 
        setUserId(user.id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <>
      <div className='chart-container'>
        <h1 className="header">Statistika</h1>
        <div className='charts'>
          <div className='piechart'>
            <h3>Planned Trips</h3>
            {userId && <TotalTripsChart userId={userId} />}
          </div>
          <div className='countchart'>{userId && <LicensesChart userId={userId} />}</div>
          <div className='piechart'>
            <h3>Visited Lakes</h3>
            {userId && <VisitedLakesChart userId={userId} />}
          </div>

        </div>
      </div>
    </>
  );
};

export default Charts;