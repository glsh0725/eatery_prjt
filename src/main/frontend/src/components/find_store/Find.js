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

document.querySelectorAll('.region-column ul li').forEach((item) => {
  item.addEventListener('click', function () {
    document.querySelectorAll('.region-column ul li.selected').forEach((selectedItem) => {
      selectedItem.classList.remove('selected');
    });

    this.classList.add('selected');
  });
});

export default Find;