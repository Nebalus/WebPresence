import {JSX, useEffect, useState} from "react";
import { motion } from "framer-motion";
import {cn} from "@assets/lib/utils.ts";
import {useTheme} from "@assets/providers/ThemeProvider.tsx";

interface Star {
    id: number;
    x: string;
    y: string;
    size: number;
    delay: number;
    isBig: boolean;
}

export default function StarBackground(): JSX.Element {
    const numStars = 60;
    const [stars, setStars] = useState<Star[]>([]);
    const { theme } = useTheme();
    const isDarkMode = theme == "dark";

    useEffect(() => {
        const generateStars = () => {
            const newStars: Star[] = Array.from({ length: numStars }, (_, i) => {
                const isBigStar = Math.random() > 0.85;
                return {
                    id: i,
                    x: `${Math.random() * 100}vw`,
                    y: `${Math.random() * 100}vh`,
                    size: isBigStar ? 8 : Math.random() * 4 + 1,
                    delay: Math.random() * 3,
                    isBig: isBigStar,
                };
            });
            setStars(newStars);
        };
        generateStars();
    }, []);

    return (
        <div className={cn("bg-black overflow-hidden inset-0 fixed pointer-events-none z-0", isDarkMode ? "" : "invert")}>
            {stars.map((star) => (
                star.isBig ? (
                    <div
                        key={star.id}
                        className="absolute"
                        style={{ top: star.y, left: star.x }}
                    >
                        <motion.div
                            className="bg-white"
                            style={{ width: star.size, height: star.size }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: star.delay,
                            }}
                        />
                        <motion.div
                            className="bg-white"
                            style={{ width: star.size / 2, height: star.size / 2, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: star.delay + 0.2,
                            }}
                        />
                    </div>
                ) : (
                    <motion.div
                        key={star.id}
                        className="absolute bg-white"
                        style={{
                            width: star.size,
                            height: star.size,
                            top: star.y,
                            left: star.x,
                        }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: star.delay,
                        }}
                    />
                )
            ))}
        </div>
    );
}