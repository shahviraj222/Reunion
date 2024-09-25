import React from 'react';
import { format } from 'date-fns';
import {
    TableBody,
    TableCell,
    TableRow
} from '@mui/material';
function TableBodyComponent({ paginatedData, visibleColumn, }) {
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd MMM yyyy , HH:mm');
    };
    return (
        <TableBody>
            {paginatedData.map((row, index) => (
                <TableRow
                    key={row.id}
                    className={`bg-white even:bg-gray-50 hover:bg-blue-100 transition-colors duration-300 ${index % 2 === 0 ? 'even:bg-gray-50' : 'bg-white'
                        }`}
                >
                    {visibleColumn.map((data) => (
                        <TableCell
                            key={data}
                            className="px-6 py-3 text-gray-700 text-sm font-medium border-b border-gray-200"
                        >
                            {data === 'createdAt' || data === 'updatedAt'
                                ? formatDate(row[data])
                                : row[data]}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
}

export default TableBodyComponent;