import { useEffect, useState } from 'react';
import './Converter.css';
import {
    Box,
    Card,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { observer } from 'mobx-react';
import store from '../../Store/store';

const Converter = () => {
    const [result, setResult] = useState('choose from and to');
    const [convertData, setConvertData] = useState({
        from: '',
        to: '',
        amount: 1,
    });

    const convert = () => {
        if (store.valute.length === 0) return;
        const fromValute = store.valute.find((item) => item.CharCode === convertData.from);
        const toValute = store.valute.find((item) => item.CharCode === convertData.to);
        if (fromValute && toValute) {
            setResult(
                (fromValute?.Value /
                    fromValute?.Nominal /
                    (toValute?.Value / toValute?.Nominal)) *
                    convertData.amount
            );
        }
    };

    const changeConvertDataHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setConvertData((prev) => ({ ...prev, [name]: value }));
    };

    const swapValuteCode = () => {
        setConvertData((prev) => ({
            ...prev,
            to: convertData.from,
            from: convertData.to,
        }));
    };

    useEffect(() => {
        convert();
    }, [convertData, result, convert]);

    useEffect(() => {
        store.getRates();
    }, []);

    function format(number) {
        const parsedNumber = parseFloat(number);

        if (!isNaN(parsedNumber)) {
            return parsedNumber.toFixed(2);
        } else {
            console.error('Invalid number:', number);
            return 'NaN';
        }
    }

    return (
        <Box className='converter'>
            <Typography sx={{ mb: 1 }} variant={'h5'}>
                Конвертер{' '}
            </Typography>
            <Card className='card'>
                <div>
                    <FormControl sx={{ mb: 2, minWidth: 100 }}>
                        <InputLabel id='from-label'>From</InputLabel>
                        <Select
                            labelId='from-label'
                            id='from-select'
                            value={convertData.from}
                            name='from'
                            label='From'
                            onChange={changeConvertDataHandle}
                        >
                            {store.valute.map((item) => (
                                <MenuItem key={item.CharCode} value={item.CharCode}>
                                    {item.CharCode}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id='standard-number'
                        type='number'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: 200 }}
                        name='amount'
                        value={convertData.amount}
                        onChange={changeConvertDataHandle}
                    />
                </div>

                <div>
                    <FormControl sx={{ mb: 2, minWidth: 100 }}>
                        <InputLabel id='to-label'>To</InputLabel>
                        <Select
                            labelId='to-label'
                            id='to-select'
                            value={convertData.to}
                            label='To'
                            name='to'
                            onChange={changeConvertDataHandle}
                        >
                            {store.valute.map((item) => (
                                <MenuItem key={item.CharCode} value={item.CharCode}>
                                    {item.CharCode}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id='standard-number'
                        type='number'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: 200 }}
                        className='disabled'
                        name='amount'
                        value={format(result)}
                        disabled={true}
                        onChange={changeConvertDataHandle}
                    />
                </div>

                <Box sx={{ m: '0 auto' }}>
                    <Button sx={{ height: 40, width: 80 }} variant='contained' onClick={swapValuteCode}>
                        <FlipCameraAndroidIcon />
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default observer(Converter);
