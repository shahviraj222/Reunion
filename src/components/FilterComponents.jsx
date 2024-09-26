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
    Slider,
} from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';

function FilterComponents({
    setSearchTerm,
    searchTerm,
    categoryFilter,
    setCategoryFilter,
    uniqueCategories,
    subcategoryFilter,
    setSubcategoryFilter,
    uniqueSubcategories,
    toggleColumn,
    visibleColumn,
    dateRange,
    priceRange,
    handleChangeDateRange,
    handleChangePriceRange,
}) {
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
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 mb-6 p-6 bg-gray-50 rounded-lg shadow-lg">
            {/* Search Input */}
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:w-1/4 bg-white rounded-md shadow-sm"
                InputLabelProps={{ className: 'text-gray-600' }}
                size="small"
            />

            {/* Category Filter Dropdown */}
            <FormControl variant="outlined" className="md:w-1/5 bg-white rounded-md shadow-sm">
                <InputLabel className="text-gray-600">Category</InputLabel>
                <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="text-gray-700"
                    size="small"
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
            <FormControl variant="outlined" className="md:w-1/5 bg-white rounded-md shadow-sm">
                <InputLabel className="text-gray-600">Subcategory</InputLabel>
                <Select
                    value={subcategoryFilter}
                    onChange={(e) => setSubcategoryFilter(e.target.value)}
                    className="text-gray-700"
                    size="small"
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



            {/* Price Range Slider */}
            <div className="md:w-1/4 flex flex-col items-start p-2 space-y-1">

                <Slider
                    value={priceRange}
                    onChange={handleChangePriceRange}
                    min={0}
                    max={100}
                    size="small"
                />
                <div className="flex justify-between w-full text-gray-700 text-xs">
                    <Typography>${priceRange[0]}</Typography>
                    <Typography>${priceRange[1]}</Typography>
                </div>
            </div>


            {/* Button to toggle column visibility */}
            <Button
                variant="outlined"
                size='small'
                onClick={handleClick}
            >
                Column Visible
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
                <Typography className="p-4 text-gray-700">
                    {['id', 'name', 'price', 'sale_price', 'createdAt', 'updatedAt'].map((column) => (
                        <div key={column} className="flex items-center mb-2">
                            <Checkbox
                                checked={visibleColumn.includes(column)}
                                onChange={() => handleToggleColumn(column)}
                                className="text-blue-500"
                            />
                            <span className="ml-2 text-sm">{column}</span>
                        </div>
                    ))}
                </Typography>
            </Popover>

            {/* Date Range Picker */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                    startText="Start Date"
                    endText="End Date"
                    value={dateRange}
                    onChange={handleChangeDateRange}
                    renderInput={(startProps, endProps) => (
                        <div className="flex gap-2">
                            <TextField {...startProps} className="bg-white rounded-md shadow-sm" size="small" />
                            <TextField {...endProps} className="bg-white rounded-md shadow-sm" size="small" />
                        </div>
                    )}
                />
            </LocalizationProvider>
        </div>
    );
}

export default FilterComponents;
