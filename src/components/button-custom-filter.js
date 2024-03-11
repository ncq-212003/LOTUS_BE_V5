import { Button, styled } from "@mui/material";

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    padding: '6px 12px',
    border: '1px solid',
    backgroundColor: '#4b9949',
    borderRadius: '1px',
    '&:hover': {
        backgroundColor: '#4b9949',
        borderColor: '#4b9949',
        boxShadow: 'none',
    },
    '&:focus': {
        boxShadow: 'none',
        backgroundColor: '#1C2536',
    },
});

export default BootstrapButton;