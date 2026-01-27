import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Save, Sparkles } from "lucide-react";

interface AgentConfigPanelProps {
  agentSlug: string;
  agentName: string;
}

interface AgentConfiguration {
  id: string;
  agent_slug: string;
  personality_tone: string;
  formality_level: string;
  response_length: string;
  greeting_style: string;
  custom_instructions: string | null;
  is_active: boolean;
}

const PERSONALITY_TONES = [
  { value: "friendly", label: "Friendly & Approachable" },
  { value: "professional", label: "Professional & Polished" },
  { value: "witty", label: "Witty & Humorous" },
  { value: "confident", label: "Confident & Direct" },
  { value: "charming", label: "Charming & Engaging" },
  { value: "motivational", label: "Motivational & Energetic" },
  { value: "elegant", label: "Elegant & Refined" },
  { value: "intense", label: "Intense & Powerful" },
];

const FORMALITY_LEVELS = [
  { value: "casual", label: "Casual" },
  { value: "professional", label: "Professional" },
  { value: "formal", label: "Formal" },
];

const RESPONSE_LENGTHS = [
  { value: "concise", label: "Concise (Brief answers)" },
  { value: "balanced", label: "Balanced (Standard)" },
  { value: "detailed", label: "Detailed (Comprehensive)" },
];

const GREETING_STYLES = [
  { value: "warm", label: "Warm & Welcoming" },
  { value: "direct", label: "Direct & Efficient" },
  { value: "friendly", label: "Friendly & Casual" },
  { value: "gracious", label: "Gracious & Formal" },
  { value: "energetic", label: "Energetic & Upbeat" },
  { value: "confident", label: "Confident & Bold" },
  { value: "humorous", label: "Humorous & Light" },
  { value: "powerful", label: "Powerful & Inspiring" },
];

export function AgentConfigPanel({ agentSlug, agentName }: AgentConfigPanelProps) {
  const queryClient = useQueryClient();
  const [localConfig, setLocalConfig] = useState<Partial<AgentConfiguration>>({});

  const { data: config, isLoading } = useQuery({
    queryKey: ["agent-config", agentSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agent_configurations")
        .select("*")
        .eq("agent_slug", agentSlug)
        .maybeSingle();

      if (error) throw error;
      return data as AgentConfiguration | null;
    },
  });

  useEffect(() => {
    if (config) {
      setLocalConfig(config);
    }
  }, [config]);

  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<AgentConfiguration>) => {
      if (!config?.id) {
        // Create new config if doesn't exist
        const { error } = await supabase.from("agent_configurations").insert({
          agent_slug: agentSlug,
          ...updates,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("agent_configurations")
          .update(updates)
          .eq("id", config.id);
        if (error) throw error;
      }

      // Log activity
      await supabase.from("agent_activity_history").insert({
        agent_slug: agentSlug,
        activity_type: "configuration_updated",
        summary: `Configuration updated for ${agentName}`,
        details: { changes: updates },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agent-config", agentSlug] });
      queryClient.invalidateQueries({ queryKey: ["agent-activity", agentSlug] });
      toast.success("Configuration saved successfully!");
    },
    onError: (error) => {
      console.error("Failed to save config:", error);
      toast.error("Failed to save configuration");
    },
  });

  const handleSave = () => {
    updateMutation.mutate(localConfig);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Personality Settings</h3>
        </div>
        <Button onClick={handleSave} disabled={updateMutation.isPending}>
          {updateMutation.isPending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="personality_tone">Personality Tone</Label>
          <Select
            value={localConfig.personality_tone || "friendly"}
            onValueChange={(value) =>
              setLocalConfig((prev) => ({ ...prev, personality_tone: value }))
            }
          >
            <SelectTrigger id="personality_tone">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {PERSONALITY_TONES.map((tone) => (
                <SelectItem key={tone.value} value={tone.value}>
                  {tone.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="formality_level">Formality Level</Label>
          <Select
            value={localConfig.formality_level || "professional"}
            onValueChange={(value) =>
              setLocalConfig((prev) => ({ ...prev, formality_level: value }))
            }
          >
            <SelectTrigger id="formality_level">
              <SelectValue placeholder="Select formality" />
            </SelectTrigger>
            <SelectContent>
              {FORMALITY_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="response_length">Response Length</Label>
          <Select
            value={localConfig.response_length || "balanced"}
            onValueChange={(value) =>
              setLocalConfig((prev) => ({ ...prev, response_length: value }))
            }
          >
            <SelectTrigger id="response_length">
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent>
              {RESPONSE_LENGTHS.map((length) => (
                <SelectItem key={length.value} value={length.value}>
                  {length.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="greeting_style">Greeting Style</Label>
          <Select
            value={localConfig.greeting_style || "warm"}
            onValueChange={(value) =>
              setLocalConfig((prev) => ({ ...prev, greeting_style: value }))
            }
          >
            <SelectTrigger id="greeting_style">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {GREETING_STYLES.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="custom_instructions">Custom Instructions</Label>
        <Textarea
          id="custom_instructions"
          placeholder="Add any custom instructions for this agent's behavior..."
          value={localConfig.custom_instructions || ""}
          onChange={(e) =>
            setLocalConfig((prev) => ({
              ...prev,
              custom_instructions: e.target.value,
            }))
          }
          className="min-h-[100px]"
        />
        <p className="text-xs text-muted-foreground">
          These instructions will be added to the agent's system prompt to customize their responses.
        </p>
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
        <div>
          <Label htmlFor="is_active">Agent Active</Label>
          <p className="text-sm text-muted-foreground">
            Toggle to enable or disable this agent
          </p>
        </div>
        <Switch
          id="is_active"
          checked={localConfig.is_active !== false}
          onCheckedChange={(checked) =>
            setLocalConfig((prev) => ({ ...prev, is_active: checked }))
          }
        />
      </div>
    </div>
  );
}
