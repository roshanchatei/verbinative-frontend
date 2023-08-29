import {Avatar, Box, useMediaQuery} from "@mui/material";
import {useEffect, useState} from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {getTimeOrDate} from "@/src/store/getTimeOrDate";
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import {baseURL} from "@/src/store/config";

const ChatCard = ({person, current, setCurrent, loading, handleClickOpen}) => {

    const [username, setUsername] = useState('')
    const [isServer, setIsServer] = useState(person?.user_ids.length > 2)

    useEffect(() => {
        if(person?.user_ids.length === 2){
            const myUserId = localStorage.getItem('id');
            const temp = person?.user_ids.find((each) => each !== myUserId)
            fetch(`${baseURL}/user/${temp}`)
                .then(response => response.json())
                .then(result => setUsername(result?.data?.data?.username))
                .catch(error => console.log('error', error));
        }
        else setUsername(person?.name)
    }, [person])

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

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
                        backgroundColor: current?.chatroom_id === person.chatroom_id ? '#FFF' : '#dedede',
                        // backgroundColor: "#dedede",
                    },
                }}
                onClick={() => {
                    if(!loading){
                        setCurrent(person)
                        if(isMobile)
                            handleClickOpen()
                    }

                }}
                bgcolor={current?.chatroom_id === person.chatroom_id ? '#FFF' : 'transparent'}
            >
                {
                    current?.chatroom_id === person.chatroom_id && <ArrowRightIcon sx={{ml: -3}} />
                }
                <Avatar sx={{backgroundColor: '#131348'}} src={person?.avatar}>
                    {
                        isServer ? <GroupIcon /> : <PersonIcon />
                    }
                </Avatar>
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
