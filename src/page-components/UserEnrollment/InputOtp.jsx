import {Box, Button} from "@mui/material";
import {useEffect, useState} from "react";
import OtpInput from "react-otp-input";

const InputOtp = ({changeBackground}) => {

    const [time, setTime] = useState(30);
    const [otp, setOtp] = useState("");

    useEffect(() => {
        if (time > 0) {
            setTimeout(function () {
                setTime(time - 1);
            }, 1000);
        }
    }, [time]);

    const handleVerifyOtp = (value) => {
        changeBackground('error')
    }

        return (
        <>
            <Box width={'100%'} pl={2}>
                <Box display={'flex'} alignItems={'center'} width={'100%'} fontSize={'20px'}>
                    <Box fontWeight={500}>
                        Verifying Your Phone Number
                    </Box>
                    <Box
                        ml={2.5}
                        color={"red"}
                    >
                        {time !== 0 ? "00:" + (time < 10 ? "0" : "") + time : "00:00"}
                    </Box>
                </Box>

                <Box  fontSize={'16px'} color={'#b2b2b2'} mb={2}>
                    For your security Aerofit wants to make sure that it’s really you. Aerofit will send a text message with a 6-digit verification code.
                </Box>
                <OtpInput
                    errorStyle="error"
                    focusStyle={{
                        border: "3px solid #181935",
                    }}
                    hasErrored={false}
                    inputStyle={{
                        color: "#000",
                        backgroundColor: "#F6F2E6",
                        width: 50,
                        height: 60,
                        borderRadius: "10px",
                        border: `1px solid #F6F2E6`,
                        outline: "none",
                        fontSize: '20px',
                    }}
                    isDisabled={false}
                    isInputNum={true}
                    numInputs={6}
                    separator={
                        <Box width={'10px'} />
                    }
                    value={otp}
                    onChange={(value) => {
                        setOtp(value);
                        if (value.length === 6) {
                            handleVerifyOtp(value);
                        }
                    }}
                    shouldAutoFocus
                />
                <Box width={'100%'} display={'flex'} alignItems={'center'} mt={3}>
                    <Box color={"#ACACAC"}>Didn’t receive the code?</Box>
                    <Button
                        variant={'outlined'}
                        disableElevation
                        disabled={time !== 0}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '10px',
                            ml: 2,
                            fontSize: '14px'
                        }}
                        onClick={() => {
                            setTime(30);
                        }}
                    >
                        Resend OTP
                    </Button>
                </Box>

            </Box>
        </>
    );
};

export default InputOtp;
