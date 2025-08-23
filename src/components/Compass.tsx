import { CompassIcon } from "../assets/icons/Icons";

const Compass = ({ rotation }: { rotation: number }) => (
  <div className="absolute top-4 right-4 z-10">
    <div
      style={{ transform: `rotateZ(${-rotation}rad)` }}
      className="relative w-16 h-16 rounded-full border-2 border-slate-600 bg-gray-800 flex items-center justify-center"
    >
      <div className="absolute w-2 h-2 bg-red-500 rounded-full top-0 -translate-y-1/2" />
      <div className="absolute w-2 h-2 bg-blue-500 rounded-full bottom-0 translate-y-1/2" />
      <div className="absolute w-2 h-2 bg-slate-400 rounded-full left-0 -translate-x-1/2" />
      <div className="absolute w-2 h-2 bg-slate-400 rounded-full right-0 translate-x-1/2" />
      <CompassIcon className="w-8 h-8 text-slate-400" />
    </div>
  </div>
);
export default Compass;
