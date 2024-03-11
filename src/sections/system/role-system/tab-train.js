import * as React from 'react';
import Grid from '@mui/material/Grid';
import TabCommon from './tab-common';

export default function TabTrain() {
    const [tabs, setTabs] = React.useState({
        'Bài thi': {
            'Danh sách bài thi': false,
            'Thêm bài thi': false,
            'Sửa bài thi': false,
            'Xóa bài thi': false
        },
        'Câu hỏi': {
            'Danh sách câu hỏi': false,
            'Thêm câu hỏi': false,
            'Sửa câu hỏi': false,
            'Xóa câu hỏi': false
        },
        'Danh sách học viên': {
            'Danh sách học viên': false,
            'Thêm học viên': false,
            'Sửa học viên': false,
            'Xóa học viên': false
        },
        'Danh sách lớp': {
            'Danh sách lớp': false,
            'Thêm lớp': false,
            'Sửa lớp': false,
            'Xóa lớp': false
        },
        'Danh sách giáo viên': {
            'Danh sách giáo viên': false,
            'Thêm giáo viên': false,
            'Sửa giáo viên': false,
            'Xóa giáo viên': false
        },
        'Học viên đang thi tuyển': {
            'Danh sách học viên đang thi tuyển': false,
            'Thêm học viên đang thi tuyển': false,
            'Sửa học viên đang thi tuyển': false,
            'Xóa học viên đang thi tuyển': false
        },
        'Học viên chưa trúng tuyển': {
            'Danh sách học viên chưa trúng tuyển': false,
            'Thêm học viên chưa trúng tuyển': false,
            'Sửa học viên chưa trúng tuyển': false,
            'Xóa học viên chưa trúng tuyển': false
        },
        'Báo cáo bảng điểm': {
            'Danh sách báo cáo bảng điểm': false,
            'Thêm báo cáo bảng điểm': false,
            'Sửa báo cáo bảng điểm': false,
            'Xóa báo cáo bảng điểm': false
        },
        'Báo cáo học tập': {
            'Danh sách báo cáo học tập': false,
            'Thêm báo cáo học tập': false,
            'Sửa báo cáo học tập': false,
            'Xóa báo cáo học tập': false
        },
        'Báo cáo điểm danh': {
            'Danh sách báo cáo điểm danh': false,
            'Thêm báo cáo điểm danh': false,
            'Sửa báo cáo điểm danh': false,
            'Xóa báo cáo điểm danh': false
        },
        'Chứng chỉ': {
            'Danh sách chứng chỉ': false,
            'Thêm chứng chỉ': false,
            'Sửa chứng chỉ': false,
            'Xóa chứng chỉ': false
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

