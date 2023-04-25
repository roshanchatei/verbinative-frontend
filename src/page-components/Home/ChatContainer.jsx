import {Box} from "@mui/material";
import {getTimeOrDate} from "@/src/store/getTimeOrDate";

const ChatContainer = ({each, isServer}) => {

    const userId = localStorage.getItem('id');
    const isMe = each.created_by === userId;
    const timeStamp = each?.timestamp === '0001-01-01T00:00:00Z' ? new Date() : each?.timestamp;

    return (
        <>
            {
                each?.text?.length > 0 && (
                    <Box width={'100%'} mt={2} display={'flex'} justifyContent={isMe ? 'flex-end' : 'flex-start'}>
                        <Box
                            borderRadius={isMe ? '20px 0 20px 20px' : '0 20px 20px'}
                            bgcolor={isMe ? '#42C2D6' : '#FFA15A'}
                            width={'fit-content'} maxWidth={'400px'} p={2} pb={1}
                        >
                            {
                                !isMe && isServer && (
                                    <Box fontWeight={550} mt={-1}>
                                        ~{each?.username}
                                    </Box>
                                )
                            }
                            <Box textAlign={isMe ? 'right' : 'left'}>
                                {each?.text}
                            </Box>
                            <Box color={'#4f4f4f'} textAlign={'right'} fontSize={'12px'} mr={-1}>
                                {getTimeOrDate(timeStamp)}
                            </Box>
                        </Box>
                    </Box>
                )
            }
        </>
    );
};
export default ChatContainer;
