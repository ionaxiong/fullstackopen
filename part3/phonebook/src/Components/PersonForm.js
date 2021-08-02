import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  handleNewName,
  handleNewNumber,
  addInfo,
}) => {
  return (
    <>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit" onClick={(event) => addInfo(event)}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
