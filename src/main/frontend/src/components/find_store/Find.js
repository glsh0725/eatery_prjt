import React from "react";

function Find(props) {
  const clickMe = () => {
    alert(String(props.message));
  };
  return (
    <form>
      <div className="box">
        Box{props.num} {props.name}
        <button type="button" onClick={clickMe}>클릭!</button>
      </div>
    </form>
  );
}

//function Tags(tagone) {
//  return (
//    <div className="tagtwo">
//      Tags{tagone.name}
//    </div>
//  );
//}

export default Find;