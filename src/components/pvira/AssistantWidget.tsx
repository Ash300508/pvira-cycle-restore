import { useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DemoBadge } from "@/components/pvira/StatusBadge";
import { askAssistant, SUGGESTED_QUESTIONS, type ChatMessage } from "@/lib/assistant";
import { cn } from "@/lib/utils";

let seq = 0;
const nextId = () => `m${(seq += 1)}`;

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nextId(),
      role: "assistant",
      content:
        "Namaste. I'm the PAVITRA guide. Ask me about idol materials, environmental risk, drop-off centres or how recovery works.",
      isDemo: true,
    },
  ]);

  const send = async (question: string) => {
    const text = question.trim();
    if (!text || pending) return;
    setInput("");
    setMessages((prev) => [...prev, { id: nextId(), role: "user", content: text }]);
    setPending(true);
    try {
      const { content, isDemo } = await askAssistant(text);
      setMessages((prev) => [...prev, { id: nextId(), role: "assistant", content, isDemo }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", content: "I couldn't answer that just now. Please try again." },
      ]);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Button
        size="lg"
        className="fixed bottom-5 right-5 z-50 h-12 rounded-full px-5 shadow-lift"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? <X /> : <Sparkles />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask PAVITRA"}</span>
      </Button>

      {open && (
        <div className="fixed bottom-20 right-4 z-50 flex max-h-[70vh] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
          <div className="flex items-center gap-2 border-b border-border bg-sand-gradient px-4 py-3">
            <span className="flex size-8 items-center justify-center rounded-lg bg-leaf-gradient text-primary-foreground">
              <Bot className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">PAVITRA Guide</p>
              <p className="truncate text-xs text-muted-foreground">Disposal & recovery assistant</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {m.content}
                {m.role === "assistant" && m.isDemo && <DemoBadge className="mt-2" label="Demo AI" />}
              </div>
            ))}
            {pending && <p className="text-xs text-muted-foreground">PAVITRA Guide is typing…</p>}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => void send(q)}
                    className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="flex items-center gap-2 border-t border-border px-3 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              aria-label="Ask the PAVITRA guide"
            />
            <Button type="submit" size="icon" disabled={pending || !input.trim()} aria-label="Send">
              <Send />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
