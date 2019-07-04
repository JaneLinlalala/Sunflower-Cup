import { ExpertListItemDataType } from './model';

const fakeExpertListData: ExpertListItemDataType[] = [
  {
    id: '1',
    name: '张三',
    major: '摸鱼',
    email: '123@qq.com',
  },
  {
    id: '2',
    name: '李四',
    major: '划水',
    email: '123@qq.com',
  },
  {
    id: '3',
    name: '王五',
    major: '洗澡',
    email: '123@qq.com',
  },
  {
    id: '4',
    name: '赵六',
    major: '捡香皂',
    email: '123@qq.com',
  },
];

const fakeData = {
  fakeExpertListData,
  submitResult: { status: 'success' },
};

export default fakeData;
