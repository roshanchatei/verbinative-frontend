import {Box, Button} from "@mui/material";
import CustomTextField from "@/src/components/CustomTextField";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {useEffect, useState} from "react";

const Index = ({email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, setCurrent}) => {


    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);

    //change password visibility
    useEffect(() => {
        if(isVisible1 || isVisible2){
            setTimeout(() => {
                setIsVisible1(false)
                setIsVisible2(false)
            }, 3000);
        }
    }, [isVisible1, isVisible2]);


    return (
        <>
            <Box fontSize={'24px'} fontWeight={500}>
                Create new Login credentials.
            </Box>
            <Box color={'#333333'} fontSize={'12px'}>
                Enter your email ID to register your account and set a password for your account.
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
                type={isVisible1 ? 'text' : 'password'}
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
                endAdornment={
                    password === "" ? (<></>) : (
                        <IconButton
                            onClick={()=>{
                                setIsVisible1(!isVisible1)
                            }}
                        >
                            {isVisible1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    )
                }
            />
            <Box mt={2} />
            <CustomTextField
                page={'login'}
                label={"Confirm Password"}
                type={isVisible2 ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(event) => {
                    setConfirmPassword(event.target.value);
                }}
                endAdornment={
                    confirmPassword === "" ? (<></>) : (
                        <IconButton
                            onClick={()=>{
                                setIsVisible2(!isVisible2)
                            }}
                        >
                            {isVisible2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    )
                }
            />
            <Box mt={4} />
            <Button
                disabled={email === '' || password === '' || confirmPassword === ''}
                onClick={() => {
                    setCurrent(1)
                }}
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
                        // fontWeight: "600",
                        backgroundColor: "#006ff8",
                    },
                    textTransform: 'none'
                }}
            >
                Next
            </Button>
        </>
    );
}

export default Index;