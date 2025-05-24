const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-32">
      <div className="relative w-10 h-10">
        <div className="absolute w-full h-full border-4 border-primary rounded-full animate-[spin_1s_linear_infinite] border-t-transparent"></div>
        <div className="absolute w-full h-full border-4 border-primary/30 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
