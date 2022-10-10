import styles from './Hero.module.css'
import {useState} from "react"
import clsx from "clsx"
import jump from "jump.js"
import Image from 'next/image'
import Typewriter from 'typewriter-effect'


const Hero = () => {
    const [showHeroButton, setShowHeroButton] = useState(false)
    const jumpTo = (target) => {
        jump(target, {
            duration: 1000,
        });
    }
    return (
        <section id="home" className={styles.container}>
            <div className={styles.imgWrapper}>
                <Image
                    src="/images/CCCteam.jpeg"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className={styles.content}>
                <h1 className="animate__animated animate__fadeIn">
                    <Typewriter
                        options={{
                            autoStart: true,
                            loop: false,
                            delay: 25
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .start()
                                .typeString('Our dedicated staff has over 16 years of experience <br/>')
                                .typeString('providing <span class="highlight">quality comprehensive dental care</span>, <br/>')
                                .typeString('in addition to access to care for <br/>')
                                .typeString('emergency services within <span class="highlight">correctional facilities</span>.')
                                .pauseFor(0)
                                .callFunction(() => setShowHeroButton(true))
                        }}
                    />
                </h1>
                {showHeroButton && <div className={clsx("animate__animated animate__zoomInUp", styles.heroButtonWrapper)}>
                    <div className={styles.heroButton}>
                        <a onClick={() => jumpTo('#contact')}>Call to Request an Appointment!</a>
                    </div>
                </div>}
            </div>
        </section>
    );
};

export default Hero;
