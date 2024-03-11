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

export const OverviewLatestDHS = (props) => {
  const { orders = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Du học sinh gần đây" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 700 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Mã hồ sơ
                </TableCell>
                <TableCell>
                  Hình ảnh
                </TableCell>
                <TableCell>
                  Tên
                </TableCell>
                <TableCell sortDirection="desc">
                  Ngày đăng kí
                </TableCell>
                <TableCell>
                  Status
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
                      {order.ref}
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
                      {order.customer.name}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.status}
                      </SeverityPill>
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

OverviewLatestDHS.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
