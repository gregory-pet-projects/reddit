import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import Image from "next/image";

const icons = [
  { Icon: SparklesIcon, onClick: () => undefined },
  { Icon: GlobeIcon, onClick: () => undefined },
  { Icon: VideoCameraIcon, onClick: () => undefined },
  { Icon: ChatIcon, onClick: () => undefined },
  { Icon: BellIcon, onClick: () => undefined },
  { Icon: PlusIcon, onClick: () => undefined },
  { Icon: SpeakerphoneIcon, onClick: () => undefined },
];
const Header = () => {
  return (
    <div className="flex bg-white px-4 py-2 shadow-sm sticky-top-0 z-50">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image
          src="https://logodownload.org/wp-content/uploads/2018/02/reddit-logo.png"
          alt="logo"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search Reddit"
          className="flex-1 bg-transparent outline-none"
        />
        <button type="submit" hidden />
      </form>
      <div className="text-gray-500 space-x-2 mx-5 items-center hidden lg:inline-flex">
        {icons.map(({ Icon }, idx) => (
          <>
            <Icon key={idx} className="icon" />
            {idx === 2 && <hr className="h-10 border border-gray-100" />}
          </>
        ))}
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>
      <div className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer">
        <div className="relative h-5 w-5 flex-shrink-0">
          <Image
            src="https://links.papareact.com/23l"
            alt="signin"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <p className="text-gray-400">Sign In</p>
      </div>
    </div>
  );
};

export default Header;
