function Statistics({ usersNumber, workshopsNumber }) {
  return (
    <div className=" statistics">
      <div className="statistics-item">
        <h4 className="number-title">عدد المستخدمين</h4>
        <p>{usersNumber}</p>
      </div>
      <div className="statistics-item">
        <h4 className="number-title">عدد الورش</h4>
        <p>{workshopsNumber}</p>
      </div>
    </div>
  );
}

export default Statistics;
