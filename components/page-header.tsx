const PageHeader = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  if (!title) {
    return <></>;
  }
  return (
    <div className="page-header py-8 bg-[#f8f9f9] border-t border-b border-[#e9e9e9]">
      <div className="container m-auto">
        <h1 className="entry-title">{title}</h1>
        {description ? (
          <div className="description text-gray-500 pt-2.5">{description}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PageHeader;
