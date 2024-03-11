import * as React from 'react';
import Grid from '@mui/material/Grid';
import TabCommon from './tab-common';

export default function TabDocument() {
    const [tabs, setTabs] = React.useState({
        'Cá nhân': {
            'Danh sách hồ sơ cá nhân': false,
            'Thêm hồ sơ cá nhân': false,
            'Sửa hồ sơ cá nhân': false,
            'Xóa hồ sơ cá nhân': false
        },
        'Dịch thuật': {
            'Danh sách hồ sơ dịch thuật': false,
            'Thêm hồ sơ dịch thuật': false,
            'Sửa hồ sơ dịch thuật': false,
            'Xóa hồ sơ dịch thuật': false
        },
        'Bằng cấp chứng chỉ': {
            'Danh sách bằng cấp chứng chỉ': false,
            'Thêm bằng cấp chứng chỉ': false,
            'Sửa bằng cấp chứng chỉ': false,
            'Xóa bằng cấp chứng chỉ': false
        },
        'Báo cáo': {
            'Danh sách báo cáo': false,
            'Thêm báo cáo': false,
            'Sửa báo cáo': false,
            'Xóa báo cáo': false
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

