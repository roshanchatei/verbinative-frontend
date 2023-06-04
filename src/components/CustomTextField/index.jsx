import React from "react";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
    typeHere: {
        border: "1px solid #EAEAEA",
        padding: "11px 11px",
        width: "100%",
        borderRadius: 15,
        fontSize: 14,
    },
    input: {
        fontWeight: 500,
        "&::placeholder": {
            fontWeight: 400,
            fontSize: 14,
        },
    },
}));

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
    "& input[type=number]": {
        "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
    },
    "& .MuiInputBase-input": {
        paddingTop: '18px',
        paddingBottom: '10px',
    },
    "& .MuiFilledInput-root": {
        border: "2px solid #FFF",
        overflow: "hidden",
        borderRadius: 12,
        backgroundColor: "#F2F2F2",
        transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
        ]),
        "&:hover": {
            // backgroundColor: "#F2F2F2",
            borderColor: "#c4deff",
        },
        "&.Mui-focused": {
            backgroundColor: "#F2F2F2",
            borderColor: "#4D9FFF",
        },
    },
}));

const CustomTextField = (params) => {
    const {
        error,
        autoFocus,
        placeholder,
        onChange,
        onKeyDown,
        value,
        label,
        type,
        multiline,
        rows,
        img,
        endAdornment,
        select,
        page,
        disabled,
    } = params;
    const classes = useStyles();

    return (
        <>
            {type === "date" ? (
                <TextField
                    {...params}
                    InputProps={{
                        disableUnderline: true,
                        classes: { input: classes.input },
                        endAdornment: endAdornment,
                    }}
                    className={classes.typeHere}
                    variant="standard"
                />
            ) : (
                <RedditTextField
                    {...params}
                    sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {

                            //text-field focused color change
                            "&:focus": {
                                color: page === 'login' ? "#000" : "#cacaca",
                            },
                        },
                    }}
                    variant="filled"
                    color={"primary"}
                    InputProps={{
                        disableUnderline: true,
                        // classes: { input: classes.input },
                        endAdornment: endAdornment,
                    }}
                />
            )}
        </>
    );
};

export default CustomTextField;
