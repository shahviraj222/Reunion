import React from 'react';
import { format, isValid } from 'date-fns'; // Import only required functions from date-fns
import { TableBody, TableCell, TableRow } from '@mui/material';

function TableBodyComponent({ paginatedData, visibleColumn }) {
    // Format the date if it is valid, else return a placeholder
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isValid(date) ? format(date, 'dd MMM yyyy , HH:mm') : '-';
    };

    return (
        <TableBody>
            {paginatedData.map((row, index) => (
                <TableRow
                    key={row.id}
                    className={`bg-white even:bg-gray-50 hover:bg-blue-100 transition-colors duration-300 ${index % 2 === 0 ? 'even:bg-gray-50' : 'bg-white'}`}
                >
                    {visibleColumn.map((data) => (
                        <TableCell
                            key={data}
                            className="px-6 py-3 text-gray-700 text-sm font-medium border-b border-gray-200"
                        >
                            {/* Check if the column is a date field, otherwise render the value */}
                            {data === 'createdAt' || data === 'updatedAt'
                                ? formatDate(row[data])
                                : row[data] !== undefined
                                    ? row[data]
                                    : '-'}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
}

export default TableBodyComponent;
