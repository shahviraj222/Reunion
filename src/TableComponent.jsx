import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

const TableComponent = ({ data }) => {
    // State hooks for sorting, pagination, and filters and category
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [subcategoryFilter, setSubcategoryFilter] = useState('')
    const [uniqueSubcategories, setUniqueSubcategories] = useState([]);
    const uniqueCategories = [...new Set(data.map(item => item.category))];
    const uniqueSubCategories = [...new Set(data.map(item => item.subcategory))];

    // Function to handle sorting
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Function to handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Function to handle change in rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Filtering logic
    const filteredData = data
        .filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (categoryFilter ? item.category === categoryFilter : true) &&
            (subcategoryFilter ? item.subcategory === subcategoryFilter : true)
        )
        .sort((a, b) => {
            const isAsc = order === 'asc';
            if (orderBy === 'id') {
                return (isAsc ? a.id - b.id : b.id - a.id);
            }
            return (a[orderBy] < b[orderBy] ? (isAsc ? -1 : 1) : (a[orderBy] > b[orderBy] ? (isAsc ? 1 : -1) : 0));
        });

    // Update unique subcategories whenever the filtered data changes
    useEffect(() => {

        if (categoryFilter == "") {
            setUniqueSubcategories(uniqueSubCategories);
            setSubcategoryFilter("")
        }
        else {
            const subcategories = Array.from(new Set(data.map((item) => {
                if (item.category == categoryFilter) {
                    return item.subcategory
                }
            })));
            setUniqueSubcategories(subcategories);
        }
    }, [categoryFilter]);


    // Paginate filtered data
    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Date Formate Funciton 
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd MMM yyyy , HH:mm');
    };

    return (
        <TableContainer>

            {/* Search Input */}
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px' }}
            />

            {/* Category Filter Dropdown */}
            <FormControl variant="outlined" style={{ marginBottom: '20px', minWidth: 120 }}>
                <InputLabel>Category</InputLabel>
                <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {uniqueCategories.map((data) => <MenuItem key={data} value={data}>{data}</MenuItem>)}
                </Select>
            </FormControl>

            {/* Subcategory Filter Dropdown */}
            <FormControl variant="outlined" style={{ marginBottom: '20px', minWidth: 130 }}>
                <InputLabel>Subcategory</InputLabel>
                <Select
                    value={subcategoryFilter}
                    onChange={(e) => setSubcategoryFilter(e.target.value)}
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {uniqueSubcategories.map((data) => data ? <MenuItem key={data} value={data}>{data}</MenuItem> : [])}
                </Select>
            </FormControl>

            {/* Table */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sortDirection={orderBy === 'id' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'id'}
                                direction={orderBy === 'id' ? order : 'asc'}
                                onClick={() => handleRequestSort('id')}
                            >
                                Id
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'name' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'name'}
                                direction={orderBy === 'name' ? order : 'asc'}
                                onClick={() => handleRequestSort('name')}
                            >
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'price' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'price'}
                                direction={orderBy === 'price' ? order : 'asc'}
                                onClick={() => handleRequestSort('price')}
                            >
                                Price
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'sale_price' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'sale_price'}
                                direction={orderBy === 'sale_price' ? order : 'asc'}
                                onClick={() => handleRequestSort('sale_price')}
                            >
                                Sale Price
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'createdAt' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'createdAt'}
                                direction={orderBy === 'createdAt' ? order : 'asc'}
                                onClick={() => handleRequestSort('createdAt')}
                            >
                                Created At
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'updatedAt' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'updatedAt'}
                                direction={orderBy === 'updatedAt' ? order : 'asc'}
                                onClick={() => handleRequestSort('updatedAt')}
                            >
                                Updated At
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>

                    {paginatedData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>{row.sale_price}</TableCell>
                            <TableCell>{formatDate(row.createdAt)}</TableCell>
                            <TableCell>{formatDate(row.updatedAt)}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>

            </Table>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </TableContainer>
    );
};

export default TableComponent;
