import React from 'react';
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@mui/material';

function TableHeadComponent({ handleRequestSort, order, orderBy, visibleColumn }) {
    return (
        <TableHead>
            <TableRow className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                {visibleColumn.map((data) => {
                    return (
                        <TableCell
                            key={data}
                            sortDirection={orderBy === data ? order : false}
                            className="text-left bg-blue-600 text-white font-semibold uppercase tracking-wide px-4 py-2" // Tailwind classes for alignment, text styling, and padding
                        >
                            <TableSortLabel
                                active={orderBy === data}
                                direction={orderBy === data ? order : 'asc'}
                                onClick={() => handleRequestSort(data)}
                                className={`cursor-pointer text-white ${orderBy === data ? 'font-bold' : 'font-medium'} hover:text-blue-300 transition-all duration-300`} // Tailwind for cursor, hover effect, and smooth transition
                            >
                                {data[0].toUpperCase() + data.substring(1)}
                            </TableSortLabel>
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    );
}

export default TableHeadComponent;