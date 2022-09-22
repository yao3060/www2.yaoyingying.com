import Link from "next/link";

const Logo = () => {
  return (
    <div className="">
      <div className="logo text-2xl">
        <Link href="/">
          <a>姚迎迎</a>
        </Link>
      </div>
      <div className="desc text-sm">不想再努力了，躺平！</div>
    </div>
  );
};

export default Logo;
