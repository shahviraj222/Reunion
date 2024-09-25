import React, { useState } from 'react';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Checkbox,
    Popover,
    Typography,
} from '@mui/material';
function FilterComponents({ setSearchTerm, searchTerm, categoryFilter, setCategoryFilter, uniqueCategories, subcategoryFilter, setSubcategoryFilter, uniqueSubcategories, toggleColumn, visibleColumn }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleToggleColumn = (column) => {
        toggleColumn(column);
    };
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
            {/* Search Input */}
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:w-1/3 bg-white rounded-md shadow-sm"
                InputLabelProps={{ className: 'text-gray-600' }}
            />

            {/* Category Filter Dropdown */}
            <FormControl variant="outlined" className="md:w-1/4 bg-white rounded-md shadow-sm">
                <InputLabel className="text-gray-600">Category</InputLabel>
                <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="text-gray-700"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {uniqueCategories.map((data) => (
                        <MenuItem key={data} value={data}>
                            {data}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Subcategory Filter Dropdown */}
            <FormControl variant="outlined" className="md:w-1/4 bg-white rounded-md shadow-sm">
                <InputLabel className="text-gray-600">Subcategory</InputLabel>
                <Select
                    value={subcategoryFilter}
                    onChange={(e) => setSubcategoryFilter(e.target.value)}
                    className="text-gray-700"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {uniqueSubcategories.map((data) =>
                        data ? (
                            <MenuItem key={data} value={data}>
                                {data}
                            </MenuItem>
                        ) : null
                    )}
                </Select>
            </FormControl>

            {/* Button to toggle column visibility */}
            <Button
                variant="contained"
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
            >
                Column Hide
            </Button>

            {/* Popover for column selection */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                className="mt-2"
            >
                <Typography className="p-4">
                    {['id', 'name', 'price', 'sale_price', 'createdAt', 'updatedAt'].map((column) => (
                        <div key={column} className="flex items-center mb-2">
                            <Checkbox
                                checked={visibleColumn.includes(column)}
                                onChange={() => handleToggleColumn(column)}
                                className="text-blue-500"
                            />
                            <span className="ml-2">{column}</span>
                        </div>
                    ))}
                </Typography>
            </Popover>
        </div>
    );
}

export default FilterComponents;