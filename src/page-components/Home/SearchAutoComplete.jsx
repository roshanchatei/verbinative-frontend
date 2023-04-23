import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";

export default function SearchAutocomplete() {
    const { enqueueSnackbar } = useSnackbar();
    const Router = useRouter();

    let demo = [
        {
            id: '1',
            title: 'rkc'
        },
        {
            id: '2',
            title: 'ash_king'
        },
        {
            id: '3',
            title: 'rahul'
        },
    ]

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    useEffect(() => {
        if (inputValue) {
            setLoading(true);
            let temp = inputValue.toLowerCase()
            let result = [];
            for (let i = 0; i < demo.length; i++) {
                if (demo[i].title.includes(temp)) {
                    result.push(demo[i]);
                }
            }

            setOptions(result)
            setLoading(false);
        }
    }, [demo, inputValue])

    return (
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: '100%' }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            onChange={(event, newValue) => {
                // Router.push(`/jobs/${newValue._id}`);
                // console.log(newValue)
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth
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
                        disableUnderline: true, // <== added this
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
    );
}