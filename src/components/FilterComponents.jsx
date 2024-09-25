import React, { useState } from 'react';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Checkbox,
    ListItemText,
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

            {/* Button to toggle column visibility */}
            <Button variant="contained" onClick={handleClick}>
                column
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
            >
                <Typography sx={{ p: 2 }}>
                    {['id', 'name', 'price', 'sale_price', 'createdAt', 'updatedAt'].map((column) => (
                        <div key={column}>
                            <Checkbox
                                checked={visibleColumn.includes(column)}
                                onChange={() => handleToggleColumn(column)}
                            />
                            <span>{column}</span>
                        </div>
                    ))}
                </Typography>
            </Popover>
        </>
    );
}

export default FilterComponents;