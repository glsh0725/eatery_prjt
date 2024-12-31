import React from "react";

function Find(props) {
  const clickMe = () => {
    alert(String(props.message));
  };

  return (
    <form>
      <div className="box">
        Box{props.num} {props.name}
        <button onClick={clickMe}>클릭!</button>
      </div>
    </form>
  );
}

export default Find;
