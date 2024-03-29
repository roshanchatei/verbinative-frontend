import React, {useEffect} from "react";
import { LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";

const Loader = () => {
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 50);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    height: "60vh",
                }}
            >
                <img
                    alt="logo"
                    style={{ width: 200, height: "auto" }}
                    src={"/images/logo-color-blue.svg"}
                />
                <div style={{ width: "20%", marginTop: 15 }}>
                    <LinearProgress
                        value={progress}
                        variant="determinate"
                    />
                </div>
            </Box>
        </>
    );
};

export default Loader;
