import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import { useSnackbar } from "notistack";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {baseURL} from "@/src/store/config";

const Index = ({chats, setChats, type, selectedList, setSelectedList}) => {
    const Router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {

        if (inputValue) {
            setLoading(true);
            (async () => {
                await fetch(`${baseURL}/user/search?username=${inputValue}`)
                    .then(res => res.json())
                    .then((response) => {
                        if(response.message === "success" && response?.data?.data !== null)
                            setOptions([...response?.data?.data])

                        if(response?.data?.data === null)
                            setLoading(false)
                    })
                    .catch((error) => {
                        enqueueSnackbar(error ? error.message : "Something went wrong", {
                            variant: "error",
                        });
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })();
        }
    }, [inputValue]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const handleCreateServer = (otherUser) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "name": otherUser?.username || "test10",
            "user_ids": [
                localStorage.getItem('id'),
                otherUser?.user_id
            ],
            "messages": []
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseURL}/chat/create/`, requestOptions)
            .then(response => response.json())
            .then((result) => {
                // const temp = {
                //     name: "dm",
                //     chatroom_id: result?.data?.data?.chatroom_id,
                //     user_ids: [
                //         localStorage.getItem('id'),
                //         otherUser?.user_id
                //     ],
                // }
                // setChats((chat) => [...chat, temp])
                Router.reload();
            })
            .catch(error => console.log('error', error));
    }


    return (
        <>
            <Autocomplete
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option?.username === value?.username}
                getOptionLabel={(option) => option?.username}
                options={options}
                loading={loading}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onChange={(event, newValue) => {
                    if(type === 'search')
                        handleCreateServer(newValue)
                    if(type === 'add'){
                        setOpen(false)
                        const isPresent = selectedList.some(obj => obj?.user_id === newValue?.user_id);
                        if(!isPresent && newValue){
                            setSelectedList(prevList => {
                                return [...prevList, newValue];
                            });
                        }
                        // const isPresent = arr.some(obj => Object.is(obj.id, 3));

                    }
                }}
                renderInput={(params) => (
                    <TextField
                        fullWidth
                        {...params}
                        sx={{
                            background: "#FFF",
                            py: 1,
                            px: 2,
                            borderRadius: "10px",
                            boxShadow: "0px 4px 31px rgba(0, 0, 0, 0.08)",
                        }}
                        variant="standard"
                        size={"small"}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: <SearchIcon />,
                            disableUnderline: true,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />

        </>
    );
}

export default Index;