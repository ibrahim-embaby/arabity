import "./pagination.css";
function Pagination({ pages, page, setPage }) {
  const pagesArray = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }
  return (
    pages >= 1 && (
      <div className="pagination" style={{ direction: "ltr" }}>
        <span
          onClick={() => page > 1 && setPage((prev) => prev - 1)}
          className="pagination-left pagination-item"
          style={{
            cursor: page === 1 && "not-allowed",
            backgroundColor: page !== 1 && "#fff",
            color: "black",
          }}
        >
          {"<"}
        </span>
        {pagesArray.map((item) => (
          <span
            onClick={() => setPage(item)}
            className="pagination-number pagination-item"
            key={item}
            style={{
              backgroundColor: page === item && "#628be6",
            }}
          >
            {item}
          </span>
        ))}
        <span
          onClick={() => page < pages && setPage((prev) => prev + 1)}
          className="pagination-right pagination-item"
          style={{
            cursor: page === pages && "not-allowed",
            backgroundColor: page !== pages && "#fff",
            color: "black",
          }}
        >
          {">"}
        </span>
      </div>
    )
  );
}

export default Pagination;
