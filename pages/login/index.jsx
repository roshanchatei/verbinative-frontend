import {useEffect, useState} from "react";
import { useSnackbar } from "notistack";
import {useRouter} from "next/router";
import CustomTextField from "../../src/components/CustomTextField";

//MUI
import {Box, Button, AppBar, CircularProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Index = () => {

    const Router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const [isVisible, setIsVisible] = useState(false);
    const [loading,  setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //change password visibility
    useEffect(() => {
       if(isVisible){
           setTimeout(() => {
               setIsVisible(false)
           }, 3000);
       }
    }, [isVisible]);

    const handleLogin = () => {
        setLoading(true);
        localStorage.setItem("access-token", "xt123");
        setTimeout(async () => {
            await Router.push('/')
        }, 2000);
        enqueueSnackbar("Login Successful", {
            variant: "success",
        });
    }

    return (
        <>
            {/*<AppBar*/}
            {/*    color={"transparent"}*/}
            {/*    elevation={0}*/}
            {/*    position="fixed"*/}
            {/*    sx={{*/}
            {/*        background: '#F6F2E6',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Box pt={0.6} ml={2}>*/}
            {/*        <img src={'/images/logo-dark.svg'} width={'55px'} />*/}
            {/*    </Box>*/}

            {/*</AppBar>*/}
            <Box width={'100%'} height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Box bgcolor={'#898989'} width={'380px'} p={3} pt={4} mt={3} borderRadius={3}>
                    <CustomTextField
                        page={'login'}
                        label={"Enter Email ID"}
                        type={"email"}
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <Box mt={2} />
                    <CustomTextField
                        page={'login'}
                        label={"Enter Password"}
                        type={isVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        endAdornment={
                            password === "" ? (<></>) : (
                                <IconButton
                                    onClick={()=>{
                                        setIsVisible(!isVisible)
                                    }}
                                >
                                    {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            )
                        }
                    />
                    <Box mt={3} />
                    <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                        <Button
                            variant={'contained'}
                            disableElevation
                            sx={{
                                textTransform: 'none',
                                borderRadius: '10px',
                                height: '37px',
                                width: '85px',
                                px: 3
                            }}
                            disabled={(email === "" || password === "") || loading}
                            onClick={handleLogin}
                        >
                            {loading ? ( <CircularProgress size={23} />) : 'Login'}

                        </Button>
                    </Box>

                </Box>
            </Box>
        </>
    );
}
export default Index;
Index.layout = null;
Index.title = 'Login';
