
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export interface FinancialApplication {
  id: string;
  name: string;
  familySize: number;
  supportType: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  date: string;
  amount?: string;
}

export interface WorkApplication {
  id: string;
  name: string;
  skills: string[];
  experience: string;
  status: 'pending' | 'matched' | 'placed';
  date: string;
}

export interface VentureApplication {
  id: string;
  founderName: string;
  ventureName: string;
  stage: string;
  status: 'pending' | 'reviewing' | 'incubating';
  date: string;
}

interface ApplicationContextType {
  financialApplications: FinancialApplication[];
  workApplications: WorkApplication[];
  ventureApplications: VentureApplication[];
  addFinancialApplication: (app: Omit<FinancialApplication, 'id' | 'date' | 'status'>) => Promise<void>;
  addWorkApplication: (app: Omit<WorkApplication, 'id' | 'date' | 'status'>) => Promise<void>;
  addVentureApplication: (app: Omit<VentureApplication, 'id' | 'date' | 'status'>) => Promise<void>;
  loading: boolean;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [financialApplications, setFinancialApplications] = useState<FinancialApplication[]>([]);
  const [workApplications, setWorkApplications] = useState<WorkApplication[]>([]);
  const [ventureApplications, setVentureApplications] = useState<VentureApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [financial, work, venture] = await Promise.all([
        supabase.from('financial_applications').select('*').order('created_at', { ascending: false }),
        supabase.from('work_applications').select('*').order('created_at', { ascending: false }),
        supabase.from('venture_applications').select('*').order('created_at', { ascending: false }),
      ]);

      if (financial.data) {
        setFinancialApplications(financial.data.map(item => ({
          id: item.id,
          name: item.name,
          familySize: item.family_size,
          supportType: item.support_type,
          status: item.status,
          date: new Date(item.created_at).toISOString().split('T')[0],
          amount: item.amount
        })));
      }

      if (work.data) {
        setWorkApplications(work.data.map(item => ({
          id: item.id,
          name: item.name,
          skills: item.skills,
          experience: item.experience,
          status: item.status,
          date: new Date(item.created_at).toISOString().split('T')[0],
        })));
      }

      if (venture.data) {
        setVentureApplications(venture.data.map(item => ({
          id: item.id,
          founderName: item.founder_name,
          ventureName: item.venture_name,
          stage: item.stage,
          status: item.status,
          date: new Date(item.created_at).toISOString().split('T')[0],
        })));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Subscribe to realtime changes
    const financialSub = supabase
      .channel('financial_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'financial_applications' }, () => fetchData())
      .subscribe();

    const workSub = supabase
      .channel('work_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'work_applications' }, () => fetchData())
      .subscribe();

    const ventureSub = supabase
      .channel('venture_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'venture_applications' }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(financialSub);
      supabase.removeChannel(workSub);
      supabase.removeChannel(ventureSub);
    };
  }, []);

  const addFinancialApplication = async (app: Omit<FinancialApplication, 'id' | 'date' | 'status'>) => {
    const { error } = await supabase.from('financial_applications').insert([{
      name: app.name,
      family_size: app.familySize,
      support_type: app.supportType,
      amount: app.amount,
      status: 'pending'
    }]);

    if (error) throw error;
  };

  const addWorkApplication = async (app: Omit<WorkApplication, 'id' | 'date' | 'status'>) => {
    const { error } = await supabase.from('work_applications').insert([{
      name: app.name,
      skills: app.skills,
      experience: app.experience,
      status: 'pending'
    }]);

    if (error) throw error;
  };

  const addVentureApplication = async (app: Omit<VentureApplication, 'id' | 'date' | 'status'>) => {
    const { error } = await supabase.from('venture_applications').insert([{
      founder_name: app.founderName,
      venture_name: app.ventureName,
      stage: app.stage,
      status: 'pending'
    }]);

    if (error) throw error;
  };

  return (
    <ApplicationContext.Provider
      value={{
        financialApplications,
        workApplications,
        ventureApplications,
        addFinancialApplication,
        addWorkApplication,
        addVentureApplication,
        loading
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within ApplicationProvider');
  }
  return context;
}
