import { unavailableActionToast } from "@/utils/service";
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
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { SignButton } from "./SignButton";

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
  const { data: session } = useSession();
  return (
    <div className="flex bg-white px-4 py-2 shadow-sm sticky top-0 z-50 items-center">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer md:mx-0 mr-4">
        <Link href="/">
          <Image
            src="https://logodownload.org/wp-content/uploads/2018/02/reddit-logo.png"
            alt="logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </Link>
      </div>
      <div
        className="items-center mx-7 xl:min-w-[300px] cursor-pointer hidden md:flex"
        onClick={unavailableActionToast}
      >
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded bg-gray-100 px-3 py-1">
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
            <Icon key={idx} className="icon" onClick={unavailableActionToast} />
            {idx === 2 && (
              <hr
                key={`divider-${idx}`}
                className="h-10 border border-gray-100"
              />
            )}
          </>
        ))}
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>
      <SignButton
        onClick={session ? signOut : signIn}
        signOut={!!session}
        userName={session?.user?.name || "@User"}
      />
    </div>
  );
};

export default Header;
