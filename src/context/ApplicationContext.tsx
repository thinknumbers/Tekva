
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

export interface ApplicationComment {
  id: string;
  application_id: string;
  application_type: 'financial' | 'work' | 'venture';
  comment_type: 'comment' | 'status_change' | 'edit';
  content: string;
  previous_status?: string;
  new_status?: string;
  created_at: string;
  created_by: string;
}

interface ApplicationContextType {
  financialApplications: FinancialApplication[];
  workApplications: WorkApplication[];
  ventureApplications: VentureApplication[];
  addFinancialApplication: (app: Omit<FinancialApplication, 'id' | 'date' | 'status'>, file?: File) => Promise<void>;
  addWorkApplication: (app: Omit<WorkApplication, 'id' | 'date' | 'status'>, file?: File) => Promise<void>;
  addVentureApplication: (app: Omit<VentureApplication, 'id' | 'date' | 'status'>) => Promise<void>;
  updateApplicationStatus: (id: string, type: 'financial' | 'work' | 'venture', status: string) => Promise<void>;
  updateApplicationDetails: (id: string, type: 'financial' | 'work' | 'venture', data: any) => Promise<void>;
  fetchComments: (applicationId: string, type: 'financial' | 'work' | 'venture') => Promise<ApplicationComment[]>;
  addComment: (applicationId: string, type: 'financial' | 'work' | 'venture', content: string) => Promise<void>;
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

  const updateApplicationStatus = async (id: string, type: 'financial' | 'work' | 'venture', status: string) => {
    const table = type === 'financial' 
      ? 'financial_applications' 
      : type === 'work' 
        ? 'work_applications' 
        : 'venture_applications';

    // Get current status before updating
    const { data: currentData } = await supabase
      .from(table)
      .select('status')
      .eq('id', id)
      .single();

    const previousStatus = currentData?.status;

    const { error } = await supabase
      .from(table)
      .update({ status })
      .eq('id', id);

    if (error) throw error;

    // Log the status change as a comment
    await addActivityLog(id, type, 'status_change', `Status changed from ${previousStatus} to ${status}`, previousStatus, status);
    
    // Refresh data immediately
    fetchData();
  };

  const updateApplicationDetails = async (id: string, type: 'financial' | 'work' | 'venture', data: any) => {
    const table = type === 'financial' 
      ? 'financial_applications' 
      : type === 'work' 
        ? 'work_applications' 
        : 'venture_applications';

    // Map frontend camelCase to DB snake_case
    const dbData: any = {};
    
    // Common fields
    if (data.name) dbData.name = data.name;
    if (data.email) dbData.email = data.email;
    if (data.phone) dbData.phone = data.phone;
    if (data.status) dbData.status = data.status;

    // Financial fields
    if (type === 'financial') {
      if (data.familySize) dbData.family_size = data.familySize;
      if (data.supportType) dbData.support_type = data.supportType;
      if (data.urgency) dbData.urgency = data.urgency;
      if (data.monthlyIncome) dbData.monthly_income = data.monthlyIncome;
      if (data.expenses) dbData.expenses = data.expenses;
      if (data.situation) dbData.situation = data.situation;
      if (data.amount) dbData.amount = data.amount;
    }

    // Work fields
    if (type === 'work') {
      if (data.skills) dbData.skills = data.skills;
      if (data.experience) dbData.experience = data.experience;
      if (data.availability) dbData.availability = data.availability;
      if (data.workType) dbData.work_type = data.workType;
      if (data.education) dbData.education = data.education;
      if (data.goals) dbData.goals = data.goals;
    }

    // Venture fields
    if (type === 'venture') {
      if (data.founderName) dbData.founder_name = data.founderName;
      if (data.ventureName) dbData.venture_name = data.ventureName;
      if (data.stage) dbData.stage = data.stage;
      if (data.industry) dbData.industry = data.industry;
      if (data.problem) dbData.problem = data.problem;
      if (data.solution) dbData.solution = data.solution;
      if (data.targetMarket) dbData.target_market = data.targetMarket;
      if (data.businessModel) dbData.business_model = data.businessModel;
      if (data.teamSize) dbData.team_size = data.teamSize;
      if (data.funding) dbData.funding = data.funding;
      if (data.timeline) dbData.timeline = data.timeline;
      if (data.supportNeeded) dbData.support_needed = data.supportNeeded;
    }

    const { error } = await supabase
      .from(table)
      .update(dbData)
      .eq('id', id);

    if (error) throw error;
    
    fetchData();
  };

  // Helper function to add activity logs
  const addActivityLog = async (
    applicationId: string,
    type: 'financial' | 'work' | 'venture',
    commentType: 'comment' | 'status_change' | 'edit',
    content: string,
    previousStatus?: string,
    newStatus?: string
  ) => {
    const { error } = await supabase
      .from('application_comments')
      .insert([{
        application_id: applicationId,
        application_type: type,
        comment_type: commentType,
        content,
        previous_status: previousStatus,
        new_status: newStatus,
        created_by: 'System'
      }]);

    if (error) throw error;
  };

  // Fetch all comments for an application
  const fetchComments = async (applicationId: string, type: 'financial' | 'work' | 'venture'): Promise<ApplicationComment[]> => {
    const { data, error } = await supabase
      .from('application_comments')
      .select('*')
      .eq('application_id', applicationId)
      .eq('application_type', type)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  };

  // Add a new manual comment
  const addComment = async (applicationId: string, type: 'financial' | 'work' | 'venture', content: string) => {
    const { error } = await supabase
      .from('application_comments')
      .insert([{
        application_id: applicationId,
        application_type: type,
        comment_type: 'comment',
        content,
        created_by: 'Admin' // TODO: Replace with actual user when auth is implemented
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
        updateApplicationStatus,
        updateApplicationDetails,
        fetchComments,
        addComment,
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
