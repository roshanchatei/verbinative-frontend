import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import { useSnackbar } from "notistack";
import {useEffect, useState} from "react";

const Index = ({chats, setChats}) => {
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {

        if (inputValue) {
            setLoading(true);
            (async () => {
                await fetch(`http://localhost:8080/user/search?username=${inputValue}`)
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
            "name": "test10",
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

        fetch("http://localhost:8080/chat/create/", requestOptions)
            .then(response => response.json())
            .then((result) => {
                // const temp = chats.find(each => each.chatroom_id === result.data.data.chatroom_id);
                // console.log(temp)
                // setChats((chat) => [result?.data?.data, ...chat])
            })
            .catch(error => console.log('error', error));
    }


    return (
        <>
            <Autocomplete
                // fullWidth
                // sx={{ width: `100%` }}
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
                    // Router.push(`/jobs/${newValue.username}`);
                    handleCreateServer(newValue)
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        sx={{
                            background: "#FFF",
                            py: 1,
                            px: 2,
                            borderRadius: "10px",
                            width: { lg: "500px", md: "500px", sm: "400px", xs: "100%" },
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