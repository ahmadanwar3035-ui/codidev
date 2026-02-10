import { useState } from "react";

function Dev() {

  const [members, setMembers] = useState([
    // { name: "Ali", skill: "React" },
    // { name: "Sara", skill: "JavaScript" }
  ]);

  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");

 
  const addMember = (e) => {
    e.preventDefault();

    if (!name || !skill) return;

    setMembers([...members, { name, skill }]);
    setName("");
    setSkill("");
  };

 
  const deleteMember = (index) => {
    const newList = members.filter((_, i) => i !== index);
    setMembers(newList);
  };

  return (
    <div style={{ padding: "100px 100px 0px  100px" , fontFamily: "sans-serif" }}>
      
      <h1> Dev Community</h1>

  
      <form onSubmit={addMember}>
        <input
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Enter skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        <button type="submit">Add Dev</button>
      </form>

 
      <h3>Total Devs: {members.length}</h3>

      {members.map((m, i) => (
        <div key={i} style={{
          border: "1px solid gray",
          padding: "10px",
          marginTop: "10px"
        }}>
          <h3>{m.name}</h3>
          <p>Skill: {m.skill}</p>

          <button onClick={() => deleteMember(i)}>
            Remove
          </button>
        </div>
      ))}

    </div>
  );
}

export default Dev;
