import Button from "../UI/Button/button";

const Empty = ({ icon, title, msg, top = 18, href, buttonText }) => {
  return (
    <div
      className="flex items-center justify-center p-6 rotate-3 "
      style={{ marginTop: `${top}vh` }}
    >
      <div className="text-center flex justify-center items-center gap-4">
        <div>
          <b className="text-[26px]">{title}</b>
          <p className="text-[18px] text-[#a5a5a5] mb-2">{msg}</p>
          {buttonText && (
            <div className="-rotate-3">
              <Button
                href={href}
                rounded={16}
                className={"border-2 border-violet-600 text-violet-600 "}
              >
                {buttonText}
              </Button>
            </div>
          )}
        </div>
        {/* <div className="w-fit text-[120px] text-[#ceb1ff]">{icon}</div> */}
      </div>
    </div>
  );
};

export default Empty;
