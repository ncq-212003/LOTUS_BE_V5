import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Box, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const RoleSystemSearch = () => (
    <Box>
        <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Tìm kiếm"
            startAdornment={(
                <InputAdornment position="start">
                    <SvgIcon
                        color="action"
                        fontSize="small"
                    >
                        <MagnifyingGlassIcon />
                    </SvgIcon>
                </InputAdornment>
            )}
            sx={{ maxWidth: 900 }}
        />
    </Box>
);
