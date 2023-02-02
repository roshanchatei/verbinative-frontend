import {Box} from "@mui/material";
import CustomTextField from "../../components/CustomTextField";

const InputUser = () => {

    return (
        <>
            <Box width={'100%'} pl={2}>
                {/*<Box fontSize={'20px'} fontWeight={500} mb={5}>*/}
                {/*    Enter user ID*/}
                {/*</Box>*/}
                <Box width={'350px'}>
                    <CustomTextField
                        label={"User ID"}
                        type={"number"}
                        // value={email}
                        // onChange={(event) => {
                        //     setEmail(event.target.value);
                        // }}
                    />
                </Box>

            </Box>
        </>
    );
};

export default InputUser;
