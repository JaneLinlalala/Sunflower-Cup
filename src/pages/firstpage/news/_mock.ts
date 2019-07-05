import { CompetitionListItemDataType } from './model';

const fakeExpertListData: CompetitionListItemDataType[] = [
  {
    id: '1',
    competitionName: '噜啦啦噜啦啦噜啦噜啦啦',
    startTimeFormat: '2019-01-02',
    endTimeFormat: '2019-02-03',
    description: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
    startTime: '',
    endTime: '',
  },
  {
    id: '2',
    competitionName: '涛涛涛涛涛涛涛涛涛涛',
    startTimeFormat: '2019-02-03',
    endTimeFormat: '2019-03-04',
    description: '哇哇哇哇哇哇哇哇哇哇哇哇',
    startTime: '',
    endTime: '',
  },
  {
    id: '3',
    competitionName: '顶顶顶顶顶顶顶顶顶',
    startTimeFormat: '2019-04-05',
    endTimeFormat: '2019-05-06',
    description: '靠靠靠靠靠靠靠靠靠靠靠靠靠',
    startTime: '',
    endTime: '',
  },
  {
    id: '4',
    competitionName: '噜啊哈哈哈哈哈哈哈哈哈啦啦',
    startTimeFormat: '2018-01-02',
    endTimeFormat: '2018-02-03',
    description: '有有有有有有有有有有有有有有有',
    startTime: '',
    endTime: '',
  },
];

const fakeData = {
  fakeExpertListData,
  submitResult: { status: 'success' },
};

export default fakeData;
