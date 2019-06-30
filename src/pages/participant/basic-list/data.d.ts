export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface BasicListItemDataType {
  // id: string;
  // owner: string;
  // title: string;
  // avatar: string;
  // cover: string;
  // status: 'normal' | 'exception' | 'active' | 'success';
  // percent: number;
  // logo: string;
  // href: string;
  // body?: any;
  // updatedAt: number;
  // createdAt: number;
  // subDescription: string;
  // description: string;
  // activeUser: number;
  // newUser: number;
  // star: number;
  // like: number;
  // message: number;
  // content: string;
  // members: Member[];
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
