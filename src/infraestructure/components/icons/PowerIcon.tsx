import { IconFunction } from "./IconProps"

export const PowerIcon:IconFunction = ({ width = 24, height = 24, strokeWidth = 1 }) => {
  return (
    <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height} viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={strokeWidth}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-power"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg>
  )
}
