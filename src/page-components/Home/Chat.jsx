import {Box, CircularProgress, IconButton, InputAdornment, TextField, useMediaQuery} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import ChatContainer from "@/src/page-components/Home/ChatContainer";
import {useEffect, useRef, useState} from "react";
import InfiniteScroll from "react-infinite-scroller";
import {useSnackbar} from "notistack";
import {translate} from "@/src/store/translate";
import GroupChat from "@/src/page-components/Home/GroupChat";
import {baseURL, isMessageTranslated} from "@/src/store/config";

const Chat = ({current, setCurrent, loading, setLoading, handleClose}) => {

    const { enqueueSnackbar } = useSnackbar();
    const containerRef = useRef(null);

    const userId = localStorage.getItem('id');
    const username = localStorage.getItem('username');

    const [isServer, setIsServer] = useState(false)

    const [hasMore, setHasMore] = useState(false);
    const [message,setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [messageListLength, setMessageListLength] = useState(0);
    const [totalMessageLength, setTotalMessageLength] = useState(null)

    const [targetLanguage, setTargetLanguage] = useState(localStorage.getItem('language_id'))

    const parsedURL = new URL(baseURL);
    const hostname = parsedURL.hostname;
    const port = parsedURL.port;
    const formattedHostname = port ? `${hostname}:${port}` : hostname;

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

    useEffect(() =>{
        setMessageListLength(0)
        setMessageList([]);
        setHasMore(true);
        setIsServer(current?.user_ids.length > 2)
    },[current]);

    // const translateMessages = async (temp) => {
    //     return await Promise.all(
    //         temp?.map(async message => {
    //             if (message.created_by !== userId) {
    //                 const translatedText = await translate(message.text, 'auto-detect', targetLanguage);
    //                 return {
    //                     ...message,
    //                     text: translatedText
    //                 };
    //             } else return message;
    //         })
    //     );
    // };

    const translateMessages = async (temp) => {
        const translatedMessages = [];

        for (const message of temp) {
            if (message.created_by !== userId) {
                await new Promise(resolve => setTimeout(resolve, 300)); // Adding some delay
                const translatedText = await translate(message.text, 'auto-detect', targetLanguage);
                translatedMessages.push({
                    ...message,
                    text: translatedText
                });
            } else {
                translatedMessages.push(message);
            }
        }

        return translatedMessages;
    };


    const LoadMessages = () => {
        if (current?.chatroom_id === null || current?.chatroom_id === undefined) {
            setHasMore(false);
            return;
        }
        if(loading)
            return;
        setLoading(true)

        fetch(`${baseURL}/chat/${current?.chatroom_id}/messages?limit=${10}&skip=${messageListLength}`)
            .then(response => response.json())
            .then(async (res) => {
                const data = res?.data?.messages;
                const total = res?.data?.msg_len;

                if(totalMessageLength === null)
                    setTotalMessageLength(total)

                let translatedMessages;
                if(isMessageTranslated)
                    translatedMessages = await translateMessages(data?.reverse());
                else
                    translatedMessages = data?.reverse();


                setHasMore(messageListLength + data?.length < total);
                if(translatedMessages)
                    setMessageList(prevList => {
                        return [...translatedMessages, ...prevList];
                    });
                setMessageListLength(prev => prev + data?.length)
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

        const ws = new WebSocket(`wss://${formattedHostname}/ws/chat/${current?.chatroom_id}`);

        ws.addEventListener('open', () => {
            console.log('connected');
        });

        ws.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);

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
        const ws = new WebSocket(`wss://${formattedHostname}/ws/chat/${current?.chatroom_id}`);

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
            <Box width={'100%'} height={isMobile ? "100vh" : 'calc(100vh - 48px)'} position={'relative'}>

                <Box zIndex={100} position={{md: "static", xs: "fixed"}} top={0} bgcolor={'#f6f6f6'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} py={0.5} px={{md: 3, xs: 1.5}} pt={{md: 1.2, xs: 0.7}}>
                    <Box display={'flex'} alignItems={'center'}>
                        <IconButton
                            sx={{pl: {md: 2, xs: 1.5}, py: 1.5}}
                            onClick={() => {
                                setCurrent(null)
                                if(isMobile){
                                    handleClose()
                                }

                            }}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                        {
                            isServer &&  <Box ml={1} fontWeight={500} fontSize={'20px'}>{current?.name}</Box>
                        }
                    </Box>
                    {
                        isServer ? (
                            <GroupChat current={current} loading={loading} />
                        ) : (
                            <Box fontWeight={500} fontSize={'20px'}>
                                {
                                    current?.name
                                }
                            </Box>
                        )
                    }
                </Box>
                {
                    loading && (
                        <Box
                            zIndex={10}
                            position={'absolute'} width={'100%'}
                            height={isMobile ? '90vh' : 'calc(100vh - 169px)'}
                            display={'flex'} alignItems={'center'} justifyContent={'center'}
                            sx={{
                                backdropFilter: "blur(2px)",
                                backgroundColor: "rgba(193,193,193,0.22)",
                            }}
                        >
                            <CircularProgress
                                variant="determinate"
                                color={'accent'}
                                value={(messageListLength / totalMessageLength || 0) * 100}
                            />
                        </Box>
                    )
                }
                <Box
                    height={isMobile ? '90vh' : 'calc(100vh - 169px)'}
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
                    }}
                    ref={containerRef}
                >

                    <InfiniteScroll
                        hasMore={hasMore}
                        isReverse={true}
                        loadMore={LoadMessages}
                        // loader={
                        //     <Box align={'center'} key={'all-messages'} p={2}>
                        //         <CircularProgress size={28} />
                        //     </Box>
                        // }
                        pageStart={0}
                    >
                        {isMobile && <Box mt={18} />}
                        {
                            messageList?.length > 0 && (
                                <>
                                    {
                                        messageList.map((each, index) =>(
                                            <ChatContainer
                                                key={index}
                                                each={each}
                                                isServer={isServer}
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
                        disabled={message === '' || loading}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>

            </Box>
        </>
    );
};

export default Chat;

