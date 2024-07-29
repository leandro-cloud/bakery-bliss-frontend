import { useId, useState } from "react"
import { CheckedIcon, Circle} from "./icons/Icons"

export const CheckedInstruction = ({ instruction }) => {
  const [isChecked, setIsChecked] = useState(false)
  const checkboxID = useId()

  return (
    (
      <div className="instruction">

        <input type="checkbox" id={checkboxID} onChange={() => {
          setIsChecked(!isChecked)
        }} hidden />
        <label htmlFor={checkboxID} className="li-icon-container">
          <div className="icon">
            {isChecked ?
              <CheckedIcon /> :
              <Circle />}
          </div>
          <li>
            <p className="text">{instruction}</p>
          </li>
        </label>
      </div>
    )
  )
}