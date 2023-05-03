import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex w-full justify-center mt-20 h-screen">
      <BeatLoader color="gray" loading={true} />
    </div>
  );
};

export default Loading;
