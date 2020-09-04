import createSubscriber from "pg-listen"

// Accepts the same connection config object that the "pg" package would take
const subscriber = createSubscriber({ connectionString: process.env.PSQL_DB_URL2 })

subscriber.notifications.on("new_insert", (payload) => {
  // Payload as passed to subscriber.notify() (see below)
  console.log("Received notification in new_insert':", payload)
})

subscriber.events.on("error", (error) => {
  console.error("Fatal database connection error:", error)
  process.exit(1)
})

process.on("exit", () => {
  subscriber.close()
})

export async function connect () {
  await subscriber.connect()
  await subscriber.listenTo("new_insert")
}