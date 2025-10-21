import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import provincesData from '../data/provinces.json';

export const SummaryPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const storedData = localStorage.getItem('registrationData');
    if (!storedData) {
      navigate('/');
      return;
    }
    setData(JSON.parse(storedData));
  }, [navigate]);
  
  if (!data) {
    return null;
  }
  
  const genderOptions = [
    { id: '1', name: 'Male' },
    { id: '2', name: 'Female' }
  ];
  
  const identityOptions = [
    { id: '1', name: 'KTP (ID Card)' },
    { id: '2', name: 'SIM (Driver License)' },
    { id: '3', name: 'Passport' }
  ];
  
  const bankOptions = [
    { id: 'qris', name: 'QRIS' },
    { id: 'bca', name: 'BCA' },
    { id: 'bri', name: 'BRI' },
    { id: 'mandiri', name: 'Mandiri' }
  ];
  
  const jobOptions = [
    { id: '1', name: 'Government' },
    { id: '2', name: 'Private' },
    { id: '3', name: 'Student' },
    { id: '4', name: 'Other' }
  ];
  
  const getProvinceName = (id) => {
    return provincesData.find(p => p.province_id === id)?.province_name || id;
  };
  
  const getDistrictName = (provinceId, districtId) => {
    const province = provincesData.find(p => p.province_id === provinceId);
    return province?.districts.find(d => d.id === districtId)?.name || districtId;
  };
  
  const downloadJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `registration-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />
      
      <div className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8 animate-fade-in-up">
              <div className="w-20 h-20 bg-success text-success-foreground rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
                Registration Complete!
              </h1>
              <p className="text-lg text-muted-foreground">
                Your hiking registration has been submitted successfully
              </p>
            </div>
            
            {/* Summary Cards */}
            <div className="space-y-6 mb-8">
              {/* Overview */}
              <Card className="bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center text-primary">
                      <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Registration Overview
                    </span>
                    <Badge variant="success">Confirmed</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Destination</p>
                      <p className="font-semibold">Ranu Kumbolo</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Participants</p>
                      <p className="font-semibold">{data.totalParticipants} people</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Team Leader</p>
                      <p className="font-semibold">{data.leader.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Registration Date</p>
                      <p className="font-semibold">{new Date(data.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Team Leader Details */}
              <Card>
                <CardHeader className="bg-primary/10">
                  <CardTitle className="flex items-center text-primary">
                    <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Team Leader Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Full Name</p>
                      <p className="font-semibold">{data.leader.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Birthdate</p>
                      <p className="font-semibold">{data.leader.birthdate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Gender</p>
                      <p className="font-semibold">{genderOptions.find(g => g.id === data.leader.id_gender)?.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Identity</p>
                      <p className="font-semibold">
                        {identityOptions.find(i => i.id === data.leader.id_identity)?.name} - {data.leader.identity_no}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Phone</p>
                      <p className="font-semibold">{data.leader.hp}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Payment Method</p>
                      <p className="font-semibold">{bankOptions.find(b => b.id === data.leader.bank)?.name}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-muted-foreground mb-1">Address</p>
                      <p className="font-semibold">{data.leader.address}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Province</p>
                      <p className="font-semibold">{getProvinceName(data.leader.id_province)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">District</p>
                      <p className="font-semibold">{getDistrictName(data.leader.id_province, data.leader.id_district)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Guide Required</p>
                      <p className="font-semibold">{data.leader.pendamping === '1' ? 'Yes' : 'No'}</p>
                    </div>
                    {data.leader.pendamping === '0' && (
                      <div>
                        <p className="text-muted-foreground mb-1">Organization</p>
                        <p className="font-semibold">{data.leader.organisasi}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Team Members */}
              <Card>
                <CardHeader className="bg-accent/10">
                  <CardTitle className="flex items-center text-accent">
                    <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Team Members ({data.members.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {data.members.map((member, index) => (
                      <div key={index} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-semibold text-foreground flex items-center mb-3">
                          <span className="bg-accent text-accent-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm mr-2">
                            {index + 1}
                          </span>
                          {member.nama}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Gender</p>
                            <p className="font-medium">{genderOptions.find(g => g.id === member.id_gender)?.name}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Birthdate</p>
                            <p className="font-medium">{member.birthdate}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Job</p>
                            <p className="font-medium">{jobOptions.find(j => j.id === member.id_job)?.name}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Identity</p>
                            <p className="font-medium">
                              {identityOptions.find(i => i.id === member.id_identity)?.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Phone</p>
                            <p className="font-medium">{member.hp_member}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Emergency</p>
                            <p className="font-medium">{member.hp_keluarga}</p>
                          </div>
                          <div className="md:col-span-3">
                            <p className="text-muted-foreground">Address</p>
                            <p className="font-medium">{member.alamat}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* JSON Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    JSON Data Preview
                  </CardTitle>
                  <CardDescription>
                    This is the raw data that will be saved as JSON file
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-xs text-foreground font-mono">
                      {JSON.stringify(data, null, 2)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate('/')}
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </Button>
              <Button
                className="flex-1 bg-success hover:bg-success/90"
                onClick={downloadJSON}
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download JSON File
              </Button>
            </div>
            
            {/* Next Steps */}
            <Card className="mt-8 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>You will receive a confirmation email within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Payment instructions will be sent to your registered phone number</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Complete payment within 3 days to secure your booking</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Prepare required equipment as per the hiking rules</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};