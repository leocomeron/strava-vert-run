const TableData = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.startDate}</td>
      <td>{props.distance}</td>
      <td>{props.movingTime}</td>
      <td>{props.totalElevationGain}</td>
    </tr>
  );
};

export default TableData;
