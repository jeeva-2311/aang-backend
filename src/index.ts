import app from "./app";
import { testDbConnection } from "./db/client";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  await testDbConnection();
});
