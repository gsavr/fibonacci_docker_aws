export const Footer = () => {
  return (
    <footer
      className="card my-4 py-4 shadow"
      style={{
        width: "100%",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none",
        borderRadius: "0",
      }}
    >
      <div className="container relative mx-auto px-5 pb-10 pt-12">
        {/*  Flex container for all items  */}
        <div className="flex flex-col items-center justify-between space-y-24 md:flex-row md:space-y-0">
          <div className="mt-14">
            <div className="flex  space-x-3 md:-mt-10">
              <div>
                Built with React.js / Node.js & Express / Docker by Giorgio
                Savron
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
