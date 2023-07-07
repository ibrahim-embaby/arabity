function Pagination() {
  return (
    <div>
      <span className="pagination-left"></span>
      {[1, 2, 3].map((item) => (
        <span className="pagination-number" key={item}>
          {item}
        </span>
      ))}
      <span className="pagination-right"></span>
    </div>
  );
}

export default Pagination;
