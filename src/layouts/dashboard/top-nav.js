import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { usePopover } from "src/hooks/use-popover";
import { AccountPopover } from "./account-popover";
import Link from "next/link";
// import { MarketContext } from "src/contexts/market-context";
import { useRouter } from "next/navigation";
import { NotifyPopover } from "./notify-popover";

const SIDE_NAV_WIDTH = 270;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen, open, setOpen, setClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();
  const notifyPopover = usePopover();
  // const context = useContext(MarketContext);
  const router = useRouter();
  const handleMarket = () => {
    router.push("/market");
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${open ? SIDE_NAV_WIDTH : 54}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${open ? SIDE_NAV_WIDTH : 54}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp ? (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={open ? setClose : setOpen}
                edge="start"
                // sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            {/* <Tooltip title="Search">
                            <IconButton>
                                <SvgIcon fontSize="small">
                                    <MagnifyingGlassIcon />
                                </SvgIcon>
                            </IconButton>
                        </Tooltip> */}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                marginTop: "3px",
                padding: "5px",
                backgroundColor: "#f6f1f1",
                borderRadius: "4px",
              }}
            >
              <Typography
                size="small"
                sx={{
                  fontFamily: (theme) => theme.typography.fontFamily,
                  fontSize: 10,
                  fontWeight: 600,
                  marginTop: "3px",
                }}
              >
                Thị trường{" "}
                {window.sessionStorage.getItem("market") === undefined || window.sessionStorage.getItem("market") === null
                  ? window.sessionStorage.getItem("market")?.marketName
                  : "Nhật Bản"}
              </Typography>
              <Tooltip>
                <a onClick={handleMarket}>
                  <IconButton>
                    <SvgIcon fontSize="small">
                      <AddBusinessIcon />
                    </SvgIcon>
                  </IconButton>
                </a>
              </Tooltip>
            </Box>
            <Tooltip title="Nhân viên">
              <Link href="/company/employee">
                <IconButton>
                  <SvgIcon fontSize="small">
                    <UsersIcon />
                  </SvgIcon>
                </IconButton>
              </Link>
            </Tooltip>
            {/* <Tooltip
              title="Thông báo"
              onClick={notifyPopover.handleOpen}
              // onMouseEnter={notifyPopover.handleOpen}
              // onMouseLeave={notifyPopover.handleClose}
              ref={notifyPopover.anchorRef}
            >
              <IconButton>
                <Badge badgeContent={4} color="success" variant="dot">
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip> */}
            <Avatar
              src="/assets/avatars/avt.png"
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: "pointer",
                height: 40,
                width: 40,
              }}
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
      <NotifyPopover
        anchorEl={notifyPopover.anchorRef.current}
        open={notifyPopover.open}
        onClose={notifyPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
