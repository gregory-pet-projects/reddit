import { FC } from "react";

interface Props {
  seed: String | null | undefined;
  large?: boolean;
}
const Avatar: FC<Props> = ({ seed, large }) => (
  <div
    className={`relative h-10 w-10 rounded-full border-gray-300 bg-white overflow-hidden ${
      large && "h-20 w-20"
    }`}
  >
    <img
      src={
        seed
          ? `https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}`
          : "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA="
      }
      alt="avatar"
      style={{ objectFit: "contain" }}
    />
  </div>
);

export default Avatar;
