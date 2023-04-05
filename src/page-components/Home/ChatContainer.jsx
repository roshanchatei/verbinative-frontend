import {Box} from "@mui/material";

const ChatContainer = ({type, msg}) => {


    return (
        <>
            <Box width={'100%'} mt={2} display={'flex'} justifyContent={type === 1 ? 'flex-end' : 'flex-start'}>
                <Box
                    borderRadius={type === 1 ? '20px 0 20px 20px' : '0 20px 20px'}
                    bgcolor={type === 1 ? '#42C2D6' : '#FFA15A'}
                    width={'fit-content'} maxWidth={'400px'} p={2}
                >
                    {msg}
                </Box>
            </Box>
        </>
    );
};
export default ChatContainer;
