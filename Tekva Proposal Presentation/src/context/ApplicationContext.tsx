
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export interface FinancialApplication {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  familySize: number;
  supportType: string;
  urgency?: string;
  monthlyIncome?: string;
  expenses?: string;
  situation?: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  date: string;
  amount?: string;
  documentUrl?: string;
}

export interface WorkApplication {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  skills: string[];
  experience: string;
  availability?: string;
  workType?: string;
  education?: string;
  goals?: string;
  status: 'pending' | 'matched' | 'placed';
  date: string;
  cvUrl?: string;
}

export interface VentureApplication {
  id: string;
  founderName: string;
  email?: string;
  phone?: string;
  ventureName: string;
  stage: string;
  industry?: string;
  problem?: string;
  solution?: string;
  targetMarket?: string;
  businessModel?: string;
  teamSize?: string;
  funding?: string;
  timeline?: string;
  supportNeeded?: string[];
  status: 'pending' | 'reviewing' | 'incubating';
  date: string;
}

interface ApplicationContextType {
  financialApplications: FinancialApplication[];
  workApplications: WorkApplication[];
  ventureApplications: VentureApplication[];
  addFinancialApplication: (app: Omit<FinancialApplication, 'id' | 'date' | 'status'>, file?: File) => Promise<void>;
  addWorkApplication: (app: Omit<WorkApplication, 'id' | 'date' | 'status'>, file?: File) => Promise<void>;
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
          email: item.email,
          phone: item.phone,
          familySize: item.family_size,
          supportType: item.support_type,
          urgency: item.urgency,
          monthlyIncome: item.monthly_income,
          expenses: item.expenses,
          situation: item.situation,
          status: item.status,
          date: new Date(item.created_at).toISOString().split('T')[0],
          amount: item.amount,
          documentUrl: item.document_url
        })));
      }

      if (work.data) {
        setWorkApplications(work.data.map(item => ({
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          skills: item.skills,
          experience: item.experience,
          availability: item.availability,
          workType: item.work_type,
          education: item.education,
          goals: item.goals,
          status: item.status,
          date: new Date(item.created_at).toISOString().split('T')[0],
          cvUrl: item.cv_url
        })));
      }

      if (venture.data) {
        setVentureApplications(venture.data.map(item => ({
          id: item.id,
          founderName: item.founder_name,
          email: item.email,
          phone: item.phone,
          ventureName: item.venture_name,
          stage: item.stage,
          industry: item.industry,
          problem: item.problem,
          solution: item.solution,
          targetMarket: item.target_market,
          businessModel: item.business_model,
          teamSize: item.team_size,
          funding: item.funding,
          timeline: item.timeline,
          supportNeeded: item.support_needed,
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

  const uploadFile = async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('application-files')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('application-files')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const addFinancialApplication = async (app: Omit<FinancialApplication, 'id' | 'date' | 'status'>, file?: File) => {
    let documentUrl = '';
    if (file) {
      documentUrl = await uploadFile(file, 'financial');
    }

    const { error } = await supabase.from('financial_applications').insert([{
      name: app.name,
      email: app.email,
      phone: app.phone,
      family_size: app.familySize,
      support_type: app.supportType,
      urgency: app.urgency,
      monthly_income: app.monthlyIncome,
      expenses: app.expenses,
      situation: app.situation,
      amount: app.amount,
      document_url: documentUrl,
      status: 'pending'
    }]);

    if (error) throw error;
  };

  const addWorkApplication = async (app: Omit<WorkApplication, 'id' | 'date' | 'status'>, file?: File) => {
    let cvUrl = '';
    if (file) {
      cvUrl = await uploadFile(file, 'cvs');
    }

    const { error } = await supabase.from('work_applications').insert([{
      name: app.name,
      email: app.email,
      phone: app.phone,
      skills: app.skills,
      experience: app.experience,
      availability: app.availability,
      work_type: app.workType,
      education: app.education,
      goals: app.goals,
      cv_url: cvUrl,
      status: 'pending'
    }]);

    if (error) throw error;
  };

  const addVentureApplication = async (app: Omit<VentureApplication, 'id' | 'date' | 'status'>) => {
    const { error } = await supabase.from('venture_applications').insert([{
      founder_name: app.founderName,
      email: app.email,
      phone: app.phone,
      venture_name: app.ventureName,
      stage: app.stage,
      industry: app.industry,
      problem: app.problem,
      solution: app.solution,
      target_market: app.targetMarket,
      business_model: app.businessModel,
      team_size: app.teamSize,
      funding: app.funding,
      timeline: app.timeline,
      support_needed: app.supportNeeded,
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
