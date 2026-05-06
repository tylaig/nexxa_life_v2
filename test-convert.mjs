import { convertToModelMessages } from "ai";

const uiMessages = [
  { role: "user", content: "Hello" },
  { role: "assistant", content: "Hi", toolInvocations: [{ toolCallId: "1", toolName: "addGoal", args: {} }] }
];

const formattedUiMessages = uiMessages.map((m) => ({
  ...m,
  parts: m.parts || [{ type: "text", text: m.content || "" }]
}));

const run = async () => {
  try {
    const res = await convertToModelMessages(formattedUiMessages);
    console.log("Success convertToModelMessages:", JSON.stringify(res, null, 2));
  } catch (e) {
    console.error("Error calling convertToModelMessages:", e);
  }
}
run();
