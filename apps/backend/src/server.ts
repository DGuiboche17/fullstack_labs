import { app } from "./app";

const PORT = Number(process.env.PORT ?? 3001);

app.listen(PORT, () => {
  console.log(`Pixell River API is running on http://localhost:${PORT}`);
});
