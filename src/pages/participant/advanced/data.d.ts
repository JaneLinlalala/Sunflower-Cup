export interface AdvancedOperation1 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface AdvancedOperation2 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface AdvancedOperation3 {
  id: string;
  projectName: string;
  college: string;
  competitionType: string;
  studentName: string;
  studentNumber: string;
  birthDay: string
  education: string;
  major: string;
  entryYear: string;
  projectFullName: string;
  address: string;
  phone: string;
  email: string;
  friends: string;
  projectType: string;
  details: string;
  invention: string;
  keywords: string;
  picUrl: string;
  docUrl: string;
  videoUrl: string;
  averageScore: string;
  submitStatus: string;
  studentId: 5
}

export interface AdvancedProfileData {
  data:{};
  advancedOperation1: AdvancedOperation1[];
  advancedOperation2: AdvancedOperation2[];
  advancedOperation3: AdvancedOperation3[];
}

export interface ListItemDataType {
  id: string;
  projectName: string;
  college: string;
  competitionType: string;
  studentName: string;
  studentNumber: string;
  birthDay: string
  education: string;
  major: string;
  entryYear: string;
  projectFullName: string;
  address: string;
  phone: string;
  email: string;
  friends: string;
  projectType: string;
  details: string;
  invention: string;
  keywords: string;
  picUrl: string;
  docUrl: string;
  videoUrl: string;
  averageScore: string;
  submitStatus: string;
  studentId: string;
}

