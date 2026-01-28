import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface LearnedFact {
  id: string;
  fact_type: string;
  fact_key: string;
  fact_value: string;
  source_agent: string | null;
  confidence: number;
  mentioned_count: number;
  first_learned_at: string;
  last_mentioned_at: string;
  is_verified: boolean;
}

export type FactType = 
  | 'identity' 
  | 'colleague' 
  | 'client' 
  | 'company' 
  | 'project' 
  | 'preference' 
  | 'workflow' 
  | 'goal'
  | 'general';

export const factTypeLabels: Record<FactType, string> = {
  identity: '👤 Identity',
  colleague: '🤝 Colleagues',
  client: '💼 Clients',
  company: '🏢 Companies',
  project: '📋 Projects',
  preference: '⚙️ Preferences',
  workflow: '🔄 Workflows',
  goal: '🎯 Goals',
  general: '📝 General',
};

export function useLearnedFacts() {
  const { user } = useAuth();
  const [facts, setFacts] = useState<LearnedFact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFacts = useCallback(async () => {
    if (!user) {
      setFacts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('user_learned_facts')
        .select('*')
        .eq('user_id', user.id)
        .order('last_mentioned_at', { ascending: false });

      if (fetchError) throw fetchError;
      
      // Transform the data to match our interface
      const transformedFacts: LearnedFact[] = (data || []).map(row => ({
        id: row.id,
        fact_type: row.fact_type,
        fact_key: row.fact_key,
        fact_value: row.fact_value,
        source_agent: row.source_agent,
        confidence: Number(row.confidence) || 0.8,
        mentioned_count: row.mentioned_count || 1,
        first_learned_at: row.first_learned_at,
        last_mentioned_at: row.last_mentioned_at,
        is_verified: row.is_verified || false,
      }));
      
      setFacts(transformedFacts);
      setError(null);
    } catch (err) {
      console.error('Error loading learned facts:', err);
      setError('Failed to load learned facts');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadFacts();
  }, [loadFacts]);

  const deleteFact = useCallback(async (factId: string) => {
    if (!user) return false;

    try {
      const { error: deleteError } = await supabase
        .from('user_learned_facts')
        .delete()
        .eq('id', factId)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      setFacts(prev => prev.filter(f => f.id !== factId));
      return true;
    } catch (err) {
      console.error('Error deleting fact:', err);
      return false;
    }
  }, [user]);

  const updateFact = useCallback(async (factId: string, updates: Partial<Pick<LearnedFact, 'fact_value' | 'is_verified'>>) => {
    if (!user) return false;

    try {
      const { error: updateError } = await supabase
        .from('user_learned_facts')
        .update(updates)
        .eq('id', factId)
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setFacts(prev => prev.map(f => f.id === factId ? { ...f, ...updates } : f));
      return true;
    } catch (err) {
      console.error('Error updating fact:', err);
      return false;
    }
  }, [user]);

  const clearAllFacts = useCallback(async () => {
    if (!user) return false;

    try {
      const { error: deleteError } = await supabase
        .from('user_learned_facts')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      setFacts([]);
      return true;
    } catch (err) {
      console.error('Error clearing facts:', err);
      return false;
    }
  }, [user]);

  const getFactsByType = useCallback((type: FactType) => {
    return facts.filter(f => f.fact_type === type);
  }, [facts]);

  const getFactsForAgent = useCallback((agentSlug: string) => {
    return facts.filter(f => f.source_agent === agentSlug);
  }, [facts]);

  return {
    facts,
    loading,
    error,
    deleteFact,
    updateFact,
    clearAllFacts,
    getFactsByType,
    getFactsForAgent,
    refresh: loadFacts,
    totalCount: facts.length,
  };
}
