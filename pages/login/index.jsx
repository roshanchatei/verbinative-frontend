import {useEffect, useState} from "react";
import { useSnackbar } from "notistack";
import {useRouter} from "next/router";
import CustomTextField from "../../src/components/CustomTextField";

//MUI
import {Box, Button, CircularProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MainContainer from "@/src/components/MainContainer";
import {baseURL} from "@/src/store/config";

const Index = () => {

    const Router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const [isVisible, setIsVisible] = useState(false);
    const [loading,  setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if(isVisible){
            setTimeout(() => {
                setIsVisible(false)
            }, 3000);
        }
    }, [isVisible]);

    const handleLogin = async (demoEmail, demoPassword, isGuestLogin) => {
        let data = {
            email: isGuestLogin ? demoEmail : email,
            password: isGuestLogin ? demoPassword : password
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
            redirect: 'follow',
            mode: 'cors'
        }

        const response = await fetch(`${baseURL}/user/login`, options);
        return response.json();
    };

    const handleClick = (demoEmail, demoPassword, isGuestLogin) => {
        setLoading(true);

        handleLogin(demoEmail, demoPassword, isGuestLogin).then(async (res) => {
            if (res.message === "success") {
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("id", res.data.data.user_id);
                localStorage.setItem("username", res.data.data.username);
                localStorage.setItem("region", res.data.data.region);
                localStorage.setItem("email", res.data.data.email);
                localStorage.setItem("language", res.data.data.language);
                localStorage.setItem("language_id", res.data.data.language_id);
                setLoading(false);
                enqueueSnackbar("Login Successful", {
                    variant: "success",
                });
                Router.reload();
                // await Router.push('/')
            } else if (res.message === "error") {
                enqueueSnackbar("Login Unsuccessful: Invalid credentials", {
                    variant: "error",
                });
                setLoading(false);
            }

        }).catch((e) => console.log(e))
    }


    return (
        <>
            {
                loading && (
                    <Box
                        zIndex={10}
                        position={'absolute'} width={'100%'}
                        height={"100vh"}
                        display={'flex'} alignItems={'center'} justifyContent={'center'}
                        sx={{
                            backdropFilter: "blur(2px)",
                            backgroundColor: "rgba(193,193,193,0.22)",
                        }}
                    >
                        <CircularProgress color={'accent'}/>
                    </Box>
                )
            }
            <MainContainer current={0}>
                <Box fontSize={'24px'} fontWeight={500}>
                    Login to your account.
                </Box>
                <Box color={'#333333'} fontSize={'12px'}>
                    Enter your registered email ID and password.
                </Box>
                <Box mt={5} />
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
                <Box mt={4} />
                <Button
                    disabled={email === '' || password === ''}
                    onClick={handleClick}
                    disableElevation
                    variant={"contained"}
                    fullWidth
                    sx={{
                        backgroundColor: "#268AFF",
                        color: "#FFF",
                        borderRadius: "15px",
                        zIndex: 2,
                        py: 1.5,
                        "&:hover": {
                            backgroundColor: "#006ff8",
                        },
                        textTransform: 'none'
                    }}
                >
                    Login
                </Button>
                <Box mt={5} display={'flex'} alignItems={'center'} width={'100%'} justifyContent={'center'}>
                    <Box color={'#333333'} fontSize={'12px'}>
                        Don’t have an account?
                    </Box>
                    <Box sx={{cursor: 'pointer'}} mr={0.5} ml={0.5} fontWeight={500} fontSize={'14px'} color={'#006ff8'}
                         onClick={async () => {
                             if(!loading)
                                await Router.push('/sign-up')
                         }}
                    >
                        SIGNUP
                    </Box>
                    <Box>|</Box>
                    <Box ml={0.5} color={'#333333'} fontSize={'12px'}>
                        use
                    </Box>
                    <Box sx={{cursor: 'pointer'}} ml={0.5} fontWeight={500} fontSize={'14px'} color={'#FFA15A'}
                         onClick={() => {
                             handleClick("grpchat123@gmail.com", "123", true)
                         }}
                    >
                        GUEST LOGIN
                    </Box>
                </Box>
            </MainContainer>
        </>
    );
}
export default Index;
Index.layout = null;
Index.title = 'Login';
