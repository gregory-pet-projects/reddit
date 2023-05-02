import { ChevronDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { FC } from "react";

interface Props {
  onClick: () => void;
  signOut: boolean;
  userName: string;
}
export const SignButton: FC<Props> = ({ onClick, signOut, userName }) => (
  <div
    onClick={onClick}
    className="hidden lg:flex items-center space-x-2 rounded-sm border border-gray-100 p-2 cursor-pointer lg:hover:bg-gray-200"
  >
    <div className="relative h-5 w-5 flex-shrink-0">
      <Image
        src="https://links.papareact.com/23l"
        alt="signin"
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
    {signOut ? (
      <>
        <div className="flex-1 text-xs">
          <p className="truncate">{userName}</p>
          <p className="text-gray-400">1 Karma</p>
        </div>
        <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
      </>
    ) : (
      <p className="text-gray-400">Sign In</p>
    )}
  </div>
);
