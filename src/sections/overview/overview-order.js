import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

export const OverviewOrder = (props) => {
    const { orders = [], sx } = props;

    return (
        <Card sx={sx}>
            <CardHeader title="Đơn hàng gần đây" />
            <Scrollbar sx={{ flexGrow: 1 }}>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Nghiệp đoàn
                                </TableCell>
                                <TableCell>
                                    Hình ảnh
                                </TableCell>
                                <TableCell>
                                    Xí nghiệp tiếp nhận
                                </TableCell>
                                <TableCell>
                                    Tên đơn hàng
                                </TableCell>
                                <TableCell>
                                    Ngành tuyển
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => {

                                return (
                                    <TableRow
                                        hover
                                        key={order.id}
                                    >
                                        <TableCell>
                                            {order.nghiepDoan}
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
                                            {order.xiNghiepNhan}
                                        </TableCell>
                                        <TableCell>
                                            {order.tenDonHang}
                                        </TableCell>
                                        <TableCell>
                                            {order.nganhTuyen}
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

OverviewOrder.propTypes = {
    products: PropTypes.array,
    sx: PropTypes.object
};
