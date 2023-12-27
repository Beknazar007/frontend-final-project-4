import { useEffect, useState } from 'react';
import { Box, Card, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { observer } from "mobx-react";
import './ConverterAdditional.css';

const ConverterAdditional = () => {
    const [convertProduct, setConvertProduct] = useState({
        from: 'shawerma', 
        to: 'som',
        amount: 1,
    });

    const [result, setResult] = useState(0);

    const productPrices = {
        nan: 20,
        shawerma: 220, 
        shoro: 80,
        qorot: 30,
    };

    const usdToSomRate = 89.31;

    // useEffect(() => {
    //     if (convertProduct.to === 'usd') {
    //         const productPrice = productPrices[convertProduct.from];
    //         if (!isNaN(productPrice) && !isNaN(convertProduct.amount)) {
    //             setResult((productPrice * convertProduct.amount) / usdToSomRate);
    //         }
    //     } else {
    //         setResult(productPrices[convertProduct.from] * convertProduct.amount);
    //     }
    // }, [convertProduct]);
    
    useEffect(() => {
        if (convertProduct.to === 'usd') {
            const productPrice = productPrices[convertProduct.from];
            if (!isNaN(productPrice) && !isNaN(convertProduct.amount)) {
                setResult((productPrice * convertProduct.amount) / usdToSomRate);
            }
        } else {
            setResult(productPrices[convertProduct.from] * convertProduct.amount);
        }
    }, [convertProduct, productPrices]);
    

    const format = (number) => {
        const parsedNumber = parseFloat(number);

        if (!isNaN(parsedNumber)) {
            return parsedNumber.toFixed(2);
        } else {
            console.error('Invalid number:', number);
            return 'NaN';
        }
    };

    const changeConvertDataHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setConvertProduct((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Box className='converter'>
            <Typography sx={{ mb: 1 }} variant={'h5'}>
                Product Converter
            </Typography>
            <Card className='card'>
                <div>
                    <FormControl sx={{ mb: 2, minWidth: 100 }}>
                        <InputLabel id='from-label'>From</InputLabel>
                        <Select
                            labelId='from-label'
                            id='from-select'
                            value={convertProduct.from}
                            name='from'
                            sx={{ width: 140 }}
                            label='From'
                            onChange={changeConvertDataHandle}
                        >
                            {Object.keys(productPrices).map((product) => (
                                <MenuItem key={product} value={product}>
                                    {product}
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
                        value={convertProduct.amount}
                        onChange={changeConvertDataHandle}
                    />
                </div>

                <div>
                    <FormControl sx={{ mb: 2, minWidth: 100 }}>
                        <InputLabel id='to-label'>To</InputLabel>
                        <Select
                            labelId='to-label'
                            id='to-select'
                            value={convertProduct.to}
                            label='To'
                            sx={{ width: 140 }}
                            name='to'
                            onChange={changeConvertDataHandle}
                        >
                            <MenuItem value='som'>Som</MenuItem>
                            <MenuItem value='usd'>USD</MenuItem>
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
                        disabled
                    />
                </div>
            </Card>
        </Box>
    );
};

export default observer(ConverterAdditional);
