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

export const OverviewLichChung = (props) => {
    const { orders = [], sx } = props;

    return (
        <Card sx={sx}>
            <CardHeader title="Lịch của mọi người" />
            <Scrollbar sx={{ flexGrow: 1 }}>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Loại lịch
                                </TableCell>
                                <TableCell>
                                    Tên khách hàng
                                </TableCell>
                                <TableCell>
                                    Địa điểm
                                </TableCell>
                                <TableCell sortDirection="desc">
                                    Ngày bắt đầu
                                </TableCell>
                                <TableCell sortDirection="desc">
                                    Ngày kết thúc
                                </TableCell>
                                <TableCell>
                                    Chịu trách nhiệm chính
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => {
                                const timeStart = format(order.timeStart, 'dd/MM/yyyy');
                                const timeEnd = format(order.timeEnd, 'dd/MM/yyyy');

                                return (
                                    <TableRow
                                        hover
                                        key={order.id}
                                    >
                                        <TableCell>
                                            {order.loaiLich}
                                        </TableCell>
                                        <TableCell>
                                            {order.customer.name}
                                        </TableCell>
                                        <TableCell>
                                            {order.diaDiem}
                                        </TableCell>
                                        <TableCell>
                                            {timeStart}
                                        </TableCell>
                                        <TableCell>
                                            {timeEnd}
                                        </TableCell>
                                        <TableCell>
                                            {order.chiuTrachNhiem}
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

OverviewLichChung.prototype = {
    orders: PropTypes.array,
    sx: PropTypes.object
};
