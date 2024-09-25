import React from 'react';
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
function FilterComponents({ setSearchTerm, searchTerm, categoryFilter, setCategoryFilter, uniqueCategories, subcategoryFilter, setSubcategoryFilter, uniqueSubcategories }) {
    return (
        <>
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
        </>
    );
}

export default FilterComponents;