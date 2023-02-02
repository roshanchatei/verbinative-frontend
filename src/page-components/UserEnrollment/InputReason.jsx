import {Box} from "@mui/material";
import {useState} from "react";
import CustomCard from "../../components/CustomCard";

const InputReason = () => {

    const reasons = [
        {
            id: 1,
            title: 'To Lose Weight',
            img: '/images/lose-weight.png'
        },
        {
            id: 2,
            title: 'To Stay Fit',
            img: '/images/stay-fit.png'
        },
        {
            id: 3,
            title: 'To Gain Weight',
            img: '/images/gain-weight.png'
        },
    ];


    const [selectedReason, setSelectedReason] = useState()


    return (
        <>
            <Box width={'100%'} pl={2}>
                <Box fontSize={'20px'} fontWeight={500} mb={5}>
                    Why do you want to join?
                </Box>
                <Box width={'100%'} display={'flex'} justifyContent={'space-around'}>
                    {
                        reasons.map((each) => (
                            <CustomCard
                                key={each.id}
                                id={each.id}
                                title={each.title}
                                img={each.img}
                                border={selectedReason === each.id ? '2px solid #F6F2E6' : '2x solid #181935'}
                                onclick={() => {
                                    setSelectedReason(each.id)
                                }}
                                type={'reason'}
                            />
                        ))
                    }
                </Box>
            </Box>
        </>
    );
};

export default InputReason;
