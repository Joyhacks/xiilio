import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, Trash2, Check, X, Edit2, 
  ChevronDown, ChevronRight, RefreshCw, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  useLearnedFacts, 
  factTypeLabels, 
  type FactType, 
  type LearnedFact 
} from '@/hooks/useLearnedFacts';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface FactItemProps {
  fact: LearnedFact;
  onDelete: (id: string) => Promise<boolean>;
  onUpdate: (id: string, updates: Partial<Pick<LearnedFact, 'fact_value' | 'is_verified'>>) => Promise<boolean>;
}

function FactItem({ fact, onDelete, onUpdate }: FactItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(fact.fact_value);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setLoading(true);
    const success = await onUpdate(fact.id, { fact_value: editValue });
    setLoading(false);
    
    if (success) {
      setEditing(false);
      toast({ title: 'Fact updated' });
    } else {
      toast({ title: 'Failed to update', variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    const success = await onDelete(fact.id);
    setLoading(false);
    
    if (success) {
      toast({ title: 'Fact deleted' });
    } else {
      toast({ title: 'Failed to delete', variant: 'destructive' });
    }
  };

  const handleVerify = async () => {
    const success = await onUpdate(fact.id, { is_verified: !fact.is_verified });
    if (success) {
      toast({ title: fact.is_verified ? 'Unverified' : 'Verified as correct' });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 group"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-foreground">{fact.fact_key}</span>
          {fact.is_verified && (
            <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/30">
              Verified
            </Badge>
          )}
          {fact.mentioned_count > 1 && (
            <span className="text-xs text-muted-foreground">
              ×{fact.mentioned_count}
            </span>
          )}
        </div>
        
        {editing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="h-8 text-sm"
              autoFocus
            />
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleSave} disabled={loading}>
              <Check className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditing(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{fact.fact_value}</p>
        )}
        
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          {fact.source_agent && (
            <span>via {fact.source_agent}</span>
          )}
          <span>•</span>
          <span>{new Date(fact.last_mentioned_at).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-7 w-7"
          onClick={handleVerify}
          title={fact.is_verified ? 'Unverify' : 'Mark as verified'}
        >
          <Check className={cn("w-3.5 h-3.5", fact.is_verified && "text-green-600")} />
        </Button>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-7 w-7"
          onClick={() => setEditing(true)}
          disabled={editing}
        >
          <Edit2 className="w-3.5 h-3.5" />
        </Button>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-7 w-7 text-destructive hover:text-destructive"
          onClick={handleDelete}
          disabled={loading}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </motion.div>
  );
}

interface FactCategoryProps {
  type: FactType;
  facts: LearnedFact[];
  onDelete: (id: string) => Promise<boolean>;
  onUpdate: (id: string, updates: Partial<Pick<LearnedFact, 'fact_value' | 'is_verified'>>) => Promise<boolean>;
}

function FactCategory({ type, facts, onDelete, onUpdate }: FactCategoryProps) {
  const [expanded, setExpanded] = useState(true);

  if (facts.length === 0) return null;

  return (
    <div className="space-y-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full text-left py-1 hover:text-foreground transition-colors"
      >
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
        <span className="font-medium text-sm">{factTypeLabels[type]}</span>
        <Badge variant="secondary" className="text-xs ml-auto">
          {facts.length}
        </Badge>
      </button>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 pl-6 overflow-hidden"
          >
            {facts.map(fact => (
              <FactItem 
                key={fact.id} 
                fact={fact} 
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LearnedFactsViewer() {
  const { 
    facts, 
    loading, 
    deleteFact, 
    updateFact, 
    clearAllFacts, 
    refresh,
    totalCount 
  } = useLearnedFacts();
  const { toast } = useToast();
  const [clearing, setClearing] = useState(false);

  const handleClearAll = async () => {
    setClearing(true);
    const success = await clearAllFacts();
    setClearing(false);
    
    if (success) {
      toast({ title: 'All learned facts cleared' });
    } else {
      toast({ title: 'Failed to clear facts', variant: 'destructive' });
    }
  };

  // Group facts by type
  const factsByType = facts.reduce((acc, fact) => {
    const type = fact.fact_type as FactType;
    if (!acc[type]) acc[type] = [];
    acc[type].push(fact);
    return acc;
  }, {} as Record<FactType, LearnedFact[]>);

  const orderedTypes: FactType[] = [
    'identity', 'colleague', 'client', 'company', 
    'project', 'preference', 'workflow', 'goal', 'general'
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="font-medium text-foreground">
            Learned Facts
            <span className="ml-2 text-sm text-muted-foreground">
              ({totalCount} {totalCount === 1 ? 'fact' : 'facts'})
            </span>
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={refresh}
            className="gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </Button>
          
          {totalCount > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive" className="gap-1.5">
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear all learned facts?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all {totalCount} facts the system has learned about you.
                    Agents will no longer remember these details. This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAll} disabled={clearing}>
                    {clearing ? 'Clearing...' : 'Yes, clear all'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      {/* Facts List */}
      {totalCount === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Lightbulb className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No facts learned yet</p>
          <p className="text-sm mt-1">
            As you chat with agents, they'll remember key details about you, your work, and your preferences.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orderedTypes.map(type => (
            <FactCategory
              key={type}
              type={type}
              facts={factsByType[type] || []}
              onDelete={deleteFact}
              onUpdate={updateFact}
            />
          ))}
        </div>
      )}
    </div>
  );
}
