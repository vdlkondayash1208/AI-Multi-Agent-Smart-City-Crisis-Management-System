import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, MapPin, UploadCloud, AlertCircle, Camera, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function CitizenPortal() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center text-red-600 dark:text-red-500 font-bold text-xl">
            <ShieldAlert className="h-6 w-6 mr-2" />
            Public Safety Portal
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            Official Login
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Report Form */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
            <div className="h-2 w-full bg-red-600"></div>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold">Report an Emergency</CardTitle>
              <p className="text-slate-500 dark:text-slate-400">If this is a life-threatening emergency, please call 911 immediately. Use this form to report incidents to local authorities.</p>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-500">
                  <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Report Submitted Successfully</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">Your report has been securely transmitted to the emergency response coordination center. Help is being dispatched if required.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-slate-100 dark:bg-slate-800 font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Submit Another Report
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Incident Type <span className="text-red-500">*</span></label>
                      <select required className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-red-500/50 outline-none">
                        <option value="">Select type...</option>
                        <option value="fire">Fire / Smoke</option>
                        <option value="medical">Medical Emergency</option>
                        <option value="accident">Traffic Accident</option>
                        <option value="hazard">Public Hazard / Spill</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location <span className="text-red-500">*</span></label>
                      <div className="flex gap-2">
                        <input required type="text" placeholder="Enter address or landmark" className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-red-500/50 outline-none" />
                        <button type="button" className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="Use My Location">
                          <MapPin className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description <span className="text-red-500">*</span></label>
                    <textarea 
                      required
                      rows="4" 
                      placeholder="Please describe the situation in detail..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-red-500/50 outline-none resize-none"
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center justify-between">
                      <span>Photo / Video Evidence</span>
                      <span className="text-slate-400 text-xs font-normal">Optional</span>
                    </label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                      <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Camera className="h-6 w-6 text-slate-500" />
                      </div>
                      <p className="font-medium">Click to upload or drag & drop</p>
                      <p className="text-xs text-slate-500 mt-1">JPEG, PNG, MP4 up to 50MB</p>
                    </div>
                  </div>

                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all flex justify-center items-center disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <UploadCloud className="h-5 w-5 mr-2" />
                        Submit Emergency Report
                      </>
                    )}
                  </button>
                  
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Public Alerts Sidebar */}
        <div className="space-y-6">
          <h3 className="font-bold text-xl flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-500" /> Active Alerts
          </h3>
          
          <div className="space-y-4">
            <Card className="border-l-4 border-l-red-500 bg-white dark:bg-slate-900">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-red-600 dark:text-red-400">Severe Weather Warning</h4>
                  <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-1 rounded-full dark:bg-red-900/30 dark:text-red-400">URGENT</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">Flash flood warning in effect until 10:00 PM. Avoid low-lying areas and do not drive through flooded roads.</p>
                <div className="text-xs text-slate-400 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" /> All Counties
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500 bg-white dark:bg-slate-900">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-yellow-600 dark:text-yellow-400">Road Closure</h4>
                  <span className="text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full dark:bg-yellow-900/30 dark:text-yellow-400">ADVISORY</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">I-95 Northbound closed at Exit 45 due to an overturned vehicle. Expect major delays.</p>
                <div className="text-xs text-slate-400 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" /> Downtown Sector
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </main>
    </div>
  );
}
