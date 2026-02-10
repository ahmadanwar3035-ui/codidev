import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";



function Row({ member, onDelete }) {
  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: "1px solid gray",
    padding: "10px",
    marginTop: "10px",
    background: "#eee",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <h3>{member.name}</h3>
      <p>Skill: {member.skill}</p>
      <button onClick={() => onDelete(member.id)}>Remove</button>
    </div>
  );
}




function Dev() {
  const [members, setMembers] = useState([]);

  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");


  const addMember = (e) => {
    e.preventDefault();
    if (!name || !skill) return;

    setMembers([
      ...members,
      {
        id: Date.now().toString(),
        name,
        skill,
      },
    ]);

    setName("");
    setSkill("");
  };


  const deleteMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setMembers((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div style={{ padding: "100px", fontFamily: "sans-serif" }}>
      <h1>Dev Community</h1>

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

     
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={members.map((m) => m.id)}
          strategy={verticalListSortingStrategy}
        >
          {members.map((m) => (
            <Row
              key={m.id}
              member={m}
              onDelete={deleteMember}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default Dev;
