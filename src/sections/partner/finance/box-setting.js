import { Button, Grid, IconButton, SvgIcon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import NextLink from 'next/link';
import settingsConfig from "./settingsConfig";
import { useState } from "react";
import { Check } from "@mui/icons-material";

export default function BoxSetting() {

    return (
        <Grid
            container
            spacing={2}
        >
            {/* Hiển thị các box theo từng nhóm */}
            {settingsConfig.map((setting, index) => (
                <Grid
                    item
                    key={index}
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{
                        padding: '12px !important',
                        display: 'flex'
                    }}
                >
                    <Box
                        component={NextLink}
                        href={setting.path}
                        sx={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "16px",
                            textAlign: "center",
                            cursor: "pointer",
                            width: '100%',
                            textDecoration: 'none',
                            color: '#000'
                        }}
                    >
                        <IconButton>
                            {setting.icon}
                        </IconButton>
                        <Typography>
                            {setting.title}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}