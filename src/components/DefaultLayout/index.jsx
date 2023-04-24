import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import {Avatar, Box, Drawer, Menu, MenuItem} from "@mui/material";
import PropTypes from "prop-types";
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";
import {useRef, useState} from "react";

//MUI Icons
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from "@mui/icons-material/Close";
import {countries} from "@/src/store/countries";
import Profile from "@/src/page-components/Home/Profile";

const Index = (props) => {

    const Router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const handleGoToHome = async () => {
        await Router.push('/')
    }

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleCloseMenu = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event?.target)) {
            return;
        }
        setOpen(false);
    };

    const getCountryFlag = () => {
        const country = localStorage.getItem('region');
        const temp = countries.find(each => each.name === country);
        console.log(temp)

        return `https://flagcdn.com/40x30/${temp.code}.png`
    }

    //Drawer Helper State
    const [mobOpen, setMobOpen] = useState(false);
    const handleMobDrawer = () => {
        setMobOpen(!mobOpen);
        setOpen(false)
    };
    const drawerWidth = 500;

    return(
        <>
            <AppBar
                color={"transparent"}
                elevation={0}
                position="fixed"
                sx={{
                    background: '#F6F2E6',
                }}
            >
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} color={'#181935'}>
                    <Box display={'flex'} alignItems={'center'}>
                        <Box pt={0.7} ml={2} mr={6} onClick={handleGoToHome} sx={{cursor: 'pointer'}}>
                            <img src={'/images/logo-color.svg'} width={'55px'} />
                        </Box>
                        <Box
                            fontFamily={'Saira Condensed, sans-serif'}
                            fontSize={'30px'}
                            fontWeight={600}
                            letterSpacing={'0.1px'}
                            onClick={handleGoToHome}
                            sx={{cursor: 'pointer'}}
                        >
                           VerbiNative
                        </Box>
                    </Box>
                    <Box display={'flex'} alignItems={'center'}>
                        {/*<img src={getCountryFlag()} alt={'flag'} />*/}
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            mr={4}
                            ref={anchorRef}
                            sx={{ cursor: "pointer" }}
                            onClick={handleToggle}
                        >
                            <Avatar sx={{background: '#181935'}}>{localStorage.getItem('username')[0].toUpperCase()}</Avatar>
                            <Box
                                bgcolor={"#cecece"}
                                pr={1.5}
                                pl={2}
                                py={0.2}
                                fontSize={"13px"}
                                borderRadius={"5px"}
                                ml={-1}
                            >
                                {localStorage.getItem('username')}
                            </Box>
                        </Box>
                        <Menu
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            anchorEl={anchorRef.current}
                            open={open}
                            onClose={handleCloseMenu}
                            sx={{
                                "& .MuiPaper-root": {
                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
                                    borderRadius: "15px 0px 15px 15px",
                                },
                            }}
                        >
                            <MenuItem onClick={handleMobDrawer} sx={{ py: 1 }}>Profile</MenuItem>
                            <MenuItem sx={{ py: 1 }}>FAQ</MenuItem>
                            <MenuItem sx={{ py: 1 }}>Support</MenuItem>
                            <MenuItem sx={{ py: 1 }}>About Us</MenuItem>
                            <MenuItem sx={{ py: 1 }}>Privacy Policy</MenuItem>
                            <MenuItem sx={{ py: 1 }}>Term & Conditions</MenuItem>
                            <MenuItem
                                sx={{ py: 1, color: 'red' }}
                                onClick={async () => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("id");
                                    localStorage.removeItem("username");
                                    localStorage.removeItem("region");
                                    localStorage.removeItem("email");
                                    localStorage.removeItem("language");
                                    localStorage.removeItem("language_id");
                                    await Router.push('/login')
                                    enqueueSnackbar("Successfully Logged Out", {
                                        variant: "success",
                                    });
                                }}
                            >
                                Log Out
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </AppBar>


            <Drawer anchor={'right'} open={mobOpen} onClose={handleMobDrawer}>
                <Box width={drawerWidth}>
                    <Box
                        width={"100%"}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 3,
                            pt: 4,
                            pb: 3,
                        }}
                        onClick={() => {
                            setMobOpen(false);
                        }}
                    >
                        <Box fontWeight={600} fontSize={'24px'}>
                            Profile
                        </Box>
                        <IconButton onClick={handleMobDrawer}>
                            <CloseIcon sx={{color: 'red'}} />
                        </IconButton>
                    </Box>
                    <Profile />
                </Box>
            </Drawer>


            <Box pt={6} width={'100%'} display={'flex'} height={'100vh'}>
                {props.children}
            </Box>
        </>
    )
}

export default Index;

Index.propTypes = {
    children: PropTypes.node,
};