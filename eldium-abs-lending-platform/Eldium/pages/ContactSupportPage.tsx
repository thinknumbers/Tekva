
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { IconContactSupport, IconPaperAirplane, IconEnvelope, IconHelpCenter } from '../constants'; // Reusing IconEnvelope
import { useTheme } from '../contexts/ThemeContext';

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'technical_issue' | 'general_inquiry' | 'feedback' | 'billing';
}

const ContactSupportPage: React.FC = () => {
  const { primaryColor } = useTheme();
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general_inquiry',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    console.log('Support Request Submitted:', formState);
    setIsSubmitted(true);
    // Reset form after a delay or navigate away
    setTimeout(() => {
        setIsSubmitted(false);
        setFormState({name: '', email: '', subject: '', message: '', type: 'general_inquiry'});
    }, 5000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center">
        <IconContactSupport className="w-12 h-12 text-primary mb-2" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Contact Eldium Support</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1 max-w-lg">
          We're here to help. Fill out the form below, or use one of our alternative contact methods.
        </p>
      </div>

      {isSubmitted ? (
        <Card>
            <div className="p-6 text-center">
                <IconPaperAirplane className="w-12 h-12 text-green-500 mx-auto mb-3 animate-pulse"/>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Thank You!</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    Your support request has been received. Our team will get back to you within 24-48 business hours.
                    Your reference ID is <span className="font-medium" style={{color: primaryColor}}>SUP-{Date.now().toString().slice(-5)}</span>.
                </p>
            </div>
        </Card>
      ) : (
        <Card title="Submit a Support Request" titleSize="lg">
          <form onSubmit={handleSubmit} className="space-y-4 p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input type="email" name="email" id="email" value={formState.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700" />
              </div>
            </div>
             <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Inquiry Type</label>
              <select name="type" id="type" value={formState.type} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700">
                <option value="general_inquiry">General Inquiry</option>
                <option value="technical_issue">Technical Issue</option>
                <option value="feedback">Platform Feedback</option>
                <option value="billing">Billing Question</option>
              </select>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
              <input type="text" name="subject" id="subject" value={formState.subject} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea name="message" id="message" value={formState.message} onChange={handleChange} rows={5} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700"></textarea>
            </div>
            <div className="pt-2">
              <Button type="submit" variant="primary" leftIcon={<IconPaperAirplane className="w-4 h-4" />}>
                Send Request
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card title="Alternative Contact Methods">
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <IconEnvelope className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0"/>
                <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">Email Support</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">For direct inquiries, email us at:</p>
                    <a href="mailto:support@eldium.com.au" className="text-sm font-medium text-primary hover:underline">support@eldium.com.au</a>
                </div>
            </div>
             <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <IconHelpCenter className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0"/>
                <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">Knowledge Base</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Find answers to common questions:</p>
                    <a href="#/help-center" className="text-sm font-medium text-primary hover:underline">Visit Help Center & FAQs</a>
                </div>
            </div>
        </div>
         <p className="px-4 pb-3 text-xs text-gray-500 dark:text-gray-400">
            Our typical response time for email and form submissions is 1-2 business days. For urgent issues, please mark your subject line accordingly.
        </p>
      </Card>
    </div>
  );
};

export default ContactSupportPage;
