const Container = ({ children, noPadding }) => {
  return (
    <div
      className="m-auto"
      style={{
        paddingLeft: noPadding ? 0 : 16,
        paddingRight: noPadding ? 0 : 16,
        maxWidth: noPadding ? 'calc(600px - 32px)' : 600
      }}
    >
      {children}
    </div>
  );
};

export default Container;
