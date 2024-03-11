import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    Divider,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
    pending: 'warning',
    delivered: 'success',
    refunded: 'error'
};

export const OverviewNghiepDoan = (props) => {
    const { orders = [], sx } = props;

    return (
        <Card sx={sx}>
            <CardHeader title="Nghiệp đoàn đã nhận" />
            <Scrollbar sx={{ flexGrow: 1 }}>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Tên nghiệp đoàn
                                </TableCell>
                                <TableCell>
                                    Hình ảnh
                                </TableCell>
                                <TableCell>
                                    Tình trạng trình cục
                                </TableCell>
                                <TableCell>
                                    Địa chỉ
                                </TableCell>
                                <TableCell sortDirection="desc">
                                    Họ tên người đại diện
                                </TableCell>
                                <TableCell sortDirection="desc">
                                    Ngày đăng ký
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => {
                                const createdAt = format(order.createdAt, 'dd/MM/yyyy');

                                return (
                                    <TableRow
                                        hover
                                        key={order.id}
                                    >
                                        <TableCell>
                                            {order.tenNghiepDoan}
                                        </TableCell>
                                        <TableCell>
                                            {order.image ? (
                                                <Box
                                                    component="img"
                                                    src={order.image}
                                                    alt="Product Image"
                                                    sx={{
                                                        borderRadius: 1,
                                                        height: 48,
                                                        width: 48
                                                    }}
                                                />
                                            ) : (
                                                <Box
                                                    sx={{
                                                        borderRadius: 1,
                                                        backgroundColor: 'neutral.200',
                                                        height: 48,
                                                        width: 48
                                                    }}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {order.tinhTrang}
                                        </TableCell>
                                        <TableCell>
                                            {order.diaChi}
                                        </TableCell>
                                        <TableCell>
                                            {order.nguoiDaiDien}
                                        </TableCell>
                                        <TableCell>
                                            {createdAt}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    color="inherit"
                    endIcon={(
                        <SvgIcon fontSize="small">
                            <ArrowRightIcon />
                        </SvgIcon>
                    )}
                    size="small"
                    variant="text"
                >
                    Xem tất cả
                </Button>
            </CardActions>
        </Card>
    );
};

OverviewNghiepDoan.prototype = {
    orders: PropTypes.array,
    sx: PropTypes.object
};
