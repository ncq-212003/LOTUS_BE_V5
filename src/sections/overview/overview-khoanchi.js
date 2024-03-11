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

export const OverviewKhoanChi = (props) => {
    const { orders = [], sx } = props;

    return (
        <Card sx={sx}>
            <CardHeader title="Khoản chi" />
            <Scrollbar sx={{ flexGrow: 1 }}>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Loại
                                </TableCell>
                                <TableCell>
                                    Nhân viên
                                </TableCell>
                                <TableCell>
                                    Điện thoại
                                </TableCell>
                                <TableCell>
                                    Tổng tiền
                                </TableCell>
                                <TableCell sortDirection="desc">
                                    Tài khoản thanh toán
                                </TableCell>
                                <TableCell sortDirection="desc">
                                    Ngày
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
                                            {order.loai}
                                        </TableCell>
                                        <TableCell>
                                            {order.name}
                                        </TableCell>
                                        <TableCell>
                                            {order.dienthoai}
                                        </TableCell>
                                        <TableCell>
                                            {order.tongTien}
                                        </TableCell>
                                        <TableCell>
                                            {order.Tkthanhtoan}
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

OverviewKhoanChi.prototype = {
    orders: PropTypes.array,
    sx: PropTypes.object
};
