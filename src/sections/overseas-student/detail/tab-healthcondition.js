import {
    Box,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

export default function TabHealthCondition({ rowData }) {
    const {
        groupBlood,
        weight,
        height,
        isDrinkWine,
        isSmoke,
        eyeSightRight,
        eyeSightLeft,
        strongHand,
        colorBlindness,
        sweatyHands,
        afraidHeight,
        haveTatoo,
        detailTatoo,
    } = rowData;

    const valueIsdrinkWine = isDrinkWine === true ? "Có" : "Không";
    const valueIsSmoke = isSmoke === true ? "Có" : "Không";

    return (
        <>
            <Stack spacing={3}>
                <Grid
                    container
                    spacing={2}

                >
                    <Grid
                        item
                        sm={12}
                        md={6}
                        xs={12}
                    >
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                                textAlign='center'
                            >
                                Tình trạng sức khỏe
                            </Typography>
                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Nhóm máu:</span> {groupBlood}
                            </Typography>

                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Cân nặng:</span> {weight} kg
                            </Typography>
                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Chiều cao:</span> {height} cm
                            </Typography>

                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Uống rượu:</span> {valueIsdrinkWine}
                            </Typography>
                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Hút thuốc:</span> {valueIsSmoke}
                            </Typography>

                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Thị lực (trái):</span> {eyeSightLeft}/10
                            </Typography>
                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Thị lực (phải):</span> {eyeSightRight}/10
                            </Typography>

                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Tay thuận:</span> {strongHand}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        sm={12}
                        md={6}
                        xs={12}
                    >
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                                textAlign='center'
                            >
                                Hồ sơ sức khỏe
                            </Typography>
                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Mù màu:</span> {colorBlindness}
                            </Typography>

                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Mồ hôi tay:</span> {sweatyHands}
                            </Typography>
                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Sợ độ cao:</span> {afraidHeight}
                            </Typography>

                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Hình xăm:</span> {haveTatoo}
                            </Typography>
                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Chi tiết hình xăm:</span> {detailTatoo}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};