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

const Chat = ({current, setCurrent}) => {

    const { enqueueSnackbar } = useSnackbar();
    const userId = localStorage.getItem('id');

    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [message,setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [newMessageList, setNewMessageList] = useState([]);

    const [targetLanguage, setTargetLanguage] = useState(localStorage.getItem('language_id'))

    useEffect(() =>{
        setMessageList([]);
        setHasMore(true);
    },[current]);

    const [oldLoading, setOldLoading] = useState(false)

    // useEffect(() => {
    //     let temp = current?.messages;
    //     if(current?.messages){
    //         const translateMessages = async () => {
    //             setOldLoading(true)
    //             const translated = await Promise.all(
    //                 temp?.map(async message => {
    //                     if (message.created_by !== userId) {
    //                         const translatedText = await translate(message.text, targetLanguage);
    //                         return {
    //                             ...message,
    //                             text: translatedText
    //                         };
    //                     }
    //                     else return message;
    //                 })
    //             );
    //             setMessageList([...translated]);
    //             // console.log(translated, "my trans initial message")
    //             setOldLoading(false)
    //         };
    //         translateMessages().then(res => console.log(res));
    //     }
    // }, [current]);

    useEffect(() =>{
        LoadMessages();
    },[current]);

    const translateMessages = async (temp, total) => {
        // setOldLoading(true)
        const translated = await Promise.all(
            temp?.map(async message => {
                if (message.created_by !== userId) {
                    const translatedText = await translate(message.text, targetLanguage);
                    return {
                        ...message,
                        text: translatedText
                    };
                }
                else return message;
            })
        );
        const newList = [...messageList, ...translated];
        setMessageList(newList);
        setHasMore(newList.length < total);
        // setMessageList([...translated]);
        console.log(newList)
        // setOldLoading(false)
    };

    const LoadMessages = () => {
        if (current === null) {
            setHasMore(false);
            return false;
        }

        fetch(`http://localhost:8080/chat/${current.chatroom_id}/messages?limit=${5}&skip=${messageList.length}`)
            .then(response => response.json())
            .then((res) => {
                const data = res?.data?.messages;
                const total = res?.data?.messages.length;
                translateMessages(data, total).then(r => console.log(r));
                // console.log(translatedMessages)
                // const newList = [...messageList, ...translatedMessages];
                // setMessageList(newList);
                // setHasMore(newList.length < total);
            })
            .catch((error) => {
                enqueueSnackbar(error.message ? error.message : 'Something went wrong', {
                    variant: 'error',
                });
                setHasMore(false);
            });
    };


    const loadMoreMessages = () => {

    }

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
            {
                oldLoading ? (
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'} height={'calc(100vh - 48px)'}>
                        <CircularProgress size={28} />
                    </Box>
                ) : (
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
                            <Box fontWeight={500} fontSize={'20px'}>
                                {
                                    current?.name
                                }
                            </Box>
                            {/*<Select*/}
                            {/*    size={'small'}*/}
                            {/*    value={targetLanguage}*/}
                            {/*    onChange={(event) => {*/}
                            {/*        setTargetLanguage(event.target.value)*/}
                            {/*    }}*/}
                            {/*>*/}

                            {/*    {*/}
                            {/*        languages.map((each, index) => (*/}
                            {/*            <MenuItem key={each.value} value={each.value}>{each.name}</MenuItem>*/}
                            {/*        ))*/}
                            {/*    }*/}
                            {/*</Select>*/}
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
                )
            }
        </>
    );
};

export default Chat;

