import {
    Avatar,
    Box,
    CircularProgress,
    IconButton,
    InputAdornment, MenuItem,
    Select,
    TextField
} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import ChatContainer from "@/src/page-components/Home/ChatContainer";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroller";
import {useSnackbar} from "notistack";
import {translate} from "@/src/store/translate";
import {languages} from "@/src/store/languages";

const Chat = ({current, setCurrent}) => {

    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [message,setMessage] = useState('');
    const [messageList, setMessageList] = useState(current?.messages | []);


    useEffect(() =>{
        setMessageList([]);
        setHasMore(true);
    },[current]);

    const loadMoreMessages = () => {

    }

    const userId = localStorage.getItem('id');

    const [targetLanguage, setTargetLanguage] = useState(localStorage.getItem('language_id'))

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/ws/chat/${current?.chatroom_id}`);

        ws.addEventListener('open', () => {
            console.log('connected');
        });

        ws.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);

            if(message.Type === "MESSAGE"){
                if(message['Content'].created_by !== userId)
                    translate(message['Content'].text, targetLanguage)
                    .then((translatedMessage) => {
                        setMessageList((messages) => [...messages, {...message, Content: {...message['Content'], text: translatedMessage}}]);
                    })
                        .catch((e) => console.log(e))
                else
                    setMessageList((messages) => [...messages, message]);

            }

        });

        ws.addEventListener('close', () => {
            console.log('disconnected');
        });

        return () => {
            ws.close();
        };
    }, [current, targetLanguage]);


    const handleSendMessage = (event) => {

        const messageObject = {
            Type: "MESSAGE",
            Content: {
                Text: message,
                Created_by: userId
            }
        };
        const ws = new WebSocket(`ws://localhost:8080/ws/chat/${current?.chatroom_id}`);

        ws.onopen = () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(messageObject));
                setMessage('');
            }
        };
    };



    return (
        <>
            <Box width={'100%'} height={'calc(100vh - 48px)'} position={'relative'}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} py={0.5} px={3} borderBottom={'1px solid #E1E1E1'}>
                    <IconButton
                        sx={{pl: 2, py: 1.5}}
                        onClick={() => {
                            setCurrent(null)
                        }}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    {/*<Box fontWeight={500} fontSize={'20px'}>*/}
                    {/*    {*/}
                    {/*        current?.name*/}
                    {/*    }*/}
                    {/*</Box>*/}
                    <Select
                        size={'small'}
                        value={targetLanguage}
                        onChange={(event) => {
                            setTargetLanguage(event.target.value)
                        }}
                    >

                        {
                            languages.map((each, index) => (
                                <MenuItem key={each.value} value={each.value}>{each.name}</MenuItem>
                            ))
                        }
                    </Select>
                </Box>
                <Box
                    height={'calc(100vh - 169px)'}
                    position={'absolute'} bottom={60}
                    width={'100%'}
                    display={'flex'} flexDirection={'column-reverse'}
                    py={2} px={3}
                    sx={{
                        scrollBehavior: "smooth",
                        overflowY: "scroll",
                    }}
                >

                    <InfiniteScroll
                        loadMore={loadMoreMessages}
                        hasMore={hasMore}
                        isReverse={true}
                        // loadMore={LoadMessages}
                        loader={
                            <Box align={'center'} key={'all-messages'} p={2}>
                                <CircularProgress size={28} />
                            </Box>
                        }
                        pageStart={0}
                    >
                        {
                            messageList.length > 0 && (
                                <>
                                    {
                                        messageList.map((each, index) =>(
                                            <ChatContainer
                                                key={index}
                                                type={each['Content'].created_by === userId ? 1 : 2}
                                                msg={each['Content'].text}
                                            />
                                        ))
                                    }
                                </>
                            )
                        }
                        {/*<ChatContainer*/}
                        {/*    type={1}*/}
                        {/*    msg={'hello, i am the sender'}*/}
                        {/*/>*/}
                        {/*<ChatContainer*/}
                        {/*    type={-1}*/}
                        {/*    msg={'hello, i am the reciever'}*/}
                        {/*/>*/}
                    </InfiniteScroll>

                </Box>

                <Box bgcolor={'#FFF'} position={'absolute'} bottom={0} px={3} py={1} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} borderTop={'1px solid #E1E1E1'}>
                    <TextField
                        variant="standard"
                        size={'small'}
                        sx={{
                            background: "#FFF",
                            py: 1,
                            px: 2,
                            borderRadius: "40px",
                            width: "90%",
                            border: '1px solid #000'
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                            disableUnderline: true,
                        }}
                        value={message}
                        onChange={(event) => {
                            setMessage(event.target.value)
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSendMessage();
                                event.preventDefault();
                            }
                        }}
                    />
                    <IconButton
                        onClick={handleSendMessage}
                        disabled={message === ''}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>

            </Box>
        </>
    );
};

export default Chat;

