import Buttons from "./Buttons";

const CreatedMoment = () => {
  return (
    <div className="w-full h-fit">
      <div className="flex items-end gap-3 w-full w-fit">
        <div className="w-full">
          <p className="font-archivo-medium text-4xl xl:text-5xl">
            moment created
          </p>
          <Buttons />
        </div>
      </div>
    </div>
  );
};

export default CreatedMoment;
