import "./container.css";

const AppContainer = ({ children, width = 1000 }) => {
  return (
    <div className="appContainer" style={{ maxWidth: width }}>
      {children}
    </div>
  );
};

export default AppContainer;
