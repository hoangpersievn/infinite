import { css } from "@emotion/css";
import { keyframes } from "@emotion/react";
import Image from 'next/image';
import LoadingSrc from '@/public/Loading.svg';


const rotate = keyframes`
0% {
  transform: rotate(0);
}
100% {
  transform: rotate(360deg);
}
`;

export default function LoadingMaster() {
  return (
    <div
      className={css([
        {
          width: "100vw",
          height: "100vh",
          position: "fixed",
          zIndex: 10,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f2f2f2",
          opacity: 0.7,
          userSelect: "none",
          pointerEvents: "none",
        },
      ])}
    >
      <Image
        alt="loading..."
        src={LoadingSrc}
        className={css([
          {
            width: 36,
            height: 36,
            animation: `${rotate} .4s ease infinite`,
          },
        ])}
      />
    </div>
  );
}
