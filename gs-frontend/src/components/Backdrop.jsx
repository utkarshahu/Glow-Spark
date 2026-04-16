const Backdrop = ({ click, show }) => {
  return (
    show && (
      <div
        onClick={click}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
      />
    )
  );
};

export default Backdrop;