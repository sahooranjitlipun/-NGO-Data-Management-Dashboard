
import { useState } from 'react';
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis, YAxis,
} from 'recharts';
import data from './data';
import profitData from './profitData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

function App() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All');

  const regions = ['All', ...new Set(data.map(item => item.region))];
  const courses = ['All', ...new Set(data.map(item => item.course))];

  const filteredData = data.filter(item =>
    (selectedRegion === 'All' || item.region === selectedRegion) &&
    (selectedCourse === 'All' || item.course === selectedCourse)
  );

  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <h2>📊 Employment Trend Dashboard</h2>

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

      <LineChart
        width={700}
        height={350}
        data={filteredData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="employmentRate" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>

      <h3 style={{ marginTop: 40 }}>💰 Profit Distribution by Region</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={profitData}
          dataKey="profit"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {profitData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

export default App;
