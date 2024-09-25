import { useState } from 'react';
import TableComponent from './TableComponent';
import data from '../data.json';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden w-full max-w-5xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center py-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          Data Table
        </h1>
        <TableComponent data={data} />
      </div>
    </div>
  );
}

export default App;
