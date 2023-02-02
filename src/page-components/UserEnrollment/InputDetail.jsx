import {useState} from "react";
import {Box, Grid, MenuItem} from "@mui/material";
import CustomTextField from "../../components/CustomTextField";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import ProfileImage from "./ProfileImage";

const InputDetail = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <>
            <Box width={'100%'} pl={2}>
                <Box fontSize={'20px'} fontWeight={500} mb={3}>
                    Fill the required details:
                </Box>
                <Grid container spacing={0} pr={10}>
                    <Grid item xs={6} pr={15}>
                        <CustomTextField
                            label={"Full Name"}
                            type={"text"}
                            // value={name}
                            // onChange={(event) => {
                            //     setName(event.target.value);
                            // }}
                        />
                        <Box mt={4} />
                        <CustomTextField
                            label={"Phone no."}
                            type={"number"}
                            // value={email}
                            // onChange={(event) => {
                            //     setEmail(event.target.value);
                            // }}
                        />
                        <Box mt={4} />
                        <CustomTextField
                            label={"Email ID"}
                            type={"email"}
                            // value={email}
                            // onChange={(event) => {
                            //     setEmail(event.target.value);
                            // }}
                        />
                        <Box mt={4} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label={"Gender"}
                                    select
                                    // value={team}
                                    // onChange={(event) => {
                                    //     setTeam(event.target.value);
                                    // }}
                                >
                                    <MenuItem key={'male'} value={'male'}>
                                       Male
                                    </MenuItem>
                                    <MenuItem key={'female'} value={'female'}>
                                        Female
                                    </MenuItem>
                                    <MenuItem key={'other'} value={'other'}>
                                        Other
                                    </MenuItem>
                                </CustomTextField>
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <MobileDatePicker
                                        inputFormat="dd/MM/yyyy"
                                        value={selectedDate}
                                        onChange={(value) => {
                                            setSelectedDate(value);
                                        }}
                                        renderInput={(params) => (
                                            <CustomTextField
                                                {...params}
                                                label={"Date of Birth"}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={6} pl={15}>
                        <ProfileImage />
                        <Box mt={4} />
                        <CustomTextField
                            label={"Aadhar no."}
                            type={"number"}
                            // value={email}
                            // onChange={(event) => {
                            //     setEmail(event.target.value);
                            // }}
                        />
                        <Box mt={4} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label={"Height (cm)"}
                                    type={"number"}
                                    // value={email}
                                    // onChange={(event) => {
                                    //     setEmail(event.target.value);
                                    // }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField
                                    label={"Weight (kg)"}
                                    type={"number"}
                                    // value={email}
                                    // onChange={(event) => {
                                    //     setEmail(event.target.value);
                                    // }}
                                />
                            </Grid>
                        </Grid>


                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default InputDetail;
