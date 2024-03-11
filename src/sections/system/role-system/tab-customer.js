import * as React from 'react';
import Grid from '@mui/material/Grid';
import TabCommon from './tab-common';

export default function TabCustomer() {
    const [tabs, setTabs] = React.useState({
        'Nghiệp đoàn': {
            'Danh sách nghiệp đoàn': false,
            'Thêm nghiệp đoàn': false,
            'Sửa nghiệp đoàn': false,
            'Xóa nghiệp đoàn': false
        },
        'Công ty tiếp nhận': {
            'Danh sách công ty tiếp nhận': false,
            'Thêm công ty tiếp nhận': false,
            'Sửa công ty tiếp nhận': false,
            'Xóa công ty tiếp nhận': false
        },
        'Khiếu nại': {
            'Danh sách khiếu nại': false,
            'Thêm khiếu nại': false,
            'Sửa khiếu nại': false,
            'Xóa khiếu nại': false
        }
    });

    const handleParentChange = (parentName, event) => {
        const updatedTabs = { ...tabs };
        updatedTabs[parentName] = { ...tabs[parentName] };
        for (const child in updatedTabs[parentName]) {
            updatedTabs[parentName][child] = event.target.checked;
        }
        setTabs(updatedTabs);
    };

    const handleChildChange = (parentName, childName, event) => {
        setTabs((prevTabs) => ({
            ...prevTabs,
            [parentName]: {
                ...prevTabs[parentName],
                [childName]: event.target.checked
            }
        }));
    };

    return (
        <Grid container spacing={3}>
            {Object.keys(tabs).map((parentName) => (
                <TabCommon
                    key={parentName}
                    tabData={{
                        parentName,
                        checked: tabs,
                        setChecked: setTabs,
                        handleParentChange: (event) => handleParentChange(parentName, event),
                        handleChildChange: (childName, event) => handleChildChange(parentName, childName, event)
                    }}
                />
            ))}
        </Grid>
    );
}

