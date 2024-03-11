import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { 
        field: 'stt', 
        headerName: 'STT', 
        width: 70
    },
    { 
        field: 'tenTruong', 
        headerName: 'Tên trường', 
        width: 200
    },
    { 
        field: 'xepHang', 
        headerName: 'Xếp hạng', 
        width: 130
    },
    {
        field: 'thiTruong',
        headerName: 'Thị trường',
        width: 150
    }
];

// Dữ liệu mẫu
const rows = [
    { id: 1, stt: 1, tenTruong: 'Đại học Quốc gia Hà Nội', xepHang: 'Top 5', thiTruong: 'Việt Nam' },
    { id: 2, stt: 2, tenTruong: 'Đại học Quốc gia TP Hồ Chí Minh', xepHang: 'Top 10', thiTruong: 'Việt Nam' },
    { id: 3, stt: 3, tenTruong: 'Đại học Stanford', xepHang: 'Top 10', thiTruong: 'Mỹ' },
    { id: 4, stt: 4, tenTruong: 'Đại học Harvard', xepHang: 'Top 5', thiTruong: 'Mỹ' },
    // Thêm các hàng dữ liệu trường khác ở đây
];

export default function UniversityTable() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                sx={{
                    borderColor: 'rgb(224, 224, 224)',
                    '& .MuiDataGrid-row': {
                        border: '0.1px solid rgb(224, 224, 224) !important',
                    },
                }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
