import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import provincesData from '../data/provinces.json';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  // Team Leader State
  const [leader, setLeader] = useState({
    name: '',
    birthdate: '',
    id_gender: '',
    id_identity: '',
    identity_no: '',
    address: '',
    id_province: '',
    id_district: '',
    hp: '',
    bank: '',
    pendamping: '',
    organisasi: ''
  });
  
  // Members State
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [memberForm, setMemberForm] = useState({
    nama: '',
    birthdate: '',
    id_gender: '',
    alamat: '',
    id_identity: '',
    identity_no: '',
    hp_member: '',
    hp_keluarga: '',
    id_job: ''
  });
  
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
  
  const pendampingOptions = [
    { id: '0', name: 'No' },
    { id: '1', name: 'Yes' }
  ];
  
  // Get districts based on selected province
  const getDistricts = (provinceId) => {
    const province = provincesData.find(p => p.province_id === provinceId);
    return province ? province.districts : [];
  };
  
  const handleLeaderChange = (field, value) => {
    setLeader(prev => ({
      ...prev,
      [field]: value,
      // Reset district when province changes
      ...(field === 'id_province' ? { id_district: '' } : {})
    }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  
  const handleMemberFormChange = (field, value) => {
    setMemberForm(prev => ({ ...prev, [field]: value }));
  };
  
  const validateLeader = () => {
    const newErrors = {};
    
    if (!leader.name.trim()) newErrors.name = 'Name is required';
    if (!leader.birthdate) newErrors.birthdate = 'Birthdate is required';
    if (!leader.id_gender) newErrors.id_gender = 'Gender is required';
    if (!leader.id_identity) newErrors.id_identity = 'Identity type is required';
    if (!leader.identity_no.trim()) newErrors.identity_no = 'Identity number is required';
    if (!leader.address.trim()) newErrors.address = 'Address is required';
    if (!leader.id_province) newErrors.id_province = 'Province is required';
    if (!leader.id_district) newErrors.id_district = 'District is required';
    if (!leader.hp.trim()) newErrors.hp = 'Phone number is required';
    if (!leader.bank) newErrors.bank = 'Bank is required';
    if (!leader.pendamping) newErrors.pendamping = 'Pendamping is required';
    if (leader.pendamping === '0' && !leader.organisasi.trim()) {
      newErrors.organisasi = 'Organization is required when no pendamping';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateMemberForm = () => {
    if (!memberForm.nama.trim()) return false;
    if (!memberForm.birthdate) return false;
    if (!memberForm.id_gender) return false;
    if (!memberForm.alamat.trim()) return false;
    if (!memberForm.id_identity) return false;
    if (!memberForm.identity_no.trim()) return false;
    if (!memberForm.hp_member.trim()) return false;
    if (!memberForm.hp_keluarga.trim()) return false;
    if (!memberForm.id_job) return false;
    return true;
  };
  
  const addMember = () => {
    if (members.length >= 9) {
      alert('Maximum 9 members allowed (10 people total including leader)');
      return;
    }
    
    if (!validateMemberForm()) {
      alert('Please fill in all member fields');
      return;
    }
    
    if (editingMember !== null) {
      const updatedMembers = [...members];
      updatedMembers[editingMember] = { ...memberForm };
      setMembers(updatedMembers);
      setEditingMember(null);
    } else {
      setMembers([...members, { ...memberForm }]);
    }
    
    // Reset form
    setMemberForm({
      nama: '',
      birthdate: '',
      id_gender: '',
      alamat: '',
      id_identity: '',
      identity_no: '',
      hp_member: '',
      hp_keluarga: '',
      id_job: ''
    });
    setShowMemberForm(false);
  };
  
  const editMember = (index) => {
    setMemberForm({ ...members[index] });
    setEditingMember(index);
    setShowMemberForm(true);
  };
  
  const deleteMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };
  
  const handleSubmit = () => {
    if (!validateLeader()) {
      alert('Please fill in all required leader fields');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (members.length < 1) {
      alert('Minimum 2 people required (1 leader + 1 member)');
      return;
    }
    
    // Prepare data
    const registrationData = {
      leader,
      members,
      timestamp: new Date().toISOString(),
      totalParticipants: members.length + 1
    };
    
    // Store in localStorage
    localStorage.setItem('registrationData', JSON.stringify(registrationData));
    
    // Navigate to summary
    navigate('/summary');
  };
  
  const totalParticipants = members.length + 1;
  const canSubmit = totalParticipants >= 2 && totalParticipants <= 10;
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />
      
      <div className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProgressIndicator currentStep={3} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
                Team Registration
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Register your hiking team (2-10 people)
              </p>
              <Badge variant={canSubmit ? 'success' : 'muted'} className="text-base">
                {totalParticipants} / 10 Participants
              </Badge>
            </div>
            
            {/* Team Leader Form */}
            <Card className="mb-8">
              <CardHeader className="bg-primary/10">
                <CardTitle className="flex items-center text-primary">
                  <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Team Leader Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" required>Full Name</Label>
                    <Input
                      id="name"
                      value={leader.name}
                      onChange={(e) => handleLeaderChange('name', e.target.value)}
                      placeholder="Enter full name"
                      error={!!errors.name}
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="birthdate" required>Birthdate</Label>
                    <Input
                      id="birthdate"
                      type="date"
                      value={leader.birthdate}
                      onChange={(e) => handleLeaderChange('birthdate', e.target.value)}
                      error={!!errors.birthdate}
                    />
                    {errors.birthdate && <p className="text-destructive text-xs mt-1">{errors.birthdate}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="id_gender" required>Gender</Label>
                    <Select
                      id="id_gender"
                      value={leader.id_gender}
                      onChange={(e) => handleLeaderChange('id_gender', e.target.value)}
                      error={!!errors.id_gender}
                    >
                      <option value="">Select gender</option>
                      {genderOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                      ))}
                    </Select>
                    {errors.id_gender && <p className="text-destructive text-xs mt-1">{errors.id_gender}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="id_identity" required>Identity Type</Label>
                    <Select
                      id="id_identity"
                      value={leader.id_identity}
                      onChange={(e) => handleLeaderChange('id_identity', e.target.value)}
                      error={!!errors.id_identity}
                    >
                      <option value="">Select identity type</option>
                      {identityOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                      ))}
                    </Select>
                    {errors.id_identity && <p className="text-destructive text-xs mt-1">{errors.id_identity}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="identity_no" required>Identity Number</Label>
                    <Input
                      id="identity_no"
                      value={leader.identity_no}
                      onChange={(e) => handleLeaderChange('identity_no', e.target.value)}
                      placeholder="Enter identity number"
                      error={!!errors.identity_no}
                    />
                    {errors.identity_no && <p className="text-destructive text-xs mt-1">{errors.identity_no}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="hp" required>Phone Number</Label>
                    <Input
                      id="hp"
                      value={leader.hp}
                      onChange={(e) => handleLeaderChange('hp', e.target.value)}
                      placeholder="e.g., 081234567890"
                      error={!!errors.hp}
                    />
                    {errors.hp && <p className="text-destructive text-xs mt-1">{errors.hp}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="address" required>Address</Label>
                    <Input
                      id="address"
                      value={leader.address}
                      onChange={(e) => handleLeaderChange('address', e.target.value)}
                      placeholder="Enter full address"
                      error={!!errors.address}
                    />
                    {errors.address && <p className="text-destructive text-xs mt-1">{errors.address}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="id_province" required>Province</Label>
                    <Select
                      id="id_province"
                      value={leader.id_province}
                      onChange={(e) => handleLeaderChange('id_province', e.target.value)}
                      error={!!errors.id_province}
                    >
                      <option value="">Select province</option>
                      {provincesData.map(prov => (
                        <option key={prov.province_id} value={prov.province_id}>
                          {prov.province_name}
                        </option>
                      ))}
                    </Select>
                    {errors.id_province && <p className="text-destructive text-xs mt-1">{errors.id_province}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="id_district" required>District</Label>
                    <Select
                      id="id_district"
                      value={leader.id_district}
                      onChange={(e) => handleLeaderChange('id_district', e.target.value)}
                      disabled={!leader.id_province}
                      error={!!errors.id_district}
                    >
                      <option value="">Select district</option>
                      {getDistricts(leader.id_province).map(dist => (
                        <option key={dist.id} value={dist.id}>{dist.name}</option>
                      ))}
                    </Select>
                    {errors.id_district && <p className="text-destructive text-xs mt-1">{errors.id_district}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="bank" required>Payment Method</Label>
                    <Select
                      id="bank"
                      value={leader.bank}
                      onChange={(e) => handleLeaderChange('bank', e.target.value)}
                      error={!!errors.bank}
                    >
                      <option value="">Select payment method</option>
                      {bankOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                      ))}
                    </Select>
                    {errors.bank && <p className="text-destructive text-xs mt-1">{errors.bank}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="pendamping" required>Pendamping (Guide)</Label>
                    <Select
                      id="pendamping"
                      value={leader.pendamping}
                      onChange={(e) => handleLeaderChange('pendamping', e.target.value)}
                      error={!!errors.pendamping}
                    >
                      <option value="">Select option</option>
                      {pendampingOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                      ))}
                    </Select>
                    {errors.pendamping && <p className="text-destructive text-xs mt-1">{errors.pendamping}</p>}
                  </div>
                  
                  {leader.pendamping === '0' && (
                    <div className="md:col-span-2">
                      <Label htmlFor="organisasi" required>Organization Name</Label>
                      <Input
                        id="organisasi"
                        value={leader.organisasi}
                        onChange={(e) => handleLeaderChange('organisasi', e.target.value)}
                        placeholder="Enter organization name"
                        error={!!errors.organisasi}
                      />
                      {errors.organisasi && <p className="text-destructive text-xs mt-1">{errors.organisasi}</p>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Members Section */}
            <Card className="mb-8">
              <CardHeader className="bg-accent/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-accent">
                    <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Team Members ({members.length})
                  </CardTitle>
                  <Button
                    size="sm"
                    onClick={() => {
                      if (members.length >= 9) {
                        alert('Maximum 9 members allowed');
                        return;
                      }
                      setShowMemberForm(true);
                      setEditingMember(null);
                    }}
                    disabled={members.length >= 9}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {members.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-lg font-medium">No members added yet</p>
                    <p className="text-sm mt-1">Click "Add Member" to add team members</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {members.map((member, index) => (
                      <div key={index} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground flex items-center">
                              <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">
                                {index + 1}
                              </span>
                              {member.nama}
                            </h4>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div>Gender: {genderOptions.find(g => g.id === member.id_gender)?.name}</div>
                              <div>Job: {jobOptions.find(j => j.id === member.id_job)?.name}</div>
                              <div>Phone: {member.hp_member}</div>
                              <div>Emergency: {member.hp_keluarga}</div>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => editMember(index)}
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteMember(index)}
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Member Form */}
                {showMemberForm && (
                  <div className="mt-6 p-6 bg-muted/30 rounded-lg border-2 border-accent/30">
                    <h4 className="text-lg font-semibold mb-4 flex items-center text-accent">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {editingMember !== null ? 'Edit Member' : 'Add New Member'}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label required>Full Name</Label>
                        <Input
                          value={memberForm.nama}
                          onChange={(e) => handleMemberFormChange('nama', e.target.value)}
                          placeholder="Enter full name"
                        />
                      </div>
                      
                      <div>
                        <Label required>Birthdate</Label>
                        <Input
                          type="date"
                          value={memberForm.birthdate}
                          onChange={(e) => handleMemberFormChange('birthdate', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label required>Gender</Label>
                        <Select
                          value={memberForm.id_gender}
                          onChange={(e) => handleMemberFormChange('id_gender', e.target.value)}
                        >
                          <option value="">Select gender</option>
                          {genderOptions.map(opt => (
                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                          ))}
                        </Select>
                      </div>
                      
                      <div>
                        <Label required>Identity Type</Label>
                        <Select
                          value={memberForm.id_identity}
                          onChange={(e) => handleMemberFormChange('id_identity', e.target.value)}
                        >
                          <option value="">Select identity type</option>
                          {identityOptions.map(opt => (
                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                          ))}
                        </Select>
                      </div>
                      
                      <div>
                        <Label required>Identity Number</Label>
                        <Input
                          value={memberForm.identity_no}
                          onChange={(e) => handleMemberFormChange('identity_no', e.target.value)}
                          placeholder="Enter identity number"
                        />
                      </div>
                      
                      <div>
                        <Label required>Job Type</Label>
                        <Select
                          value={memberForm.id_job}
                          onChange={(e) => handleMemberFormChange('id_job', e.target.value)}
                        >
                          <option value="">Select job type</option>
                          {jobOptions.map(opt => (
                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                          ))}
                        </Select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label required>Address</Label>
                        <Input
                          value={memberForm.alamat}
                          onChange={(e) => handleMemberFormChange('alamat', e.target.value)}
                          placeholder="Enter full address"
                        />
                      </div>
                      
                      <div>
                        <Label required>Phone Number</Label>
                        <Input
                          value={memberForm.hp_member}
                          onChange={(e) => handleMemberFormChange('hp_member', e.target.value)}
                          placeholder="e.g., 081234567890"
                        />
                      </div>
                      
                      <div>
                        <Label required>Emergency Contact</Label>
                        <Input
                          value={memberForm.hp_keluarga}
                          onChange={(e) => handleMemberFormChange('hp_keluarga', e.target.value)}
                          placeholder="e.g., 081234567890"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowMemberForm(false);
                          setEditingMember(null);
                          setMemberForm({
                            nama: '',
                            birthdate: '',
                            id_gender: '',
                            alamat: '',
                            id_identity: '',
                            identity_no: '',
                            hp_member: '',
                            hp_keluarga: '',
                            id_job: ''
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={addMember}>
                        {editingMember !== null ? 'Update Member' : 'Save Member'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Submit Section */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Participants</p>
                    <p className="text-2xl font-bold text-primary">{totalParticipants} people</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={canSubmit ? 'success' : 'muted'}>
                      {canSubmit ? 'Ready to Submit' : `Need ${2 - totalParticipants} more`}
                    </Badge>
                  </div>
                </div>
                
                {!canSubmit && (
                  <div className="mb-4 p-4 bg-accent-light/50 border border-accent/30 rounded-lg">
                    <p className="text-sm text-foreground">
                      ⚠️ Minimum 2 participants required (1 leader + 1 member)
                    </p>
                  </div>
                )}
                
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate('/rules')}
                  >
                    Go Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                  >
                    Submit Registration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};