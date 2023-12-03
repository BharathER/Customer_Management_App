import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

// material-ui
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets

import axios from 'axios';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const [customerData, setCustomerData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const reccords = customerData.slice(firstIndex, lastIndex);
    const npages = Math.ceil(customerData.length / recordsPerPage);
    const numbers = [...Array(npages + 1).keys()].slice(1);
    // const [slot, setSlot] = useState('week');

    useEffect(() => {
        axios
            .get('/api/get')
            .then((result) => {
                //console.log(result.data);
                setCustomerData(result.data);
            })
            .catch((err) => {});
    }, []);

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9)
    ];

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const changeCurrentPage = (id) => {
        setCurrentPage(id);
    };
    const nextPage = () => {
        if (currentPage !== npages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 3 */}
            <Grid item xs={12} md={12} lg={12}>
                <Grid container xs={12} md={12} lg={12}>
                    <Grid item>
                        <Button href="customer-add" variant="outlined">
                            <p>Add Customer</p>
                        </Button>
                    </Grid>
                    <Grid item />
                </Grid>
                {/* <Grid container alignItems="center" justifyContent="space-between">
                    
                    <Grid item />
                </Grid> */}
                <MainCard sx={{ mt: 2 }} content={false}>
                    {/* <OrdersTable /> */}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.#</TableCell>
                                    <TableCell>Residents Permit ID</TableCell>
                                    <TableCell align="right">Customer Name</TableCell>
                                    <TableCell align="right">Mobile</TableCell>
                                    <TableCell align="right">House Name</TableCell>
                                    <TableCell align="right">Area Number</TableCell>
                                    <TableCell align="right">Street Number</TableCell>
                                    <TableCell align="right">Street Name</TableCell>
                                    <TableCell align="right">Build Number</TableCell>
                                    <TableCell align="right">Location Lat,Lng</TableCell>
                                    <TableCell align="right">Location Name</TableCell>
                                    <TableCell align="right">State</TableCell>
                                    <TableCell align="right">District</TableCell>
                                    <TableCell align="right">Country</TableCell>
                                    <TableCell align="right">Edit</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reccords.map((row, key) => (
                                    <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {lastIndex === recordsPerPage ? key + 1 : key + lastIndex}
                                        </TableCell>
                                        <TableCell align="right">{row.ResidentsPermitID}</TableCell>
                                        <TableCell align="right">{row.CustomerName}</TableCell>
                                        <TableCell align="right">{row.CustomerMobile}</TableCell>
                                        <TableCell align="right">{row.HouseName}</TableCell>
                                        <TableCell align="right">{row.AreaNumber}</TableCell>
                                        <TableCell align="right">{row.StreetNumber}</TableCell>
                                        <TableCell align="right">{row.StreetName}</TableCell>
                                        <TableCell align="right">{row.BuildNumber}</TableCell>
                                        <TableCell align="right">{row.LocationGPS}</TableCell>
                                        <TableCell align="right">{row.LocationName}</TableCell>
                                        <TableCell align="right">{row.State}</TableCell>
                                        <TableCell align="right">{row.District}</TableCell>
                                        <TableCell align="right">{row.Country}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained">
                                                <FaEdit />
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="outlined">
                                                <FaTrash />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <Pagination>
                    <Pagination.Prev onClick={prePage} />
                    {numbers.map((n, i) =>
                      currentPage === n ? (
                        <Pagination.Item
                          active
                          onClick={() => changeCurrentPage(n)}
                        >
                          {n}
                        </Pagination.Item>
                      ) : (
                        <Pagination.Item onClick={() => changeCurrentPage(n)}>
                          {n}
                        </Pagination.Item>
                      )
                    )}

                    <Pagination.Next onClick={nextPage} />
                  </Pagination> */}
                    <div
                        class="pagination"
                        style={{ display: 'inline - block', color: 'black', float: 'left', padding: '8px 16px', textDecoration: 'none' }}
                    >
                        <a
                            href="#"
                            onClick={prePage}
                            style={{ color: 'black', float: 'left', padding: '8px 16px', textDecoration: 'none' }}
                        >
                            &laquo;
                        </a>
                        {numbers.map((n, i) =>
                            currentPage === n ? (
                                <a
                                    href="#"
                                    active
                                    onClick={() => changeCurrentPage(n)}
                                    style={{ color: 'black', float: 'left', padding: '8px 16px', textDecoration: 'none' }}
                                >
                                    {n}
                                </a>
                            ) : (
                                <a
                                    href="#"
                                    onClick={() => changeCurrentPage(n)}
                                    style={{ color: 'black', float: 'left', padding: '8px 16px', textDecoration: 'none' }}
                                >
                                    {n}
                                </a>
                            )
                        )}

                        <a
                            href="#"
                            onClick={nextPage}
                            style={{ color: 'black', float: 'left', padding: '8px 16px', textDecoration: 'none' }}
                        >
                            &raquo;
                        </a>
                    </div>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;
