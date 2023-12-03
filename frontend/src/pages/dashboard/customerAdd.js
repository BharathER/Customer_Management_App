import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import { Button, Grid } from '@mui/material';

const CustomerAdd = () => {
    const [name, setName] = useState();
    //const [CurrentPage, setCurrentPage] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${name}`);
    };

    return (
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <FormControl
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '45ch' }
                }}
                noValidate
                autoComplete="off"
            >
                <div md={6}>
                    <TextField id="outlined-error" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField id="outlined-error-helper-text" label="Error" />
                    <TextField id="outlined-error-helper-text" label="Error" />
                </div>
                <div md={6}>
                    <TextField label="Size" id="outlined-size-small" defaultValue="Small" size="small" />
                    <TextField label="Size" id="outlined-size-normal" defaultValue="Normal" />
                    <TextField id="outlined-error-helper-text" label="Error" />
                </div>
                <div md={2}>
                    <Button style={{ backgroundColor: '#1890ff', color: 'white' }} type="submit">
                        Submit{' '}
                    </Button>
                </div>
            </FormControl>
        </form>
    );
};

export default CustomerAdd;
