const PageHeader = ({ title }: { title?: string }) => {
  return (
    <div className="page-header py-8 bg-[#f8f9f9] border-t border-b border-[#e9e9e9]">
      <div className="container m-auto">
        <h1 className="entry-title">{title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;
