import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function Chart() {
  const stores = useSelector(state => state.stores.stores);
  const [selectedStore, setSelectedStore] = useState('');

  // Sample data - replace with your actual data
  const data = Array.from({ length: 52 }, (_, i) => ({
    week: `W${String(i + 1).padStart(2, '0')}`,
    gmDollars: Math.random() * 200000,
    gmPercent: Math.random() * 100
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Store</InputLabel>
          <Select
            value={selectedStore}
            label="Select Store"
            onChange={(e) => setSelectedStore(e.target.value)}
          >
            {stores.map((store) => (
              <MenuItem key={store.id} value={store.id}>
                {store.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h5" mb={2}>Gross Margin</Typography>
      <Box sx={{ height: 'calc(100vh - 250px)', width: '100%' }}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="gmDollars" fill="#8884d8" name="GM Dollars" />
            <Line yAxisId="right" type="monotone" dataKey="gmPercent" stroke="#82ca9d" name="GM %" />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default Chart;