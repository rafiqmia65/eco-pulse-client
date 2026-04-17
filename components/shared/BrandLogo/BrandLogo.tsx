import Image from "next/image";
import Link from "next/link";
import React from "react";

const BrandLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/eco-pulse.png"
        alt="EcoSpark Hub Logo"
        width={160}
        height={40}
      />
    </Link>
  );
};

export default BrandLogo;
