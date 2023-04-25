import {Box} from "@mui/material";

const ChatContainer = ({each}) => {

    const userId = localStorage.getItem('id');

    return (
        <>
            {
                each?.text?.length > 0 && (
                    <Box width={'100%'} mt={2} display={'flex'} justifyContent={each.created_by === userId ? 'flex-end' : 'flex-start'}>
                        <Box
                            borderRadius={each.created_by === userId ? '20px 0 20px 20px' : '0 20px 20px'}
                            bgcolor={each.created_by === userId ? '#42C2D6' : '#FFA15A'}
                            width={'fit-content'} maxWidth={'400px'} p={2}
                        >
                            {each?.text}
                        </Box>
                    </Box>
                )
            }
        </>
    );
};
export default ChatContainer;
