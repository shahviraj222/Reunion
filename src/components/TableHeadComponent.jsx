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
            <TableRow>
                {visibleColumn.map((data) => {
                    return (
                        <TableCell key={data} sortDirection={orderBy === data ? order : false}>
                            <TableSortLabel
                                active={orderBy === data}
                                direction={orderBy === data ? order : 'asc'}
                                onClick={() => handleRequestSort(data)}
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