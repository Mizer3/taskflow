import seed from "./_seed.js";

const db = structuredClone(seed);

const newId = () => Math.random().toString(36).slice(2, 13);

function send(res, status, data) {
  res.status(status).json(data);
}

export default function handler(req, res) {
  const path = String(req.query.path ?? "").replace(/\/+$/, "");
  const [resource, id] = path.split("/");
  const collection = db[resource];
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});

  if (!collection) return send(res, 404, {});

  if (!id) {
    if (req.method === "GET") {
      let items = collection;
      for (const [key, value] of Object.entries(req.query)) {
        if (key === "path" || key.startsWith("_")) continue;
        items = items.filter((item) => String(item[key]) === String(value));
      }
      if (resource === "projects" && req.query._embed === "tasks") {
        items = items.map((p) => ({ ...p, tasks: db.tasks.filter((t) => t.projectId === p.id) }));
      }
      return send(res, 200, items);
    }
    if (req.method === "POST") {
      const item = { ...body, id: newId() };
      collection.push(item);
      return send(res, 201, item);
    }
    return send(res, 405, {});
  }

  const index = collection.findIndex((item) => item.id === id);
  if (index === -1) return send(res, 404, {});

  if (req.method === "GET") return send(res, 200, collection[index]);
  if (req.method === "PATCH" || req.method === "PUT") {
    collection[index] = { ...collection[index], ...body, id };
    return send(res, 200, collection[index]);
  }
  if (req.method === "DELETE") {
    const [removed] = collection.splice(index, 1);
    if (resource === "projects") db.tasks = db.tasks.filter((t) => t.projectId !== id);
    return send(res, 200, removed);
  }
  return send(res, 405, {});
}
