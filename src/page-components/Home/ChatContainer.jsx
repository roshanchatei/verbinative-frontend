import {Box} from "@mui/material";
import {getTimeOrDate} from "@/src/store/getTimeOrDate";

const ChatContainer = ({each}) => {

    const userId = localStorage.getItem('id');
    const isMe = each.created_by === userId;

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
                            {/*{*/}
                            {/*    !isMe && (*/}
                            {/*        <Box fontWeight={600} mt={-1}>*/}
                            {/*            ~{each?.username}*/}
                            {/*        </Box>*/}
                            {/*    )*/}
                            {/*}*/}
                            <Box textAlign={isMe ? 'right' : 'left'}>
                                {each?.text}
                            </Box>
                            <Box color={'#4f4f4f'} textAlign={'right'} fontSize={'12px'} mr={-1}>
                                {getTimeOrDate(each?.timestamp)}
                            </Box>
                        </Box>
                    </Box>
                )
            }
        </>
    );
};
export default ChatContainer;
