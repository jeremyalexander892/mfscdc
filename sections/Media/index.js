import styles from './Media.module.css'
import {useEffect, useState, useRef} from 'react'
import ReactPlayer from 'react-player'
import clsx from "clsx"
import PageHeader from "@components/PageHeader"


const Media = () => {
    const [url, setUrl] = useState();
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef(null);

    useEffect(() => {
       setUrl('https://youtu.be/HMW4FPLxFpE');
    }, []);

    const handleScrollYChange = () => {
        setIsPlaying(window.scrollY >= 4100);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScrollYChange);
        return () => {
            window.removeEventListener('scroll', handleScrollYChange);
        }
    }, []);


    return (
        <section id="media" className={clsx(styles.container)}>
            <div className={styles.wrapper}>
                <PageHeader headerTitle="Learn More About Miles For Smiles LLC" />
                <div className={styles.videoWrapper}>
                    {url && <ReactPlayer
                        ref={videoRef}
                        config={{
                            youtube: {
                                playerVars: { showinfo: 1 }
                            },
                            file: {
                                attributes: {
                                    controlsList: "nodownload",
                                    preload: "auto"
                                }
                            }
                        }}
                        pip={false}
                        playing={isPlaying}
                        url={url}
                        controls={true}
                        width="100%"
                        height="100%"
                    />}
                </div>
            </div>
        </section>
    );
}

export default Media;
