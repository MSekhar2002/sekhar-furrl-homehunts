const CategoryFilters = (props) => {
  const { item, activeFilter, activeFilterChanged } = props;
  const { name } = item;

  const tabChanged = () => {
    activeFilterChanged(item);
  };

  return (
    <li
      onClick={tabChanged}
      className={`tab ${activeFilter != null && activeFilter.uniqueId === item.uniqueId ? "active" : ""}`}
    >
      <span>{name}</span>
    </li>
  );
};

export default CategoryFilters;
