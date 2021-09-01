import { useEffect, useState } from "react";
import Alert from "./Alert";
import List from "./List";
const getLocalStorage = () => {
  let data = localStorage.getItem("list");
  if (data) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState("");
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    if (!name) {
      showAlert(true, "danger", "Please Enter Something");
      console.log("alert");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setEditID(null);
      setIsEditing(false);
      setName("");
      showAlert("true", "success", "Successfully Edited");
    } else {
      const newitem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newitem]);

      showAlert(true, "success", "Item Added Successfully");
      setName("");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const emptyList = () => {
    showAlert(true, "warning", "List Cleared");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "warning", "Item Removed");
    setList(list.filter((items) => items.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setEditID(id);
    setIsEditing(true);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <div className="container">
      <div className="row ">
        <div className="col-12 ">
          <div className="bg-light p-3 border-1 rounded-3 ">
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}
            <h1 className="text-center mb-4">Todo App</h1>
            <form
              onSubmit={handleSubmit}
              className="d-flex  justify-content-between"
            >
              <input
                type="text"
                placeholder="Enter Something"
                value={name}
                className="form-control  d-inline-block"
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn btn-success">
                {isEditing ? "Edit" : "Submit"}
              </button>
            </form>
            {list.length > 0 && (
              <div className="">
                <List item={list} remItem={removeItem} editItem={editItem} />
                <button
                  className="btn btn-danger mx-auto d-block fw-bold fst-italic"
                  onClick={emptyList}
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
