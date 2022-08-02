export default function DropdownTime(props) {
  return (
    <label id="labelTime">
      Time interval
      <select id="dropboxTime">
        <option value="hour">Hour</option>
        <option value="day">Daily</option>
        <option value="week">Weekly</option>
      </select>
      ========================================== Search Stock
      ===============================================================
    </label>
  );
}
