import React, { useState, useEffect } from 'react';
import {
    Table,
    TableContainer,
    TablePagination,
} from '@mui/material';

import TableHeadComponent from './components/TableHeadComponent';
import TableBodyComponent from './components/TableBodyComponent';
import FilterComponents from './components/FilterComponents';

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
    const uniqueSubCategory = [...new Set(data.map(item => item.subcategory))];
    const [visibleColumn, setVisibleColumn] = useState(['id', 'name', 'price', 'sale_price', 'createdAt', 'updatedAt'])
    const [dateRange, setDateRange] = useState([null, null]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
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

    // Function to handle Date change
    const handleChangeDateRange = (newDateRange) => {
        setDateRange(newDateRange)
    }

    // Function to handle Price change
    const handleChangePriceRange = (event, newPriceRange) => {
        setPriceRange(newPriceRange)
    }

    // Function For deleting or adding the colum (Toggle)
    const toggleColumn = (column) => {
        setVisibleColumn(prev =>
            prev.includes(column) ? prev.filter(col => col !== column) : [...prev, column]
        );
    };

    // Filtering logic
    const filteredData = data
        .filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (categoryFilter ? item.category === categoryFilter : true) &&
            (subcategoryFilter ? item.subcategory === subcategoryFilter : true) &&
            (!dateRange[0] || new Date(item.createdAt) >= dateRange[0]) &&
            (!dateRange[1] || new Date(item.createdAt) <= dateRange[1]) &&
            item.price >= priceRange[0] && item.price <= priceRange[1]
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
            setUniqueSubcategories(uniqueSubCategory);
            setSubcategoryFilter("")
        }
        else {
            const subcategories = Array.from(new Set(data.map((item) => {
                if (item.category == categoryFilter) {
                    return item.subcategory
                }
            })));
            setSubcategoryFilter("")
            setUniqueSubcategories(subcategories);
        }
    }, [categoryFilter]);

    // // you have to build the same filter like above 

    // useEffect(() => {
    //     if (subcategoryFilter == "") {

    //     }
    //     else {
    //         // setCategoryFilter("Health")
    //         // write a logic if you select the a sub category then the corresponding category selected
    //     }
    // }, [subcategoryFilter]);

    // Paginate filtered data
    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="p-6 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-lg shadow-xl">
            <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                <FilterComponents
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    uniqueCategories={uniqueCategories}
                    subcategoryFilter={subcategoryFilter}
                    setSubcategoryFilter={setSubcategoryFilter}
                    uniqueSubcategories={uniqueSubcategories}
                    toggleColumn={toggleColumn}
                    visibleColumn={visibleColumn}
                    dateRange={dateRange}
                    priceRange={priceRange}
                    handleChangeDateRange={handleChangeDateRange}
                    handleChangePriceRange={handleChangePriceRange}
                />
            </div>

            <TableContainer className="rounded-lg shadow-lg border border-gray-200">
                <Table className="min-w-full table-auto divide-y divide-gray-200">
                    <TableHeadComponent
                        handleRequestSort={handleRequestSort}
                        order={order}
                        orderBy={orderBy}
                        visibleColumn={visibleColumn}
                    />
                    <TableBodyComponent
                        visibleColumn={visibleColumn}
                        paginatedData={paginatedData}
                    />
                </Table>
            </TableContainer>

            <TablePagination
                className="mt-4 bg-white p-4 rounded-lg shadow-md"
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default TableComponent;
