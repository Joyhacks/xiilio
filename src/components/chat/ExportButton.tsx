import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format as formatDate } from "date-fns";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

interface ExportButtonProps {
  messages: Message[];
  agentName: string;
  disabled?: boolean;
}

export function ExportButton({ messages, agentName, disabled }: ExportButtonProps) {
  const formatTimestamp = (date: Date) => formatDate(date, "yyyy-MM-dd HH:mm:ss");

  const generateTextExport = () => {
    const header = `Conversation with ${agentName}\nExported: ${formatTimestamp(new Date())}\n${"=".repeat(50)}\n\n`;
    
    const content = messages.map((msg) => {
      const speaker = msg.role === "user" ? "You" : agentName;
      const voiceIndicator = msg.isVoice ? " 🎤" : "";
      const time = formatTimestamp(msg.timestamp);
      return `[${time}] ${speaker}${voiceIndicator}:\n${msg.content}\n`;
    }).join("\n");

    return header + content;
  };

  const generateJsonExport = () => {
    return JSON.stringify({
      agent: agentName,
      exportedAt: new Date().toISOString(),
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp.toISOString(),
        isVoice: msg.isVoice || false,
      })),
    }, null, 2);
  };

  const generateMarkdownExport = () => {
    const header = `# Conversation with ${agentName}\n\n_Exported: ${formatTimestamp(new Date())}_\n\n---\n\n`;
    
    const content = messages.map((msg) => {
      const speaker = msg.role === "user" ? "**You**" : `**${agentName}**`;
      const voiceIndicator = msg.isVoice ? " 🎤" : "";
      const time = formatDate(msg.timestamp, "HH:mm:ss");
      return `${speaker}${voiceIndicator} _${time}_\n\n${msg.content}\n`;
    }).join("\n---\n\n");

    return header + content;
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExport = (exportFormat: "txt" | "json" | "md") => {
    const timestamp = formatDate(new Date(), "yyyyMMdd-HHmmss");
    const agentSlug = agentName.toLowerCase().replace(/\s+/g, "-");
    
    switch (exportFormat) {
      case "txt":
        downloadFile(
          generateTextExport(),
          `${agentSlug}-chat-${timestamp}.txt`,
          "text/plain"
        );
        break;
      case "json":
        downloadFile(
          generateJsonExport(),
          `${agentSlug}-chat-${timestamp}.json`,
          "application/json"
        );
        break;
      case "md":
        downloadFile(
          generateMarkdownExport(),
          `${agentSlug}-chat-${timestamp}.md`,
          "text/markdown"
        );
        break;
    }
  };

  if (messages.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={disabled}
          className="text-muted-foreground hover:text-primary"
          title="Export conversation"
        >
          <Download className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("txt")}>
          Export as Text (.txt)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("md")}>
          Export as Markdown (.md)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("json")}>
          Export as JSON (.json)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
