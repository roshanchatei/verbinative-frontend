import {Avatar, Box} from "@mui/material";
import {useEffect, useState} from "react";

const ChatCard = ({person, current, setCurrent, loading}) => {

    const [username, setUsername] = useState('')

    function getTimeOrDate(timestamp) {
        const now = new Date();
        const messageDate = new Date(timestamp);

        const daysDiff = (now.getTime() - messageDate.getTime()) / (1000 * 3600 * 24);

        if (daysDiff < 1) {
            return messageDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        } else if (daysDiff < 7) {
            return `${parseInt(daysDiff)} days ago`
        } else {
            const yyyy = messageDate.getFullYear();
            let mm = messageDate.getMonth() + 1;
            let dd = messageDate.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            return dd + '/' + mm + '/' + yyyy;
        }
    }

    useEffect(() => {
        if(person?.user_ids.length === 2){
            const myUserId = localStorage.getItem('id');
            const temp = person?.user_ids.find((each) => each !== myUserId)
            fetch(`http://localhost:8080/user/${temp}`)
                .then(response => response.json())
                .then(result => setUsername(result?.data?.data?.username))
                .catch(error => console.log('error', error));
        }
        else setUsername(person?.name)
    }, [person])

    return (
        <>
            <Box
                width={'100%'}
                borderBottom={'1px solid #E1E1E1'}
                px={3} py={2}
                display={'flex'} alignItems={'center'}
                sx={{
                    cursor: loading ? 'auto' : 'pointer',
                    "&:hover": {
                        backgroundColor: current?.chatroom_id === person.chatroom_id ? '#dedede' : '#ffffff',
                        // backgroundColor: "#dedede",
                    },
                }}
                onClick={() => {
                    if(!loading)
                        setCurrent(person)
                }}
                bgcolor={current?.chatroom_id === person.chatroom_id ? '#dedede' : 'transparent'}
            >
                <Avatar sx={{background: '#181935'}}>{username[0]?.toUpperCase()}</Avatar>
                <Box ml={2} width={'100%'}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Box fontWeight={500} fontSize={'18px'} fontStyle={'italic'}>
                            {username}
                        </Box>
                        <Box>
                            {
                                person?.messages ? getTimeOrDate(person?.messages[person.messages.length - 1].timestamp)
                                                    : ''
                            }
                        </Box>
                    </Box>
                </Box>

            </Box>
        </>
    );
};
export default ChatCard;
