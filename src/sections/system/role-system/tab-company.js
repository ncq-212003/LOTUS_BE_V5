import * as React from 'react';
import Grid from '@mui/material/Grid';
import TabCommon from './tab-common';

export default function TabCompany() {
    const [tabs, setTabs] = React.useState({
        'Công ty': {
            'Danh sách công ty': false,
            'Thêm công ty': false,
            'Sửa công ty': false,
            'Xóa công ty': false
        },
        'Nhân viên': {
            'Danh sách nhân viên': false,
            'Thêm nhân viên': false,
            'Sửa nhân viên': false,
            'Xóa nhân viên': false
        },
        'Phòng ban': {
            'Danh sách phòng ban': false,
            'Thêm phòng ban': false,
            'Sửa phòng ban': false,
            'Xóa phòng ban': false
        },
        'Chi nhánh': {
            'Danh sách chi nhánh': false,
            'Thêm chi nhánh': false,
            'Sửa chi nhánh': false,
            'Xóa chi nhánh': false
        },
        'Nguồn cung ứng': {
            'Danh sách nguồn cung ứng': false,
            'Thêm nguồn cung ứng': false,
            'Sửa nguồn cung ứng': false,
            'Xóa nguồn cung ứng': false
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

