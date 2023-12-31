import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import Image from "next/image";
import messier_logo from "@assets/messier-logo-pack/MESSIER 1.png";
interface ParallaxProps {
  children: any;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 5000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <div className="parallax">
      <motion.div
        className="text-[250px] font-black text-white/50 uppercase items-center gap-x-20 flex justify-between flex-nowrap whitespace-nowrap"
        style={{ x }}
      >
        {children}
        {children}
        {children}
        {/* <span className="text-white/50 ">{children} </span> */}
        {/* <span className="text-white/50 ">{children} </span> */}
      </motion.div>
    </div>
  );
}

export default function VelocityScroll() {
  return (
    <section className="relative py-32 lg:py-40 grid grid-cols-1 gap-12">
      <ParallaxText baseVelocity={-10}>
        <Image
          src={messier_logo}
          alt="logo"
          width={100}
          height={100}
          className="w-auto h-full inline"
        />{" "}
        THE{" "}
        <Image
          src={messier_logo}
          alt="logo"
          width={100}
          height={100}
          className="w-auto h-full inline"
        />{" "}
        MESSIER{" "}
        <Image
          src={messier_logo}
          alt="logo"
          width={100}
          height={100}
          className="w-auto h-full inline"
        />{" "}
        ECOSYSTEM{" "}
      </ParallaxText>
      <ParallaxText baseVelocity={5}>
        <Image
          src={messier_logo}
          alt="logo"
          width={100}
          height={100}
          className="w-auto h-full inline"
        />{" "}
        YOUR{" "}
        <Image
          src={messier_logo}
          alt="logo"
          width={100}
          height={100}
          className="w-auto h-full inline"
        />{" "}
        EXPLORATION{" "}
        <Image
          src={messier_logo}
          alt="logo"
          width={100}
          height={100}
          className="w-auto h-full inline"
        />{" "}
        STARTS{" "}
        <Image
          src={messier_logo}
          alt="logo"
          width={100}
          height={100}
          className="w-auto h-full inline"
        />{" "}
        HERE
      </ParallaxText>
      <ParallaxText baseVelocity={-5}>
        <Image
          src={messier_logo}
          alt="logo"
          width={100}
          height={100}
          className="w-auto h-full inline"
        />{" "}
        UNIVERSE{" "}
        <Image
          src={messier_logo}
          alt="logo"
          width={100}
          height={100}
          className="w-auto h-full inline"
        />{" "}
        AWAITS{" "}
        <Image
          src={messier_logo}
          alt="logo"
          width={100}
          height={100}
          className="w-auto h-full inline"
        />{" "}
        YOU!{" "}
        <Image
          src={messier_logo}
          alt="logo"
          width={100}
          height={100}
          className="w-auto h-full inline"
        />{" "}
        THE
      </ParallaxText>
    </section>
  );
}
