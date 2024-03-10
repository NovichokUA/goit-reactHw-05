import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={css.btn}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
