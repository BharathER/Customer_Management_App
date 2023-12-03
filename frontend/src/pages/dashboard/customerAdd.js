import { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CustomerAdd = () => {
    const [name, setName] = useState('');
    const [rpid, setRpid] = useState('');
    const [mobile, setMobile] = useState('');
    const [houseName, setHouseName] = useState('');
    const [areaNumber, setAreaNumber] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [buildNumber, setBuildNumber] = useState('');
    const [locationGps, setLocationGps] = useState('');
    const [locationName, setLocationName] = useState('');
    const [manualLocName, setManualLocName] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [country, setCountry] = useState('');
    //const [locObj, setLocObj] = useState([]);
    const [rpidError, setRpidError] = useState('');
    /*     const [show, setShow] = useState(false);
    const [showManualInput, setShowManualInput] = useState(false); */

    const { id } = useParams();

    console.log(id);

    let navigate = useNavigate();

    const input1Ref = useRef();
    const input3Ref = useRef();
    const input4Ref = useRef();
    const input5Ref = useRef();
    const input6Ref = useRef();
    const input7Ref = useRef();
    const input8Ref = useRef();
    const input9Ref = useRef();
    const input10Ref = useRef();
    const input11Ref = useRef();
    const input12Ref = useRef();
    const input13Ref = useRef();
    const input14Ref = useRef();

    useEffect(() => {
        // Fetch customer data based on the ID if provided
        if (id) {
            fetchData();

            // Perform a fetch or use your preferred method to get customer data by ID
            // For example: fetchCustomerById(id).then((data) => setCustomer(data));
        }
    }, [id]);

    const fetchData = async () => {
        Axios.get(`/api/data/${id}`)
            .then((response) => {
                console.log(response.data[0]);
                setName(response.data[0].CustomerName);
                setRpid(response.data[0].ResidentsPermitID);
                setMobile(response.data[0].CustomerMobile);
                setHouseName(response.data[0].HouseName);
                setAreaNumber(response.data[0].AreaNumber);
                setStreetNumber(response.data[0].StreetNumber);
                setStreetName(response.data[0].StreetName);
                setBuildNumber(response.data[0].BuildNumber);
                setLocationGps(response.data[0].LocationGPS);
                setLocationName(response.data[0].LocationName);
                setState(response.data[0].State);
                setDistrict(response.data[0].District);
                setCountry(response.data[0].Country);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const validateRpid = () => {
        //console.log(rpidError);
        if (rpid.trim() === '') {
            setRpidError('Residents Permit ID is required');
            handleerror();
            setTimeout(() => {
                setRpidError('');
            }, 4000);
            return false;
        }
        setRpidError('');
        return true;
    };

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const gpsCoordinates = `${latitude},${longitude}`;
                setLocationGps(gpsCoordinates);
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    };

    const handleFetchLiveLocation = () => {
        getLocation();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateRpid()) {
            // If validation fails, return without submitting the form
            return;
        }

        if (id) {
            Axios.put('/api/data', {
                CustomerName: name,
                ResidentsPermitID: rpid,
                CustomerMobile: mobile,
                HouseName: houseName,
                AreaNumber: areaNumber,
                StreetNumber: streetNumber,
                StreetName: streetName,
                BuildNumber: buildNumber,
                LocationGPS: locationGps,
                LocationName: locationName,
                State: state,
                District: district,
                Country: country
            })
                .then((response) => {
                    if (response.status === 200) {
                        let path = `/`;
                        navigate(path);
                        toast.success('Customer data updated successfully');
                    }
                    //console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            Axios.post('/api/data', {
                CustomerName: name,
                ResidentsPermitID: rpid,
                CustomerMobile: mobile,
                HouseName: houseName,
                AreaNumber: areaNumber,
                StreetNumber: streetNumber,
                StreetName: streetName,
                BuildNumber: buildNumber,
                LocationGPS: locationGps,
                LocationName: locationName,
                State: state,
                District: district,
                Country: country
            }).then((response) => {
                if (response.status === 200) {
                    toast.success('Customer data added successfully');
                    let path = `/`;
                    navigate(path);
                }
            });
        }
    };

    const handleerror = () => {
        window.alert('Please fill in the Residents Permit ID');
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <FormControl
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '45ch' }
                }}
            >
                <div md={6}>
                    <TextField id="customer-name" label="Customer Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField
                        id="Residents"
                        label="Residents Permit ID"
                        error={!!rpidError}
                        value={rpid}
                        disabled={id ? true : false}
                        onChange={(e) => setRpid(e.target.value)}
                    />

                    <TextField id="Mobile" label="Customer Mobile " value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>
                <div md={6}>
                    <TextField id="House" label="House Name" value={houseName} onChange={(e) => setHouseName(e.target.value)} />
                    <TextField label="Area Number" value={areaNumber} onChange={(e) => setAreaNumber(e.target.value)} />
                    <TextField label="Street Number" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} />
                </div>
                <div md={6}>
                    <TextField label="Street Name" value={streetName} onChange={(e) => setStreetName(e.target.value)} />
                    <TextField label="Build Number" value={buildNumber} onChange={(e) => setBuildNumber(e.target.value)} />
                    <TextField label="Location Gps" value={locationGps} onClick={handleFetchLiveLocation} />
                </div>
                <div md={6}>
                    <TextField label="Location Name" value={locationName} onChange={(e) => setLocationName(e.target.value)} />
                    <TextField label="Manual Location Name" value={manualLocName} onChange={(e) => setManualLocName(e.target.value)} />
                    <TextField label="State" value={state} onChange={(e) => setState(e.target.value)} />
                </div>
                <div md={6}>
                    <TextField label="District" value={district} onChange={(e) => setDistrict(e.target.value)} />
                    <TextField label="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    {/* <TextField id="outlined-error" label="Name" value={locObj} onChange={(e) => setLocObj(e.target.value)} /> */}
                </div>
                <div md={2}>
                    <Button style={{ backgroundColor: '#1890ff', color: 'white', marginLeft: '10px', top: '10px' }} type="submit">
                        {!id ? 'Add customer' : 'Save Changes'}
                    </Button>
                </div>
            </FormControl>
        </form>
    );
};

export default CustomerAdd;
