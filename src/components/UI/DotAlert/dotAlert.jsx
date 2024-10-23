import styles from "./style.module.css";

const DotAlert = ({
  customStyle
}) => {
  return (
    <div
      className={`w-[10px] h-[10px] bg-[#ff0000] rounded-full shadow-lg absolute z-10 ${customStyle} ${styles.dotAlert}`}
    ></div>
  );
};

export default DotAlert;
