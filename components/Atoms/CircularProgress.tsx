import React from "react";
import Image from "next/image";
import loader from "@/public/images/loader.svg";

export declare interface ICircularProgress {
  className?: string;
};

const CircularProgress = ({ className }: ICircularProgress) => (
  <div className={`loader ${className}`}>
    <Image src={loader} alt="loader" />
  </div>
);

export default CircularProgress;
