import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex space-x-2 items-center">
      <Image height={30} width={30} alt="logo" src="/logo.svg" />
      <h3 className="font-semibold text-sky-700">LMS Store</h3>
    </div>
  );
};

export default Logo;
