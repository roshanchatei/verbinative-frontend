import {Box, CircularProgress, IconButton, InputAdornment, TextField} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import ChatContainer from "@/src/page-components/Home/ChatContainer";
import {useEffect, useRef, useState} from "react";
import InfiniteScroll from "react-infinite-scroller";
import {useSnackbar} from "notistack";
import {translate} from "@/src/store/translate";

const Chat = ({current, setCurrent, loading, setLoading}) => {

    const { enqueueSnackbar } = useSnackbar();
    const containerRef = useRef(null);

    const userId = localStorage.getItem('id');
    const username = localStorage.getItem('username');

    const [hasMore, setHasMore] = useState(false);
    const [message,setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [messageListLength, setMessageListLength] = useState(0);


    const [targetLanguage, setTargetLanguage] = useState(localStorage.getItem('language_id'))

    useEffect(() =>{
        setMessageListLength(0)
        setMessageList([]);
        setHasMore(true);
        if(current?.messages?.length)
            LoadMessages()
    },[current]);

    const translateMessages = async (temp) => {
        return await Promise.all(
            temp?.map(async message => {
                if (message.created_by !== userId) {
                    const translatedText = await translate(message.text, 'auto-detect', targetLanguage);
                    return {
                        ...message,
                        text: translatedText
                    };
                } else return message;
            })
        );
    };

    const LoadMessages = () => {
        if (current.chatroom_id === null) {
            setHasMore(false);
            return;
        }

        setLoading(true)

        fetch(`http://localhost:8080/chat/${current.chatroom_id}/messages?limit=${10}&skip=${messageListLength}`)
            .then(response => response.json())
            .then(async (res) => {
                const data = res?.data?.messages;
                const total = res?.data?.msg_len;
                // const translatedMessages = await translateMessages(data.reverse());
                const translatedMessages = data.reverse();
                setHasMore(messageListLength + data.length < total);
                setMessageList(prevList => {
                    return [...translatedMessages, ...prevList];
                });
                setMessageListLength(prev => prev + data.length)
            })
            .catch((error) => {
                enqueueSnackbar(error.message ? error.message : 'Something went wrong', {
                    variant: 'error',
                });
                setHasMore(false);
            })
            .finally(() => setLoading(false))
    };

    useEffect(() => {

        const ws = new WebSocket(`ws://localhost:8080/ws/chat/${current?.chatroom_id}`);

        ws.addEventListener('open', () => {
            console.log('connected');
        });

        ws.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);
            console.log(message)

            if(message.Type === "MESSAGE"){
                if(message['Content'].created_by !== userId)
                    translate(message['Content'].text, 'auto-detect', targetLanguage)
                        .then((translatedMessage) => {
                            setMessageList((messages) => [...messages, {...message['Content'], text: translatedMessage}]);
                        })
                        .catch((e) => console.log(e))
                else
                    setMessageList((messages) => [...messages, message['Content']]);

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
                Created_by: userId,
                Username: username,
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

    useEffect(() => {
        if (!loading) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [loading]);


    return (
        <>
            <Box width={'100%'} height={'calc(100vh - 48px)'} position={'relative'}>

                <Box bgcolor={'#f6f6f6'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} py={0.5} px={3} pt={1.2}>
                    <IconButton
                        sx={{pl: 2, py: 1.5}}
                        onClick={() => {
                            setCurrent(null)
                        }}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Box fontWeight={500} fontSize={'20px'}>
                        {
                            current?.name
                        }
                    </Box>
                </Box>
                {/*{*/}
                {/*    loading && (*/}
                {/*        <Box*/}
                {/*            zIndex={10}*/}
                {/*            position={'absolute'} width={'100%'} height={'100%'}*/}
                {/*            sx={{*/}
                {/*                backdropFilter: "blur(3px)",*/}
                {/*                backgroundColor: "rgba(0, 0, 0, 0.81)",*/}
                {/*            }}*/}
                {/*        >*/}

                {/*        </Box>*/}
                {/*    )*/}
                {/*}*/}
                <Box
                    height={'calc(100vh - 169px)'}
                    position={'absolute'} bottom={60}
                    width={'100%'}
                    display={'flex'} flexDirection={'column-reverse'}
                    py={2} px={3}
                    sx={{
                        scrollBehavior: "smooth",
                        overflowY: "scroll",
                        background: `url('/images/chat-bg2.jpg')`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        opacity: 0.9,
                    }}
                    ref={containerRef}
                >

                    <InfiniteScroll
                        hasMore={hasMore}
                        isReverse={true}
                        // loadMore={loadMoreMessages}
                        loadMore={LoadMessages}
                        loader={
                            <Box align={'center'} key={'all-messages'} p={2}>
                                <CircularProgress size={28} />
                            </Box>
                        }
                        pageStart={0}
                    >
                        {
                            messageList?.length > 0 && (
                                <>
                                    {
                                        messageList.map((each, index) =>(
                                            <ChatContainer
                                                key={index}
                                                each={each}
                                            />
                                        ))
                                    }
                                </>
                            )
                        }
                    </InfiniteScroll>

                </Box>

                <Box bgcolor={'#f6f6f6'} position={'absolute'} bottom={0} px={3} py={1} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} borderTop={'1px solid #E1E1E1'}>
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

