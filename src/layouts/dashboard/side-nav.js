import React, { useContext } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Tooltip,
  styled,
  tooltipClasses,
} from "@mui/material";
import { Logo } from "src/components/logo";
import { LogoV2 } from "src/components/logo-v2";
import { Scrollbar } from "src/components/scrollbar";
import settingsConfig from 'src/sections/setting/general/settingsConfig';
import { items } from "./config";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import BootstrapTooltip from "src/components/tooltip";

export const SideNav = (props) => {
  const { open, onClose, openV2 } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [openSubMenu, setOpenSubMenu] = useState({});
  const [yearCopy, setyearCopy] = useState(null);

  useEffect(() => {
    setyearCopy(new Date().getFullYear().toString().slice(-2))
  }, []);

  const tagContentDrop = document.querySelector('.css-1wvnli');
  if (tagContentDrop) {
    tagContentDrop.style.setProperty('overflow-x', 'hidden', 'important');
  }

  useEffect(() => {
    if (!openV2) {
      // Đóng tất cả các submenu khi SideNav được thu lại
      setOpenSubMenu({});
    }
  }, [openV2]);

  useEffect(() => {
    // Tạo một biến để theo dõi xem đã tìm thấy menu mở nào chưa
    let foundOpenMenu = false;

    // Lặp qua danh sách các mục và kiểm tra sự khớp với URL hiện tại
    items.forEach((item) => {
      if (item.submenu) {
        const isOpen = item.submenu.some((subItem) => pathname.startsWith(subItem.path));

        // Nếu menu hiện tại mở và chưa tìm thấy menu mở nào khác
        if (isOpen && !foundOpenMenu) {
          setOpenSubMenu((prevState) => ({
            ...prevState,
            [item.title]: isOpen,
          }));
          foundOpenMenu = true; // Đánh dấu rằng đã tìm thấy menu mở
        }
      }
      if (!openV2) {
        // Đóng tất cả các submenu khi SideNav được thu lại
        setOpenSubMenu({});
      }
    });
  }, [pathname]);

  const toggleNestedList = (item) => {
    if (openV2) {
      setOpenSubMenu((prevState) => ({
        ...prevState,
        [item.title]: !prevState[item.title],
      }));
    }
  };

  const renderNestedList = (submenuItems, parentItem) => {
    return (
      <Collapse in={openSubMenu[parentItem.title]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {submenuItems.map((subItem) => (
            <ListItemButton
              key={subItem.title}
              component={NextLink}
              href={subItem.path}
              sx={{
                pl: 3,
                "&:hover": {
                  backgroundColor: "neutral.900",
                },
                ...(pathname.startsWith(subItem.path) && {
                  backgroundColor: "neutral.900",
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "40px",
                }}
              >
                {subItem.icon}
              </ListItemIcon>
              <Box
                component="span"
                sx={{
                  flexGrow: 1,
                  fontFamily: (theme) => theme.typography.fontFamily,
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: "24px",
                  whiteSpace: "nowrap",
                }}
              >
                {subItem.title}
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    );
  };

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            p: openV2 ? 3 : 1,
            textAlign: openV2 ? "center" : "none",
            marginRight: openV2 ? "50px" : "0px",
          }}
        >
          {openV2 ? (
            <>
              <Box
                component={NextLink}
                href="/"
                sx={{
                  display: "inline-flex",
                  height: 80,
                  width: 80,
                }}
              >
                {/* <Logo /> */}
                <img alt="" src="/assets/logos/logo.png" />
              </Box>
            </>
          ) : (
            <>
              <Box
                component={NextLink}
                href="/"
                sx={{
                  display: "inline-flex",
                  height: 20,
                  width: 20,
                }}
              >
                {/* <Logo /> */}
                <img alt="" src="/assets/logos/logo-mini.png" />
              </Box>
            </>
          )}
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            // px: 2,
            // py: 3,
          }}
        >
          <List>
            {items.map((item) => {
              return (
                <React.Fragment key={item.title}>
                  {item.submenu ? (
                    <div>
                      {openV2 ? (
                        // Render without Tooltip if openV2 is true
                        <ListItemButton
                          sx={{
                            cursor: "pointer",
                            padding: "4px 16px",
                            "&:hover": {
                              backgroundColor: "neutral.900",
                            },
                          }}
                          onClick={() => toggleNestedList(item)}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: "40px",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <Box
                            component="span"
                            sx={{
                              flexGrow: 1,
                              fontFamily: (theme) => theme.typography.fontFamily,
                              fontSize: 13,
                              fontWeight: 600,
                              lineHeight: "24px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.title}
                          </Box>
                          <IconButton size="small">
                            {openSubMenu[item.title] ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                        </ListItemButton>
                      ) : (
                        // Render with Tooltip if openV2 is false
                        <BootstrapTooltip
                          title={
                            <>
                              <Typography
                                sx={{
                                  textAlign: "center",
                                  padding: "8px 0",
                                }}
                              >
                                {item.title}
                              </Typography>
                              <Divider />
                              <List component="div" disablePadding>
                                {item.submenu.map((subItem) => (
                                  <ListItemButton
                                    key={subItem.title}
                                    component={NextLink}
                                    href={subItem.path}
                                    sx={{
                                      "&:hover": {
                                        backgroundColor: "neutral.400",
                                      },
                                      ...(subItem.path === pathname && {
                                        backgroundColor: "neutral.400",
                                      }),
                                    }}
                                  >
                                    <Box
                                      component="span"
                                      sx={{
                                        flexGrow: 1,
                                        fontFamily: (theme) => theme.typography.fontFamily,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        lineHeight: "24px",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {subItem.title}
                                    </Box>
                                  </ListItemButton>
                                ))}
                              </List>
                            </>
                          }
                          key={item.title}
                          placement="right"
                        >
                          <ListItemButton
                            sx={{
                              cursor: "pointer",
                              padding: "4px 16px",
                              "&:hover": {
                                backgroundColor: "neutral.900",
                              },
                              ...(item.submenu.some(
                                (subItem) =>
                                  subItem.path === pathname || pathname.startsWith(subItem.path)
                              ) && {
                                backgroundColor: "neutral.900",
                              }),
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: "40px",
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                            <Box
                              component="span"
                              sx={{
                                flexGrow: 1,
                                fontFamily: (theme) => theme.typography.fontFamily,
                                fontSize: 13,
                                fontWeight: 600,
                                lineHeight: "24px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.title}
                            </Box>
                            <IconButton size="small">
                              {openSubMenu[item.title] ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                          </ListItemButton>
                        </BootstrapTooltip>
                      )}
                      {renderNestedList(item.submenu, item)}
                    </div>
                  ) : (
                    <>
                      {!openV2 ? (
                        <Tooltip key={item.title} title={item.title} placement="right">
                          <ListItemButton
                            component={NextLink}
                            href={item.path}
                            sx={{
                              "&:hover": {
                                backgroundColor: "neutral.900",
                              },
                              ...(item.path === pathname && {
                                backgroundColor: "neutral.900",
                              }),
                              fontSize: "14px",
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: "40px",
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                            <Box
                              component="span"
                              sx={{
                                flexGrow: 1,
                                fontFamily: (theme) => theme.typography.fontFamily,
                                fontSize: 13,
                                fontWeight: 600,
                                lineHeight: "24px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.title}
                            </Box>
                          </ListItemButton>
                        </Tooltip>
                      ) : (
                        <ListItemButton
                          component={NextLink}
                          href={item.path}
                          sx={{
                            "&:hover": {
                              backgroundColor: "neutral.900",
                            },
                            ...(item.path === pathname && {
                              backgroundColor: "neutral.900",
                            }),
                            fontSize: "14px",
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: "40px",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <Box
                            component="span"
                            sx={{
                              flexGrow: 1,
                              fontFamily: (theme) => theme.typography.fontFamily,
                              fontSize: 13,
                              fontWeight: 600,
                              lineHeight: "24px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.title}
                          </Box>
                        </ListItemButton>
                      )}
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        {/* <Typography variant="subtitle1"
          sx={{
            padding: "12px 8px",
          }}>
          Copyright &copy; Lotus Ocean 2023-{yearCopy}
        </Typography> */}
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={openV2}
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: openV2 ? 270 : 54,
            visibility: "visible !important",
            transform: "none !important",
            overflowX: openV2 && "hidden",
          },
        }}
        variant="persistent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 270,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};