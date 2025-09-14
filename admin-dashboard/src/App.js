// App.js


import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import data from './data';
import profitData from './profitData';

const COLORS = ['#A3D9A5', '#A5C9EA', '#FFBB28']; // pastel colors
const SUCCESS_COLOR = '#A3D9A5';  // pastel green
const FAILURE_COLOR = '#FF4C4C';  // red

function App() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All');

  const regions = ['All', ...new Set(data.map(item => item.region))];
  const courses = ['All', ...new Set(data.map(item => item.course))];

  const filteredData = data.filter(item =>
    (selectedRegion === 'All' || item.region === selectedRegion) &&
    (selectedCourse === 'All' || item.course === selectedCourse)
  );

  // Pie Data: Count Success vs Failure based on Rs.10,000
  const successStats = [
    {
      name: 'Success (>= Rs.10,000)',
      value: profitData.filter(d => d.profit >= 10000).length,
    },
    {
      name: 'Failure (< Rs.10,000)',
      value: profitData.filter(d => d.profit < 10000).length,
    },
  ];

  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center' }}>📊 ICECD Admin Dashboard</h2>

      {/* Main 2-column layout */}
      <div style={{ display: 'flex', gap: '40px', marginTop: 30 }}>

        {/* ⬅️ Left Column: Both Pie Charts */}
        <div>
          {/* Success Rate Pie Chart */}
          <h3>✅ Success vs ❌ Failure (Rs.10,000 Threshold)</h3>
          <PieChart width={350} height={250}>
            <Pie
              data={successStats}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              <Cell fill={SUCCESS_COLOR} />
              <Cell fill={FAILURE_COLOR} />
            </Pie>
          </PieChart>
          <div>
            <span style={{ display: 'inline-block', width: 12, height: 12, backgroundColor: SUCCESS_COLOR, marginRight: 6 }}></span>
            Success (greater than or equal to Rs.10,000)
            <br />
            <span style={{ display: 'inline-block', width: 12, height: 12, backgroundColor: FAILURE_COLOR, marginRight: 6 }}></span>
            Failure (less than Rs.10,000)
          </div>

          {/* Profit by Region Pie Chart */}
          <h3 style={{ marginTop: 30 }}>💰 Profit by Region</h3>
          <PieChart width={350} height={250}>
            <Pie
              data={profitData}
              dataKey="profit"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {profitData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* ➡️ Right Column: Bar Chart with Filter */}
        <div>
          <div style={{ marginBottom: 20 }}>
            <label>Region: </label>
            <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
              {regions.map(region => <option key={region} value={region}>{region}</option>)}
            </select>

            <label style={{ marginLeft: 20 }}>Course: </label>
            <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
              {courses.map(course => <option key={course} value={course}>{course}</option>)}
            </select>
          </div>

          <BarChart
            width={600}
            height={400}
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="employmentRate" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default App;
