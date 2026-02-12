import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../App.css";

function Row({ member, onDelete }) {
  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="card">
      <div className="card-left">
        <span className="drag" {...listeners} {...attributes}>
          ☰
        </span>

        <div>
          <h3>{member.name}</h3>
          <p>{member.skill}</p>
        </div>
      </div>

      <button onClick={() => onDelete(member.id)} className="del">
        Delete
      </button>
    </div>
  );
}

export default function App() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");

  function addMember(e) {
    e.preventDefault();
    if (!name || !skill) return;

    setMembers((prev) => [...prev, { id: Date.now().toString(), name, skill }]);

    setName("");
    setSkill("");
  }

  function deleteMember(id) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setMembers((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  }

  return (
    <div className="wrap">
      <div className="box">
        <h1>Dev Community</h1>

        <form onSubmit={addMember} className="form">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />

          <button>Add</button>
        </form>

        <div className="top">
          <b>Members</b>
          <span>{members.length}</span>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={members.map((m) => m.id)}
            strategy={verticalListSortingStrategy}
          >
            {members.map((m) => (
              <Row key={m.id} member={m} onDelete={deleteMember} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
