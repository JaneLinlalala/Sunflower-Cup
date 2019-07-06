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
  birthDay: string;
  education: string;
  major: string;
  entryYear: string;
  projectFullName: string;
  address: string;
  phone: string;
  email: string;
  friends: [];
  projectType: string;
  details: string;
  invention: string;
  keywords: string;
  picUrl: string;
  docUrl: string;
  videoUrl: string;
  averageScore: string;
  submitStatus: string;
  studentId: 5;
}

export interface AdvancedProfileData {
  data: {};
  file: File;
  appraise: AppraiseData;
  fetchAppraiseStatus: undefined | string;
  saveAppraiseStatus: undefined | string;
  advancedOperation1: AdvancedOperation1[];
  advancedOperation2: AdvancedOperation2[];
  advancedOperation3: AdvancedOperation3[];
}

export interface AppraiseData {
  score: number;
  suggestion: string;
}

export interface ListItemDataType {
  id: string;
  projectName: string;
  college: string;
  competitionType: string;
  studentName: string;
  studentNumber: string;
  birthDay: string;
  education: string;
  major: string;
  entryYear: string;
  projectFullName: string;
  address: string;
  phone: string;
  email: string;
  friends: FriendList[];
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

export interface FriendList {
  studentId: string;
  name: string;
  education: string;
  phone: string;
  email: string;
}
