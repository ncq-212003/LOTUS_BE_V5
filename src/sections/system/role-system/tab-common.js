import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function TabCommon({ tabData, handleParentChange, handleChildChange }) {
    const { parentName, checked, setChecked } = tabData;

    const handleParentChangeLocal = (event) => {
        const updatedChecked = { ...checked };
        updatedChecked[parentName] = { ...checked[parentName] };
        for (const child in updatedChecked[parentName]) {
            updatedChecked[parentName][child] = event.target.checked;
        }
        setChecked(updatedChecked);
    };

    const handleChildChangeLocal = (childName, event) => {
        setChecked((prevChecked) => ({
            ...prevChecked,
            [parentName]: {
                ...prevChecked[parentName],
                [childName]: event.target.checked
            }
        }));
    };

    return (
        <Grid item xs={4}>
            <Card sx={{ border: '1px solid #ccc', borderRadius: '8px' }}>
                <CardContent>
                    <FormControlLabel
                        label={parentName}
                        control={
                            <Checkbox
                                checked={Object.values(checked[parentName]).every(value => value)}
                                indeterminate={
                                    Object.values(checked[parentName]).some(value => value) &&
                                    !Object.values(checked[parentName]).every(value => value)
                                }
                                onChange={handleParentChangeLocal}
                            />
                        }
                    />
                    <Box sx={{ borderBottom: '1px solid #ccc' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                        {Object.keys(checked[parentName]).map((childName) => (
                            <FormControlLabel
                                key={childName}
                                label={childName}
                                control={
                                    <Checkbox
                                        checked={checked[parentName][childName]}
                                        onChange={(event) => handleChildChangeLocal(childName, event)}
                                    />
                                }
                            />
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}