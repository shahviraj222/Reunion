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
            {paginatedData.map((row) => {
                return (
                    <TableRow key={row.id}>
                        {visibleColumn.map((data) => {
                            return (
                                <TableCell>
                                    {data === 'createdAt' || data === 'updatedAt' ? formatDate(row[data]) : row[data]}
                                </TableCell>
                            )
                        })}
                    </TableRow>)
            })}
        </TableBody >
    );
}

export default TableBodyComponent;